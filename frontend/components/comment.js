export default function Comment(props) {
    const comment = props.comment
    return <div key={props.index} className="text-sm my-2 p-1">
        <span className="font-bold">{comment.name} </span>
        {comment.content}
    </div>
}