import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";


export default function useMessages(threadID) {
    const [messages, setMessages] = useState([]);

    const supabase = useSupabaseClient();


    async function getMessages(threadID) {
        let { data, error, status } = await supabase
            .from('messages')
            .select('*')
            .eq('threadID', threadID.trim());
        if (data) setMessages(data);
    }

    useEffect(() => {
        if(threadID) getMessages(threadID);
    }, [threadID]);


    useEffect(() => {

        const subscription = supabase
            .channel('public:messages')
            .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                let currentMessage = payload.new;
                let currentMessages = [...messages, currentMessage];
                setMessages(currentMessages);
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        }

    }, [])

    async function sendMessage(id, text, senderID)
    {
        let timestamp = Date.now();
    }


    return {
        messages
    }
}