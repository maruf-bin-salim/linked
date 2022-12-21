
import { useRouter } from 'next/router';
import styles from '../styles/thread-histories.module.css';
import getProfilePicture from '../utils/getProfilePicture';



// logical functions 

function getTimeInString(timestamp) {
    var dateFormat = new Date(timestamp);
    let timeInString = (
        "" + dateFormat.getDate() +
        "/" + (dateFormat.getMonth() + 1) +
        "/" + dateFormat.getFullYear() +
        " " + dateFormat.getHours() +
        ":" + dateFormat.getMinutes() +
        ":" + dateFormat.getSeconds()
    );
    return timeInString;
}

function getUser(userID, users) {
    for (let i = 0; i < users.length; i++) {
        let user = users[i];
        if (user.id === userID) {
            return { avatar_url: user.avatar_url, username: user.username };
        }
    }
    return { avatar_url: null, username: null };

}


function processThreadToGenerateHistory(loggedInUserID, threads, users) {
    let histories = [];

    for (let i = 0; i < threads.length; i++) {
        let thread = threads[i];
        let lastMessage = thread.lastMessage;
        let timeInString = getTimeInString(thread.timestamp);
        let userID = (loggedInUserID === thread.creatorID) ? thread.memberID : thread.creatorID;
        let { username, avatar_url } = getUser(userID, users);

        let history = { id: thread.threadID, message: lastMessage, chatterID: userID, time: timeInString, username: username, avatar_url: avatar_url };
        histories.push(history);
    }

    return histories;

}

function truncateWithEllipses(text, max) {
    return text.substr(0, max - 1) + (text.length > max ? '. . .' : '');
}


// UI components






function ThreadHistory({ history }) {

    const router = useRouter();

    return (
        <div className={styles.History}>
            <div className={styles.userInformation}>
                <img
                    onClick={() => { router.push(`/profile/${history.chatterID}`) }}
                    src={getProfilePicture(history.avatar_url)}
                    alt='profile-picture'
                >
                </img>
                <p>{history.username}</p>
            </div>
            <div onClick={() => { router.push(`/messenger/${history.id}`) }} className={styles.HistoryMain}>
                <p>{truncateWithEllipses(history.message, 20)}</p>
                <p>{history.time}</p>
            </div>

        </div>
    )
}




export default function ThreadHistories({ loggedInUserID, threads, users }) {

    let histories = [];
    histories = processThreadToGenerateHistory(loggedInUserID, threads, users);


    return (

        <div className={styles.HistoryComponent}>
            <p>{`Showing Message History . . .`}</p>
            <div className={styles.Histories}>

                {
                    histories.map((history, index) => {
                        return (<ThreadHistory history={history} />)
                    })
                }


            </div>
        </div>
    )
}