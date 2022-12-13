import { useRouter } from 'next/router'
import { useState } from 'react';
import AuthError from '../../components/authentication-error';
import Loading from '../../components/loading';
import useMessages from '../../hooks/useMessages';
import useThread from '../../hooks/useThread';
import styles from '../../styles/messenger-thread.module.css'


function Message({ id, text, isSelfSent, timestamp, loggedInUser, threadMember }) {

    let messageStyle = isSelfSent ? { marginLeft: "auto" } : { marginRight: "auto" };
    let messageTimeStyle = isSelfSent ? { marginLeft: "auto" } : { marginRight: "auto" };
    var dateFormat = new Date(timestamp);
    let timeInString = (
        "Date: " + dateFormat.getDate() +
        "/" + (dateFormat.getMonth() + 1) +
        "/" + dateFormat.getFullYear() +
        " " + dateFormat.getHours() +
        ":" + dateFormat.getMinutes() +
        ":" + dateFormat.getSeconds()
    );

    return (
        <div className={styles.message}>
            {
                isSelfSent &&
                <div className={styles.senderInfo}>
                    <p style={{ marginLeft: "auto" }}>{loggedInUser.username}</p>
                    <img src={loggedInUser.avatar_url}></img>
                </div>
            }
            {
                !isSelfSent &&
                <div className={styles.senderInfo}>
                    <img src={threadMember.avatar_url}></img>
                    <p>{threadMember.username}</p>
                </div>
            }

            <div className={styles.messageMain}>
                <p style={messageStyle}>
                    {text}
                </p>
            </div>
            <div className={styles.messageTime}>
                <p style={messageTimeStyle}>{timeInString}</p>
            </div>
        </div>
    );
}


export default function MessengerThread() {

    const router = useRouter();
    const { threadID } = router.query;
    const { loggedInUser, threadMember, isLoading, isLoggedIn } = useThread(threadID);
    const { messages, sendMessage } = useMessages(threadID);
    const [currentText, setCurrentText] = useState('');



    async function handleSend() {
        let text = currentText;
        setCurrentText('');
        await sendMessage(text, loggedInUser.id);
    }

    async function handleKeyDown(e) {
        if (e.key === 'Enter')
            handleSend();
    };


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
                    <p>{"Message history"}</p>
                </div>
                <button className={styles.signOut} onClick={() => { supabase.auth.signOut(); router.push('/') }}>{"Log Out"}</button>
            </div>


            <div className={styles.mainBox}>
                <div className={styles.chatContainer}>
                    {
                        messages.map((message) => {
                            return (
                                <Message
                                    key={message.id}
                                    id={message.id}
                                    text={message.text}
                                    isSelfSent={(loggedInUser?.id === message.senderID)}
                                    timestamp={message.timestamp}
                                    loggedInUser={loggedInUser}
                                    threadMember={threadMember}
                                />
                            )
                        })
                    }
                </div>

                <div className={styles.chatInputContainer}>
                    <input autoComplete='false' value={currentText} onKeyDown={handleKeyDown} onChange={(e) => { setCurrentText(e.target.value) }}></input>
                    <button onClick={handleSend}></button>
                </div>

            </div>
        </div>
    )
}