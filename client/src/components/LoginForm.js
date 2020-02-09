import React from 'react';
import logo from './logo3.png';
export default class LoginForm extends React.Component{
    state={
        admin:false
    }
    toggleAdmin = () => {
        this.setState({admin:!this.state.admin})
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.authenticate(this.state.admin);
    };
    render(){
        return(
           <div className="container banner pb-3" style={{textAlign:"left",marginBottom:"3em"}}>
                <h3 id="title" className="mb-3">Enter login details</h3>
                    <div className="blog-form">
                        <div className="row">
                            <div className="col-lg-6">
                            {this.state.admin?
                            <form action="https://myblogdashboard.herokuapp.com/" >
                                <label>Email</label>
                                <input type="text" name="email" className="form-control text " placeholder="Enter your email-id" onChange={this.props.onChange} required/>
                                <label>Password</label>
                                <input type="password" name="password" className="form-control text " placeholder="Enter your passsword" onChange={this.props.onChange} required/>
                                <input type="submit" className="btn btn-primary mb-4 " value="Login as admin"/>
                            </form>:
                            <form onSubmit={this.onSubmit}>
                                <label>Name</label>
                                <input type="text" name="name" className="form-control text " placeholder="Enter your name" onChange={this.props.onChange} required/>
                                <label>Email</label>
                                <input type="email" name="email" className="form-control text " placeholder="Enter your email-id" onChange={this.props.onChange} required/>
                                <label>Address</label>
                                <input type="text" name="address" className="form-control text " placeholder="Enter address" onChange={this.props.onChange} required/>
                                <input type="submit" className="btn btn-primary mb-4 " value="Login as guest"/>
                            </form>
                            }
                            </div>
                            <div className="col-lg-6">
                            <img alt="banner"
                                 className="img-fluid"
                                 src={logo} />
                            <button className="btn btn-warning" style={{padding: "11px 30px"}} onClick={this.toggleAdmin}>Login as {this.state.admin?"guest":"admin"}</button>     
                            </div>  
                        </div>
                    </div>
            </div>   

        )
    }
}