import { useEffect, useState } from "react";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";


export default function useThread(threadID) {

    const session = useSession();
    const supabase = useSupabaseClient();

    const [isLoading, setLoading] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [threadMember, setThreadMember] = useState(null);



    function getIDS() {

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

    async function getUser(userID) {
        let { data, error, status } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userID)
            .single();

        return data;
    }

    async function setThreadInformation() {
        setLoading(true)
        const { loggedInUserID, threadMemberID } = getIDS();
        let user_1 = await getUser(loggedInUserID);
        if (user_1) setIsLoggedIn(true);
        setLoggedInUser(user_1);
        let user_2 = await getUser(threadMemberID)
        setThreadMember(user_2);
        setLoading(false);
    }

    useEffect(() => {

        if (!session) setIsLoggedIn(false);
        if (threadID) setThreadInformation();
    }, [threadID, session])

    return {
        isLoading,
        isLoggedIn,
        loggedInUser,
        threadMember,
    }

}