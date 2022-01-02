import React , {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import { Provider } from 'react-redux'
import store from './store'
import setAuthToken from './util/setAuthToken';
import { setCurrentUser } from './actions/authAction';
import { decodeUser } from './util';
import {addToCart} from './actions/cartActions'

//importing general componenets
import ProtectedRoute from './components/general/ProtectedRoute'; //wrapper under routes

//customers component
import Cart from './components/customers/Cart';

//landing componenets
import Landing from './components/landing';
import ProductDetails from './components/landing/ProductDetails';

//dashboard componenets
import Dashboard from './components/dashboard/index'
import Home from './components/dashboard/components/Home';

//user componenets
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import "./App.css"
import 'antd/dist/antd.css'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

function App(props) {
  useEffect(() => {
    store.dispatch(setCurrentUser())
  }, [])

  const grabProductsFromStorage = () =>{
    const userId = decodeUser().user.id
    const cartProducts = JSON.parse(localStorage.getItem("products"))
    const context = {products: cartProducts, userId}
    store.dispatch(addToCart(context))
    localStorage.removeItem("products")
  }

  if(localStorage.getItem("token") && localStorage.getItem("products")){
    grabProductsFromStorage()
  }

  return (
    <Provider store={store}>
      <Router>
        <Routes>
        <Route exact path="/" element={<Landing/>} />
        <Route exact path="/products/:id" element={<ProductDetails/>} />
          <Route exact path="/" element={<ProtectedRoute/>}>  
            <Route  exact
              path="/dashboard/*" 
              element={<Dashboard {...props} nestedRoute={Home} />} 
            />
            <Route exact path="/cart" element={<Cart />} />
          </Route>
          <Route exact path="/register" element={<Register/>} />
          <Route exact path="/login" element={<Login/>} />
        </Routes>
      </Router>
    </Provider>

  );
}

export default App;
