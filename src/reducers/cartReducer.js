import { GET_CART, ERRORS } from "../actions/types";

const intialState = {
    cart: {},
    errors: {}
}

export default function (state = intialState, action){
    const {type, payload} = action
    switch(type){
        case GET_CART:
            // console.log(payload)
            return{
                ...state,
                cart: payload.result
            }
        case ERRORS:
            return{
                ...state,
                errors:payload
            }
        default:
            return state
    }
}