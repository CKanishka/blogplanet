import React from 'react';
import axios from 'axios';
class InputModal extends React.Component{
    state={
        modal:false,
        name:"",
        email:"",
        content:"",
        title:"",
        genre:"",
        genres:['DSA','Tech Talk','Motivation','Interview Experience']
    };

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      };

    onChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value
        });
    };

    
    onSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            name:this.state.name||this.props.name,
            email:this.state.email||this.props.email,
            content:this.state.content||this.props.content,
            title:this.state.title||this.props.title,
            genre:this.state.genre||this.props.genre
        };
        if(!this.props.edit){
            axios
            .post(`/api`,newItem)
            .then(res => alert(`Hi, ${this.state.name||this.props.name} your blog has been published`))
            .catch(err => console.log(err))
            this.props.handleClose();
            return
        }
        else{
            axios
            .put(`/api/${this.props.id}`,newItem)
            .then(res => alert(`Hi, ${this.state.name||this.props.name} your blog has been edited. Next time you login, your changes will be visible.`))
            .catch(err => console.log(err))
            this.props.handleClose();
            return
        }
    };
    
    
     
    render(){
        const modalStyle = this.props.modal ? {display:"block",padding:"3em"} : {display:"none"};
        return(
            <div style={{textAlign:"left",marginBottom:"3em",position:"relative",zIndex:"3"}}>
                <div className="modal-main" style={modalStyle}>
                    <div className="col-sm-12 text-right cp" onClick={this.props.handleClose}>
                        X
                    </div>
                    <h3 id="title" className="mb-3">Start filling here</h3>
                    <form onSubmit={this.onSubmit}>
                        <div className="blog-form">
                            <div className="row">
                                
                                <div className="col-lg-6">
                                    <label>Name</label>
                                    <input type="text" name="name" className="form-control text " value={this.props.name} placeholder="Enter your name" onChange={this.onChange} required/>
                                </div>
                                <div className="col-lg-6">
                                    <label>Email</label>
                                    <input type="email" name="email" className="form-control text " value={this.props.email} placeholder="Enter your email-id" onChange={this.onChange} required/>
                                </div>
                                <div className="col-sm-12">
                                    <label>Content</label>
                                    <textarea name="content" cols="40" rows="10" className="form-control textarea" defaultValue={this.props.content} placeholder="Enter blog content" onChange={this.onChange} required></textarea>
                                </div>
                                <div className="col-lg-6">
                                    <label>Title</label>
                                    <input type="text" name="title" className="form-control text " defaultValue={this.props.title} placeholder="Enter the title for blog" onChange={this.onChange} required/>
                                </div>
                                <div className="col-lg-6">
                                    <label>Genre</label>
                                    <select className="form-control text" name="genre" defaultValue={this.props.genre} onChange={(e)=>this.onChange(e)} required style={{width:"auto",margin:"3px"}}>
                                    <option value=""> Choose a genre</option>
                                        {
                                        this.state.genres.map((genre,index)=>(<option key={index} value={genre}>{genre}</option>))
                                        }
                                    </select>
                                </div>
                                
                                <div className="col-sm-12">
                                    <input type="submit" className="btn btn-primary mb-4 mb-lg-0" value="Submit"/>
                                </div>
                                
                            </div>
                        </div>
                    </form>
                </div>
            </div>     
        );
    }
}

export default InputModal;