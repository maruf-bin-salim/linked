import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function useUser(passedID) {

    const [isLoading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const session = useSession();
    const supabase = useSupabaseClient();

    async function getProfile(userID)
    {
        setLoading(true)
        let { data, error, status } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userID)
          .single();

        if(data)
            setUser(data);
        setLoading(false);
    }

    useEffect(() => {
        setLoading(false);
        if (!session) return;
        let userID = passedID ? passedID : session.user.id;
        getProfile(userID);
        console.log(user);
    }, [session])



    return {
        isLoading,
        user
    };
}