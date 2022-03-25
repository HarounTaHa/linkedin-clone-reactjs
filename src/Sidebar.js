import './Sidebar.css'
import {Avatar} from "@mui/material";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";

export default function Sidebar() {
    const user = useSelector(selectUser)
    const recentItem = (topic)=>(
        <div className='sidebar-recent-item'>
            <span className="sidebar-hash">#</span>
            <p>{topic}</p>
        </div>
    )
    return (

        <div className='sidebar'>
            <div className="sidebar-top">
                <img
src='https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=872&q=80'
                    alt=""/>
                <Avatar src={user.photoUrl} className='sidebar-avatar'>{user.email[0]}</Avatar>
                <h2>{user.displayName}</h2>
                <h4>{user.email}</h4>
            </div>
            <div className="sidebar-stats">
                <div className="sidebar-stat">
                    <p>Who viewed you</p>
                    <p className="sidebar-stat-number">
                        2,543
                    </p>
                </div>
                <div className="sidebar-stat">
                    <p>Views On Posts</p>
                    <p className="sidebar-stat-number">
                        2,446
                    </p>
                </div>
            </div>

            <div className="sidebar-bottom">
                <p>
                    Recent
                </p>
                {recentItem('reactJs')}
                {recentItem('programming')}
                {recentItem('software engineering')}
                {recentItem('developer')}

            </div>
        </div>
    )
}