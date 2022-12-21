import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import generateRandomID from "../utils/generateRandomID";
import { useRouter } from "next/router";


export default function useMessages(threadID) {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const supabase = useSupabaseClient();
    const router = useRouter();


    async function getMessages(threadID) {
        if (!threadID) return;
        setIsLoading(true);
        let { data, error, status } = await supabase
            .from('messages')
            .select('*')
            .eq('threadID', threadID.trim());
        if (data) setMessages(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if (threadID) getMessages(threadID);
    }, [threadID]);


    useEffect(() => {

        const subscription = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, async payload => {
                console.log('someone added a message in the database');
                await getMessages(threadID);
                // router.reload();
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        }

    }, [])

    async function sendMessage(text, senderID) {
        let id = generateRandomID('message');
        let timestamp = Date.now();

        const { error } = await supabase
            .from('messages')
            .insert({ id: id, text: text, senderID: senderID, threadID: threadID, timestamp: timestamp });

        if (error) console.log(error);
    }


    return {
        messages,
        sendMessage,
        isLoading,
        setIsLoading
    }
}