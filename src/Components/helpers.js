export const graphFetch = async(query) => {
    const fetchOptions = {
        method: 'POST',
        mode: 'cors,
        headers: {
            "Content-Type": "application/json", 
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
        },
        body: JSON.stringify({
            query: query
        })
    }
    let data = await fetch('https://mockstore-endpoint.herokuapp.com/', fetchOptions)
    data = await data.json();
        
    return data.data
}
