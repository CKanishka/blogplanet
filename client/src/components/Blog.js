import React from 'react';
import InputModal from './InputModal';
class Blog extends React.Component {
    state={
        modal:false,
        isOpen:false
    }
    toggle = () => {
        this.setState({isOpen:!this.state.isOpen})
    };
    showModal = () => {
        this.setState({ modal: true });
    };
    hideModal = () => {
        this.setState({ modal: false });
    };
    render(){
        return(
    
            <div className="iq-blog-box" >
                <div className="iq-blog-image">
                    <img alt="#" src={"https://signatureiow.marketing/wp-content/uploads/2018/05/Oli-Blog-2.jpg"}/>
                    <ul className="iq-blogtag">
                        <li>{this.props.genre}</li>
                    </ul>
                </div>
                <div className="iq-blog-detail">
                    <div className="iq-blog-meta">
                        <ul className="pl-0">
                            <li className="list-inline-item"> 
                                <time className="entry-date published updated">On {this.props.date.split('T')[0]} </time>
                            </li>
                            <li className="list-inline-item">  
                            <a href="/"><i> By {this.props.author}</i></a>
                            </li>
                        </ul>
                    </div>
                    <div className="blog-title">
                        <h4 className="entry-title">{this.props.title}</h4>
                    </div>
                    <div className="blog-content">
                        <p>{this.state.isOpen?this.props.desc:this.props.desc.substring(0,200)}</p>
                    </div>
                    <div className="blog-button" onClick={this.toggle}>
                        
                            Read {this.state.isOpen ? 'less' : 'more'}
                        
                        {/* <a className="button-link" href="/blog-details">Read More<i class="fa fa-angle-right" aria-hidden="true"></i></a> */}
                    </div>
                    <button className="start_button mt-5 mr-0 btn-warning" style={{display:this.props.edit}} onClick={this.showModal}>Start Editing</button>
                </div>
                <InputModal modal={this.state.modal} handleClose={this.hideModal}  id={this.props.id} name={this.props.author} email={this.props.email} content={this.props.desc} title={this.props.title} genre={this.props.genre} edit={true}/>
            </div>
                    
        );
    }
}

export default Blog;