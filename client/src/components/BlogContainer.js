import React from 'react'
import HeadingBanner from './HeadingBanner';
import Blog from './Blog';
import Genres from './Genres';
import pen from './pen.png'
import Footer from './Footer';
import InputModal from './InputModal';
import axios from 'axios';

class Blog_Container extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
           modal:false,
           blogs:[],
           genres:['All','DSA','Tech Talk','Motivation','Interview Experience'],
           filteredBlogs:[],
           filter:false,
           edit:"none"
        };
    }

    componentDidMount(){
        axios
        .get(`/api`)
        .then(res=>{
            this.setState({blogs:res.data})
            console.log(res.data)
        })
    }

    showModal = () => {
        this.setState({ modal: true });
    };
    
    hideModal = () => {
        this.setState({ modal: false });
    };
    
    filterGenre = (genre) => {
        const filteredBlogs = this.state.blogs.filter((blog) => {
            if(!genre.localeCompare("All")){
                return true;
            }
            return !blog.genre.localeCompare(genre);
        })
        this.setState({filter:true,filteredBlogs:filteredBlogs})
    }
    filterBlogsByUser = () => {
        const filteredBlogs = this.state.blogs.filter((blog) => {
            if(blog.name.toLowerCase()===this.props.name.toLowerCase() && blog.email.toLowerCase()===this.props.email.toLowerCase()){
                return true;
            }
        })
        this.setState({filter:true,filteredBlogs:filteredBlogs,edit:"block"})
    }
    render() {
        return (
            <div>
                <HeadingBanner />
                <div className="container">
                    <div className="row my-5">
                        <div className="col-lg-8 col-sm-12">
                            {
                            this.state.filter?this.state.filteredBlogs.map((blog)=><Blog key={blog._id} id={blog._id} genre={blog.genre} date={blog.date} author={blog.name} title={blog.title} desc={blog.content} email={blog.email} edit={this.state.edit}/>)
                            :this.state.blogs.map((blog)=><Blog key={blog._id} id={blog._id} genre={blog.genre} date={blog.date} author={blog.name} title={blog.title} desc={blog.content} edit={this.state.edit}/>)
                            }  
                        </div>
                        
                        <div className="col-lg-4 col-sm-12">
                            <div className="widget row" style={{textAlign:"center"}}>
                                <div className="col">
                                <button className="start_button" onClick={this.showModal}>Start Writing...</button>
                                
                                <button className="start_button mt-5 btn-warning" onClick={this.filterBlogsByUser}>Edit your articles</button>
                                </div>
                                <img src={pen} alt=""/>
                            </div>
                            <Genres genres={this.state.genres} filterGenre={this.filterGenre}/>
                        </div>
                    </div>  
                    <InputModal modal={this.state.modal} handleClose={this.hideModal} name={this.props.name} email={this.props.email}/>
                </div>
                
                <Footer />
            </div>
            
        );
    }
}

export default Blog_Container;
