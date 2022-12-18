import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link';
import Loading from '../components/loading';
import useUser from '../hooks/useUser';
import { useRouter } from 'next/router';
import styles from '../styles/dashboard.module.css'



export default function Home() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();


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
      <Link href='./edit-profile'>edit profile</Link>
      <Link href='./messenger'>Messenger</Link>
      <button onClick={() => { supabase.auth.signOut(); router.push('/'); }}>
        Sign Out
      </button>
    </div>
  )
}
