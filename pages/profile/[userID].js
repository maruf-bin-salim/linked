import { useRouter } from 'next/router'

export default function Profile() {

    const router = useRouter();
    const { userID } = router.query;

    return (
        <div>
            {"show user of userID :"} {userID}
        </div>
    )
}