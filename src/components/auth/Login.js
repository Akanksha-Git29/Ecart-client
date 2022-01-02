import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import Input from '../general/Input'
import { message } from 'antd'
import { login } from '../../actions/authAction';
import { useNavigate, useLocation ,} from 'react-router-dom'
import { decodeUser } from '../../util';
import { addToCart } from '../../actions/cartActions';

export const withRouter = (Component) => { //works only for react16-17 //hooks
    const Wrapper = (props) => { 
        const history = useNavigate(); //userNavigator ~ useHistory ~withRoutes
        const location = useLocation(); //to get child from a nested props

        return (
            <Component
                history={history}
                {...props}
                location={location}
                {...props}
            />
        );
    };

    return Wrapper;
};


class Login extends Component {
    constructor(){
        super()
        this.state={
            email:"",
            password:"",
        }

        this.onChange = this.onChange.bind(this)
        this.OnSubmit = this.OnSubmit.bind(this)
    }

    componentWillReceiveProps(nextProps){
        const search = this.props.location.search
        let split = search.split("redirect=")
        split = split[split.length-1]
        const hasRedirect = search.includes("redirect")
        console.log(split)

        if(nextProps && nextProps.auth.errors && nextProps.auth.errors.length > 0){
            nextProps.auth.errors.forEach(error => {
                message.error(error.msg)
            })
        }

        console.log(nextProps)
        if(nextProps && nextProps.auth.errors && nextProps.auth.errors.length > 0){
            nextProps.auth.errors.forEach(error => {
                message.error(error.msg)
            })
        }

        if(nextProps.isAuthenticated){
            if(split && hasRedirect){
                if(split === '/cart' && localStorage.getItem("token") && localStorage.getItem("products")){
                    const userId = decodeUser().user.id
                    const cartProdcuts = JSON.parse(localStorage.getItem("products"))
                    const context = {products: cartProdcuts, userId}
                    this.props.addToCart(context)
                    localStorage.removeItem("products")
                }
                this.props.history(split)
            }
            else{
                message.success("Thankyou for Login In")
                setTimeout(()=>{ this.props.history("/")},3000) //in v6 and above push isnot needed
            }
            
        }
    }

    onChange(e){
        this.setState({[e.target.name] : e.target.value})
    }

    OnSubmit(e){
        const {email,password} = this.state
        const user ={
            email,
            password
        }
        this.props.login(user)
    }

    render() {
        const search = this.props.location.search
        const split = search.split("redirect=")
        const redirect = split[split.length-1]
        const hasRedirect = redirect.length > 0 && search.includes("redirect")
        return (
            <div className='container'>
                <h1 className="large text-primary">Sign In</h1>
                <p className="lead">
                    <i class="fas fa-user"></i>
                    Sign Into Your Account
                </p>
                <div className="form">
                    <Input 
                        name="email"
                        type='email' 
                        placeholder='Enter Email' 
                        value={this.state.email}
                        onChange={this.onChange} 
                    />
                </div>
                <div className="form">
                    <Input 
                        name="password"
                        type='password' 
                        placeholder='Enter Password' 
                        value={this.state.password}
                        onChange={this.onChange} 
                    />
                </div>
                <button className="btn btn-primary" onClick={this.OnSubmit} >Sign In</button>
                <p className="my-1">Don't Have an Account? <Link to={`/register?role=customer${hasRedirect ?"&redirect=" + redirect : ""}`} >Sign Up</Link> </p>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login, addToCart })(withRouter(Login))
