import { Component, createRef } from 'react'
import Navbar from './Components/Navbar'
import Category from './Components/Category'
import {graphFetch} from './Components/helpers'

export default class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            category: null,
            categories: []
        }
    }

    componentDidMount(){
        let query = `
            query{
                categories{
                    name
                }
            }
        `
        graphFetch(query).then(data=>{
            let categories = []
            data.categories.forEach((category)=>{categories.push(category.name.charAt(0).toUpperCase()+category.name.slice(1))})
            this.setState(()=>{
                return({
                    category: categories[0],
                    categories: categories
                })
            })
        })
        
    }


    render(){
        return (
            <div className="app">
                <Navbar category={this.state.category} categories={this.state.categories}/>
                {this.state.category && <Category category={ this.state.category }/>}
            </div>
        )
    }
}