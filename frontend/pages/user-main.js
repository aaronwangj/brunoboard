import Navbar from '../components/navbar'
import { useState, useEffect } from 'react'
import Landing from '../components/landing'
import MakePost from '../components/makepost'
import firebase from '../firebase/firebase-config'
import Postfeed from '../components/postfeed'

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

    // react hook to handle updates of the data/rendering
    const [requestCount, setRequestCount] = useState(0)

    function updatePosts() {
        if (user && isSignedIn) {
            // TODO: Add in a loading screen
            // request posts from firebase and update the <posts> hook
            firebase.firestore().collection("posts").get()
                .then((querySnapShot) => {
                    setPosts(querySnapShot.docs.map(doc => doc.data()))
                })
        }
    }

    // initialize post feed on sign-in
    // whenever requestCount is changed, the posts are updated
    useEffect(() => updatePosts(), [requestCount])
    const update = () => setRequestCount(requestCount + 1)

    const containerStyleString = "h-screen w-screen"
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
            <Postfeed posts={posts} update={update} />
        }
    </div>
}