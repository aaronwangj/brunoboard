import firebase from '../firebase/firebase-config'

export default function MakePost(props) {
    function testFirebase() {
        firebase.firestore().collection("testing")
            .add({"testString":"TEST STRING SUCCESSFULLY ADDED"})
            .then(console.log("TESTING CALLED"))
    }
    return <div>
        <button className="testing" onClick={testFirebase}> TEST FIREBASE  </button>
    </div>
}