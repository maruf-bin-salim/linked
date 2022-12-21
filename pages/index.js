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







export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();


  const [currentPageType, setCurrentPageType] = useState(PAGE_TYPES.POST);


  const {
    isLoading,
    avatarUrl,
    username,
    loggedInUserID,
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
      <div className={styles.main}></div>
      <BottomBar />
    </div>
  )
}
