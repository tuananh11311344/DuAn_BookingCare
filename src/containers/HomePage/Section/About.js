import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl'; 

class About extends Component {
    render() {
        
        return (
            <div className='section-share section-about'>
                <div className='section-about-header'>
                    Truyền thông nói về Channel của Hỏi dân IT
                </div>
                <div className='section-about-content'>
                    <div className='content-left'>
                    <iframe width="100%" height="400px" 
                            src="https://www.youtube.com/embed/VvvXhNbFWKY?list=PLncHg6Kn2JT6E38Z3kit9Hnif1xC_9VqI" 
                            title="#N6 Phân Tích Các Kiến Thức Nhận Được Khóa Học Fullstack | Khóa Học Node.JS và React Cho Beginners"
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowFullscreen></iframe>
                    </div>
                    <div className='content-right'>
                        <p>Ngày mình còn là sinh viên, đi học tại giảng đường đại học, có rất nhiều câu hỏi mà các thầy cô không giúp mình trả lời được, ví dụ như "Để trở thành một lập trình viên website thì cần học những gì", hay một câu hỏi đơn giản hơn, "Học công nghệ thông tin, ra trường thường làm những gì ? "...</p>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
