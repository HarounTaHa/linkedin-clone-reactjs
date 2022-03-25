import {Search, Home, SupervisorAccount, BusinessCenter, Chat, Notifications} from '@mui/icons-material';
import './Header.css'
import HeaderOption from "./HeaderOption";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "./features/userSlice";
import {auth} from "./firebase";
import {signOut} from 'firebase/auth'

export default function Header() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const logoutOfApp = () => {
        dispatch(logout())
        signOut(auth)
    }
    return (
        <div className='header'>
            <div className="header-left">
                <img
                    src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg"
                    alt="logo"/>
                <div className="header-search">
                    <Search/>
                    <input type="text" placeholder='Search'/>
                </div>
            </div>

            <div className="header-right">
                <HeaderOption Icon={Home} title='Home'/>
                <HeaderOption Icon={SupervisorAccount} title='My Network'/>
                <HeaderOption Icon={BusinessCenter} title='Jobs'/>
                <HeaderOption Icon={Chat} title='Messaging'/>
                <HeaderOption Icon={Notifications} title='Notifications'/>
                <HeaderOption
                    onClick={logoutOfApp}
                    avatar={true}
                    title={user ?user.displayName:''}/>
            </div>
        </div>
    )

}