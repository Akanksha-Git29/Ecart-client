import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom'
import { getProduct } from '../../actions/productAction';
import { Spin, Space, Button, Rate, Modal, Alert, message } from 'antd';
import NavBar from '../general/NavBAr'
import { isEmpty } from 'lodash'
import { decodeUser } from '../../util';
import { addToCart } from '../../actions/cartActions';
import {getProfile} from '../../actions/profileAction'

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
            visible: false,
            gotProfile: false,
        }
    }

    componentDidMount() {
        const pid = this.props.id
        this.props.getProduct(pid)
        // console.log(pid)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        const product = nextProps.product;
        if (nextProps && nextProps.product) {
            const product = nextProps.product
            this.setState({ product })
        }
        if (!this.state.gotProfile) {
            this.props.getProfile(product.userId);
            this.setState({ gotProfile: true });
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
                    <br />
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

    async addProductsToCart(product) {
        //check if signed in
        // if not use localStorage rather than our backend
        if (!localStorage.getItem("token")) {
            const productExsists = !isEmpty(localStorage.getItem("products"))
            if (productExsists) {
                const products = JSON.parse(localStorage.getItem("products"))
                products.push(product._id)
                this.showModal()
                return localStorage.setItem("products", JSON.stringify([product._id]))
            }
            else {
                this.showModal()
                return localStorage.setItem("products", JSON.stringify([product._id]))

            }
        }

        const userId = decodeUser().user.id
        const context = { products: [product._id], userId }
        await this.props.addToCart(context)
        // this.setState({product})
        this.showModal()
    }

    render() {
        // console.log(this.state.product)
        const { profile } = this.props;
        console.log(profile);
        const { product } = this.state
        let facebook,
            instagram,
            twitter,
            linkedin = "";
        if (profile) {
            if (
                profile.socialMedia.facebook &&
                !profile.socialMedia.facebook.substring(0, 4).includes("http")
            ) {
                facebook = `http${profile.socialMedia.facebook}`;
            } else {
                facebook = profile.socialMedia.facebook;
            }
            if (
                profile.socialMedia.instagram &&
                !profile.socialMedia.instagram.substring(0, 4).includes("http")
            ) {
                instagram = `http${profile.socialMedia.instagram}`;
            } else {
                instagram = profile.socialMedia.instagram;
            }
            if (
                profile.socialMedia.twitter &&
                !profile.socialMedia.twitter.substring(0, 4).includes("http")
            ) {
                twitter = `http${profile.socialMedia.twitter}`;
            } else {
                twitter = profile.socialMedia.twitter;
            }
            if (
                profile.socialMedia.linkedin &&
                !profile.socialMedia.linkedin.substring(0, 4).includes("http")
            ) {
                linkedin = `http${profile.socialMedia.linkedin}`;
            } else {
                linkedin = profile.socialMedia.linkedin;
            }
        }
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
                                        onClick={(_) => this.addProductsToCart(product)} >
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
                    <br />
                    <h3>Seller Information</h3>
                    {profile && (
                        <Fragment>
                            <nav>
                                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                                    <a
                                        className="nav-item nav-link active"
                                        id="nav-home-tab"
                                        data-toggle="tab"
                                        href="#nav-home"
                                        role="tab"
                                        aria-controls="nav-home"
                                        aria-selected="true"
                                    >
                                        Home
                                    </a>
                                    <a
                                        className="nav-item nav-link"
                                        id="nav-profile-tab"
                                        data-toggle="tab"
                                        href="#nav-profile"
                                        role="tab"
                                        aria-controls="nav-profile"
                                        aria-selected="false"
                                    >
                                        Social Media
                                    </a>
                                    <a
                                        className="nav-item nav-link"
                                        id="nav-contact-tab"
                                        data-toggle="tab"
                                        href="#nav-contact"
                                        role="tab"
                                        aria-controls="nav-contact"
                                        aria-selected="false"
                                    >
                                        Contact
                                    </a>
                                </div>
                            </nav>
                            <div className="tab-content" id="nav-tabContent">
                                <div
                                    className="tab-pane fade show active"
                                    id="nav-home"
                                    role="tabpanel"
                                    aria-labelledby="nav-home-tab"
                                >
                                    <br />
                                    <h4 style={{ textDecoration: "underline" }}>About Seller</h4>
                                    {profile.bio && <p className="lead">{profile.bio}</p>}
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="nav-profile"
                                    role="tabpanel"
                                    aria-labelledby="nav-profile-tab"
                                >
                                    <br />
                                    <h4>Follow Us with the links below:</h4>
                                    <div className="row">
                                        {facebook && (
                                            <span className="social_icons">
                                                <a href={facebook} target="_blank">
                                                    <i className="fab fa-facebook fa-2x"></i>
                                                </a>
                                            </span>
                                        )}
                                        {instagram && (
                                            <span className="social_icons">
                                                <a href={instagram} target="_blank">
                                                    <i className="fab fa-instagram fa-2x"></i>
                                                </a>
                                            </span>
                                        )}
                                        {twitter && (
                                            <span className="social_icons">
                                                <a href={twitter} target="_blank">
                                                    <i className="fab fa-twitter fa-2x"></i>
                                                </a>
                                            </span>
                                        )}
                                        {linkedin && (
                                            <span className="social_icons">
                                                <a href={linkedin} target="_blank">
                                                    <i className="fab fa-linkedin fa-2x"></i>
                                                </a>
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="nav-contact"
                                    role="tabpanel"
                                    aria-labelledby="nav-contact-tab"
                                >
                                    <br />
                                    {profile.address && (
                                        <p className="lead">Address: {profile.address}</p>
                                    )}
                                </div>
                            </div>
                        </Fragment>
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

export default connect(mapStateToProps, { getProduct, addToCart, getProfile })(withRouter(ProductDetails))
