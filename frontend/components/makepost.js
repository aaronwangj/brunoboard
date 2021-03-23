import firebase from '../firebase/firebase-config'
import { useState } from 'react'

export default function MakePost(props) {
    const [isAnonymous, setAnonymous] = useState(false)
    const [postContent, setPostContent] = useState("")

    function testFirebase() {
        firebase.firestore().collection("testing")
            .add({"testString":"TEST STRING SUCCESSFULLY ADDED"})
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
        var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date+' '+time;

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
        }

        firebase.firestore().collection("testing-posts").add(post)
            .then(docRef => {
                docRef.update({id: docRef.id})
                return docRef.get()
            })
            .then(docSnap => {
                props.setPosts(posts => [docSnap.data(), ...posts])
                document.getElementById("post-textarea").value=""
            })
        // .then(() => props.update())
    }

    return <div className="font-display mt-20 m-auto">
        <h1 className="italic font-bold text-xl">Share</h1>
        <div className="" id="make-post-wrapper">
            <form className="">
                <textarea 
                    id="post-textarea"
                    onChange={e => setPostContent(e.target.value)}
                    style={{"resize":"none"}} 
                    className="z-99 block mx-auto border-2 border-gray-400 
                               focus:bg-gray-200 rounded-lg w-full p-3 mb-2 transition-colors focus:outline-none"
                    rows="4">
                </textarea>
                {/* <Checkbox prompt={"anonymous?"} /> */}
                
            </form>
            <div className="">
                <div className="h-full text-sm">
                    <input 
                        id="anonymous"
                        name="anonymous"
                        type="checkbox" 
                        checked={isAnonymous} 
                        onChange={() => setAnonymous(!isAnonymous)}
                        label="anonymous?"></input>
                    <label className="italic font-semibold" htmlFor="anonymous"> Post Anonymously?</label>
                
                </div>
                <button
                    onClick={() => addPost()} 
                    type="submit" 
                    className="w-auto p-2 bg-red-300 hover:bg-red-400 mt-2
                            transition-colors rounded-md text-sm font-semibold 
                            cursor-pointer">Post</button>
            </div>
        </div>
    </div>
}