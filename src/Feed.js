import './Feed.css'
import {Create, Image, Subscriptions, EventNote, CalendarViewDay} from '@mui/icons-material';
import InputOption from "./InputOption";
import Post from "./Post";
import {useEffect, useRef, useState} from "react";
import {db, storage} from "./firebase";
import {serverTimestamp} from 'firebase/firestore'
import {onSnapshot, collection, query, addDoc, orderBy, startAt, endAt, getDocs} from "firebase/firestore";
import {useDispatch, useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";
import {selectPost} from "./features/postSlice";
import FlipMove from "react-flip-move";
import {nullValue, photoValue, selectPostPhoto} from "./features/postPhotoSlice";
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import {ProgressBar} from "react-bootstrap";


export default function Feed() {
    const user = useSelector(selectUser)
    const postValue = useSelector(selectPost)
    const postPhotoValue = useSelector(selectPostPhoto)
    const inputFile = useRef(null)
    const [urlPhoto, setUrlPhoto] = useState()
    const [progress, setProgress] = useState(0)
    const dispatch = useDispatch()
    const [input, setInput] = useState('')
    const [posts, setPosts] = useState([])
    const [postsSearch, setPostsSearch] = useState([])
    const colRef = collection(db, "posts")

    useEffect(() => {

        onSnapshot(query(collection(db, "posts"), orderBy('timestamp', 'desc')), (querySnapshot) => {
            setPosts(querySnapshot.docs.map(d => ({
                    id: d.id,
                    data: d.data()
                }
            )))

        });


    }, [])

    useEffect(() => {
        if (postValue) {
            console.log(postValue.vlaue)
            getDocs(query(collection(db, "posts"), orderBy('message'), startAt(postValue.vlaue), endAt(postValue.vlaue + "\uf8ff")))
                .then((dataSnapshot) => {
                    console.log(dataSnapshot.docs)
                    setPostsSearch(dataSnapshot.docs.map((doc) => (
                                {
                                    id: doc.id,
                                    data: doc.data()
                                }
                            )
                        )
                    )

                })
            if (postValue) {
                console.log(postsSearch)
            } else {
                setPostsSearch([])
            }
        }
    }, [postValue])

    useEffect(() => {
        dispatch(photoValue({
            urlPhoto: urlPhoto
        }))
    }, [urlPhoto])

    const sendPost = e => {
        e.preventDefault()
        addDoc(colRef, {
            name: user.displayName,
            description: user.email,
            message: input,
            user: user.uid,
            photoUrl: user.photoUrl || "",
            photoPost: postPhotoValue.urlPhoto || "",
            timestamp: serverTimestamp()
        })
        setInput('')
        setUrlPhoto(null)
    };

    const changeHandler = (file) => {
        if (!file) return;
        const get_photo = file.target.files[0]
        console.log(get_photo)
        const storageRef = ref(storage, `/files/${get_photo.name}`)
        const uploadTask = uploadBytesResumable(storageRef, get_photo)
        uploadTask.on('state_changed', (snapshot) => {
                const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                setProgress(prog)
            }, (err) => {
                console.log(err)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(url => {
                    setProgress(0)
                    setUrlPhoto(url)
                })
            }
        )
    }

    function removeImage() {
        setUrlPhoto(null)
        dispatch(nullValue())
    }

    return (
        <div className='feed'>
            <div className='feed-input-container'>
                <div className='feed-input-image'>
                    <div className='feed-input'>
                        <Create/>
                        <form>
                            <input value={input} onChange={e => setInput(e.target.value)} placeholder='start a post'
                                   type="text"/>
                            <button type='submit' onClick={sendPost}>
                                Send
                            </button>
                        </form>

                    </div>

                    {
                        urlPhoto && (<div className='image-post' onClick={removeImage}>
                                <img width={70} height={50} src={urlPhoto} alt=''/>
                                <p style={{fontSize: '13px'}}>Click Remove</p>
                            </div>
                        )
                    }

                </div>
                <div className="feed-input-option">
                    <div onClick={() => inputFile.current.click()}>
                        <InputOption Icon={Image} title='Photo' color='#70B5F9'/>
                        <input type='file' id='file' onChange={changeHandler} ref={inputFile}
                               hidden={true}/>
                    </div>
                    <InputOption Icon={Subscriptions} title='Video' color='#E7A33E'/>
                    <InputOption Icon={EventNote} title='Event' color='#C0CBCD'/>
                    <InputOption Icon={CalendarViewDay} title='Write article' color='#7FC15E'/>

                </div>
                {progress !== 0 ? <ProgressBar now={progress} label={`${progress}%`}/> : ''}
            </div>

            <FlipMove>
                {
                    postValue ? postsSearch.map(({
                                                     id,
                                                     data: {user, name, description, message, photoUrl, photoPost}
                                                 }) => (
                            <Post key={id} postID={id} userID={user ? user : null} name={name} description={description}
                                  message={message}
                                  photoUrl={photoUrl}
                                  photoPost={photoPost}
                            />
                        )) :
                        posts.map(({id, data: {user, name, description, message, photoUrl, photoPost}}) => (
                            <Post key={id} postID={id} userID={user ? user : null} name={name} description={description}
                                  message={message}
                                  photoUrl={photoUrl}
                                  photoPost={photoPost}/>
                        ))
                }
            </FlipMove>

        </div>)
}