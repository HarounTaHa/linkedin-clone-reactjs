import './Post.css'
import {forwardRef} from 'react'
import {Avatar} from "@mui/material";
import InputOption from "./InputOption";
import {ChatOutlined, ShareOutlined, SendOutlined, ThumbUpAltOutlined} from "@mui/icons-material";


const Post = forwardRef(({name, description, message, photoUrl},ref) => {
    return (
        <div ref={ref} className='post'>
            <div className='post-header'>
                <Avatar src={photoUrl}>{name[0]}</Avatar>
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
                <p>
                    {message}
                </p>
            </div>
            <div className="post-buttons">
                <InputOption title='Like' color='gray' Icon={ThumbUpAltOutlined}/>
                <InputOption title='Comment' color='gray' Icon={ChatOutlined}/>
                <InputOption title='Share' color='gray' Icon={ShareOutlined}/>
                <InputOption title='Send' color='gray' Icon={SendOutlined}/>

            </div>
        </div>
    )
})

export default Post;