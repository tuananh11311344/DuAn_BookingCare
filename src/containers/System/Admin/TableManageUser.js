import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import './TableManageUser.scss';

class TableManageUser extends Component {

    /** Life cycle 
        Run component
       1.Run constructor -> init state
       2.Did mount : gọi api lấy giá trị và set state
       3.Render
    */ 

    constructor(props){
        super(props);
        this.state={
            userRedux: []
        }
    }

    componentDidMount() {
        this.props.fetchUserRedux();
    }

    //sau khi component nhận thấy sự thay đổi
    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.listUsers !== this.props.listUsers){
            this.setState({
                userRedux: this.props.listUsers
            })
        }
    }

    //delete user
    handleDeleteUser =(user) =>{
        this.props.deleteUserRedux(user.id);
    }

    //Edit user
    handleEditUser = (user)=>{
        this.props.hanleEditUserFromParent(user);
    }

    render() {
        let arrUsers=this.state.userRedux;
        return (
                <table id='TableManageUser'>
                    <tbody>
                        <tr>
                            <th>Email</th>
                            <th>First name</th>
                            <th>Last name</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                        {arrUsers && arrUsers.length >0 &&
                            arrUsers.map((item,index)=>{
                                return(
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit'
                                                onClick={()=> this.handleEditUser(item)}
                                            ><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' 
                                                onClick={()=>this.handleDeleteUser(item)}
                                            ><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
        );
    }

}

const mapStateToProps = state => {
    return {
        listUsers :state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchUserRedux :()=> dispatch(actions.fetchAllUserStart()),
        deleteUserRedux : (id)=> dispatch(actions.deleteUser(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageUser);
