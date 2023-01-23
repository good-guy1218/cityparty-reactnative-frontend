import { SETUSER, SETUSERPROFILE, SETSOCKETINSTANCE } from '../constants';
const initialState = {
    user: null,
    userProfile: null,
    filter:null,
};
const userReducer = (state = initialState, action) => {
    switch(action.type) {
        case SETUSER:
            return {
                ...state,
                user:action.payload
            };
        case SETUSERPROFILE:
            return {
                ...state,
                userProfile:action.payload
            };
        case SETSOCKETINSTANCE:
            return {
                ...state,
                socketInstance:action.payload
            };
        default:
            return state;
    }
}
export default userReducer;