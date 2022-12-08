import { useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link"
import { useRouter } from "next/router";
import AuthError from "../components/authentication-error";
import Loading from "../components/loading";
import useUser from "../hooks/useUser"
import styles from '../styles/messenger.module.css'

export default function Messenger() {

    const supabase = useSupabaseClient();
    const router = useRouter();
    const {

        isUser,
        isLoading,

        uploadAvatar,
        avatarUrl,

        username,
        setUsername,

        bio,
        setBio,

        contactInformation,
        setContactInformation,

        updateProfile,

    } = useUser();


    if (isLoading)
        return (<Loading />);

    if (!isUser)
        return (<AuthError />);



    return (
        <>
            <div className={styles.page}>
                <div className={styles.sidebar}>
                    <div className={styles.goBack}>
                        <button onClick={() => { router.push('/'); }}></button>
                        <p>{"Go Back To Dashboard"}</p>
                    </div>
                    <button className={styles.signOut} onClick={() => { supabase.auth.signOut(); router.push('/') }}>{"Log Out"}</button>
                </div>


                <div className={styles.mainBox}>

                    <div className={styles.mainBoxTop}>
                            <img src={avatarUrl} alt='profile-image'></img>
                            <h1 className={styles.mainBoxTitle}>{username}</h1>
                    </div>

                </div>







            </div>
        </>
    )
}