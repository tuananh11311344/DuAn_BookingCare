import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; 
import "./HomeFooter.scss";

class HomeFooter extends Component {
    render() {
        
        return (
            <div className='home-footer'>
                <p>&copy; 2023 Tuấn Anh .More information , please visit my youtube channel <a target='_blank' href='https://bookingcare.vn/'>&rarr; Click here &larr;</a></p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
