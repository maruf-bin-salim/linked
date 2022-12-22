import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { POST_TYPES } from "../utils/types";
import styles from '../styles/share-feed.module.css'

export default function ShareFeed({ users }) {
    const supabase = useSupabaseClient();

    const [sharePosts, setSharePosts] = useState([]);

    async function getSharePosts() {
        let { data, error, status } = await supabase
            .from('posts')
            .select('*')
            .eq('type', POST_TYPES.SHARE);
        if (data) setSharePosts(data);
    }

    useEffect(() => {

        getSharePosts();

    }, []);

    return (
        <div className={styles.feed}>
            {
                sharePosts.map((sharePost, index)=>{
                    return <div> okay </div>
                })
            }
        </div>
    )
}