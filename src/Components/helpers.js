export const graphFetch = async(query) => {
    const fetchOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: query
        })
    }
    const data = await fetch('http://localhost:4000', fetchOptions);
        
    return await data.json().data
}