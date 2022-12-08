import styles from '../styles/search-result.module.css'


function SearchResult({user}) {
    return (
        <div className={styles.searchResult}>
            <div className={styles.userInformation}>
                <img src={user.avatar_url} alt='profile-picture'></img>
                <p>{user.username}</p>
            </div>
            <div className={styles.messengerButtonContainer}>
                <button></button>
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
            <div>
                {
                    users.filter(
                        function (user) { return user.username.toLowerCase().includes(searchText.toLowerCase()); }
                    ).map((user) => { return (<SearchResult key={user.id} user={user} />) })
                }
            </div>
        </div>
    )
}