import { GoogleLogout } from 'react-google-login'; 
import Link from "next/link";
import firebase from '../firebase/firebase-config'

export default function Navbar({ isLanding, isSignedIn, setSignedIn }) {
    // The className string used to style links in the Navbar
    const linkStyling = `text-gray-500 hover:text-red-600 focus:text-red-500 sm:inline`

    /**
     * Handler for logout functionality.
     * @param {json} response The response returned by Google upon logout request.
     */
    const logoutGoogle = () => {
        firebase.auth().signOut().then(function() {
            console.log("Sign-out successful.")
            setSignedIn(false)
            // TODO: Figure out how to overwrite auth persistence
            }, function(error) {
            console.log(error)
        })
    }

    return <div id="navbar" className="absolute top-0 right-0 p-4 px-3 sm:px-6 w-full flex justify-between 
                            items-center font-display bg-white z-50">
        <div>
            <Link href="/">
                <a className="font-semibold text-gray-700 text-xl">
                    Brunoboard
                </a>
            </Link>
        </div>
        <div className="space-x-4 md:space-x-6">
            {!isSignedIn ? <Link href="/about">
                <a className={linkStyling}>About</a>
            </Link> : <div/>}
            {/* render the logout button if user is signedin */}
            {isSignedIn ? <div className={'inline ' + linkStyling}>
                <button className="font-extrabold" onClick={() => logoutGoogle()}> Logout </button>
            </div> : <div/>}
        </div>

    </div>
}