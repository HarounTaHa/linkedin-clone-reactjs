import { Search,Home,SupervisorAccount,BusinessCenter,Chat,Notifications } from '@mui/icons-material';
import './Header.css'
import HeaderOption from "./HeaderOption";
export default function Header(){

    return(
        <div className='header'>
            <div className="header-left">
                <img src="https://content.linkedin.com/content/dam/me/business/en-us/amp/brand-site/v2/bg/LI-Bug.svg.original.svg" alt="logo"/>
                <div className="header-search">
                 <Search />
                    <input type="text" placeholder='Search'/>
                </div>
            </div>

            <div className="header-right">
                <HeaderOption Icon={Home} title='Home' />
                <HeaderOption  Icon={SupervisorAccount} title='My Network' />
                <HeaderOption  Icon={BusinessCenter} title='Jobs' />
                <HeaderOption  Icon={Chat} title='Messaging' />
                <HeaderOption  Icon={Notifications} title='Notifications' />
                <HeaderOption  avatar='https://yt3.ggpht.com/l7v-zBFR0tjtrs6B_S7r0pL_h7bgNO60f-n6CSj0WWozdynwTwz_7AwnkCipgkBTh5IpC44Ttw=s88-c-k-c0x00ffffff-no-rj-mo' title='Me' />
            </div>
    </div>
    )

}