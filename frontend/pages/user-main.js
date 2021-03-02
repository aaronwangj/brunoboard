import Navbar from '../components/navbar'
import { useState } from 'react'
import Landing from '../components/landing'

export default function usermain() {
    // react hook to keep track of login status of user
    const [isSignedIn, setIsSignedIn] = useState(false);

    const containerStyleString = "h-screen w-screen" + (isSignedIn ? " grid grid-rows-5" : "");
    return <div className={containerStyleString}>
        <Navbar isLanding={false} isSignedIn={isSignedIn} setSignedIn={setIsSignedIn}/>
        {!isSignedIn ?
            <Landing isSignedIn={isSignedIn} setSignedIn={setIsSignedIn} />
            :
            <div className='row-start-2 m-auto font-extrabold text-4xl'> Google Login Successful: User Main Page To Do </div>
        }
    </div>
}