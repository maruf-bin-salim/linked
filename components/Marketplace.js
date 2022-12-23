import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { POST_TYPES } from "../utils/types";
import styles from '../styles/marketplace.module.css'
import MarketplacePost from "./MarketplacePost";

export default function Marketplace({ users }) {
    
    const supabase = useSupabaseClient();

    const [marketplacePosts, setMarketplacesPosts] = useState([]);

    async function getPosts(){
        let { data, error, status } = await supabase
            .from('posts')
            .select('*')
            .eq('type', POST_TYPES.MARKETPLACE);
        if (data) setMarketplacesPosts(data);
    }

    useEffect(() => {

        getPosts();

    }, []);

    return (
        <div className={styles.feed}>
            {
                marketplacePosts.map((marketplacePost, index)=>{
                    return <MarketplacePost key={marketplacePost.postID} users={users} post={marketplacePost}> </MarketplacePost>
                })
            }
        </div>
    )
}