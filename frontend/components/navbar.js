import { GoogleLogout } from 'react-google-login'; 
import Link from "next/link";

export default function Navbar({ isLanding, isSignedIn, setSignedIn }) {
    // The className string used to style links in the Navbar
    const linkStyling = `text-gray-500 hover:text-red-600 focus:text-red-500 ${!isLanding && "hidden sm:inline"}`

    /**
     * Handler for logout functionality.
     * @param {json} response The response returned by Google upon logout request.
     */
    const logoutGoogle = (response) => {
        console.log("Successfully logged out via Google")
        setSignedIn(false)
        console.log(response)
    }

    return <div className="absolute top-0 right-0 p-4 w-full flex justify-between 
                            items-center font-display bg-white z-50">
        <Link href="/">
            <a className="font-semibold text-gray-700 text-xl">
                BrunoBoard
            </a>
        </Link>
        <div className="space-x-4 md:space-x-6">
            <Link href="/about">
                <a className={linkStyling}>About</a>
            </Link>
            {/* render the logout button if user is signedin */}
            {isSignedIn ? <div className={'inline font-bold ' + linkStyling}>
                <GoogleLogout
                    clientId="633400520905-dacd7n1cv19v8e542s9oi57mm17mu033"
                    render={renderProps => 
                        (<div className='inline cursor-pointer' onClick={renderProps.onClick}>Logout</div>)}
                    buttonText="Logout"
                    onLogoutSuccess={logoutGoogle}
                    >
                </GoogleLogout>
            </div> : <div/>}
        </div>

    </div>
}