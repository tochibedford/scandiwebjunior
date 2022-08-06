import { Component } from 'react'

export default class Attribute extends Component{
    constructor(props){
        super(props);
        const {productId, index} = this.props;
        this.handleChangeAttribute = this.handleChangeAttribute.bind(this)
        this.state = {
            selected: window.localStorage.getItem(`${productId}-${index}`) ? window.localStorage.getItem(`${productId}-${index}`):`${0}`
        }
    }

    handleChangeAttribute(event){
        const {productId, index, changeable} = this.props;
        if(changeable){
            const evv = event.currentTarget.id
            this.setState(()=>{
                localStorage.setItem(`${productId}-${index}`, `${evv}`)
                return({
                    selected: evv
                })
            })
            Array.from(event.currentTarget.parentNode.children).forEach(option=>{
                option.classList.remove('attributeSwatchActive')
                option.classList.remove('attributeTextActive')
            })
            if(event.currentTarget.classList.contains('attributeSwatch')){
                event.currentTarget.classList.add('attributeSwatchActive')
            }else{
                event.currentTarget.classList.add('attributeTextActive')
            }
        }
    }

    render(){
        const {selectedAttribute, index, attribute} = this.props;
        this.attributeElements = []
        if(attribute.type==="swatch"){
            this.attributeElements.push(
                <div key={index} id={index} className="attribute">
                    <p className="attributeName">
                        {attribute.name.toUpperCase()}:
                    </p>
                    <ul className="attributeList">
                        {attribute.items.map((item, ind)=>{
                            if(selectedAttribute){
                                if(`${ind}` === selectedAttribute){
                                    return(<li className="attributeSwatch attributeSwatchActive" id={ind} key={ind} onClick={this.handleChangeAttribute}> <div className={`attributeSwatchInner attributeItem`} style={{background:item.value}}></div> </li>)
                                }else{
                                    return(<li className="attributeSwatch" id={ind} key={ind} onClick={this.handleChangeAttribute}> <div className={`attributeSwatchInner attributeItem`} style={{background:item.value}}></div> </li>)
                                }
                            }else{   
                                if(`${ind}` === this.state.selected){
                                    return(<li className="attributeSwatch attributeSwatchActive" id={ind} key={ind} onClick={this.handleChangeAttribute}> <div className={`attributeSwatchInner attributeItem`} style={{background:item.value}}></div> </li>)
                                }else{
                                    return(<li className="attributeSwatch" id={ind} key={ind} onClick={this.handleChangeAttribute}> <div className={`attributeSwatchInner attributeItem`} style={{background:item.value}}></div> </li>)
                                }
                            }
                        })}
                    </ul>
                </div>  
            )
        }else{
            this.attributeElements.push(
                <div key={index} id={index} className='attribute'>
                    <p className="attributeName">
                        {attribute.name.toUpperCase()}:
                    </p>
                    <ul className="attributeList">
                        {attribute.items.map((item, ind)=>{
                            if(selectedAttribute){
                                if(`${ind}` === selectedAttribute){
                                    return(<li className="attributeItem attributeText attributeTextActive" id={ind} key={ind} onClick={this.handleChangeAttribute}>{item.value}</li>)
                                }else{
                                    return(<li className="attributeItem attributeText" id={ind} key={ind} onClick={this.handleChangeAttribute}>{item.value}</li>)
                                }
                            }else{
                                if(`${ind}` === this.state.selected){
                                    return(<li className="attributeItem attributeText attributeTextActive" id={ind} key={ind} onClick={this.handleChangeAttribute}>{item.value}</li>)
                                }else{
                                    return(<li className="attributeItem attributeText" id={ind} key={ind} onClick={this.handleChangeAttribute}>{item.value}</li>)
                                }
                            }
                        })}
                    </ul>
                </div>  
            )
        }
        return(
            <>
                {this.attributeElements}
            </>
        )
    }
}