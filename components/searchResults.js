import { useRouter } from 'next/router';
import styles from '../styles/search-result.module.css'
import generateThread from '../utils/generateThread';
import getProfilePicture from '../utils/getProfilePicture';

function SearchResult({ user, loggedInUserID }) {

    const router = useRouter();

    async function goToUserProfile() {
        router.push(`/profile/${user.id}`);
    }

    async function goToThread() {
        router.push(`/messenger/${generateThread(user.id, loggedInUserID)}`);
    }





    return (
        <div className={styles.searchResult}>
            <div className={styles.userInformation}>
                <img
                    onClick={goToUserProfile}
                    src={getProfilePicture(user.avatar_url)} 
                    alt='profile-picture'
                >
                </img>
                <p>{user.username}</p>
            </div>
            <div className={styles.messengerButtonContainer}>
                <button onClick={goToThread}></button>
            </div>
        </div>
    )
}



export default function SearchResults({
    searchText,
    allUsers: users,
    loggedInUserID
}) {

    return (
        <div className={styles.searchResultsComponent}>
            <p>{`Searching For "${searchText}"`}</p>
            <div className={styles.searchResults}>
                {
                    users.filter(
                        function (user) { return (user.id !== loggedInUserID) && user.username.toLowerCase().includes(searchText.toLowerCase()); }
                    ).map((user) => { return (<SearchResult key={user.id} user={user} loggedInUserID={loggedInUserID} />) })
                }
            </div>
        </div>
    )
}