import React from 'react'
import { connect } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate} from 'react-router-dom'

const ProtectedRoute = ({component:Component, auth,...rest}) => {
    const location = useLocation()
    const navigate = useNavigate()
    return auth.isAuthenticated ? <Outlet /> : <Navigate to={`/login/${location.search}`} replace state={navigate(-1)}/>
}
    // <Routes>
    //     <Route 
    //         {...rest} 
    //         render = {(props) => 
    //             auth.isAuthenticated ? <Component {...props}/> : <Navigate to="/login" replace={true}/>
    //         }
    //     />
    // </Routes> //for this inreact6 it uses outlet to render child elements  <Navigate to={`/login${rest.location.search}`} replace={true}/>
    // this.navigate({
    //     pathname: '/login',
    //     search: `?${createSearchParams(rest.location.search)}`
    // })
    //navigate(`/login?${createSearchParams(rest.location.search)}`)

    
    



const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps)(ProtectedRoute)
