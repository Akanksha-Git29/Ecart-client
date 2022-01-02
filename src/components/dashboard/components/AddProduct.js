import React, { Component } from 'react'
import Input from '../../general/Input'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addProduct } from '../../../actions/productAction'
import { message } from 'antd'

export const withRouter = (Component) => { //works only for react16-17 //hooks
    const Wrapper = (props) => { 
        const history = useNavigate(); //userNavigator ~ useHistory ~withRoutes

        return (
            <Component
                history={history}
                {...props}
            />
        );
    };

    return Wrapper;
};

class AddProduct extends Component {
    constructor(props){
        super(props)
        this.state={
            name:"",
            description:"",
            price:"",
            brand:"",
            quantity:"",
            category:"",
            features:"",
            rating:""
        }
    }

    onChange=(e)=>{
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit=()=>{
        const {name, description,price, brand,quantity, category, rating, features} = this.state
        const newProducts = {
            name,
            description,
            price,
            brand,
            quantity,
            category,
            features,
            rating
        }

        if(name.length <= 0 || description.length <= 0 
            ||price.length <=0 || brand.length <=0 
            || quantity.length <=0)
            return message.error("all fields are required")
        this.props.addProduct(newProducts, this.props.history)
    }

    render() {
        const {name, description,price, brand,quantity, category, features, rating} = this.state
        return (
            <div style={{textAlign:"center"}} >
                <h1> Add Products </h1>
                <Input 
                    type="text" 
                    placeholder="name of product"
                    name="name"
                    value={name}
                    onChange={this.onChange}
                    style={{width:"360px",height:"35px"}}
                />
                <Input 
                    type="text" 
                    placeholder="Give a breif decription of product"
                    name="description"
                    value={description}
                    onChange={this.onChange}
                    style={{width:"360px",height:"35px"}}
                />
                <Input 
                    type="number" 
                    placeholder="Enter the price of this product"
                    name="price"
                    value={price}
                    onChange={this.onChange}
                    style={{width:"360px",height:"35px"}}
                />
                <Input 
                    type="text" 
                    placeholder="Enter the brand of this product"
                    name="brand"
                    value={brand}
                    onChange={this.onChange}
                    style={{width:"360px",height:"35px"}}
                />
                <Input 
                    type="number" 
                    placeholder="Enter the rating"
                    name="rating"
                    value={rating}
                    onChange={this.onChange}
                    style={{width:"360px",height:"35px"}}
                />
                <Input 
                    type="text" 
                    placeholder="Enter the features of this product"
                    name="features"
                    value={features}
                    onChange={this.onChange}
                    style={{width:"360px",height:"35px"}}
                />
                <Input 
                    type="number" 
                    placeholder="Enter Quantity"
                    name="quantity"
                    value={quantity}
                    onChange={this.onChange}
                    style={{width:"360px",height:"35px"}}
                />
                <div className='form-group'>
                    <select
                        name="category"
                        value={category}
                        onChange={this.onChange}
                        style={{width:"360px",height:"35px"}}
                    >
                        <option value="0">Select a category for this product</option>
                        <option value="Clothing">Clothing</option>
                        <option value="Electronics">Electronics</option>
                        <option value="Office Supply">Office Supply</option>
                        <option value="Student Accessories">Student Accessories</option>
                        <option value="Cosmetics">Cosmetics</option>
                        <option value="Women Accessories">Women Accessories</option>
                    </select>
                </div>
                <button className='btn btn-primary' onClick={this.onSubmit} >Submit</button>
            </div>
        )
    }
}

const mapStateToProps = (state) =>({
    products: state.products
})

export default connect(mapStateToProps,{addProduct})(withRouter(AddProduct))
