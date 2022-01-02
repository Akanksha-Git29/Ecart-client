import React, { Component, Fragment } from 'react'
import { isEmpty } from 'lodash'
import { Empty, List, Skeleton, Avatar, } from 'antd'
import { connect } from 'react-redux'
import { getCart , removeFromCart} from '../../actions/cartActions'
import { Link } from 'react-router-dom'
import NavBAr  from '../general/NavBAr'
import Payment from './Payment'

class Cart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            cart: {},
        }
    }

    componentDidMount() {
        this.props.getCart()
    }

    componentWillReceiveProps(nextProps) {

        if (nextProps && nextProps.cart && nextProps.cart.cart) {
            this.setState({ cart: nextProps.cart.cart })
        }
        console.log(nextProps.cart.cart)
    }

    calculateTotal = () =>{
        let total = 0;
        const cartProduct = this.state.cart.products
        cartProduct.forEach(product => {
            total += product.price
        });
        return total
    }

    removeProduct = (product) =>{
        const id = this.props.cart.cart._id
        const context = {id,product}
        this.props.removeFromCart(context).then(_ =>{
            this.props.getCart()
            window.location.reload()
        })
    }

    render() {
        const { cart } = this.state
        console.log(cart)
        return (
            <Fragment>
                <NavBAr />
                <div className='container' >
                    {
                        isEmpty(cart.products) ?
                            <div className='empty-cart-border'>
                                <Empty
                                    image="https://www.flaticon.com/free-icon/shopping-cart_3144486?term=shoping%20cart&related_id=3144486"
                                    description="Your Cart is Empty. KEEP SHOPPING"
                                />
                                <Link to='/' className="btn btn-primary">
                                    Keep Shopping
                                </Link>
                            </div>
                            :
                            <div className="roww">
                                <div className="">
                                    <List
                                        className="demo-loadmore-list"
                                        itemLayout="horizontal"
                                        dataSource={cart.products || []}
                                        renderItem={(item) => (
                                            <List.Item
                                                actions={[
                                                    <Link
                                                        to="#"
                                                        key="list-loadmore-edit"
                                                        onClick={(_) => this.removeProduct(item)}
                                                    >
                                                        Remove from cart
                                                    </Link>,
                                                ]}
                                            >
                                                <Skeleton
                                                    avatar
                                                    title={false}
                                                    loading={item.loading}
                                                    active
                                                >
                                                    <List.Item.Meta
                                                        avatar={
                                                            <Avatar
                                                                shape="square"
                                                                size={100}
                                                                src={item.thumbnail}
                                                            />
                                                        }
                                                        title={item.name}
                                                        description={item.description}
                                                    />
                                                    <div>
                                                        <b>{`$ ${item.price}`}</b>
                                                    </div>
                                                </Skeleton>
                                            </List.Item>
                                        )}
                                    />
                                </div>
                                <div className="col-sm-4 col-md-4 col-lg-4">
                                    <br />
                                    <br />
                                    <h4>{`Total: $ ${this.calculateTotal()}`}</h4>
                                    <Payment cart={cart} total={this.calculateTotal()} />
                                </div>
                                <div style={{ textAlign: "center" }}>
                                    {cart.products && (
                                        <Link to="/" className="btn btn-primary">
                                            Keep Shopping
                                        </Link>
                                    )}
                                </div>
                            </div>
                    }
                </div>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => ({
    cart: state.cart
})

export default connect(mapStateToProps, { getCart, removeFromCart })(Cart)