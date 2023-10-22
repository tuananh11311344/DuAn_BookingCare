import React, { Component } from 'react';
import { connect } from "react-redux";
import './ManageSchedule.scss'
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant';
import { toast } from 'react-toastify';

import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import _ from 'lodash';

class ManageSchedule extends Component {
    constructor(props){
        super(props);
        this.state={
            selectedDoctor: '',
            listDoctors:[],
            currentDate: '',
            rangeTime: [] 
        }
    }

    componentDidMount(){
        this.props.fetchAllDoctors();
        this.props.fetchAllScheduleTime();
    }

    handleChangeSelect = (selectedDoctor) => {
        this.setState({ selectedDoctor :selectedDoctor });
    };

    buildDataInputSelect = (inputData) => {
        let result =[];
        let {language} =this.props;
        if(inputData && inputData.length >0){
            inputData.map((item,index)=>{
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language === LANGUAGES.VI ? labelVi : labelEn;
                object.value= item.id;
                result.push(object)
            })
        }
        return result;
    }

     //sau khi component nhận thấy sự thay đổi
     componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.allDoctors !== this.props.allDoctors){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.language !== this.props.language){
            let dataSelect =this.buildDataInputSelect(this.props.allDoctors)
            this.setState({
                listDoctors: dataSelect
            })
        }
        if(prevProps.allScheduleTime !== this.props.allScheduleTime){
            //thêm 1 trường isSelected vào trong từng phần tử trong mảng allScheduleTime
            let data =this.props.allScheduleTime;
            if(data && data.length>0){
                data = data.map(item =>({
                    ...item,
                    isSelected:false,
                }))
            }
            this.setState({
                rangeTime: data
            })
        }
    }

    handleOnChangeDatePicker =(date)=>{
        this.setState({
            //date trả ra 1 mảng nên ta cần lấy phân tử đầu tiên
            currentDate : moment(date[0]).format('DD/MM/YYYY')
        })
    }   

    handleClickBtnTime =(time)=>{
        // console.log('check time click:',time)
        let {rangeTime} =this.state;
        if(rangeTime && rangeTime.length > 0){
            rangeTime = rangeTime.map(item =>{
                if(item.id === time.id){
                    item.isSelected = !item.isSelected;
                }
                return item;
            })

            this.setState({
                rangeTime:rangeTime
            })
        }
    }

    handleSaveSchedule =()=>{
        let {rangeTime, selectedDoctor , currentDate} =this.state;
        let result = [];
        // console.log('check state',this.state)   
        if(!currentDate){ //nếu không truyền currentDate
            toast.error('Invalid date!');
            return; //dùng return để tránh báo 2 lỗi cùng 1 lúc
        }
        //._isEmpty(): dùng để kiểm tra mảng hoặc object có rỗng không
        if(!selectedDoctor && _.isEmpty(selectedDoctor)){
            toast.error('Invalid selected doctor!');
            return;
        }
        if(rangeTime && rangeTime.length >0){
            //dùng filter để tìm kiếm trong mảng những phần tử có trường isSelected =true
            let selectedTime =rangeTime.filter(item => item.isSelected===true)
            if(selectedTime && selectedTime.length > 0){
                selectedTime.map(item =>{
                    let object ={};
                    object.doctorId= selectedDoctor.value;
                    object.date =currentDate;
                    object.time = item.keyMap;
                    result.push(object)
                })
            }else{
                toast.error('Invalid selected time!');
                return;
            }
            console.log('check result:',result)
        }
    }

    render() {
        let {rangeTime} =this.state;
        let {language} =this.props;
        return (
            <div className='manage-schedule-container'>
                <div className='manage-schedule-title'>
                    <FormattedMessage id="manage-schedule.title" />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id="manage-schedule.choose-doctor" /></label>
                            <Select
                                value={this.state.selectedDoctor}
                                onChange={this.handleChangeSelect}
                                options={this.state.listDoctors}
                            />
                        </div>
                        <div className='col-6'>
                            <label><FormattedMessage id="manage-schedule.choose-date" /></label>
                            <DatePicker
                                onChange={this.handleOnChangeDatePicker}
                                className="form-control"
                                value={this.state.currentDate}
                                //minDate : ngày tối thiểu
                                minDate ={new Date()} //chỉ cho phép chọn ngày mới chứ không cho phép chọn lại những ngày cũ
                            />
                        </div>
                        <div className='col-12 pick-hour-container'>
                            {rangeTime && rangeTime.length>0 &&
                                rangeTime.map((item,index)=>{
                                    return(
                                        <button 
                                            key={index} 
                                            className={item.isSelected ===true ? 'btn btn-schedule active' :'btn btn-schedule'} 
                                            onClick={() => this.handleClickBtnTime(item)}
                                        >
                                            {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                                        </button>
                                    )
                                })
                            }
                        </div>
                        <div className='col-12 btn-save-schedule'>
                            <button 
                                className='btn btn-primary px-3'
                                onClick={()=> this.handleSaveSchedule()}
                            ><FormattedMessage id="manage-schedule.save-info" /></button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language : state.app.language,
        allDoctors:state.admin.allDoctors,
        allScheduleTime : state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors : () => dispatch(actions.fetchAllDoctor()),
        fetchAllScheduleTime : () => dispatch(actions.fetchAllScheduleTime()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
