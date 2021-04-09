import firebase from '../firebase/firebase-config'
import { useState, useEffect, useRef } from 'react'
import CommentSection from './commentSection'
import Popup from 'reactjs-popup'

export default function Post(props) {
    const user = props.user
    const docId = props.docData.id
    // const [upvotes, setUpvotes] = useState(props.docData["upvotes"])
    const [userHasLiked, setUserHasLiked] = useState(false)
    const [thisUserBio, setThisUserBio] = useState(null)
    const [relatedPosts, setRelatedPosts] = useState([])
    const [displayRelated, setDisplayRelated] = useState(false)
    const [memScroll, setMemScroll] = useState(null)

    const [visibility, setVisibility] = useState({ display: 'none' })

    const isMounted = useRef(false)

    useEffect(() => updateLikedState(), [])

    const updateLikedState = () => {
        const thisDocRef = firebase.firestore().collection("testing-posts").doc(docId)
        thisDocRef.get().then(snapShot => {
            if (snapShot.get('upvoters')) setUserHasLiked(snapShot.get('upvoters').includes(user.uid))
        })
    }

    const handleUpvoteClick = () => {
        if (user) {
            const thisDocRef = firebase.firestore().collection("testing-posts").doc(docId)
            thisDocRef.update({ upvotes: firebase.firestore.FieldValue.increment(1) })
            // .then(setUpvotes(i => i + 1))
            thisDocRef.update({ upvoters: firebase.firestore.FieldValue.arrayUnion(user.uid) })
            setUserHasLiked(true)
        }
    }

    const handleCommentClick = e => {
        const thisCommentSection =
            document.getElementById(docIdToId(docId))
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

    const handleDisplayBio = () => {
        if (visibility.display === "inline") {
            setVisibility({ display: "none" })
            return
        }

        console.log("")

        setVisibility({ display: "inline" })
        if (props.docData["anonymous"]) return
        // console.log("Fetching bio info...")
        if (thisUserBio) return
        firebase.firestore().collection("testing-users")
            .doc(props.docData.uid)
            .get()
            .then(docSnapshot => {
                console.log(docSnapshot.data())
                setThisUserBio(docSnapshot.data())
            }
            )

    }

    const handleTagSearch = () => {
        // TODO: display error message for tag-searching a post with empty tag array
        if (!props.docData.tags) {
            alert("This post does not have any tags!")
            return
        }
        if (props.docData.tags.length == 0) {
            alert("This post does not have any tags!")
            return
        }
        return firebase.firestore().collection("testing-posts")
            .where("id", "!=", props.docData.id)
            .where("tags", "array-contains-any", props.docData.tags)
            .get()
            .then(querySnapshot => {
                setRelatedPosts(querySnapshot.docs.map(qsDoc => qsDoc.data()))
            })
    }

    const upvoteButtonClassString = `inline w-full border rounded-md border-green-400 
                        text-center pt-1 focus:bg-green-400 focus:outline-none`
    const docIdToId = (docId) => (props.isNested ? (docId + "-comment-section-nested") : (docId + "-comment-section"))

    const handleDisplayRelatedPosts = () => {
        if (!displayRelated) {
            setMemScroll(window.scrollY)
            setVisibility({ display: "none" })
            console.log(window.scrollY)
            if (relatedPosts.length == 0) {
                let tagSearch = handleTagSearch()
                if (!tagSearch) {
                    // alert("Could not find any posts related to this one")
                    return
                }
                tagSearch.then(() => {
                    setDisplayRelated(true)
                    document.getElementById("usermain-container").style.overflow = "hidden"
                    document.getElementById("usermain-container").style.height = "100vh"
                })
            } else {
                setDisplayRelated(true)
                document.getElementById("usermain-container").style.overflow = "hidden"
                document.getElementById("usermain-container").style.height = "100vh"
            }
        }
        else {
            setDisplayRelated(false)
            document.getElementById("usermain-container").style.overflow = ""
            document.getElementById("usermain-container").style.height = ""
        }
    }

    useEffect(() => {
        if(displayRelated) setVisibility({ display: "none" })
        if (isMounted.current) {
            if (!displayRelated) window.scroll(0, memScroll)
        } else {
            isMounted.current = true
        }
    }, [displayRelated])

    return <li className="post-item block mb-3" key={props.docKey}>
        <div
            // onClick={handleTagSearch}
            className="bg-white shadow-lg font-display p-2 rounded-lg border-2
                        border-gray-300 hover:border-gray-600 transition-colors">
            <div className="inline-block mb-2">

                <h1 onClick={handleDisplayBio} className="font-bold cursor-pointer hover:underline">
                    {props.docData.anonymous ? "Anonymous" : props.docData["name"]}
                </h1>
            </div>
            {thisUserBio && !props.docData.anonymous &&!displayRelated
                ?
                <div style={visibility}
                    className="max-w-md md:max-w-sm
                        absolute bg-white border ml-4
                        shadow-md rounded-md p-3 border-gray-300">
                    <h1 className="font-bold text-lg">&#129528; {props.docData.name}</h1>
                    <div className="text-sm mb-2">&#9997; Studies {thisUserBio.majors.map(s => {
                        if (s === "Select a Concentration") return ""
                        if (s.indexOf("-") >= 0) return s.substring(0, s.indexOf("-") - 1)
                        else return s
                    }).join(", ")} </div>
                    <span>{thisUserBio.biography}</span>
                </div> : <div></div>}

            {!props.isNested ? <p
                style={{ whiteSpace: "pre-line", overflowWrap: "break-word" }}
                className="mb-4">
                {props.docData["content"]}
            </p>
                :
                <p
                    style={{ overflowWrap: "break-word" }}
                    className="mb-4">
                    {props.docData["content"]}
                </p>}

            {props.docData.tags ? <div
                onClick={handleDisplayRelatedPosts}
                className={"text-sm mb-2 py-2 transition-colors" + (!props.isNested ? " hover:underline cursor-pointer" : "")}>
                Tags: {props.docData.tags.map(tag => <span className="bg-gray-200 mr-3 p-1 px-2 text-sm rounded-lg">{tag}</span>)}
            </div> :
                <div></div>}
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
                        className={upvoteButtonClassString + " bg-green-400 cursor-default"}>
                        <div className="flex flex-row justify-center">
                            <i className="material-icons inline">keyboard_arrow_up</i>
                            <p>Upvote</p>
                        </div>
                    </button>}
                <button
                    onClick={e => handleCommentClick(e)}
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

        {displayRelated ?
            <div style={{ display: (displayRelated ? "" : "none") }} className="mr-3 top-0 left-0 absolute h-screen w-screen flex justify-center p-2 bg-gray-500 z-50 bg-opacity-50">
                <div className="text-red-300 hover:text-red-400 underline text-3xl font-extrabold cursor-pointer mr-3" onClick={handleDisplayRelatedPosts}>x</div>
                <div id="nested-related-posts" className="pt-10 h-full overflow-y-scroll w-full lg:w-1/3">
                    <h1 className="font-extrabold text-white text-xl mb-2">Posts with similar tags</h1>
                    {relatedPosts.length > 0
                        ?
                        relatedPosts.map(docData => <Post key={docData.id} docKey={docData.id} user={props.user} docData={docData} isNested={true} />)
                        :
                        <div className="font-bold text-white text-lg mb-2">No posts with similar tags were found :(</div>
                    }
                </div>
            </div>
            : <div style={{ display: "none" }}></div>}
    </li>
}