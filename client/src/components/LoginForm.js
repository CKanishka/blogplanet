import React from 'react';
import logo from './logo3.png';
export default class LoginForm extends React.Component{
    state={
        login:true
    }
    toggleLogin = () => {
        this.setState({login:!this.state.login})
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.authenticate(this.state.login);
    };
    render(){
        return(
           <div className="container banner pb-3" style={{textAlign:"left",marginBottom:"3em"}}>
                <h3 id="title" className="mb-3">Enter details here</h3>
                    <div className="blog-form">
                        <div className="row">
                            <div className="col-lg-6">
                            {!this.state.login?
                            <form onSubmit={this.onSubmit} >
                                <label>Name</label>
                                <input type="text" name="name" className="form-control text " placeholder="Enter your name" onChange={this.props.onChange} required/>
                                <label>Email</label>
                                <input type="text" name="email" className="form-control text " placeholder="Enter your email-id" onChange={this.props.onChange} required/>
                                <label>Password</label>
                                <input type="password" name="password" className="form-control text " placeholder="Enter your password" onChange={this.props.onChange} required/>
                                <label>Confirm Password</label>
                                <input type="password" name="password2" className="form-control text " placeholder="Re-Enter your password" onChange={this.props.onChange} required/>
                                <input type="submit" className="btn btn-primary mb-4 " value="Register"/>
                            </form>:
                            <form onSubmit={this.onSubmit}>
                                <label>Name</label>
                                <input type="text" name="name" className="form-control text " placeholder="Enter your name" onChange={this.props.onChange} required/>
                                <label>Email</label>
                                <input type="email" name="email" className="form-control text " placeholder="Enter your email-id" onChange={this.props.onChange} required/>
                                <label>Password</label>
                                <input type="password" name="password" className="form-control text " placeholder="Enter your password" onChange={this.props.onChange} required/>
                                <input type="submit" className="btn btn-primary mb-4 " value="Login"/>
                            </form>
                            }
                            </div>
                            <div className="col-lg-6">
                            <img alt="banner"
                                 className="img-fluid"
                                 src={logo} />
                            <button className="btn btn-warning" style={{padding: "11px 30px"}} onClick={this.toggleLogin}>{this.state.login?"Register":"Login"}</button>     
                            <form action="https://myblogdashboard.herokuapp.com/" >
                                <button className="btn btn-info" style={{padding: "11px 30px",margin:"30px 0"}}><i class="fa fa-bar-chart"></i>View Dashboard</button>     
                            </form>
                            </div>  
                        </div>
                    </div>
            </div>   

        )
    }
}