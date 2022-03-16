import './Feed.css'
import {Create, Image, Subscriptions, EventNote, CalendarViewDay} from '@mui/icons-material';
import InputOption from "./InputOption";
import Post from "./Post";
import {useState} from "react";

export default function Feed() {
    const [posts, setPosts] = useState([])
    const sendPost = e => {
        e.preventDefault()

    };
    return (
        <div className='feed'>
            <div className='feed-input-container'>
                <div className='feed-input'>
                    <Create/>
                    <form>
                        <input placeholder='start a post' type="text"/>
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
            {posts.map((post) => (
                <Post/>
            ))}
            <Post name='Haroun Taha' description='dssdsdsdsd' message='I love you'
                  photoUrl='https://yt3.ggpht.com/l7v-zBFR0tjtrs6B_S7r0pL_h7bgNO60f-n6CSj0WWozdynwTwz_7AwnkCipgkBTh5IpC44Ttw=s88-c-k-c0x00ffffff-no-rj-mo'/>
        </div>)
}