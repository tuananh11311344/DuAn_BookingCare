import actionTypes from '../actions/actionTypes';

const initialState = {
    genders:[],
    roles:[],
    positions: [],
    users:[],
    topDoctors:[],
    allDoctors:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_SUCCESS:  
            state.genders=action.data;
            return {
                ...state,   
                   
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.genders=[];
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_SUCCESS:  
            state.positions=action.data;
            return {
                ...state,   
                   
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.positions=[];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:  
            state.roles=action.data;
            return {
                ...state,   
                   
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles=[];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users =action.users;
            return{
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.users=[];
            return{
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors=action.dataDoctors;
            return{
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAILED:
            state.topDoctors=[];
            return{
                 ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.allDoctors=action.dataDr;
            return{
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.allDoctors=[];
            return{
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;