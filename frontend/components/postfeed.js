import MakePost from './makepost'
import { useEffect } from 'react'
import Post from './post'

export default function Postfeed(props) {
    // initialize posts on sign in
    useEffect(() => props.update(), [])

    return <div className="flex justify-center">
                <div className="mt-20 m-auto">
                    <ul>
                        {props.posts.map(docData => <Post docData={docData}/>)}
                    </ul>
                    <button id="update-user-main" onClick={() => props.update()}>Refresh</button>
                </div>
            </div>

}