import axios from 'axios';

const college = axios.create({
    baseURL:'https://college-api.vercel.app/api'
})
const image = axios.create({
    baseURL:'https://api.pexels.com/v1/search?query='
})
// const imageKey = "ym4N46cTECeFkNnysx3JydSymSxrPzWz3uQSpiFFZp4NxiFkdQj6J9EF";
export default [college,image]