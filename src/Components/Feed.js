import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { database } from '../firebase'
import UploadFile from './UploadFile'
import Posts from './Posts'
import Navbar from './Navbar'

export default function Feed() {
    const { user, logout } = useContext(AuthContext)
    const [userData, setUserData] = useState('')

    useEffect(() => {
        const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
            setUserData(snapshot.data())
        })
        return () => {unsub()}
    }, [user])
    console.log(userData)

    return (

        <>
        <Navbar userData = {userData}/>
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}}>
            <UploadFile user = {userData}/>
            <Posts userData = {userData} />
        </div>
        </>
    )
}
