import EditUserInfo from './editUserInfo'
import GuideAndPolicy from './GuideAndPolicy'
import { useState } from 'react'

export default function Welcome(props) {
    const user = props.user
    const [doneEditInfo, setDoneEditInfo] = useState(false)
    return <div className="w-full h-full flex items-center">
        {!doneEditInfo
            ?
            <div id="info-edit-new-user" className="block">
                <h1 className="block font-extrabold text-4xl">&#128075; Welcome to Brunoboard, {props.user.displayName.split(" ")[0]}!</h1>
                <h3 className="text-2xl">Tell us a few things about yourself to get started.</h3>
                <EditUserInfo setDoneEditInfo={setDoneEditInfo} setIsFirstTimer={props.setIsFirstTimer} user={user} />
            </div>
            :
            <div className="mt-20 w-full sm:w-2/3 m-auto">
                <GuideAndPolicy />
                <button onClick={() => props.setIsFirstTimer(false)} className="mb-10 inline w-auto p-2 bg-red-300 hover:bg-red-400 mt-2
                            transition-colors rounded-md text-sm font-semibold 
                            cursor-pointer">Continue</button>
            </div>
        }
    </div>
}