import React, { Component } from 'react';
import { connect } from "react-redux"; 
import HomeHeader from '../../HomePage/HomeHeader';
import './DetailDoctor.scss'
import {LANGUAGES} from "../../../utils/constant"

import { getDetailInforDoctor } from '../../../services/userService';

class DetailDoctor extends Component {
    constructor(props){
        super(props);
        this.state={
            detailDoctor:{},
            doctorImage:'',
        }
    } 
    
    async componentDidMount(){
        //lấy ra được id trên URL
        // console.log(this.props.match.params.id);
        if(this.props.match && this.props.match.params && this.props.match.params.id){
            let id=this.props.match.params.id;
            let res =await getDetailInforDoctor(id);
            if(res && res.errCode ===0){
                let image= new Buffer(res.data.image,'base64').toString('binary');
                this.setState({
                    detailDoctor: res.data,
                    doctorImage:image
                })
            }
        }
    }

    componentDidUpdate(prevProps,prevState,snapshot){

    }

    render() {
        let detailDoctor=this.state.detailDoctor;
        let {language} =this.props;
        let nameVi='';
        let nameEn='';
        if(detailDoctor && detailDoctor.positionData){
            nameVi = `${detailDoctor.positionData.valueVi} , ${detailDoctor.lastName} ${detailDoctor.firstName}`;
            nameEn = `${detailDoctor.positionData.valueEn} , ${detailDoctor.firstName} ${detailDoctor.lastName}`;
        }
        return (
           <>
                <HomeHeader isShowBanner={false}/>
                <div className='doctor-detail-container'>
                    <div className='intro-doctor'>
                        <div className='content-left'
                            style={{backgroundImage : `url(${this.state.doctorImage})`}}
                        >
                        </div>
                        <div className='content-right'>
                            <div className='up'>  	
                                {language === LANGUAGES.VI ? nameVi : nameEn}
                            </div>
                            <div className='down'>
                               {detailDoctor.Markdown && detailDoctor.Markdown.description &&
                                    <span>
                                        {detailDoctor.Markdown.description}
                                    </span>
                               }
                            </div>
                        </div>
                    </div>
                    <div className='schedule-doctor'>

                    </div>
                    <div className='detail-info-doctor'>
                        {detailDoctor && detailDoctor.Markdown && detailDoctor.Markdown.contentHTML &&
                            <div dangerouslySetInnerHTML={{__html : detailDoctor.Markdown.contentHTML}}></div>
                        }
                    </div>
                    <div className='comment-doctor'>

                    </div>
                </div>
           </>
        );
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
