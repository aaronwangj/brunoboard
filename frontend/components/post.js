import firebase from '../firebase/firebase-config'
import { useState, useEffect } from 'react'
import CommentSection from './commentSection'

export default function Post(props) {
    const user = props.user
    const docId = props.docData.id
    // const [upvotes, setUpvotes] = useState(props.docData["upvotes"])
    const [userHasLiked, setUserHasLiked] = useState(false)

    useEffect(() => updateLikedState(), [])

    const updateLikedState = () => {
        const thisDocRef = firebase.firestore().collection("testing-posts").doc(docId)
        thisDocRef.get().then(snapShot => {
            if(snapShot.get('upvoters')) setUserHasLiked(snapShot.get('upvoters').includes(user.uid))
        })
    }

    const handleUpvoteClick = () => {
        if (user) {
            const thisDocRef = firebase.firestore().collection("testing-posts").doc(docId)
            thisDocRef.update({upvotes: firebase.firestore.FieldValue.increment(1)})
                // .then(setUpvotes(i => i + 1))
            thisDocRef.update({upvoters: firebase.firestore.FieldValue.arrayUnion(user.uid)})
            setUserHasLiked(true)
        }
    }
    const handleCommentClick = () => {
        const thisCommentSection = document.getElementById(docIdToId(docId))
        if (thisCommentSection.style.height === "0px") {
            thisCommentSection.style.height = "auto"
            thisCommentSection.style.display = "block"
        }
        else { 
            thisCommentSection.style.height = "0px"
            thisCommentSection.style.overflow = "hidden"
            thisCommentSection.style.display = "none"
        }
        return
    }

    const upvoteButtonClassString = `inline w-full border rounded-md border-green-400 
                        text-center pt-1 focus:bg-green-400 focus:outline-none`
    const docIdToId = (docId) => docId + "-comment-section"
    return <li className="block mb-3" key={props.docKey}>
                <div className="shadow-lg font-display p-2 rounded-lg border-2 
                                border-gray-300 hover:border-gray-600 transition-colors">
                    <h1 className="mb-2 font-bold">
                        {props.docData["anonymous"] ? "Anonymous" : props.docData["name"]}<br></br>
                    </h1>
                    <p style={{overflowWrap: "break-word"}} className="mb-3">{props.docData["content"]}</p>
                    <div className="post-buttons w-full font-bold">
                        {!userHasLiked ? <button 
                            onClick={handleUpvoteClick}
                            className={upvoteButtonClassString}>
                            <div className="flex flex-row justify-center">
                                <i className="material-icons inline">keyboard_arrow_up</i> 
                                <p>Upvote</p>
                            </div>
                        </button> :
                        <button 
                            disabled
                            className={upvoteButtonClassString}>
                            <div className="flex flex-row justify-center">
                                <i className="material-icons inline">keyboard_arrow_up</i> 
                                <p>Upvote</p>
                            </div>
                        </button>}
                        <button 
                            onClick={handleCommentClick}
                            className="inline w-full border rounded-md border-blue-400 
                                           text-center pt-1 focus:bg-blue-400 focus:outline-none">
                            <div className="flex flex-row justify-center">
                                <i className="material-icons inline mr-1">comment</i>
                                <p>Comments</p>
                            </div>
                        </button>
                    </div>
                    <CommentSection user={user} docId={docId} eltId={docIdToId(docId)} />
                </div>
            </li>
}