import { useRouter } from 'next/router'
import AuthError from '../../components/authentication-error';
import Loading from '../../components/loading';
import useMessages from '../../hooks/useMessages';
import useThread from '../../hooks/useThread';
import styles from '../../styles/messenger-thread.module.css'


export default function MessengerThread() {

    const router = useRouter();
    const { threadID } = router.query;
    const { loggedInUser, threadMember, isLoading, isLoggedIn } = useThread(threadID);
    const { messages } = useMessages(threadID)

    if (isLoading)
        return (<Loading />);

    if (!isLoggedIn)
        return (<AuthError />);

    


    return (
        <div className={styles.page}>
            <div className={styles.sidebar}>
                <div className={styles.goBack}>
                    <button className={styles.goBackToHome} onClick={() => { router.push('/'); }}></button>
                    <p>{"Home"}</p>
                    <button className={styles.goBackToMessenger} onClick={() => { router.push('/messenger'); }}></button>
                    <p>{"Messenger"}</p>
                </div>
                <button className={styles.signOut} onClick={() => { supabase.auth.signOut(); router.push('/') }}>{"Log Out"}</button>
            </div>


            <div className={styles.mainBox}>
                a

            </div>
        </div>
    )
}