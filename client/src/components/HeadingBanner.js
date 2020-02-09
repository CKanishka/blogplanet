import React from 'react'
import blog_banner from './blog_banner.png'
import logo from './logo3.png'
class HeadingBanner extends React.Component {
    render() {
        return (
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-md-6">
                        <img alt="banner"
                                 className="img-fluid float-left"
                                 src={logo} />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-12 text-right">
                            <img alt="banner"
                                 className="img-fluid float-right"
                                 src={blog_banner} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HeadingBanner;
