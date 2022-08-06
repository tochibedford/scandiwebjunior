const currenciesQuery = ()=>{
    return [true, 'currencies', `
            query{
                currencies{
                    label
                    symbol
                }
            }
        `]
}
const categoriesQuery = ()=>{
    return  [true, 'categories', `
            query{

                categories{
                    name
                }
            }
        `]
}
const productQuery = (productId)=>{
    if (localStorage.getItem(productId)){
        return [false, productId]
    }
    return [true, productId, `
        query{
            product(id:"${productId}"){
                id
                name
                inStock
                gallery
                category
                prices{
                    currency{
                        label
                        symbol
                    }
                    amount
                }
                brand
                attributes{
                    id
                    name
                    type
                    items{
                        id
                        value
                        displayValue
                    }
                }
                
            }
        }
    `]
}
const productWithDescriptionQuery = (productId)=>{
    if (localStorage.getItem(productId)){
        return [false, productId]
    }
    return [true, productId, `
            query{
                product(id:"${productId}"){
                    id
                    name
                    inStock
                    gallery
                    description
                    category
                    prices{
                        currency{
                            label
                            symbol
                        }
                        amount
                    }
                    brand
                    attributes{
                        id
                        name
                        type
                        items{
                            id
                            value
                            displayValue
                        }
                    }
                    
                }
            }
        `]
}

const categoryQuery = (cat)=>{
    if (localStorage.getItem(cat)){
        return [false, cat]
    }
    return [true, cat, `
        query{
            category(input: { title: "${cat.toLowerCase()}" }) {
                name
                products {
                    id
                    name
                    inStock
                    gallery
                    description
                    category
                    brand
                    prices{
                      currency{
                        label
                        symbol
                      }
                      amount
                    }
                    attributes{
                        id
                        name
                        type
                        items{
                            id
                            value
                            displayValue
                        }
                    }
                }
            }
        }
        `]
}
const graphFetch = async(query) => {
    if(query[0]){
        const fetchOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                query: query[2]
            })
        }
        const data = await fetch('https://tochi-cors-anywhere.herokuapp.com/https://mockstore-endpoint.herokuapp.com:4000/', fetchOptions);
        const innerData = await data.json();
        localStorage.setItem(query[1], JSON.stringify(innerData))
        return innerData;
    }else{
        return JSON.parse(localStorage.getItem(query[1]));
    }
}

export {
    graphFetch, 
    categoriesQuery, 
    productQuery,
    productWithDescriptionQuery,
    categoryQuery, 
    currenciesQuery};