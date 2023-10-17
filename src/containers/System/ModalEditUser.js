import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import {emitter} from '../../utils/emitter'
import _ from 'lodash'

import './UserManage.scss'
class ModalEditUser extends Component {

    constructor(props){ 
        super(props);
        this.state={
            id:'',
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
        }
    }

    componentDidMount() {
        let user =this.props.currentUser;
        //nếu như có user và user không rỗng
        if(user && !_.isEmpty(user)){
            this.setState({
                id:user.id,
                email:user.email,
                password:'hashcode',
                firstName:user.firstName,
                lastName:user.lastName,
                address:user.address,
            })
        }
        console.log('check props from parent:',this.props.currentUser)
    }

    toggle =()=>{
        this.props.toogleFromParent();
    }

    //dùng handleOnChangeInput cho tất cả các thẻ input, phân biệt bằng id 
    handleOnChangeInput=(event,id)=>{
        let copyState = {...this.state};
        copyState[id] = event.target.value;
        this.setState({
            ...copyState
        })
    }
    
    //kiểm tra dữ liệu thẻ input
    handleValidateInput =()=>{
        //isValid: kiểm tra xem có hợp lệ không
        let isValid=true;
        //arrInput: 1 mảng các phần tử cần phải check
        let arrInput= ['email','password','firstName','lastName','address'];
        for(let i=0;i<arrInput.length;i++){
            //nếu ô input nào để trống thì alert ra lỗi tại thẻ input đó
            if(!this.state[arrInput[i]]){
                isValid=false;
                alert('Missing parameter : '+ arrInput[i]);
                break;
            }
        }
        return isValid;
    }
    
    //Khi bấm vào thêm nút save changes
    handleSaveUser =()=>{     
            let isValid= this.handleValidateInput();
            if(isValid){
                //truyền dữ liệu this.state sang bên thằng cha
                this.props.editUser(this.state);
            }
    }


    render() {
      
        return (
            
        <Modal 
            isOpen={this.props.isOpen} 
            toggle={()=>{this.toggle()}} 
            className={'modal-user-container'}
            size='lg'
        >
            <ModalHeader toggle={()=>{this.toggle()}}>Edit a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input
                            value={this.state.email}
                             type='text'  
                             disabled                          
                             onChange={(event)=>this.handleOnChangeInput(event,"email")} />
                         </div>
                        <div className='input-container'>
                            <label>Password:</label>
                            <input
                            disabled
                            value={this.state.password} 
                            type='password' 
                            onChange={(event)=>this.handleOnChangeInput(event,"password")} />
                        </div>
                        <div className='input-container'>
                            <label>First name:</label>
                            <input 
                            value={this.state.firstName}
                            type='text' 
                            onChange={(event)=>this.handleOnChangeInput(event,"firstName")} />
                        </div>
                        <div className='input-container'>
                            <label>Last name:</label>
                            <input 
                            value={this.state.lastName}
                            type='text' 
                            onChange={(event)=>this.handleOnChangeInput(event,"lastName")} />
                        </div>
                        <div className='input-container max-w'>
                            <label>Address:</label>
                            <input 
                            value={this.state.address}
                            type='text' 
                            onChange={(event)=>this.handleOnChangeInput(event,"address")}/>
                        </div>
                    </div>        
                </ModalBody>
                <ModalFooter>
                    <Button
                     color="primary" 
                     className='px-3' 
                     onClick={()=>{this.handleSaveUser()}}>
                        Save changes
                    </Button>{' '}
                    <Button color="secondary" className='px-3' onClick={()=>{this.toggle()}}>
                        Close
                    </Button>
            </ModalFooter>
        </Modal>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
