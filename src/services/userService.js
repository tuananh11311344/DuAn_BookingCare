import axios from '../axios';

const handleLoginApi = (userEmail,userPassword)=>{
     return axios.post('/api/login',{email: userEmail,password: userPassword})
}

//User
const getAllUsers= (inputId) =>{
     return axios.get(`/api/get-all-users?id=${inputId}`)
}

const createNewUserService =(data)=>{
     return axios.post('/api/create-new-user',data)
}

const deleteUserService =(userId)=>{
     return axios.delete('/api/delete-user',{
          data:{
               id: userId
          }
     })
}

const editUserService =(inputData)=>{
     return axios.put('/api/edit-user',inputData)
}

const getAllCodeService =(inputType) =>{
     return axios.get(`/api/allcode?type=${inputType}`)
}

//Doctor
const getTopDoctorHomeService =(limitInput)=>{
     return axios.get(`/api/top-doctor-home?limit=${limitInput}`)
}

const getAllDoctors =()=>{
     return axios.get('/api/get-all-doctors');
}

const saveDetailDoctorService = (data) =>{
     return axios.post('/api/save-infor-doctors',data)
}

const getDetailInforDoctor = (inputId)=>{
     return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

export {
     handleLoginApi , 
     getAllUsers , 
     createNewUserService,
     deleteUserService,
     editUserService,
     getAllCodeService,
     getTopDoctorHomeService,
     getAllDoctors,
     saveDetailDoctorService,
     getDetailInforDoctor,
};