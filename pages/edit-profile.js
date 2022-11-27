import styles from '../styles/edit-profile.module.css'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import AuthError from '../components/authentication-error';
// import Head from 'next/head'
// import Link from 'next/link'

export default function EditProfile() {

    const session = useSession();
    const supabase = useSupabaseClient();
    const router = useRouter();

    if (!session) {
        return (
            <AuthError />
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.sidebar}>
                <div className={styles.goBack}>
                    <button onClick={() => { router.push('/'); }}></button>
                    <p>{"Go Back To Dashboard"}</p>
                </div>
                <button className={styles.signOut} onClick={() => { supabase.auth.signOut(); router.push('/') }}>{"Log Out"}</button>
            </div>
            <div className={styles.mainBox}>
                <p>asd</p>
            </div>
        </div>
    )
}