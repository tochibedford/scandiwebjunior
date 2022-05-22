import { Component, createRef } from 'react'

export default class Currency extends Component{
    constructor(props){
        super(props);

        this.handleDrop = this.handleDrop.bind(this);
        this.currenciesObj = {'$':'USD', '€':'EUR', '¥':'JPY'}
        this.state = {
            currency: "$",
            droppedDown: false
        }
        this.droppedDownRef = createRef()

        // list of Currency Element
        this.currencies = []
        Object.keys(this.currenciesObj).forEach((currencyKey, index)=>{
            this.currencies.push(
                <option value={currencyKey} key={index}>
                    {`${currencyKey} ${this.currenciesObj[currencyKey]}`}
                </option>
            )
        })

    }

    componentDidMount(){
        this.droppedDownRef.current.style.transform = `rotate(${this.state.droppedDown? 0:180}deg) scaleX(1.2) translateY(4px)`
        
    }

    componentDidUpdate(){
        this.droppedDownRef.current.style.transform = `rotate(${this.state.droppedDown? 0:180}deg) scaleX(1.2) translateY(4px)`
    }

    handleDrop(event){
        this.setState((prevState)=>{
            return{
                droppedDown: !prevState.droppedDown
            };
        })

    }

    render(){
        return (
           <div className="styledSelect" onClick={this.handleDrop}>
                <select value={this.state.currency} onChange={this.handleDrop} disabled className="currency currencyDropDown">
                    {this.currencies}
                </select>
                <div className="dropDownArrow" ref={this.droppedDownRef} onClick={this.handleDrop} style={this.dropDownStyle}> ^ </div>
            </div>        
        )
    }
}