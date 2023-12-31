import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import {LANGUAGES, CRUD_ACTIONS} from "../../../utils/constant";

import * as actions from "../../../store/actions";
import "./UserRedux.scss";

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import TableManageUser from './TableManageUser';
import CommonUtils from '../../../utils/CommonUtils';

class UserRedux extends Component {

    constructor(props){
        super(props);
        this.state={
            genderArr :[],
            positionArr: [],
            roleArr:[],
            // lưu link ảnh cần preview
            previewImgURL:'',
            //isOpen: mở hoặc tắt ảnh
            isOpen:false,

            email:'',
            password: '',
            firstName :'',
            lastName: '',
            phoneNumber : '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',

            action :'',
            editUserId:'',

        }
    }

    async componentDidMount() {
                this.props.getGenderStart();
                this.props.getPositionStart();
                this.props.getRoleStart();

        // try {
        //     let res = await getAllCodeService('gender');
        //     console.log('check type:',res)  
        //     if(res && res.errCode ===0){
        //         this.setState({
        //             genderArr: res.data
        //         })
        //     }
        // } catch (e) {
        //     console.log(e)
        // }
    }

      //render => disupdate
    componentDidUpdate(prevProps,prevState,snapshot){  
        //so sánh hiện tại (this) và quá khứ (previous)
        if(prevProps.genderRedux !== this.props.genderRedux){
            let arrGenders=this.props.genderRedux;
            this.setState({
                genderArr: arrGenders,
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap: ''
            })
        }
        if(prevProps.roleRedux !== this.props.roleRedux){
            let arrRoles = this.props.roleRedux;
            this.setState({
                roleArr: arrRoles,
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : ''
            })
        }
        if(prevProps.positionRedux !== this.props.positionRedux){
            let arrPositions =this.props.positionRedux;
            this.setState({
                positionArr: arrPositions,
                position: arrPositions && arrPositions.length >0 ? arrPositions[0].keyMap : ''
            })
        }
        if(prevProps.listUsers !== this.props.listUsers){
            let arrGenders=this.props.genderRedux;
            let arrRoles = this.props.roleRedux;
            let arrPositions =this.props.positionRedux;
            this.setState({
                email:'',
                password: '',
                firstName :'',
                lastName: '',
                phoneNumber : '',
                address: '',
                gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap: '',
                position: arrPositions && arrPositions.length >0 ? arrPositions[0].keyMap : '',
                role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
                avatar: '',
                previewImgURL:'',
                action: CRUD_ACTIONS.CREATE,
            })
        }
    }

    handleOnChangeImage = async (event)=>{
        //event.target.files: lấy ra được danh sách file
        let data =  event.target.files;
        //lấy ra file đầu tiên
        let file = data[0];
        if(file){
            let base64 = await CommonUtils.getBase64(file);
            console.log('base64 image:',base64)
            //lấy ra đường link của ảnh
            let objectURL = URL.createObjectURL(file)
            this.setState({
                previewImgURL: objectURL,
                avatar: base64
            })
        }
    }

    //mở ảnh phóng to
    openPreviewImage=()=>{
        this.setState({
            isOpen:true
        })
    }

    //Change input
    onChangeInput =(event,id)=>{
        let copyState ={...this.state};
        copyState[id]=event.target.value;

        this.setState({
            ...copyState
        })
    }

    //validate input
    checkValidateInput =()=>{
        let isValid =true;
        let arrCheck =['email' , 'password' , 'firstName', 'lastName', 'phoneNumber', 'address'];
        for(let i=0;i < arrCheck.length;i++){
            if(!this.state[arrCheck[i]]){
                isValid=false;
                alert('This input is required: ' + arrCheck[i]); 
                break;
            }
        }
        return isValid;
    }

    //Lưu user
    handleSaveUser =()=>{
        // console.log("check onChange before submit : ",this.state)
        let isValid = this.checkValidateInput();
        if(isValid === false) return;

        let action =this.state.action;

        if(action === CRUD_ACTIONS.CREATE){
            //fire redux create user
             this.props.createNewUser({
                email: this.state.email,
                password: this.state.password ,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber:this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar:this.state.avatar
            })
        }
        if(action ===CRUD_ACTIONS.EDIT){
            //fire redux edit user
            this.props.editUserRedux({
                id:this.state.editUserId,
                email: this.state.email,
                password: this.state.password ,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phonenumber:this.state.phoneNumber,
                gender: this.state.gender,
                roleId: this.state.role,
                positionId: this.state.position,
                avatar:this.state.avatar,
            })
        }
    }

