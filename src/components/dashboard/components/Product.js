import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getInstructorProduct } from '../../../actions/productAction'
import Products from '../../general/Products'
import { decodeUser } from '../../../util'

class Product extends Component {

    constructor(props){
        super(props)
        this.state={
            merchantProducts: []
        }
    }

    componentDidMount(){
        this.props.getInstructorProduct(decodeUser().user.id)
        console.log(decodeUser().user.id)
    }

    componentWillReceiveProps(nextProps){
        console.log(nextProps.products.products)
        if(
            nextProps && 
            nextProps.products && 
            nextProps.products.products.length > 0
        ){
            const merchantProducts = nextProps.products.products

            this.setState({merchantProducts})
        }
        
    }

    productDetails = (product)=>{
        return(
            <ul>
                <li>INR:{product.price}</li>
                <li>Quntity:{product.quantity}</li>
            </ul>
        )
    }

    render() {
        const {merchantProducts} = this.state
        return (
            <div className='row'>
                {merchantProducts.map((product, index) =>(
                    <Products 
                        key={index}
                        product={product} 
                        description={this.productDetails(product)} 
                        buttonName='ADD Images' 
                    />
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state)=>({
    products: state.products,
    auth: state.auth
})

export default connect(mapStateToProps,{getInstructorProduct})(Product)