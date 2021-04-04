import Navbar from '../components/navbar'
import { useState, useEffect } from 'react'
import Landing from '../components/landing'
import MakePost from '../components/makepost'
import firebase from '../firebase/firebase-config'
import Postfeed from '../components/postfeed'
import Welcome from '../components/welcome'

export default function usermain() {
    // react hook to keep track of login status of user
    const [isSignedIn, setIsSignedIn] = useState(false);

    // react hooks to keep track of the loggedin user's info
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [googleId, setGoogleId] = useState("")

    //react hook to track firebase authentication
    const [user, setUser] = useState(null)

    // react hook to handle updates of the data/rendering
    const [requestCount, setRequestCount] = useState(0)

    // react hook to keep track of posts
    const [posts, setPosts] = useState([])

    const [isFirstTimer, setIsFirstTimer] = useState(null)
    // check if the user is new to the site
    function checkIfFirstTimer() {
        const userDocRef = firebase.firestore().collection("testing-users").doc(user.uid)
        userDocRef.get()
            .then(snapshot => {
                if (snapshot.data()) {
                    setIsFirstTimer(false)
                } else {
                    setIsFirstTimer(true)
                }
            })
    }

    useEffect(() => {
        if (isSignedIn && user) {
            checkIfFirstTimer()
        }
    }, [isSignedIn, user])

    useEffect(() => {
        console.log(isFirstTimer)
    }, [isFirstTimer])



    // function updatePosts() {
    //     if (user && isSignedIn) {
    //         // TODO: Add in a loading screen
    //         // request posts from firebase and update the <posts> hook
    //         firebase.firestore().collection("posts").orderBy("createdAt", "desc").get()
    //             .then((querySnapShot) => {
    //                 setPosts(querySnapShot.docs.map(doc => doc.data()))
    //             })
    //     }
    // }

    // whenever requestCount is changed, the posts are updated
    // useEffect(() => updatePosts(), [requestCount])
    const update = () => setRequestCount(requestCount + 1)

    /*
        TODO: IMPLEMENT SORTING FEATURE BY DATE AS WELL AS AMOUNT OF UPVOTES
        TODO: IMPLEMENT FILTERING FEATURE BY NAME (AND TAG MAYBE)
        TODO: IMPLEMENT HOVERING NAMES DISPLAYING EMAIL
        TODO: IMPLEMENT REQUEST CONTACT INFORMATION FOR ANONYMOUS USERS
    */
    const containerStyleString = "p-2 h-screen w-screen flex justify-center"
    return <div id="usermain-container" className={containerStyleString}>
        <Navbar isLanding={false} isSignedIn={isSignedIn} setSignedIn={setIsSignedIn} />
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
            (isFirstTimer ?
                <div id="welcome-wrapper">
                    <Welcome user={user} setIsFirstTimer={setIsFirstTimer} />
                </div>
                :
                <div id="user-main-share-feed" className="mt-5 w-full lg:w-1/3 p-2">
                    <MakePost update={update} user={user} posts={posts} setPosts={setPosts} />
                    <Postfeed setPosts={setPosts} posts={posts} user={user} isNested={false} />
                </div>
            )
        }
    </div>
}