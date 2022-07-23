const currenciesQuery = ()=>{ 
    return `
            query{
                currencies{
                    label
                    symbol
                }
            }
        `
}
const categoriesQuery = ()=>{
    
    return  `
            query{

                categories{
                    name
                }
            }
        `
}
const productQuery = (productId)=>{
    return `
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
    `
}
const productWithDescriptionQuery = (productId)=>{
    return `
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
        `
}

const categoryQuery = (cat)=>{
    return `
        query{
            category(input: { title: "${cat.toLowerCase()}" }) {
                products {
                    id
                    name
                    inStock
                    gallery
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
        `
}
const graphFetch = async(query) => {
    const fetchOptions = {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            query: query
        })
    }
    const data = await fetch('http://localhost:4000', fetchOptions);
    let innerData = data.json()
    return innerData;
}

export {
    graphFetch, 
    categoriesQuery, 
    productQuery,
    productWithDescriptionQuery,
    categoryQuery, 
    currenciesQuery};