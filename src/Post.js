import './Post.css'
import {forwardRef} from 'react'
import {Avatar} from "@mui/material";
import InputOption from "./InputOption";
import {ChatOutlined, ShareOutlined, SendOutlined, ThumbUpAltOutlined, Delete} from "@mui/icons-material";
import {selectUser} from "./features/userSlice";
import {useSelector} from "react-redux";


const Post = forwardRef(({postID,userID, name, description, message, photoUrl,photoPost}, ref) => {
    const user = useSelector(selectUser)
    return (
        <div ref={ref} className='post'>
            <div className='post-header'>
                <Avatar src={photoUrl}>{name?name[0]:''}</Avatar>
                <div className="post-info">
                    <h2>
                        {name}
                    </h2>
                    <p>
                        {description}
                    </p>
                </div>

            </div>
            <div className="post-body">
                <p style={{marginLeft:20}}>
                    {message}
                </p>
                {photoPost && <div className='center-image'><img style={{marginTop:20}} width={500} height={400} src={photoPost} alt=''/></div>}
            </div>
            <div className="post-buttons">
                <InputOption  title='Like' color='gray' Icon={ThumbUpAltOutlined}/>
                <InputOption title='Comment' color='gray' Icon={ChatOutlined}/>
                <InputOption title='Share' color='gray' Icon={ShareOutlined}/>
                <InputOption title='Send' color='gray' Icon={SendOutlined}/>
                {user.uid === userID ? ( <InputOption postId={postID} title='Delete' color='gray' Icon={Delete}/>) : ''}
            </div>
        </div>
    )
})

export default Post;