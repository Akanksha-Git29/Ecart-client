import axios from "axios";
import { GET_PROFILE, PROFILE_ERROR , ERRORS} from "./types";
import { getServer } from "../util";
import { useNavigate ,} from 'react-router-dom'

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

export const getProfile = (id) =>async dispatch =>{
    try {
        const res = await axios.get(`${getServer()}/api/profile/${id}`)
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        })
    } catch (error) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: error.response.statusType}
        })
    }
}

export const createProfile = (profileData, history) => async dispatch =>{
    try {
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        axios.post(`${getServer()}/api/profile/`, profileData, config)
        .then((_) => history("/dashboard/profile"))
    } catch (err) {
        const error = err.response.data.errors;
        if (error) {
            dispatch({
                type: ERRORS,
                payload: error,
            });
        } else {
            dispatch({
                type: PROFILE_ERROR,
                payload:{msg: err.response.statusType}
            });
        }
    }
}

export const deleteAccount = (history) => async (dispatch) =>{
    try {
        axios.delete(`${getServer()}/api/profile`)
        .then((_)=>{
            localStorage.removeItem("token")
            history("/")
            window.location.reload()
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload:{msg: err.response.statusType}
        });
    }
}