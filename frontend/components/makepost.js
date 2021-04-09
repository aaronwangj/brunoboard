import firebase from '../firebase/firebase-config'
import { useState } from 'react'

export default function MakePost(props) {
    const [isAnonymous, setAnonymous] = useState(false)
    const [postContent, setPostContent] = useState("")
    const [tags, setTags] = useState([])
    const [tooltipToggled, setTooltipToggled] = useState(false)

    function testFirebase() {
        firebase.firestore().collection("testing")
            .add({ "testString": "TEST STRING SUCCESSFULLY ADDED" })
            .then(console.log("TESTING CALLED"))
    }

    const BATCH_NUM = 4
    function addPost() {
        console.log(props.user)
        console.log("DEBUG: Request to firebase sent!")
        if (!props.user) {
            alert("ERROR: User not authenticated")
            return
        }
        console.log("user was authenticated when adding post")

        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;

        const post = {
            "anonymous": isAnonymous,
            "content": postContent,
            "email": props.user["email"],
            "name": props.user["displayName"],
            "uid": props.user["uid"],
            "upvotes": 0,
            "createdAt": firebase.firestore.Timestamp.now(),
            "upvoters": [],
            "comments": {},
            "tags": tags,
        }

        firebase.firestore().collection("testing-posts").add(post)
            .then(docRef => {
                docRef.update({ id: docRef.id })
                return docRef.get()
            })
            // .then(docSnap => {
            //     props.setPosts(posts => [docSnap.data(), ...posts])
            //     document.getElementById("post-textarea").value = ""
            //     setTags([])
            // })
            .then(() => window.location.reload()) // force refresh to fetch the newly posted data
        // .then(() => props.update())
    }

    function handleAddTags(e) {
        e.preventDefault()
        const tagInput = document.getElementById("post-tags")
        const tagToAdd = tagInput.value
        tagInput.value = ""
        if (tagToAdd !== "") setTags(tags => [...tags, tagToAdd])
    }

    const handleCancelTag = (tag) => {
        console.log(" x clicked! ")
        console.log(tags.indexOf(tag))
        setTags(tags => {
            let copyTags = [...tags]
            copyTags.splice(tags.indexOf(tag), 1)
            return copyTags
        })
    }

    const toggleTooltip = () => {
        if (tooltipToggled) {
            setTooltipToggled(false)
        } else {
            setTooltipToggled(true)
        }
    }

    return <div className="font-display mt-20 m-auto">
        <h1 className="italic font-bold text-xl">Share</h1>
        <div className="" id="make-post-wrapper">
            <form className="">
                <textarea
                    id="post-textarea"
                    onChange={e => setPostContent(e.target.value)}
                    style={{ "resize": "none" }}
                    placeholder="Write down your thoughts here..."
                    className="z-99 block mx-auto border-2 border-gray-400 
                               focus:bg-gray-200 rounded-lg w-full p-3 mb-2 transition-colors focus:outline-none"
                    rows="4">
                </textarea>
                {/* <Checkbox prompt={"anonymous?"} /> */}

            </form>
            <div className="mb-1 max-w-full flex flex-wrap flex-row">
                Tags:  {tags.map(tag => <span className="flex bg-gray-200 ml-3 mb-1 p-1 px-2 rounded-lg">{tag}
                <span className="ml-1 cursor-pointer hover:bg-gray-400 border rounded-lg p-1 py-0" onClick={() => handleCancelTag(tag)}>&times;</span>
            </span>)}
            </div>
            <form className="inline-block w-2/3" onSubmit={handleAddTags}>
                <input
                    className="w-2/6 border-2 border-gray-400 focus:bg-gray-200
                               mr-2 mb-2 transition-colors focus:outline-none rounded-md p-1 pl-2"
                    type="text" id="post-tags" placeholder="Add tags!"></input>
                <button className="inline w-1/5 bg-gray-200 hover:bg-gray-300 p-1 rounded-lg" type="submit">+Tag</button>
            </form>

            <div className="">
                <button
                    onClick={() => addPost()}
                    type="submit"
                    className="mr-2 inline w-auto p-2 bg-red-300 hover:bg-red-400 mt-2
                            transition-colors rounded-md text-sm font-semibold 
                            cursor-pointer">Post</button>
                <div className="inline h-full ml-3 text-sm">
                    <input
                        id="anonymous"
                        name="anonymous"
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={() => setAnonymous(!isAnonymous)}
                        label="anonymous?"></input>
                    <label className="font-semibold" htmlFor="anonymous"> Anonymously?</label>
                    <div className="inline ml-1 absolute mt-4 text-md" >
                        <span onClick={toggleTooltip} className="cursor-pointer hover:text-red-300 hover:font-bold">&#9432;</span>
                    {tooltipToggled ? <div className="ml-2 p-2 border border-gray-300 rounded-lg float-right max-w-full sm:max-w-sm">
                        Anonymity does not mean users will not take responsibility for their posts.
                        Moderators reserve the right to act accordingly should inappropriate conducts occur.
                    </div> : <div></div>}</div>
                    
                </div>
            </div>
        </div>
    </div>
}