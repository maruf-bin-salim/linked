import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

export default function useUser(passedID) {

    const [isLoading, setLoading] = useState(true);
    const [isUser, setIsUser] = useState(false);
    const session = useSession();
    const supabase = useSupabaseClient();

    let [avatarUrl, setAvatarUrl] = useState('/default-profile-picture.jpg');
    let [username, setUsername] = useState('');
    let [bio, setBio] = useState('');
    let [contactInformation, setContactInformation] = useState('');

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
            if(data.contactInformation) setContactInformation(data.contactInformation);

        }
        setLoading(false);
    }

    async function updateProfile()
    {
        console.log(username, bio, contactInformation);
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

    useEffect(() => {
        setLoading(false);
        if (!session) return;
        let userID = passedID ? passedID : session.user.id;
        getProfile(userID);
    }, [session])



    return {
        isLoading,
        isUser,

        uploadAvatar,
        avatarUrl,

        username,
        setUsername,

        bio,
        setBio,

        contactInformation,
        setContactInformation,

        updateProfile,

    };
}