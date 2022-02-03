// Run with
// ts-node poeapi.ts

import axios, {AxiosRequestConfig} from "axios";
import {v4 as uuidv4} from "uuid";
const baseURL = "https://api.pathofexile.com"
const authBaseURL = "https://www.pathofexile.com"

const client_id = "poe-tree"
const version = 0.1
const contact = "hruskar.evan@gmail.com"
const client_secret = "77009532-dc75-426d-91b1-2e66621695f1"
const user_agent = `OAuth ${client_id}/${version} (contact: ${contact})`
type League = 'Standard' | 'SSF Standard' | 'SSF Hardcore' | 'Hardcore'

const session_cookie = 'a56975f57d1386b7a52ce86f86b9251e'

// Sending the POESESSID cookie is a good idea, it just doesn't have permissions to see the ladder.
const config: AxiosRequestConfig = {
  baseURL,
  headers: {
    'User-Agent': user_agent,
    'Cookie': `POESESSID=${session_cookie}`
  }
}

const auth_config: AxiosRequestConfig = {
  baseURL: authBaseURL,
  params: {
    client_id,
    response_type: 'code',
    scope: 'service:leagues:ladder',
    state: uuidv4(),
    redirect_uri: 'lvh.me'
  }
}

// axios.get('/league', config).then(resp => console.log(resp.data))

const league: League = 'Standard'
axios.get(`/league/${league}/ladder`, config).then(resp => console.log(resp.data))