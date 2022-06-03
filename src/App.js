import { Component } from 'react'
import Navbar from './Components/Navbar'
import Category from './Components/Category'
import {graphFetch} from './Components/helpers'
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import history from './Components/history'
import ProductDescription from './Components/ProductDescription'
import Cart from './Components/Cart'

export default class App extends Component{
    constructor(props){
        super(props);
        this.refreshBodyContainer = []
        this.changeCurrentCurrency = this.changeCurrentCurrency.bind(this)
        this.state = {
            currentCurrency: localStorage.getItem('currency')? localStorage.getItem('currency'):'$',
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
                        <Route path="/product/:productid">
                            <Navbar currentCurrency = {this.state.currentCurrency} changeCurrentCurrency={this.changeCurrentCurrency} refreshBodyContainer={this.refreshBodyContainer} category={localStorage.getItem('category')?localStorage.getItem('category'):"all"} categories={this.state.categories}/>
                            {this.state.currentCurrency && <ProductDescription currentCurrency={this.state.currentCurrency} />}
                        </Route>
                        <Route path="/cart">
                            <Navbar currentCurrency = {this.state.currentCurrency} changeCurrentCurrency={this.changeCurrentCurrency} refreshBodyContainer={this.refreshBodyContainer} category={localStorage.getItem('category')?localStorage.getItem('category'):"all"} categories={this.state.categories}/>
                            {this.state.currentCurrency && <Cart /> }
                        </Route>
                    </Switch>
                </div>
            </Router>
        )
    }
}