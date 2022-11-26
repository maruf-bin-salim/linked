import Link from 'next/link'
import styles from '../styles/edit-profile.module.css'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Router, { useRouter } from 'next/router'
import Head from 'next/head'

export default function EditProfile() {

    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();

    if (!session) {
        return (
            <div>
                {"You aren't logged in."}
            </div>
        )
    }

    return (
        <div className={styles.page}>

            <div className={styles.sidebar}>
                <div>
                    <p>Go Back To Dashboard</p>
                </div>
                <button className={styles.signOut} onClick={() => { supabase.auth.signOut(); router.push('/') }}>{"Log Out"}</button>
            </div>
            <div className={styles.mainBox}>
                <p>asd</p>
            </div>
        </div>
    )
}