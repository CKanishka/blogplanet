import React from 'react';
import './App.css';
import BlogContainer from './components/BlogContainer';
import LoginForm from './components/LoginForm';
import axios from 'axios';
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

    authenticate = (login) => {
        const user = {
            email:this.state.email,
            password:this.state.password
        };
       if(login){
           console.log(this.state.email,this.state.password)
        //    if(this.state.email==="admin" && this.state.password==="admin")
        //    {
        //         this.setState({route:"admin"})
        //    }  
        //  else
        //    {
        //      alert("Wrong login credentials! Please try again");
        //    } 
        
        axios
          .post(`/api/authenticate`,user)
          .then(res => {
            if (res.status === 200) {
                this.setState({route:"blog"})
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            alert('Error logging in please try again/register');
          });
        
       }
       else{
        axios
        .post(`/api/register`,user)
        .then(res => {
          if (res.status === 200) {
              alert("Registered Successfully! Welcome to Blog Planet ")
              this.setState({route:"blog"})
          } else {
            const error = new Error(res.error);
            throw error;
          }
        })
        .catch(err => {
          console.error(err);
          alert('Error logging in please try again with another email-id');
        });
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
