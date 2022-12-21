import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import generateRandomID from "../utils/generateRandomID";
import { useRouter } from "next/router";


export default function useMessages() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const supabase = useSupabaseClient();
    const router = useRouter();
    const { threadID } = router.query;
    const session = useSession();

    async function getMessages() {
        if (!threadID) {
            router.reload();
        }
        // setIsLoading(true);
        let { data, error, status } = await supabase
            .from('messages')
            .select('*')
            .eq('threadID', threadID.trim());
        if (data) setMessages(data);
        // setIsLoading(false);
    }

    useEffect(() => {
        if (threadID) getMessages(threadID);
    }, [threadID]);



    useEffect(() => {

        const subscription = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                getMessages(payload.new.threadID);
                // router.reload();
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        }

    }, []);



    function getIDS(threadID) {

        let splitted = threadID.split('_');
        let id_1 = splitted[0];
        let id_2 = splitted[1];

        let loggedInUserID = null;
        let threadMemberID = null;

        if (session?.user.id === id_1) {
            loggedInUserID = id_1;
            threadMemberID = id_2;
        }
        else {
            threadMemberID = id_1;
            loggedInUserID = id_2;
        }
        return {
            loggedInUserID,
            threadMemberID
        }
    }



    async function upsertThread(threadID, creatorID, memberID, timestamp, lastMessage) {
        let payload = { threadID: threadID, creatorID: creatorID, memberID: memberID, timestamp: timestamp, lastMessage: lastMessage };
        const { error } = await supabase
            .from('threads')
            .upsert(payload);

        if (error) {
            console.log(payload);
            console.log(error);
        }
    }


    async function updateThread(threadID, timestamp, lastMessage) {

        if (!threadID) return;
        const { loggedInUserID, threadMemberID } = getIDS(threadID);
        await upsertThread(threadID, loggedInUserID, threadMemberID, timestamp, lastMessage);
    }

    async function sendMessage(text, senderID) {
        let id = generateRandomID('message');
        let timestamp = Date.now();
        await updateThread(threadID, timestamp, text);
        const { error } = await supabase
            .from('messages')
            .insert({ id: id, text: text, senderID: senderID, threadID: threadID, timestamp: timestamp });


        await getMessages(threadID);

        if (error) console.log(error);
    }


    return {
        messages,
        sendMessage,
        isLoading,
        setIsLoading
    }
}