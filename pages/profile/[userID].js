import styles from '../../styles/profile.module.css'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import AuthError from '../../components/authentication-error';
import useUser from '../../hooks/useUser'
import Loading from '../../components/loading';
// import Head from 'next/head'
// import Link from 'next/link'

export default function Profile() {

    const router = useRouter();
    const supabase = useSupabaseClient();

    const { userID } = router.query;
    const {
        isUser,
        isLoading,
        avatarUrl,
        username,
        bio,
        contactInformation,
    } = useUser(userID);

    if (isLoading)
        return (<Loading />);

    if (!isUser)
        return (<AuthError />);




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


                <div className={styles.mainBoxTop}>
                    <div className={styles.mainBoxTopLeft}>
                        <h1 className={styles.mainBoxTitle}>User profile</h1>
                    </div>

                    <div className={styles.mainBoxTopRight}>
                        <img src={avatarUrl} alt='profile-image'></img>
                    </div>
                </div>

                <div className={styles.inputBox}>
                    <h2>{"Username"}</h2>
                    <input type="text" spellCheck="false" value={username} onChange={(event) => { }}></input>
                </div>

                <div className={styles.inputBox}>
                    <h2>{"Bio"}</h2>
                    <textarea spellCheck="false" rows="8" value={bio} onChange={(event) => { }} ></textarea>
                </div>

                <div className={styles.inputBox}>
                    <h2>{"Contact Information"}<span>{" i.e: phone-number/email/website-link"}</span> </h2>
                    <input type="text" spellCheck="false" value={contactInformation} onChange={(event) => { }}></input>
                </div>

            </div>
        </div>
    )
}