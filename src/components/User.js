function User(props) {
    return (
        <div className="user">
            <div className="user__number">{props.index + 1}</div>
            <div className="user__name">{props.name}</div>
            <div className="user__username">@{props.username}</div>
        </div>
    )
}

export default User