import axios from "axios";
const baseURL = '/api/users'

const getUsers = async () => {
    const response = await axios.get(baseURL)
    return response.data
}

export default { getUsers }