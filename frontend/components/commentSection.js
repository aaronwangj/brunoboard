import firebase from '../firebase/firebase-config'
import { useState, useEffect } from 'react'
import Comment from './comment'

export default function CommentSection(props) {
    const docId = props.docId
    const eltId = props.eltId
    const user = props.user

    const [comments, setComments] = useState([])
    const [commentContent, setCommentContent] = useState(null)

    // firebase.firestore().collection("testing-posts").doc(docId)
    //     .onSnapshot(doc => {
    //         const tempComments = []
    //         setComments([])
    //         console.log("DOC CHANGED!")
    //         const userIdToCommentsMap = doc.data().comments
    //         for (const userId in Object.keys(userIdToCommentsMap)) {
    //             console.log(userId)
    //             // userIdToCommentsMap[userId].forEach(commentRef => {
    //             //     commentRef.get().then(querySnap => {
    //             //         const commentData = querySnap.data()
    //             //         console.log(commentData)
    //             //     })
    //             // })
    //         }
    //     })

    useEffect(() => {
        firebase.firestore().collection("testing-comments")
            .where('parentRef', "==", firebase.firestore().collection("testing-posts").doc(docId))
            .get()
            .then(querySnapshot => {
                console.log(querySnapshot.docs.map(doc => doc.data()))
                setComments(querySnapshot.docs.map(doc => doc.data()))
            })
    }, [])

    const handleAddComment = () => {
        document.getElementById(eltId + "-input").value = ""
        if (commentContent) {
            const commentToAdd = {
                content: commentContent,
                createdAt: firebase.firestore.Timestamp.now(),
                name: user.displayName,
                parentRef: firebase.firestore().collection("testing-posts").doc(docId),
                uid: user.uid
            }
            // first add the comment to the comments collection
            firebase.firestore().collection("testing-comments")
                .add(commentToAdd)
                .then(commentDocRef => {
                    commentDocRef
                        .update({id: commentDocRef.id})
                        .then(() => addCommentToPostDoc(commentDocRef))
                    // then update the comments field of the associated document in the posts collection
                    // This might not be necessary, it may be enough to just have the comments refer to the posts

                    commentDocRef.get().then(docSnap => {
                        // add the actual comment data 
                        setComments([docSnap.data(), ...comments])
                    })
                 })
        }
    }

    const addCommentToPostDoc = (commentDocRef) => {
        const postReference = firebase.firestore().collection("testing-posts").doc(docId)
        postReference.get()
            .then(docSnap => {
                let newObject = docSnap.data()
                const commentRef = firebase.firestore().collection("testing-comments").doc(commentDocRef.id)
                console.log(newObject.comments[user.uid])
                if (newObject.comments[user.uid]) {
                    newObject.comments[user.uid] = [commentRef, ...newObject.comments[user.uid]]
                } else {
                    newObject.comments[user.uid] = [commentRef]
                }
                postReference.set(newObject)
            })
    }

    // for each comment section, load in all of the relevent comments
    // from firestore
    return <div style={{height:"0", overflow:"hidden", display:"none"}} 
                className="w-full comment-section p-2"
                key={eltId}
                id={eltId}>
                {comments.length > 0 
                ? 
                comments.map((comment, i) => <Comment comment={comment} index={i}/>)
                :
                <div className="text-gray-400 p-1 mb-2">Be the first to leave a comment!</div>}
                <div style={{display:"table"}} className="w-full">
                    <button 
                            className="float-right w-auto p-2 bg-red-300 hover:bg-red-400 transition-colors 
                                        inline rounded-md text-sm font-semibold cursor-pointer"
                            onClick={handleAddComment} type="submit">Post</button>
                    <span className="block">
                        <input
                            id={eltId + "-input"} 
                            onChange={e => setCommentContent(e.target.value)} 
                            type="text" placeholder="Add a Comment~" 
                            className="w-5/6 border border-gray-300 focus:outline-none focus:bg-gray-200 
                                        rounded-lg transition inline mr-3 p-2"></input>
                    </span>
                    
                </div>
            </div>
}