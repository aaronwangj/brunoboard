import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from './navbar'
import GoogleLogin from 'react-google-login'
import { GoogleLogout } from 'react-google-login';
import firebase from '../firebase/firebase-config'

export default function Landing(props) {

    /* ---------------- alternative solution to logging in ------------------- */

    const checkSessionAuthPersist = () => {
        console.log("TEST")
        const keys = Object.keys(window.sessionStorage)
        for (const index in keys) {
            if (keys[index].includes("firebase:authUser:")) {
                // TODO: verify user object validity
                console.log("SESSION LOGIN INFO FOUND!")
                const user = JSON.parse(sessionStorage.getItem(keys[index]))
                return user
           }
        }
        return null;
    }

    useEffect(() => {
        const user = checkSessionAuthPersist()
        console.log("CHECKING SESSION STORAGE!")
        if (user) {
            props.setGoogleId(user.uid)
            props.setEmail(user.email)
            props.setName(user.name)
            props.setSignedIn(true)
            props.setUser(user)
        }
    }, [])
    /**
     * Function to handle login to firebase via Google. The hosted domain
     * is restricted to @brown.edu. Any newly logged in user is automatically
     * added to the firebase users
     */
    const googleAuthFirebase = () => {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION) // persistence settings are NONE, LOCAL, or SESSION 
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
                            props.setUser(user.toJSON())
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
        <div id='landing-text-wrapper' className='text-center block m-auto px-5 mt-0 mb-4 max-w-lg'> 
            <h1 className="font-extrabold text-4xl">Creativity is Connecting Things.</h1>
            <br></br>
            <p className="mt-2 text-xl">
                Brunoboard was created with the mission to provide an environment where ideas thrive. <br></br>
                <br></br>
                Share and browse ideas within the Brown community today.
            </p>
        </div>
        <div id='landing-button-wrapper' className='block mt-3 flex grid justify-center'>
            <div id='google-oauth' className="inline grid items-center"> 
                <button className="bg-red-400 hover:bg-red-500 transition-colors 
                                    p-3 rounded-lg text-white font-semibold" onClick={() => googleAuthFirebase()}>Login via Brown Email</button>
            </div>
        </div>
        
    </div>)
}
