export default function Post(props) {
    return <li className="block" key={props.docData["id"]}>
                <div className="shadow-md font-display p-2 rounded-lg border-2 border-gray-200 mb-3">
                    <h1 className="mb-2 font-bold">{props.docData["anonymous"] ? "Anonymous" : props.docData["name"]}<br></br></h1>
                    <p>{props.docData["content"]}</p>
                </div>
            </li>
}