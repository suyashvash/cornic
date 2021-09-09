

export default function Story({ userName, userImage, userId }) {
    return (
        <div className="story">
            <img src={userImage} />
            <h4>{userName}</h4>
        </div>
    )
}