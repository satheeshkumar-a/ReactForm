import React from 'react';
import axios from 'axios';
import {Button,Form,FormGroup,Label,Col,Navbar,NavbarBrand,Table,ListGroupItem,
ListGroup
} from "reactstrap";
import './App.css';

const API_URL = "https://jsonplaceholder.typicode.com/users";
// const Comments_URL="https://jsonplaceholder.typicode.com/comments?postId=1";

export default class App extends React.Component{
    constructor(props) {
      super(props);
      this.state ={
        userId:'',
        id:'',
        name:'',
        username:'',
        email:'',
        address:'',
        phone:'',
        website:'',
        company:'',
        Dropdown:false,
        users:[],
        comments:[],
        
      };
        //this.toggle = this.toggle.bind(this);
    }

    componentDidMount(){
      this.getUsers();
      this.getcomments();  

    }

    //Update
    updateUser = async () =>{
      const { data } = await axios.put(`${API_URL}/${this.state.id}`,{
        id: this.state.id,
        name: this.state.name,
        username: this.state.username,
        email: this.state.email,
        address: this.state.address,
        phone: this.state.phone,
        website : this.state.website,
        company: this.state.company
      });
      console.log(data);
      const users= [...this.state.users];
      const userIndex = users.findIndex(user => user.id===this.state.id); 
      console.log(userIndex)
      // users[userIndex]=data;
    
      // this.setState({ users });
    }


    //Read

    getUsers= async ()=>{
     const { data } = await axios.get(API_URL);
      console.log(data);
      this.setState({ users : data });

    };

    getcomments = async (userId )=>{
      const { data } = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${userId}`);
      console.log( data);
      this.setState({ comments : data })
    }

  //     Delete
    deleteUser = async userId => {
    await axios.delete(`${API_URL}/${userId}`);      // userId represents https://jsonplaceholder.typicode.com/users/(userId)-->(1,2,3,4,5,6,7,8,9,10)
    let users = [...this.state.users];
    users = users.filter(user => user.id !== userId);
    this.setState({ users, comments: [] });
  };

    

    handleChange = ({ target: { name, value } }) => {
      this.setState({ [name]: value });
    };

    handleSubmit = e => {
      e.preventDefault();
      console.log(this.state)
      this.setState({id:'', name:'', username:'', email:'', address:'', phone:'', website:'', company:''})
    };

    editUser = user =>{
      this.setState({...user});

    }



   render(){
     return (
       <div>
          <Navbar color="Light" Light>
          <NavbarBrand href="/" style={{ marginLeft: '45%', fontSize: 25, marginBottom: '0px'}}>
          User Information 
          </NavbarBrand>
        </Navbar>
        {/* <Container> */}
        
         {/* <h1>Users Data </h1>  */}
        <Form onSubmit={this.handlesubmit}>

                <div>
                  <FormGroup row>
                <Label sm={2}>User Names </Label>
                <Col sm={10}>
                <select
                  name="User"
                  value={this.state.User}
                  onChange={this.handleChange}>
                  <option value="" />
                  {this.state.users.map(user => {
                    return <option value={user.name}>{user.name}</option>;
                  })}
                </select>
                </Col>
                </FormGroup>
                </div>
                <br/>
                <br/>
                

           <div>
           <FormGroup row>
             <Label sm={2}> ID </Label>
             <Col sm={10}>
             <input type="text" name="id" value={this.state.id} onChange={this.handleChange}/>
             </Col>
             </FormGroup>
           </div>
            <br/>
            <br/>
           <div>
           <FormGroup row>
             <Label sm={2}> Name </Label>
             <Col sm={10}>
             <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
             </Col>
             </FormGroup>
             </div>
            <br/>
            <br/>
            <div>
           <FormGroup row>
             <Label sm={2}> User Name </Label>
             <Col sm={10}>
             <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
             </Col>
             </FormGroup>
             </div>
            <br/>
            <br/>

           <div>
           <FormGroup row>
             <Label sm={2}> Email </Label>
             <Col sm={10}>
             <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
             </Col>
             </FormGroup>
           </div>
            <br/>
            <br/>

           <div>
           <FormGroup row>
             <Label sm={2}> Address </Label>
             <Col sm={10}>
             <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
             </Col>
             </FormGroup>
           </div>
            <br/>
            <br/>
           <div>
           <FormGroup row>
             <Label sm={2}> Phone </Label>
             <Col sm={10}>
             <input type="text" name="phone" value={this.state.phone} onChange={this.handleChange}/>
             </Col>
             </FormGroup>
           </div>
            <br/>
            <br/>
           <div>
           <FormGroup row>
             <Label sm={2}> Website </Label>
             <Col sm={10}>
             <input type="text" name="website" value={this.state.website} onChange={this.handleChange}/>
             </Col>
             </FormGroup>
           </div>
            <br/>
            <br/>
           <div>
           <FormGroup row>
             <Label sm={2}> Company </Label>
             <Col sm={10}>
             <input type="text" name="company" value={this.state.company} onChange={this.handleChange}/>
             </Col>
             </FormGroup>
           </div>
            <br/>
            <br/>

            
           <Button color="info" sizew="sm">Update Change</Button>

        </Form>
      
          
          {this.state.comments.length > 0 ? <h2> List of Comments </h2> : null}
          {this.state.comments.map(comment =>{
          return(
            <ListGroup>
               <ListGroupItem style={{ backgroundColor: '#FFE7C7' }}>
               {comment.body}
               </ListGroupItem>
               

          </ListGroup> 
          );
          })}
          
                    
     
          <Table borderless>
           <thead>
           <tr>
           
             <th>ID</th>
             <th>Name</th>
             <th>UserName</th>
             <th>Email</th>
             <th>Address</th>
             <th>Phone</th>
             <th>Website</th>
             <th>Company</th>
             <th>Action</th>
          </tr>
           </thead>
               <tbody>
                 {this.state.users.map(user=>{
                   return(
                     <tr key = {user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.username}</td>
                          <td>{user.email}</td>
                          <td>          
                          {`${user.address.street}, ${user.address.city}`}
                          </td>
                          <td>{user.phone}</td>
                          <td>{user.website}</td>
                          <td>{user.company.name}</td> 
                          <td>
                          
                         <Button color="primary" size="sm" onClick={() => this.editUser(user)}>Edit</Button>
                       
                          </td>
                          <td>
                          <Button color="danger" size="sm" onClick={()=> this.deleteUser(user.id)}>Delete</Button>
                          </td>
                         
                          <td>
                          <Button color="warning" size="sm"  onClick={()=> this.getcomments(user.id)}>Comments</Button>
                            
                          </td> 

                        
                     </tr>
                    
                   )

                 })}
    
              </tbody>
         </Table>
      {/* </Container> */}
      </div>

     )
   }
}
