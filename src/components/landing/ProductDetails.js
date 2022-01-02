import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { getProduct } from '../../actions/productAction';
import { Spin, Space, Button, Rate, Modal, Alert ,message} from 'antd';
import NavBar from '../general/NavBAr'
import {isEmpty} from 'lodash'
import { decodeUser } from '../../util';
import { addToCart } from '../../actions/cartActions';

export const withRouter = (Component) => { //works only for react16-17 //hooks
    const Wrapper = (props) => {
        let { id } = useParams();
        const history = useNavigate(); //userNavigator ~ useHistory ~withRoutes
        const location = useLocation();
        return (
            <Component
                id={id}
                {...props}
                history={history}
                {...props}
                location={location}
                {...props}
            />
        );
    };

    return Wrapper;
};

class ProductDetails extends Component {

    constructor(props) {
        super(props)
        this.state = {
            product: null,
            visible: false
        }
    }

    componentDidMount() {
        const pid = this.props.id
        this.props.getProduct(pid)
        // console.log(pid)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        if (nextProps && nextProps.product) {
            const product = nextProps.product
            this.setState({ product })
        }
    }

    showModal = () => {
        this.setState({
            visible: true
        });
    };

    handleOk = () => {
        this.setState({
            visible: false
        });
    };

    handleCancel = () => {
        this.setState({
            visible: false
        });
    };

    registerModal = (product) => {
        return (
            <Modal
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[
                    <Button key="back" onClick={this.handleCancel}>
                        Close
                    </Button>,
                ]}
            >
                <div>
                    <br/>
                    <Alert
                        message={
                            <center>
                                <span>
                                    <strong>Added</strong> {product.name} to Cart
                                </span>
                            </center>
                        }
                        type='success'
                    />
                    <br />
                    <center>
                        <Link to="/cart?redirect=/cart">
                            <Button key="submit" type='primary' >
                                Go to Cart
                            </Button>
                        </Link>
                    </center>
                </div>
            </Modal>
        )
    }

    async addProductsToCart(product){
        //check if signed in
        // if not use localStorage rather than our backend
        if(!localStorage.getItem("token")){
            const productExsists = !isEmpty(localStorage.getItem("products"))
            if(productExsists){
                const products = JSON.parse(localStorage.getItem("products"))
                products.push(product._id)
                this.showModal()
                return localStorage.setItem("products",JSON.stringify([product._id]))
            }
            else{
                this.showModal()
                return localStorage.setItem("products",JSON.stringify([product._id]))
                
            }
        }

        const userId = decodeUser().user.id
        const context = {products:[product._id],userId}
        await this.props.addToCart(context)
        // this.setState({product})
        this.showModal()
    }

    render() {
        console.log(this.state.product)
        const { product } = this.state
        return (
            <Fragment>
                <NavBar />
                <div className='container'>
                    {product ? (
                        <Fragment>
                            <div className='row'>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <img src={process.env.PUBLIC_URL + "/assets/img/eshop.jpg"} alt="" />
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6">
                                    <h1 style={{ margin: "0" }} >{product.name}</h1>
                                    <p
                                        className="lead" style={{ margin: "0" }}>{product.description}
                                    </p>
                                    <p
                                        className='lead' style={{ margin: "0" }}>Features:
                                    </p>
                                    <ul style={{ marginLeft: "5%", marginTop: "0" }} >
                                        {product.features.map((feature, index) => {
                                            <li key={index}>{feature}</li>
                                        })}
                                    </ul>
                                    <Rate disabled allowHalf defaultValue={product.rating} style={{ margin: "0" }} />
                                    <p className="lead" style={{ margin: "0" }}>
                                        Quantity: {product.quantity}
                                    </p>
                                    <h2>INR: {product.price} </h2>
                                    <Button 
                                        type='primary' style={{ marginBottom: "3rem" }} 
                                        onClick={(_)=> this.addProductsToCart(product)} > 
                                        {" "} 
                                        Add To Cart
                                    </Button>
                                </div>
                                <br />
                                <hr />
                                <br />
                                <h1>Products Details</h1>
                                <p className="lead">
                                    <b>{product.detail}</b>
                                </p>
                                <p className='lead' style={{ margin: "0" }}>Main Features:</p>
                                <ul style={{ marginLeft: "5%", marginTop: "0" }} >
                                    {product.features.map((feature, index) => {
                                        <li key={index}>{feature}</li>
                                    })}
                                </ul>
                            </div>
                        </Fragment>
                    )
                        :
                        (
                            <Space size="middle">
                                <Spin size="large" />
                            </Space>
                        )}
                </div>
                {product && this.registerModal(product)}
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    product: state.products.product,
});

export default connect(mapStateToProps, { getProduct, addToCart })(withRouter(ProductDetails))
