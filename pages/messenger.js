import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthError from "../components/authentication-error";
import Loading from "../components/loading";
import SearchResults from "../components/searchResults";
import useUser from "../hooks/useUser"
import styles from '../styles/messenger.module.css'

export default function Messenger() {

    const supabase = useSupabaseClient();
    const router = useRouter();

    const {
        isUser,
        isLoading,
        avatarUrl,
        username,
        users } = useUser();


    const [searchText, setSearchText] = useState('');
    const [searchedUsers, setSearchedUsers] = useState(users);


    function isSearching() {
        return searchText && (searchText != '');
    }


    if (isLoading)
        return (<Loading />);

    if (!isUser)
        return (<AuthError />);


    function clearSearchText() {
        setSearchText('');
    }



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

                    <div className={styles.searchInputContainer}>
                        <input
                            value={searchText}
                            onChange={(e) => { setSearchText(e.target.value) }}
                            spellCheck="false"
                            placeholder="Search for a user . . .">
                        </input>
                        <button onClick={clearSearchText}></button>
                    </div>

                    {
                        isSearching() &&
                        <SearchResults searchText={searchText} allUsers={users}></SearchResults>
                    }

                    {
                        !isSearching() &&
                        <div> is not Searching </div>
                    }


                </div>







            </div>
        </>
    )
}