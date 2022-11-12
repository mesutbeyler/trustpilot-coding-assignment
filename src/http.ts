import axios from 'axios'

const client = axios.create({
  baseURL: 'https://ponychallenge.trustpilot.com/pony-challenge',
})

export default client
