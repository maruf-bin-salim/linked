import styles from '../styles/share-feed.module.css'
import { LinkItUrl } from 'react-linkify-it';
import getProfilePicture from '../utils/getProfilePicture';
import { useRouter } from 'next/router';

function getPoster(users, posterID) {
    for (let i = 0; i < users.length; i++) {
        if (users[i].id === posterID) return users[i];
    }
    return null;
}


function getTimeInString(timestamp) {
    var dateFormat = new Date(timestamp);
    let timeInString = (
        "Posted On : " + dateFormat.getDate() +
        "/" + (dateFormat.getMonth() + 1) +
        "/" + dateFormat.getFullYear() +
        " " + dateFormat.getHours() +
        ":" + dateFormat.getMinutes() +
        ":" + dateFormat.getSeconds()
    );
    return timeInString;
}



export default function SharePost({ users, post }) {

    const router = useRouter();
    return (
        <div className={styles.post}>


            <div className={styles.postTop}>

                <div className={styles.userInformation}>

                    <img src={getProfilePicture(null)} onClick={()=> { router.push(`/profile/${post.posterID}`)}}>
                    </img>
                    {/* <img
                        onClick={() => { }}
                        // src={getProfilePicture(null)}
                        alt='profile-picture'
                    > </img> */}
                    <p>{getPoster(users, post.posterID)?.username}</p>
                </div>


                <div className={styles.messengerButtonContainer}>
                    <button onClick={() => { router.push('/messenger')}}></button>
                </div>

            </div>

            <LinkItUrl>
                <p className={styles.postMain}>{post.description}</p>
            </LinkItUrl>

            <div className={styles.postTime}>
                <p>{getTimeInString(post.timestamp)}</p>
            </div>

        </div>
    )
}