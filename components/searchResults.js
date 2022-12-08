import { useRouter } from 'next/router';
import styles from '../styles/search-result.module.css'




function SearchResult({ user }) {

    const router = useRouter();

    async function goToUserProfile() {
        router.push(`/profile/${user.id}`)
    }

    async function goToThread() {
        router.push(`/messenger/${user.id}`)
    }


    return (
        <div className={styles.searchResult}>
            <div className={styles.userInformation}>
                <img
                    onClick={goToUserProfile}
                    src={user.avatar_url}
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
    allUsers: users
}) {

    return (
        <div className={styles.searchResultsComponent}>
            <p>{`Search For "${searchText}"`}</p>
            <div className={styles.searchResults}>
                {
                    users.filter(
                        function (user) { return user.username.toLowerCase().includes(searchText.toLowerCase()); }
                    ).map((user) => { return (<SearchResult key={user.id} user={user} />) })
                }
            </div>
        </div>
    )
}