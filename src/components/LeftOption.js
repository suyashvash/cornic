
export default function LeftOption(props) {
    return (
        <div className="left-option" >
            {props.children}
            <h5>{props.title}</h5>
        </div>
    )
}