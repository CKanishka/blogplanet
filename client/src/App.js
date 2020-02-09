import React from 'react';
import './App.css';
import BlogContainer from './components/BlogContainer';
import LoginForm from './components/LoginForm';

class App extends React.Component {
    state = {
        name:"",
        email:"",
        password:"",
        address:"",
        route:"login"
    }
    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    authenticate = (admin) => {
       if(admin){
           console.log(this.state.email,this.state.password)
           if(this.state.email==="admin" && this.state.password==="admin")
           {
                this.setState({route:"admin"})
           }  
         else
           {
             alert("Wrong login credentials! Please try again");
           }  
       }
       else{
           this.setState({route:"blog"})
       }
    }
  render(){
    return (
        <div className="App">
            {
                this.state.route==="login"?
                <LoginForm onChange={this.onChange} onSubmit={this.onSubmit} authenticate={this.authenticate}/>:<BlogContainer name={this.state.name} email={this.state.email}/>
            }
        </div>
      );
  } 
}

export default App;
