import { Link } from 'react-router-dom';

function StringCheese() {
    return (
        <div>
            <h1>StringCheese</h1>
            <p>Some details about cheese</p>
            <Link to="/">Go back</Link>
        </div>
    );
}

export default StringCheese;