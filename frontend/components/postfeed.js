import MakePost from './makepost'
import { useEffect } from 'react'

export default function Postfeed(props) {
    useEffect(() => props.update(), [])

    return <div className="h-screen w-screen grid grid-rows-5">
                <div className="row-start-1"> 
                </div>
                <div className='row-start-2 m-auto font-extrabold text-4xl'> 
                    Google Login Successful: User Main Page To Do 
                    <MakePost />
                </div>
                <div>
                    {props.posts.map(docData => <p key={docData["id"]}>{docData["content"]}</p>)}
                </div>
                <button id="update-user-main" onClick={() => props.update()}>Refresh</button>
            </div>

}