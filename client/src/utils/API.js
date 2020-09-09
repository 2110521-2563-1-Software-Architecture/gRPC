const api = Axios.create({
    baseURL: "http://localhost:3000/book",
  });
  
api.interceptors.request.use( (x ) => {
// to avoid overwriting if another interceptor
// already defined the same object (meta)
print(x)
x.meta = x.meta || {}
x.meta.requestStartedAt = new Date().getTime();
return x;
})

api.interceptors.response.use( x => {
    console.log(`Execution time for: ${x.config.url} - ${ new Date().getTime() - x.config.meta.requestStartedAt} ms`)
    return x;
},
// Handle 4xx & 5xx responses
x => {
    console.error(`Execution time for: ${x.config.url} - ${new Date().getTime() - x.config.meta.requestStartedAt} ms`)
    throw x;
}
)

const run  = async () => {

// SUCCESS call
await api.get('https://jsonplaceholder.typicode.com/todos/1', { headers: { 'x-trace-id': '1234-1234'} })
    .then( x => x.data)
    .then( x => console.log(x))

// FAILED call - 404
//     await axios.get('https://jsonplaceholder.typicode.com/todos12/1', { headers: { 'x-trace-id': '1234-1234'} })
//         .then( x => x.data)
//         .then( x => console.log(x))
}

run().then( x => console.log('Completed'))
export default api
  