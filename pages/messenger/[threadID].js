import { useRouter } from 'next/router'
import AuthError from '../../components/authentication-error';
import Loading from '../../components/loading';
import useMessages from '../../hooks/useMessages';
import useThread from '../../hooks/useThread';


export default function MessengerThread() {

    const router = useRouter();
    const { threadID } = router.query;
    const { loggedInUser, threadMember, isLoading, isLoggedIn } = useThread(threadID);
    const { messages } = useMessages(threadID)

    if (isLoading)
        return (<Loading />);

    if (!isLoggedIn)
        return (<AuthError />);


    return (
        <div>
            {JSON.stringify(messages)}
        </div>
    )
}