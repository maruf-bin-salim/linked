import { useRouter } from 'next/router'

export default function MessengerThread() {

    const router = useRouter();
    const { threadID } = router.query;

    return (
        <div>
            {"Messenger page thread :"} {threadID}
        </div>
    )
}