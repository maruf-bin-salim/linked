import styles from '../styles/edit-profile.module.css'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'
import AuthError from '../components/authentication-error';
import useUser from '../hooks/useUser'
import Loading from '../components/loading';
// import Head from 'next/head'
// import Link from 'next/link'

export default function EditProfile() {

    const router = useRouter();
    const {

        isUser,
        isLoading,
        uploadAvatar,
        avatarUrl

    } = useUser();
    const supabase = useSupabaseClient();

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
                        <h1 className={styles.mainBoxTitle}>My profile</h1>
                        <div className={styles.saveChanges}>
                            <button>
                            </button>
                            <p>{"Save Changes"}</p>
                        </div>
                    </div>

                    <div className={styles.mainBoxTopRight}>
                        <img src={avatarUrl} alt='profile-image'></img>

                        <label className={styles.customFileInput}>
                            <input
                                type="file"
                                id="single"
                                accept="image/*"
                                onChange={uploadAvatar}
                            />
                        </label>



                    </div>
                </div>


            </div>
        </div>
    )
}