import './Feed.css'
import {Create, Image, Subscriptions, EventNote, CalendarViewDay} from '@mui/icons-material';
import InputOption from "./InputOption";
import Post from "./Post";
import {useEffect, useState} from "react";
import {db} from "./firebase";
import {serverTimestamp} from 'firebase/firestore'
import {onSnapshot, collection, query, addDoc,orderBy} from "firebase/firestore";

export default function Feed() {
    const [input, setInput] = useState('')
    const [posts, setPosts] = useState([])
    const colRef = collection(db, "posts")

    useEffect(() => {

        onSnapshot(query(colRef,orderBy('timestamp','desc')), (querySnapshot) => {
            setPosts(querySnapshot.docs.map(d => ({
                    id: d.id,
                    data: d.data()
                }))
            )
        });
    }, [])
    const sendPost = e => {
        e.preventDefault()
        addDoc(colRef, {
            name: 'Haroun Taha',
            description: 'this is a test',
            message: input,
            photoUrl: 'https://yt3.ggpht.com/l7v-zBFR0tjtrs6B_S7r0pL_h7bgNO60f-n6CSj0WWozdynwTwz_7AwnkCipgkBTh5IpC44Ttw=s88-c-k-c0x00ffffff-no-rj-mo',
            timestamp: serverTimestamp()
        })

    };
    return (
        <div className='feed'>
            <div className='feed-input-container'>
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
                <div className="feed-input-option">
                    <InputOption Icon={Image} title='Photo' color='#70B5F9'/>
                    <InputOption Icon={Subscriptions} title='Video' color='#E7A33E'/>
                    <InputOption Icon={EventNote} title='Event' color='#C0CBCD'/>
                    <InputOption Icon={CalendarViewDay} title='Write article' color='#7FC15E'/>

                </div>
            </div>
            {posts.map(({id, data: {name, description, message, photoUrl}}) => (
                <Post key={id} name={name} description={description} message={message}
                      photoUrl={photoUrl}/>
            ))}

        </div>)
}