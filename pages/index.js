import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Loading from '../components/loading';
import useUser from '../hooks/useUser';
import { useRouter } from 'next/router';
import styles from '../styles/dashboard.module.css'
import { useState } from 'react';
import { PAGE_TYPES } from '../utils/types';
import TopBar from '../components/TopBar';
import BottomBar from '../components/BottomBar';
import PostWriter from '../components/PostWriter';
import ShareFeed from '../components/ShareFeed';
import Marketplace from '../components/Marketplace';







export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();


  const [currentPageType, setCurrentPageType] = useState(PAGE_TYPES.POST);



  const {
    setLoading,
    isLoading,
    avatarUrl,
    username,
    loggedInUserID,
    users
  } = useUser();

  if (isLoading)
    return (<Loading />);


  if (!session) return (
    <div className="auth-container">
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        theme="dark"
      />
    </div>
  )


  return (
    <div className={styles.page}>
      <TopBar avatarUrl={avatarUrl} username={username} />
      <div className={styles.main}>

        <div className={styles.navHolder}>
          <button
            className={`${styles.post} ${(currentPageType === PAGE_TYPES.POST) ? styles.active : styles.none}`}
            onClick={() => { setCurrentPageType(PAGE_TYPES.POST) }}></button>
          <button
            className={`${styles.timeline} ${(currentPageType === PAGE_TYPES.TIMELINE) ? styles.active : styles.none}`}
            onClick={() => { setCurrentPageType(PAGE_TYPES.TIMELINE) }}></button>
          <button
            className={`${styles.marketplace} ${(currentPageType === PAGE_TYPES.MARKETPLACE) ? styles.active : styles.none}`}
            onClick={() => { setCurrentPageType(PAGE_TYPES.MARKETPLACE) }}></button>
          <button
            className={`${styles.share} ${(currentPageType === PAGE_TYPES.SHARE) ? styles.active : styles.none}`}
            onClick={() => { setCurrentPageType(PAGE_TYPES.SHARE) }}></button>
        </div>


        {
          (currentPageType === PAGE_TYPES.POST) && <PostWriter posterID={loggedInUserID} setLoading={setLoading} />
        }
        {
          (currentPageType === PAGE_TYPES.TIMELINE) && <div> TIMELINE </div>
        }

        {
          (currentPageType === PAGE_TYPES.MARKETPLACE) &&  <Marketplace users={users} />
        }
        {
          (currentPageType === PAGE_TYPES.SHARE) && <ShareFeed users={users} />
        }
      </div>
      <BottomBar />
    </div>
  )
}
