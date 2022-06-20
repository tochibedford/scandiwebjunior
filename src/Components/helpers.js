export const graphFetch = async(query) => {
    const fetchOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: query
        })
    }
    let data = await fetch('https://mockstore-endpoint.herokuapp.com/', fetchOptions)
    data = await data.json();
        
    return data.data
}