    hanleEditUserFromParent =(user)=>{
        // console.log('hoidanit check hanleEditUser from parent',user)
        let imageBase64=' '
        if(user.image){
            imageBase64 = new Buffer(user.image,'base64').toString('binary');
        }
        
        this.setState({
            editUserId:user.id,
            email: user.email,
            //ko hiển thị ra password để edit 
            password: "HASHCODE",
            firstName : user.firstName,
            lastName: user.lastName,
            phoneNumber : user.phonenumber,
            address: user.address,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            avatar: "",
            previewImgURL:imageBase64,
            action: CRUD_ACTIONS.EDIT,
        })
    }
    
    render() {
        let genders=this.state.genderArr;
        let positions=this.state.positionArr;
        let roles=this.state.roleArr;
        let language=this.props.language;

        let {email , password , firstName, lastName, phoneNumber, address, gender, position, role, avatar} =this.state;

        return (
            <div className="user-redux-container">
                <div className="title">
                    Learn React-Redux với "Hỏi Dân IT" youtube Channel
                </div>
                <div className="user-redux-body">
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 my-3'><FormattedMessage id="manage-user.add" /></div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.email" /></label>
                                <input className='form-control' type='email' 
                                    value={email} 
                                    onChange={(event)=>this.onChangeInput(event,'email')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true :false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.password" /></label>
                                <input className='form-control' type='password'
                                    value={password} 
                                    onChange={(event)=>this.onChangeInput(event,'password')}
                                    disabled={this.state.action === CRUD_ACTIONS.EDIT ? true :false}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.first-name" /></label>
                                <input className='form-control' type='text' 
                                    value={firstName} 
                                    onChange={(event)=>this.onChangeInput(event,'firstName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.last-name" /></label>
                                <input className='form-control' type='text' 
                                    value={lastName} 
                                    onChange={(event)=>this.onChangeInput(event,'lastName')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.phone-number" /></label>
                                <input className='form-control' type='text' 
                                    value={phoneNumber} 
                                    onChange={(event)=>this.onChangeInput(event,'phoneNumber')}
                                />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id="manage-user.address" /></label>
                                <input className='form-control' type='text' 
                                    value={address} 
                                    onChange={(event)=>this.onChangeInput(event,'address')}
                                />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.gender" /></label>
                                <select id="inputState" className="form-control" 
                                    onChange={(event)=>this.onChangeInput(event,'gender')}
                                    value={gender}
                                >
                                    {genders && genders.length >0 &&
                                        genders.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.position" /></label>
                                <select id="inputState" className="form-control"
                                    onChange={(event)=>this.onChangeInput(event,'position')}
                                    value={position}
                                >
                                    {positions && positions.length >0 &&
                                        positions.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.role" /></label>
                                <select id="inputState" className="form-control"
                                    onChange={(event)=>this.onChangeInput(event,'role')}
                                    value={role}
                                >
                                    {roles && roles.length >0 &&
                                        roles.map((item,index)=>{
                                            return(
                                                <option key={index} value={item.keyMap}>{language === LANGUAGES.VI ? item.valueVi : item.valueEn}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id="manage-user.image" /></label>
                                <div className='preview-img-container'>
                                    <input id='previewimg' type='file' hidden
                                        onChange={(event) =>this.handleOnChangeImage(event)}
                                    />
                                    <label className='label-upload' htmlFor='previewimg'>Tải ảnh <i className="fas fa-upload"></i></label>
                                    <div className='preview-image'
                                        style={{backgroundImage: `url(${this.state.previewImgURL})`}}
                                        onClick={()=>this.openPreviewImage()}
                                    >
                                    </div>
                                </div>   
                            </div>
                            <div className='col-12 my-3'>
                                <button className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning px-3': 'btn btn-primary px-3'}
                                    onClick={()=>this.handleSaveUser()}  
                                >
                                {this.state.action === CRUD_ACTIONS.EDIT ? 
                                    <FormattedMessage id="manage-user.edit" /> :
                                    <FormattedMessage id="manage-user.save" />
                                } 
                                </button>
                            </div>
                            <div className='col-12 mb-5'>
                                <TableManageUser 
                                    hanleEditUserFromParent ={this.hanleEditUserFromParent}
                                    // action={this.state.action}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                
                {this.state.isOpen &&                   
                    <Lightbox
                        mainSrc={this.state.previewImgURL}                    
                        //onCloseRequest: khi tắt ảnh thì cần làm gì
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genderRedux:state.admin.genders,
        positionRedux : state.admin.positions,
        roleRedux : state.admin.roles,
        listUsers :state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart : ()=>dispatch(actions.fetchGenderStart()),
        getPositionStart : ()=>dispatch(actions.fetchPositionStart()),
        getRoleStart : ()=>dispatch(actions.fetchRoleStart()),
        createNewUser: (data)=>dispatch(actions.createNewUser(data)),
        editUserRedux :(data)=>dispatch(actions.editUser(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
