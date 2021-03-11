import Navbar from '../components/navbar'
import { useState, useEffect } from 'react'
import Landing from '../components/landing'
import MakePost from '../components/makepost'
import firebase from '../firebase/firebase-config'

export default function usermain() {
    // react hook to keep track of login status of user
    const [isSignedIn, setIsSignedIn] = useState(false);

    // react hooks to keep track of the loggedin user's info
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [googleId, setGoogleId] = useState("")

    //react hook to track firebase authentication
    const [user, setUser] = useState(null)

    // react hook to keep track of posts
    const [posts, setPosts] = useState([])

    function renderPosts() {
        let contents = []
        firebase.firestore().collection("posts").get()
            .then((querySnapShot) => querySnapShot.docs.map(doc => posts.push(doc.data()["content"])))
        return contents
    }

    useEffect(() => renderPosts(), [])

    const containerStyleString = "h-screen w-screen" + (isSignedIn ? " grid grid-rows-5" : "");
    return <div className={containerStyleString}>
        <Navbar isLanding={false} isSignedIn={isSignedIn} setSignedIn={setIsSignedIn}/>
        {!isSignedIn ?
            <Landing 
                isSignedIn={isSignedIn} 
                setSignedIn={setIsSignedIn}
                setSignedIn={setIsSignedIn}
                setName={setName}
                setEmail={setEmail}
                setGoogleId={setGoogleId}
                setUser={setUser} />
            :
            <div className='row-start-2 m-auto font-extrabold text-4xl'> 
                Google Login Successful: User Main Page To Do 
                <div>{posts.map(s => <p>{s}</p>)}</div>
                <MakePost />
            </div>
        }
    </div>
}