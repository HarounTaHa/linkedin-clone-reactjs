import Header from "./Header";
import LoadingPage from "./LoadingPage";
import Login from "./Login";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login, logout, selectUser} from "./features/userSlice";
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";

export default function Home() {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        onAuthStateChanged(auth, (userAuth) => {
            if (userAuth) {
                dispatch(login({
                    email: userAuth.email,
                    uid: userAuth.uid,
                    displayName: userAuth.displayName,
                    photoUrl: userAuth.photoURL
                }))
                setTimeout(() => {
                    setLoading(false)
                }, 2000)

            } else {
                dispatch(logout())
                setTimeout(() => {
                    setLoading(false)
                }, 2000)

            }
        })
    }, [])
    return (
        <div className="app">
            {(!loading && user) && <Header/>}
            {
                loading ? <LoadingPage loading={loading}/> :
                    !user ? <Login/> : (
                        <div className="app-body">
                            <Sidebar/>
                            <Feed/>
                            <Widgets/>
                        </div>
                    )

            }

        </div>
    )
}