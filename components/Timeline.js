import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { POST_TYPES } from "../utils/types";
import styles from '../styles/share-feed.module.css'
import SharePost from "./SharePost";
import MarketplacePost from "./MarketplacePost";

export default function Timeline({ users, loggedInUserID }) {
    const supabase = useSupabaseClient();

    const [posts, setPosts] = useState([]);

    async function getPosts() {
        let { data, error, status } = await supabase
            .from('posts')
            .select('*').eq('posterID', loggedInUserID);

        if (data) setPosts(data);
    }

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <div className={styles.feed}>
            <h1>{"Timeline: "}</h1>
            {
                posts.map((post, index) => {
                    if (post.type === POST_TYPES.SHARE) { return <SharePost key={index} users={users} post={post}>  </SharePost> }
                    else { return <MarketplacePost key={index} users={users} post={post}>  </MarketplacePost> }
                })
            }
        </div>
    )

}