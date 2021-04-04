import EditUserInfo from './editUserInfo'

export default function Welcome(props) {
    const user = props.user
    return <div className="w-full h-full flex items-center">
        <div className="block">
            <h1 className="block font-extrabold text-4xl">&#128075; Welcome to Brunoboard, {props.user.displayName.split(" ")[0]}!</h1>
            <h3 className="text-2xl">Tell us a few things about yourself to get started.</h3>
            <EditUserInfo setIsFirstTimer={props.setIsFirstTimer} user={user}/>
        </div>
    </div>
}