import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import {emitter} from '../../utils/emitter'

import './UserManage.scss'
class ModalUser extends Component {

    constructor(props){ 
        super(props);
        this.state={
            email:'',
            password:'',
            firstName:'',
            lastName:'',
            address:'',
        }
        this.listenToEmitter();
    }

    listenToEmitter(){
        emitter.on('EVENT_CLEAR_MODAL_DATA',()=>{
            this.setState({
                email:'',
                password:'',
                firstName:'',
                lastName:'',
                address:'',
            })
        });
    }

    componentDidMount() {
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
    
    //Khi bấm vào thêm user
    handleAddNewUser =()=>{     
            let isValid= this.handleValidateInput();
            if(isValid){
                //truyền dữ liệu this.state sang bên thằng cha
                this.props.createNewUser(this.state);
                // console.log('data modal: '+this.state)
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
            <ModalHeader toggle={()=>{this.toggle()}}>Create a new user</ModalHeader>
                <ModalBody>
                    <div className='modal-user-body'>
                        <div className='input-container'>
                            <label>Email:</label>
                            <input
                            value={this.state.email}
                             type='text' 
                             onChange={(event)=>this.handleOnChangeInput(event,"email")} />
                         </div>
                        <div className='input-container'>
                            <label>Password:</label>
                            <input
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
                     onClick={()=>{this.handleAddNewUser()}}>
                        Add new
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
