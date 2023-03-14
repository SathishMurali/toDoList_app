import axios from "axios";

const listApi = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 2000,
    headers: { "X-Custom-Header": "foobar" }
})

listApi.interceptors.request.use(request => {
    return request
})

listApi.interceptors.response.use(response => {
    return response
})

export default listApi;