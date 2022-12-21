import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";

import styles from '../styles/dashboard.module.css'



export default function BottomBar() {

    const supabase = useSupabaseClient();
    const router = useRouter();
  
    return (
      <div className={styles.bottomBar}>
        <button className={styles.signOut} onClick={() => { supabase.auth.signOut(); router.push('/') }}>{"Log Out"}</button>
      </div>
  
    )
  }