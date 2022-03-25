import './Login.css'
import './firebase'
import {auth} from "./firebase";
import {createUserWithEmailAndPassword,updateProfile,signInWithEmailAndPassword} from 'firebase/auth'
import {useState} from "react";
import {useDispatch} from "react-redux";
import {login} from "./features/userSlice";

export default function Login() {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')
    const [profilePic, setProfilePic] = useState('')
    const dispatch = useDispatch()

    const loginToApp = (e) => {
        e.preventDefault()
        signInWithEmailAndPassword(auth,email,password).then(userAuth=>{
            dispatch(login({
                email: userAuth.user.email,
                uid: userAuth.user.uid,
                displayName: userAuth.user.displayName,
                photoUrl: userAuth.user.photoURL,
            }))
        }).catch(e=>alert(e))

    }
    const register = () => {
        if (!name && !password && !email) {
            return alert('Please enter a full name !')
        }
        createUserWithEmailAndPassword(auth, email, password).then((userAuth) => {
            console.log(userAuth)
           updateProfile(userAuth.user,{
                displayName: name,
                photoURL: profilePic
            }).then(() => {
                dispatch(login({
                    email: userAuth.user.email,
                    uid: userAuth.user.uid,
                    displayName: name,
                    photoUrl: profilePic
                }))
            })
        }).catch((error)=> alert(error) )
    }
    return (
        <div className='login'>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="linkedin-logo"/>
            <form onSubmit={loginToApp}>
                <input value={name} onChange={(e) => setName(e.target.value)}
                       placeholder='Full name (required if registration)' type="text"/>
                <input value={profilePic} onChange={(e) => setProfilePic(e.target.value)}
                       placeholder='Profile pic URL (Optional)' type="text"/>
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email' type='email'/>
                <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password'
                       type='password'/>
                <button type='submit'>Sign In</button>
            </form>
            <p>
                Not a member? {" "}
                <span className='login-register' onClick={register}>
                    Register Now
                </span>
            </p>
        </div>

    )
}