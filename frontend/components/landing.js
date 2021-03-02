import { useState} from 'react'
import Link from 'next/link'
import Navbar from './navbar'
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from 'react-google-login';
import Router from 'next/router'

export default function Landing({ isSignedIn, setSignedIn }) {

    /**
     * Hanlder method for login functionality
     * @param {json} response Response returned by Google upon login request.
     */
    const loginGoogle = (response) => {
        if (response["tokenId"] != undefined) {
            console.log("Successfully logged in via Google")
            setSignedIn(true)
            console.log(response)
        }
        else {
            alert("Google login unsuccessful. Please make sure that you are using an @brown.edu email.")
        }
        
    }

    

    return (<div className="h-full w-screen grid grid-rows-5">
        <Navbar isLanding={true} />
        <div id='landing-text-wrapper' className='row-start-2 m-auto font-extrabold text-4xl'> 
            Landing Page To Do 
        </div>
        <div id='landing-button-wrapper' className='row-start-3 flex grid justify-center'>
            <div id='google-oauth' className="inline grid items-center">
                {/* this button handles the Google login logic */}
                <GoogleLogin 
                    clientId="633400520905-dacd7n1cv19v8e542s9oi57mm17mu033"
                    buttonText='Login Via Google'
                    onSuccess={loginGoogle}
                    onFailure={loginGoogle}
                    cookiePolicy={'single_host_origin'}
                    hostedDomain={"brown.edu"} 
                    isSignedIn={true} />
            </div>
            
        </div>
        
    </div>)
}
