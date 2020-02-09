import React from 'react'
import blog_banner from './blog_banner.png'
import logo from './logo3.png'
export default class Footer extends React.Component {
    render() {
        return (
            <div className="banner pb-0 mb-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                        <img alt="banner"
                                 className="float-left "
                                 src={logo} height="100px"/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 text-right">
                            &copy;Copyright 2020 Blog Planet
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


