const Tweet = (props) => {
    const { username, name, date, message } = props;
    return (
        <div>
            <p>Name: {name}</p>
            <p>Username: {username}</p>
            <p>Date: {date}</p>
            <p>Message: {message}</p>
        </div>
    );
}