import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss';

import { getAllUsers, createNewUserService, deleteUserService , editUserService} from '../../services/userService';

import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';
import {emitter} from '../../utils/emitter'

class UserManage extends Component {

    /** Life cycle 
        Run component
       1.Run constructor -> init state
       2.Did mount : gọi api lấy giá trị và set state
       3.Render
    */ 

    constructor(props){
        super(props);
        this.state={
            arrUsers: [],
            isOpenModalUser:false,
            isOpenModalEditUser:false,
            userEdit:{}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromReact();
    }

    getAllUsersFromReact = async()=>{
        let response = await getAllUsers('ALL')
        if(response && response.errCode ===0){
            this.setState({
                arrUsers: response.users
            })
        }
        console.log('get user from node.js:', response)
    }

    //khi bấm vào nút add new user
    handleAddNewUser =()=>{
        this.setState({
            isOpenModalUser:true
        })
    }

    toggleUserModal =()=>{
        this.setState({
            isOpenModalUser:!this.state.isOpenModalUser,
        })
    }

    toggleUserEditModal=()=>{
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    //Tạo mới nguời dùng
    createNewUser = async(data)=>{
        try {
            let response = await createNewUserService(data); 
            // console.log('response create user: ',response)
            if(response && response.errCode !== 0){
                alert(response.errMessage);
            }
            else{
                //sau khi thêm thành công thì tắt modal
                this.setState({
                    isOpenModalUser:false,
                })
                 //nếu response.errCode === 0 thì sẽ gọi lại hàm getAllUsersFromReact để lấy ra toàn bộ user
                await this.getAllUsersFromReact();

                emitter.emit('EVENT_CLEAR_MODAL_DATA');
            }
        } catch (e) {
            console.log(e);
        }
    }

    //Xóa người dùng
    handleDeleteUser = async(user)=>{
        // console.log('click delete:',user)
        try {
            let res=await deleteUserService(user.id);
            console.log(res);
            if(res && res.errCode===0){
                await this.getAllUsersFromReact();
            }
            else{
                alert(res.errMessage)
            }
        } catch (e) {
            console.log(e)
        }

    }

    //Update người dùng
    handleEditUser= (user)=>{
        this.setState({
            isOpenModalEditUser:true,
            userEdit:user //truyền thông tin user muốn update sang userEdit
        })
    }

    doEditUser= async(user)=>{
        try {
            let res =await editUserService(user);
            if(res &&res.errCode===0){
                this.setState({
                    isOpenModalEditUser:false
                })
                await this.getAllUsersFromReact();
            }
            else{
                alert(res.errMessage)
            }  
        } catch (e) {
            console.log(e)
        }
    }
    render() {
        let arrUsers=this.state.arrUsers
        return (
            <div className="users-container">
               <ModalUser
                    isOpen ={this.state.isOpenModalUser}
                    toogleFromParent={this.toggleUserModal}
                    //truyền func createNewUser sang bên thằng con
                    createNewUser={this.createNewUser}
               />
               {/* Khi isOpenModalEditUser = true thì mới cho hiện ModalEditUser và truyền props vào */}
               {this.state.isOpenModalEditUser &&
                <ModalEditUser 
                        isOpen ={this.state.isOpenModalEditUser}
                        toogleFromParent={this.toggleUserEditModal}
                        currentUser={this.state.userEdit}
                        editUser={this.doEditUser}
                />
               }
                <div className='title text-center'>Manage users with Tuan Anh</div>
                
                {/* tạo nút bấm để add user */}
                <div className='mx-1'>
                    <button 
                        className="btn btn-primary px-3"
                        onClick={()=>this.handleAddNewUser()}
                    
                    ><i className="fas fa-plus"></i> Add new users</button>
                </div>
                
                <div className='user-table mt-3 mx-1'>
                    <table id="customers">
                        <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers.map((item,index)=>{
                            return(
                                <tr key={index}>
                                    <td>{item.email}</td>
                                    <td>{item.firstName}</td>
                                    <td>{item.lastName}</td>
                                    <td>{item.address}</td>
                                    <td>
                                        <button className='btn-edit' onClick={()=>this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                        <button className='btn-delete' onClick={()=> this.handleDeleteUser(item)}><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
