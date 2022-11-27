import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function useFriendStatus(friendID) {

    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const session = useSession();
    // const supabase = useSupabaseClient();

    useEffect(() => {
        if (!session)
            return;

        // setIsLoading(false);
        setUser({ "random": "1" })

    }, [session])



    return {
        isLoading,
        user
    };
}