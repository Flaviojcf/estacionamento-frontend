import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://estacionamento-web-api.azurewebsites.net/api',
})
