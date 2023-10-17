import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; 
import * as actions from '../../../store/actions'
import {LANGUAGES} from '../../../utils/constant'

import Slider from "react-slick";

class OutstandingDoctor extends Component {

    constructor(props){
        super(props)
        this.state ={
            arrDoctors:[]
        }
    }

    componentDidUpdate(prevProps,prevState,snapshot){
        if(prevProps.topDoctorsRedux !=this.props.topDoctorsRedux){
            this.setState({
                arrDoctors:this.props.topDoctorsRedux
            })
        }
    }
    
    componentDidMount(){
        this.props.loadTopDoctors();
    }
    
    render() {
        let arrDoctors=this.state.arrDoctors;
        let language =this.props.language;
        return (
            <div className='section-share section-outstanding-doctor'>
                <div className='section-container'>   
                    <div className='section-header'>
                        <span className='title-section'><FormattedMessage id="homepage.outstanding-doctor" /></span>
                        <button className='btn-section'><FormattedMessage id="homepage.more-info" /></button>
                    </div>   
                    <div className='section-body'>
                        <Slider {...this.props.settings}>
                        {arrDoctors && arrDoctors.length>0 &&
                            arrDoctors.map((item,index)=>{
                                let nameVi = `${item.positionData.valueVi} , ${item.lastName} ${item.firstName}`;
                                let nameEn = `${item.positionData.valueEn} , ${item.firstName} ${item.lastName}`;
                                let imageBase64=''
                                if(item.image){
                                    imageBase64 = new Buffer(item.image,'base64').toString('binary');
                                }
                                
                                return(
                                    <div className='section-customize' key={index}>
                                        <div className='customize-border'>
                                            <div className='outer-bg'>       
                                                <div className='bg-image section-outstanding-doctor'
                                                    style={{backgroundImage :`url(${imageBase64})`}}
                                                ></div>
                                            </div>
                                            <div className='position text-center'>
                                                <div>{language === LANGUAGES.VI ? nameVi : nameEn}</div>
                                                <div>Cơ xương khớp</div>
                                            </div> 
                                        </div>                     
                                    </div>  
                                )
                            })
                        }
                            
                        </Slider>
                    </div>            
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        topDoctorsRedux: state.admin.topDoctors,
        language : state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctor())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
