import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeHeader from './HomeHeader';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutstandingDoctor from './Section/OutstandingDoctor';
import HandBook from './Section/HandBook';
import About from './Section/About';

import HomeFooter from './HomeFooter';

//file HomePage.scss chứa các css dùng chung
import "./HomePage.scss";

// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
    
    render() {
        let settings = {
            dots: false, // có cho phép hiện những chấm tròn ở dưới không
            infinite: false,
            speed: 500,           
            slidesToShow: 4, //số slide xuất hiện cùng 1 lúc
            slidesToScroll: 1, //số slide xuất hiện sau khi bấn next hoặc prev
            //ảnh tự động chạy
            // autoplay:true,
            // autoplaySpeed:2000,
          };
        return (
            <div>
                <HomeHeader />
                <Specialty settings={settings} />
                <MedicalFacility settings={settings} />
                <OutstandingDoctor settings={settings} />
                <HandBook settings={settings} />
                <About />
                <HomeFooter />
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
