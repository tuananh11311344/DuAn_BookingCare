import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import * as actions from "../../../store/actions";
import { connect } from 'react-redux';
import './ManageDoctor.scss';

//Markdown Editor
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select';
import { CRUD_ACTIONS, LANGUAGES } from '../../../utils/constant';
import { getDetailInforDoctor } from '../../../services/userService';

//mdParser : convert từ html sang text
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {

    constructor(props){
        super(props);
        this.state={
            contentMarkdown: '',
            contentHTML:'',
            selectedDoctor: '',
            description:'',
            listDoctors:[],
            hasOldData : false
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

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
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown:text,
            contentHTML:html
        })
        console.log('handleEditorChange', html, text);
    }

    handleSaveContentMarkdown = () => {
        // console.log('check state',this.state)
        this.props.saveDetailDoctorRedux({
            contentHTML:this.state.contentHTML,
            contentMarkdown:this.state.contentMarkdown,
            description:this.state.description,
            doctorId:this.state.selectedDoctor.value,
            //truyền thêm 1 trường là action (nếu hasOldData =true thì action = edit còn ngược lại thì action =create)
            action: this.state.hasOldData ===true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE
        })
    }

    handleChangeSelect = async(selectedDoctor) => {
        this.setState({ selectedDoctor });

        //selectedDoctor.value lấy ra id của bác sĩ
        let res = await getDetailInforDoctor(selectedDoctor.value)
        // console.log('check res:',res);
        if(res && res.errCode ===0 && res.data && res.data.Markdown){
            let markdown =res.data.Markdown
            this.setState({
                contentHTML:markdown.contentHTML,
                contentMarkdown:markdown.contentMarkdown,
                description:markdown.description,

                hasOldData:true
            })
        }
        else{
            this.setState({
                contentHTML:'',
                contentMarkdown:'',
                description:'',

                hasOldData:false
            })
        }
    };

    handleOnChangeDescription = (event) =>{
        this.setState({
            description :event.target.value
        })
    }

    render() {
        // console.log('check list doctor',this.state.listDoctors)
        let {hasOldData} = this.state; 
        return (
            <div className='manage-doctor-container'>
                <div className='manage-doctor-title'>
                    Tạo thêm thông tin bác sĩ
                </div>
                <div className='more-infor'>
                    <div className='content-left form-group'>
                        <label>Chọn bác sĩ</label>
                        <Select
                            value={this.state.selectedDoctor}
                            onChange={this.handleChangeSelect}
                            options={this.state.listDoctors}
                        />
                    </div>  
                    <div className='content-right'>
                        <label>Thông tin giới thiệu:</label>
                        <textarea className='form-control' rows="4"
                            onChange={(event)=>this.handleOnChangeDescription(event)}
                            value={this.state.description}
                        >
                        </textarea>  
                    </div>    
                </div>
                <div className='manage-doctor-editor'>
                    <MdEditor 
                        style={{ height: '500px' }} 
                        renderHTML={text => mdParser.render(text)} 
                        onChange={this.handleEditorChange} 
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button className={hasOldData === true ? "save-content-doctor" :'create-content-doctor'}
                    onClick={()=>this.handleSaveContentMarkdown()}
                >
                    {hasOldData === true ?
                        <span>Lưu thông tin</span> : <span>Tạo thông tin</span>
                    }
                </button>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language : state.app.language,
        allDoctors:state.admin.allDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors : () => dispatch(actions.fetchAllDoctor()),
        saveDetailDoctorRedux :(data) => dispatch(actions.saveDetailDoctor(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
