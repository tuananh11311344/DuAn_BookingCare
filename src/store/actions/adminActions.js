import actionTypes from './actionTypes';
import {getAllCodeService , createNewUserService, getAllUsers, deleteUserService, editUserService,getTopDoctorHomeService,getAllDoctors, saveDetailDoctorService} from '../../services/userService';
import { toast } from 'react-toastify';

//gender
export const fetchGenderStart = () => {
    return async(dispatch,getState)=>{
        try {
            let res=await getAllCodeService("gender");
            if(res && res.errCode===0){
                dispatch(fetchGenderSuccess(res.data))
            }else{
                dispatch(fetchGenderFailed())
            }
        } catch (e) {
            dispatch(fetchGenderFailed());
        }
    }
}

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data:genderData
})

export const fetchGenderFailed = () => ({
    type: actionTypes.FETCH_GENDER_FAILED
})

//position
export const fetchPositionStart = () => {
    return async(dispatch,getState)=>{
        try {
            let res=await getAllCodeService("position");
            if(res && res.errCode===0){
                dispatch(fetchPositionSuccess(res.data))
            }else{
                dispatch(fetchPositionFailed())
            }
        } catch (e) {
            dispatch(fetchPositionFailed());
        }
    }
}

export const fetchPositionSuccess = (positionData) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data:positionData
})

export const fetchPositionFailed = () => ({
    type: actionTypes.FETCH_POSITION_FAILED
})

//role
export const fetchRoleStart = () => {
    return async(dispatch,getState)=>{
        try {
            let res=await getAllCodeService("role");
            if(res && res.errCode===0){
                dispatch(fetchRoleSuccess(res.data))
            }else{
                dispatch(fetchRoleFailed())
            }
        } catch (e) {
            dispatch(fetchRoleFailed());
        }
    }
}
export const fetchRoleSuccess = (roleData) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data:roleData
})

export const fetchRoleFailed = () => ({
    type: actionTypes.FETCH_ROLE_FAILED
})

//CRUD Redux
//create
export const createNewUser =(data)=>{
    return async(dispatch,getState)=>{
        try {
            let res=await createNewUserService(data);
            if(res && res.errCode===0){
                toast.success("Create a new user success!");
                dispatch(saveUserSuccess())
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Create a new user error!");
                dispatch(saveUserFailed())
            }
        } catch (e) {
            toast.error("Create a new user error!");
            dispatch(saveUserFailed());
        }
    }
}

export const saveUserSuccess = ()=>({
    type:actionTypes.CREATE_USER_SUCCESS
})

export const saveUserFailed = ()=>({
    type:actionTypes.CREATE_USER_FAILED
})

//read
export const fetchAllUserStart = () => {
    return async(dispatch,getState)=>{
        try {
            let res=await getAllUsers("ALL");
            if(res && res.errCode===0){
                dispatch(fetchAllUserSuccess(res.users.reverse()))
            }else{
                toast.error("Fetch all user error!");
                dispatch(fetchAllUserFailed())
            }
        } catch (e) {
            toast.error("Fetch all user error!");
            dispatch(fetchAllUserFailed());
        }
    }
}

export const fetchAllUserSuccess = (data)=>({
    type:actionTypes.FETCH_ALL_USER_SUCCESS,
    users: data
})

export const fetchAllUserFailed = ()=>({
    type:actionTypes.FETCH_ALL_USER_FAILED
})

//delete
export const deleteUser =(userId)=>{
    return async(dispatch,getState)=>{
        try {
            let res=await deleteUserService(userId);
            if(res && res.errCode===0){
                toast.success("Delete the user success!");
                dispatch(saveUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Delete the user error!");
                dispatch(saveUserFailed())
            }
        } catch (e) {
            toast.error("Delete the user error!");
            dispatch(saveUserFailed());
        }
    }
}

export const deleteUserSuccess =()=> ({
    type: actionTypes.DELETE_USER_SUCCESS
})

export const deleteUserFail =()=> ({
    type: actionTypes.DELETE_USER_FAILED
})

//edit
export const editUser =(data)=>{
    return async(dispatch,getState)=>{
        try {
            let res=await editUserService(data);
            if(res && res.errCode===0){
                toast.success("Update the user success!");
                dispatch(editUserSuccess());
                dispatch(fetchAllUserStart());
            }else{
                toast.error("Update the user error!");
                dispatch(editUserFailed())
            }
        } catch (e) {
            toast.error("Update the user error!");
            dispatch(editUserFailed());
        }
    }
}

export const editUserSuccess =()=> ({
    type: actionTypes.EDIT_USER_SUCCESS
})

export const editUserFailed =()=> ({
    type: actionTypes.EDIT_USER_FAILED
})

//get top doctor
export const fetchTopDoctor =()=>{
    return async(dispatch,getState)=>{
        try {
            let res= await getTopDoctorHomeService('');
            // console.log('check response',res);
            if(res && res.errCode ===0){
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
                    dataDoctors:res.data
                })
            }
            else{
                dispatch({
                    type:actionTypes.FETCH_TOP_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type:actionTypes.FETCH_TOP_DOCTOR_FAILED,
            })
        }
    }
}

//get all doctor
export const fetchAllDoctor =()=>{
    return async(dispatch,getState)=>{
        try {
            let res= await getAllDoctors();
            if(res && res.errCode ===0){
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataDr:res.data
                })
            }
            else{
                dispatch({
                    type:actionTypes.FETCH_ALL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log(e);
            dispatch({
                type:actionTypes.FETCH_ALL_DOCTOR_FAILED,
            })
        }
    }
}

//save doctor
export const saveDetailDoctor = (data) =>{
    return async(dispatch,getState)=>{
        try {
            let res= await saveDetailDoctorService(data);
            if(res && res.errCode === 0){
                toast.success("Save infor detail doctor success!");
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,
                })
            }
            else{
                toast.error("Save infor detail doctor error!");
                dispatch({
                    type:actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
                })
            }
        } catch (e) {
            console.log(e);
            toast.error("Save infor detail doctor error!");
            dispatch({
                type:actionTypes.SAVE_DETAIL_DOCTOR_FAILED,
            })
        }
    }
}