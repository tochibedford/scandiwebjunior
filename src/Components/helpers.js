export const graphFetch = async(query) => {
    const fetchOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: query
        })
    }
    let data = await fetch('http://localhost:4000', fetchOptions)
    data = await data.json();
        
    return data.data
}