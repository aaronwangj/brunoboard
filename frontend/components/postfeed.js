import MakePost from './makepost'
import { useState, useEffect } from 'react'
import Post from './post'
import InfiniteScroll from 'react-infinite-scroll-component'
import firebase from '../firebase/firebase-config'

export default function Postfeed(props) {
    useEffect(() => fetchNext(), [])

    // react hook to keep track of the last doc fetched
    const [lastDocDate, setLastDocDate] = useState(null)

    const [hasNext, setHasNext] = useState(true)

    const BATCH_NUM = 4
    function fetchNext() {
        // if (user) {
            if (lastDocDate) {
                firebase.firestore().collection("posts")
                    .orderBy("createdAt", "desc").startAt(lastDocDate).limit(BATCH_NUM).get()
                    .then((querySnapShot) => {
                        props.setPosts(props.posts.concat(querySnapShot.docs.map(doc => doc.data()).slice(1)))
                        setLastDocDate(querySnapShot.docs[querySnapShot.docs.length - 1].data()["createdAt"])
                        if (querySnapShot.docs.length < BATCH_NUM) setHasNext(false)
                    })
                    // .catch(error => console.log(error))
            } else {
                firebase.firestore().collection("posts")
                    .orderBy("createdAt", "desc").limit(BATCH_NUM).get()
                    .then((querySnapShot) => {
                        props.setPosts(querySnapShot.docs.map(doc => doc.data()))
                        setLastDocDate(querySnapShot.docs[querySnapShot.docs.length - 1].data()["createdAt"])
                        if (querySnapShot.docs.length < BATCH_NUM) setHasNext(false)
                    })
                    // .catch(error => console.log(error))
            }
        // }
    }

    return <div id="postfeed" className="w-full flex justify-center">
                <div className="mt-20 w-full">
                    <h1 className="italic font-bold text-lg">FEED</h1>
                    {/* <ul>
                        {props.posts.map(docData => <Post key={docData["id"]} docData={docData}/>)}
                    </ul> */}
                    <InfiniteScroll 
                        dataLength={props.posts.length}
                        next={() => fetchNext()}
                        hasMore={hasNext}
                        loader={<h4>Loading ...</h4>}
                    >
                        {props.posts.map(docData => <Post key={props.posts.indexOf(docData)} docData={docData}/>)}
                    </InfiniteScroll>
                    {/* <button id="update-user-main" onClick={() => props.update()}>Refresh</button> */}
                </div>
            </div>

}