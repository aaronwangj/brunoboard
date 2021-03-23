import { useState} from 'react'
import Link from 'next/link'
import Navbar from './navbar'
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from 'react-google-login';
import firebase from '../firebase/firebase-config'

export default function Landing(props) {

    /**
     * Hanlder method for login functionality
     * @param {json} response Response returned by Google upon login request.
     */
    const loginGoogle = (response) => {
        if (response["tokenId"] != undefined) {
            console.log("Successfully logged in via Google")
            props.setSignedIn(true)
            let profileObj = response["profileObj"]
            let name = profileObj["name"]
            let email = profileObj["email"]
            let googleId = profileObj["googleId"]
            props.setName(name); props.setEmail(email); props.setGoogleId(googleId);
            console.log(response["profileObj"])
        }
        else {
            alert("Google login unsuccessful. Please make sure that you are using an @brown.edu email.")
        }
        
    }

    /* ---------------- alternative solution to loggin in ------------------- */

    /**
     * Function to handle login to firebase via Google. The hosted domain
     * is restricted to @brown.edu. Any newly logged in user is automatically
     * added to the firebase users
     */
    const googleAuthFirebase = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE) // persistence settings are NONE, LOCAL, or SESSION 
            .then(() => { 
                // provider object to help with firebase authentication
                const provider = new firebase.auth.GoogleAuthProvider();
                provider.setCustomParameters({
                    'hd': 'brown.edu'
                });
                return firebase.auth().signInWithPopup(provider)
                    .then((result) => {
                        // make sure that @brown.edu was used
                        if(result["additionalUserInfo"]["profile"]["hd"] === "brown.edu") {
                            var credential = result.credential
                            var user = result.user
                            // set the hooks for the user main page 
                            props.setGoogleId(user.uid)
                            props.setEmail(user.email)
                            props.setName(user.name)
                            props.setSignedIn(true)
                            props.setUser(user)
                        } else {
                            alert("Login Unsuccessful. Please make sure that you are using an @brown.edu email")
                        }
                    }).catch((error) => {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        // The email of the user's account used.
                        var email = error.email;
                        // The firebase.auth.AuthCredential type that was used.
                        var credential = error.credential;
                    })
                });
    }
    

    return (<div className="h-full w-screen flex flex-col justify-center">
        <Navbar isLanding={true} />
        <div id='landing-text-wrapper' className='block m-auto px-5 mt-0 mb-4 max-w-lg'> 
            <h1 className="font-extrabold text-4xl">Creativity is Connecting Things.</h1>
            <p className="mt-2 text-xl">
                Brunoboard was created with the mission to provide an environment where ideas thrive. <br></br>
                Find your inspirations today.
            </p>
        </div>
        <div id='landing-button-wrapper' className='block mt-3 flex grid justify-center'>
            <div id='google-oauth' className="inline grid items-center"> 
                <button className="bg-red-400 hover:bg-red-500 transition-colors 
                                    p-3 rounded-lg text-white font-semibold" onClick={() => googleAuthFirebase()}>Login via Google</button>
            </div>
        </div>
        
    </div>)
}
