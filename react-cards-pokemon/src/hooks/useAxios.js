import { useState } from "react";
import axios from "axios";
import { v1 as uuid } from "uuid";

function useAxios(baseUrl) {
    const [data, setsetData] = useState([]);

    const addData = async (endpoint = '') => {
        try {
            const url = `${baseUrl}${endpoint}`
            const response = await axios.get(url);
            setsetData(currantData => [...currantData, { ...response.data, id: uuid() }]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return [data, addData];
}

export default useAxios;