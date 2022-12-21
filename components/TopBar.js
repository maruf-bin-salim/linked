import { useRouter } from "next/router";
import styles from '../styles/dashboard.module.css'
import getProfilePicture from "../utils/getProfilePicture";


export default function TopBar({ username, avatarUrl }) {
    const router = useRouter();
    return (
      <div className={styles.topBar}>
        <div>
          <div className={styles.userInformation}>
            <img
              onClick={() => { router.push(`/edit-profile/`) }}
              src={getProfilePicture(avatarUrl)}
              alt='profile-picture'></img>
            <p>{username}</p>
          </div>
        </div>
  
        <div className={styles.messengerContainer}>
          <img
            onClick={() => { router.push(`/messenger`) }}
            src={'/messenger-icon.jpg'}
            alt='profile-picture'
          ></img>
        </div>
  
      </div>
    )
  }