import { useEffect, useState } from 'react';
import styles from '../styles/post-writer.module.css';
import { POST_TYPES } from '../utils/types';
import generateRandomID from '../utils/generateRandomID';
import { useSupabaseClient } from '@supabase/auth-helpers-react';


export default function PostWriter({ setLoading }) {

    const supabase = useSupabaseClient();

    const [currentPostType, setCurrentPostType] = useState(POST_TYPES.MARKETPLACE);
    const [postID, setPostID] = useState(null);
    const [source1, setSource1] = useState(null);
    const [source2, setSource2] = useState(null);
    const [source3, setSource3] = useState(null);



    function toggleCurrentPostType() {
        (currentPostType === POST_TYPES.MARKETPLACE) ? setCurrentPostType(POST_TYPES.SHARE) : setCurrentPostType(POST_TYPES.MARKETPLACE);
    }

    function getWriterTitle() {
        return (currentPostType === POST_TYPES.MARKETPLACE) ? "Add a post in the marketplace ..." : "Add a post in the share feed ...";
    }

    function getButtonTitle() {
        return (currentPostType === POST_TYPES.MARKETPLACE) ? "marketplace" : "share feed";
    }

    function getDescription() {
        return (currentPostType === POST_TYPES.MARKETPLACE) ? "Add product Description and upto 3 images ..." : "Add Description and relevant links";

    }

    useEffect(() => {
        setPostID(generateRandomID('post'));
    }, [])



    async function updateImage(event, index) {
        if (!event.target.files || event.target.files.length === 0 || !postID) return;
        const file = event.target.files[0]
        const fileExt = file.name.split('.').pop()
        // const fileName = `${postID}_${index}.${fileExt}`
        const fileName = `${postID}_${index}`
        const filePath = `${fileName}`

        const { data, error } = await supabase.storage
            .from('post-images')
            .upload(filePath, file);

        let baseURL = "https://nyegfnougzjfcvzvpymb.supabase.co/storage/v1/object/public/post-images"
        let url = `${baseURL}/${filePath}?query=${Math.random()}`;

        (index === 1) && setSource1(url);
        (index === 2) && setSource2(url);
        (index === 3) && setSource3(url);
    }

    async function deleteImage(index) {
        await supabase
            .storage
            .from('post-images')
            .remove([`${postID}_${index}`]);

        (index === 1) && setSource1(null);
        (index === 2) && setSource2(null);
        (index === 3) && setSource3(null);
    }

    return (
        <div className={styles.PostWriter}>
            <div className={styles.writer}>
                <div className={styles.top}>
                    <p>{getWriterTitle()}</p>
                    <button onClick={toggleCurrentPostType}>{getButtonTitle()}</button>
                </div>
                <p className={styles.title}>{getDescription()}</p>
                <textarea className={`${(currentPostType === POST_TYPES.MARKETPLACE) ? styles.none : styles.shareArea}`} spellCheck="false" cols={5} rows={5}></textarea>

                {/* image holder for marketplace */}
                {
                    (currentPostType === POST_TYPES.MARKETPLACE) &&
                    <div className={styles.selectedImage}>
                        <div>
                            <img src={source1}></img>
                            <button onClick={() => { deleteImage(1) }}></button>
                            <label className={styles.customFileInput}>
                                <input
                                    type="file"
                                    id="single"
                                    accept="image/*"
                                    onChange={async (event) => { updateImage(event, 1) }}
                                />
                            </label>
                        </div>

                        <div>
                            <img src={source2}></img>
                            <button onClick={() => { deleteImage(1) }}></button>
                            <label className={styles.customFileInput}>
                                <input
                                    type="file"
                                    id="single"
                                    accept="image/*"
                                    onChange={async (event) => { updateImage(event, 2) }}
                                />
                            </label>
                        </div>

                        <div>
                            <img src={source3}></img>
                            <button onClick={() => { deleteImage(1) }}></button>
                            <label className={styles.customFileInput}>
                                <input
                                    type="file"
                                    id="single"
                                    accept="image/*"
                                    onChange={async (event) => { updateImage(event, 3) }}
                                />
                            </label>
                        </div>

                    </div>
                }
                {/* post button */}
                <div className={styles.postButtonHolder}>
                    <button className={styles.post}>Post</button>
                </div>
            </div>
        </div>
    )
}