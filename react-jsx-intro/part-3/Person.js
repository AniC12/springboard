const Person = (props) => {
    const {name, age, hobbies} = props;
    let voteText = age >= 18 ? "please go vote!" : "you must be 18";
    
    return (
        <div>
            <p>Learn some information about this person</p>
            <p>Name: {name.slice(0, 6)}</p>
            <p>Age: {age}</p>
            <ul>
                {hobbies.map(h => <li>{h}</li>)}
            </ul>
            <p>Vote Text: {voteText}</p>
        </div>
    );
}