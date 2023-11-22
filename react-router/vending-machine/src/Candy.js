import { Link } from 'react-router-dom';

function Candy() {
    return (
        <div>
            <h1>Candy</h1>
            <p>Some details about candies</p>
            <Link to="/">Go back</Link>
        </div>
    );
}

export default Candy;