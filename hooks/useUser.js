import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function useUser(passedID) {

    const [isLoading, setLoading] = useState(true);
    const [isUser, setIsUser] = useState(false);
    const session = useSession();
    const supabase = useSupabaseClient();


    let [avatarUrl, setAvatarUrl] = useState('/default-profile-picture.jpg');
    let [username, setUsername] = useState('');
    let [loggedInUserID, setLoggedInUserID] = useState(null);
    let [bio, setBio] = useState('');
    let [contactInformation, setContactInformation] = useState('');
    let [users, setUsers] = useState([]);
    const [threads, setThreads] = useState([]);

    async function getProfile(userID) {
        setLoading(true)
        let { data, error, status } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userID)
            .single();

        if (data) {
            setIsUser(true);
            if (data.avatar_url) setAvatarUrl(data.avatar_url);
            if (data.username) setUsername(data.username);
            if (data.bio) setBio(data.bio);
            if (data.contactInformation) setContactInformation(data.contactInformation);

        }
        setLoading(false);
    }

    async function getAllProfiles()
    {
        setLoading(true)
        let { data, error, status } = await supabase
            .from('profiles')
            .select('*')

        if (data) {
            setUsers(data);
        }
        setLoading(false);
    }

    async function updateProfile() {

        setLoading(true);
        const { data, error } = await supabase
            .from('profiles')
            .update({ username: username, bio: bio, contactInformation: contactInformation })
            .match({ id: session.user.id });

        setLoading(false);
    }



    async function updateUserAvatarURL(filePath, userID) {
        let baseURL = "https://nyegfnougzjfcvzvpymb.supabase.co/storage/v1/object/public/avatars"
        let url = `${baseURL}/${filePath}?query=${Math.random()}`;
        const { data, error } = await supabase
            .from('profiles')
            .update({ avatar_url: url })
            .match({ id: userID });

        setAvatarUrl(url);
    }




    async function uploadAvatar(event) {
        if (!session) return;
        setLoading(true);
        if (!event.target.files || event.target.files.length === 0) return;

        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        const fileName = `${session.user.id}.${fileExt}`
        const filePath = `${fileName}`

        let { data, error } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, { upsert: true });


        await updateUserAvatarURL(filePath, session.user.id);
        setLoading(false);

    }

    async function getAllThreadsOfUser() {
        let { data, error, status } = await supabase
            .from('threads')
            .select('*')
            .or(`creatorID.eq.${session.user.id},memberID.eq.${session.user.id}`)
        setThreads(data);
        return data;
    }

    useEffect(()=>{
        if(session) getAllThreadsOfUser();
    }, [session])

    useEffect(() => {
        setLoading(false);
        if (!session) return;
        if(session.user.id) setLoggedInUserID(session.user.id);
        else setLoggedInUserID(null);
        let userID = passedID ? passedID : session.user.id;
        getProfile(userID);
        getAllProfiles();
    }, [session])




    return {
        setLoading,
        isLoading,
        isUser,
        loggedInUserID,

        uploadAvatar,
        avatarUrl,

        username,
        setUsername,

        bio,
        setBio,

        contactInformation,
        setContactInformation,

        updateProfile,
        users,
        
        threads

    };
}