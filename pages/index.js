import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'
import Link from 'next/link';


const Home = () => {
  const session = useSession();
  const supabase = useSupabaseClient();

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
    <div>
      {JSON.stringify(session)};
      <Link href='./edit-profile'>edit profile</Link>
      <Link href='./messenger'>Messenger</Link>
      <button onClick={() => supabase.auth.signOut()}>
        Sign Out
      </button>
    </div>
  )
}

export default Home