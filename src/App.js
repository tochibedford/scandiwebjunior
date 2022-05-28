import { Component, createRef } from 'react'
import Navbar from './Components/Navbar'
import Category from './Components/Category'
import {graphFetch} from './Components/helpers'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

export default class App extends Component{
    constructor(props){
        super(props);
        this.refreshBodyContainer = []
        this.changeCurrentCurrency = this.changeCurrentCurrency.bind(this)
        this.state = {
            currentCurrency: "$",
            category: null,
            categories: []
        }
    }

    changeCurrentCurrency(curr){
        this.setState(()=>{
            return {
                currentCurrency: curr
            }
        })
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
            <Router>
                <div className="app">
                    <Switch>
                        <Route exact path="/">
                            <Redirect to="/categories/all"></Redirect>
                        </Route>
                        <Route path="/categories/:category">
                            <Navbar currentCurrency = {this.state.currentCurrency} changeCurrentCurrency={this.changeCurrentCurrency} refreshBodyContainer={this.refreshBodyContainer} category={this.state.category} categories={this.state.categories}/>
                            {this.state.category && <Category currentCurrency = {this.state.currentCurrency} refreshBodyContainer={this.refreshBodyContainer} category={ this.state.category }/>}
                            {/* <Navbar category={this.state.category} categories={this.state.categories}/>
                            {this.state.category && <Category category={ this.state.category }/>} */}
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}