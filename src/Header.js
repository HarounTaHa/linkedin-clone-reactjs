import {
    Search,
    Home,
    SupervisorAccount,
    BusinessCenter,
    Chat,
    Notifications,
    Logout,
    PersonOutline
} from '@mui/icons-material';
import './Header.css'
import HeaderOption from "./HeaderOption";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "./features/userSlice";
import {nullValue, searchValue} from "./features/postSlice";
import {auth} from "./firebase";
import {signOut} from 'firebase/auth'
import {useState} from "react";
import {Avatar} from "@mui/material";
import {Link} from "react-router-dom";
import {useNavigate} from 'react-router-dom'

export default function Header() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [isDropdownOpend, setDropdownOpen] = useState(false);
    const list = ['My Profile', 'Sign out']
    const [valueSearch, setValueSearch] = useState('')
    const toggleDropDown = () => setDropdownOpen(!isDropdownOpend)
    const route = useNavigate()

    const logoutOfApp = () => {
        dispatch(logout())
        signOut(auth)
        setDropdownOpen(!isDropdownOpend)
    }

    function renderSwitch(param) {
        switch (param) {
            case 'My Profile':
                return (<li>< PersonOutline className='icon-menu'/><Link style={{textDecoration: "none",}}
                                                                         to='/profile'>{param}</Link></li>)
            case 'Sign out':
                return (<li><Logout className='icon-menu'/><a onClick={logoutOfApp}>{param}</a></li>)

        }
    }

    const DropdwonList = () => (
        <div className='drop-menu'>
            <div className='head-menu'>
                <Avatar src={user.photoUrl}>{user.displayName ? user.displayName[0] : ''}</Avatar>
                <h3>
                    {user ? user.displayName : 'None'}
                    <br/>
                    <span>
                    {user.email}
                </span>
                </h3>

            </div>


            <ul>
                {list.map((item) => (

                        renderSwitch(item)
                    )
                )}
            </ul>
        </div>
    )

    const postSearch = (value) => {
        dispatch(searchValue({vlaue: value}))
    }


    return (
        <>
            <div className='header'>
                <div className="header-left">
                    <img
                        src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                        alt="logo"/>
                    <div className="header-search">
                        <Search/>
                        <input value={valueSearch} onChange={e => {
                            setValueSearch(e.target.value)
                            if (e.target.value) {
                                postSearch(e.target.value)
                            } else {
                                dispatch(nullValue())
                            }
                        }} type="text" placeholder='Search'/>
                    </div>
                </div>

                <div className="header-right">

                    <HeaderOption onClick={() => route('/')} Icon={Home} title='Home'/>
                    <HeaderOption Icon={SupervisorAccount} title='My Network'/>
                    <HeaderOption Icon={BusinessCenter} title='Jobs'/>
                    <HeaderOption Icon={Chat} title='Messaging'/>
                    <HeaderOption Icon={Notifications} title='Notifications'/>
                    <div className='profile'>
                        <HeaderOption
                            onClick={toggleDropDown}
                            avatar={true}
                            title={user ? user.displayName : ''}/>
                    </div>
                    {isDropdownOpend ? DropdwonList() : false}
                </div>
            </div>
        </>
    )

}