import './HeaderOption.css'
import {Avatar} from "@mui/material";
import {useSelector} from "react-redux";
import {selectUser} from "./features/userSlice";


export default function HeaderOption({avatar, title, Icon, onClick}){
    const user = useSelector(selectUser)

    return (
        <div onClick={onClick} className='header-option'>
            {Icon &&  <Icon className='header-option-icon' /> }
            {avatar && (<Avatar  className='header-option-icon' >{user?.email[0]}</Avatar>) }
            <h3 className='header-option-title'>{title}</h3>
        </div>
    )
}