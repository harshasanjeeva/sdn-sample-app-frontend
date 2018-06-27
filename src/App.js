import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Input,Label,Button,Row,Col,Pagination} from 'reactstrap';
import axios from 'axios';
import { RingLoader } from 'react-spinners';
import yelp from 'yelp-fusion';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
  var Spinner = require('react-spinkit');

const API = process.env.REACT_APP_CONTACTS_API_URL || 'https://gist.githubusercontent.com/anonymous/8f61a8733ed7fa41c4ea/raw/1e90fd2741bb6310582e3822f59927eb535f6c73/quotes.json'

const headers = {
    'Accept': 'application/json'
};

var callCount;


var foursquare = require('react-foursquare')({
  clientID: '3U30DDVOZYM4JUPDLV1RC4MOGEO1WCXQKMC1AJRKMHYQIV4D',
  clientSecret: 'O1NSKGZG0SMV2L13TKRIF4AATBFN14HU1CSHPE0FKOGTUPKI'  
});

var c = "exmaple";
export default class FoursquareDemo extends Component {

  constructor(props) {
     super(props);
     this.state = {
       items: [],
       "ll": "37.7749,-122.4194",
        "query": '',
        "data":[],
        "searchRequest":{},
        "tem":0,
       // todos: ['a','b','c','d','e','f','g','h','i','j','k'],
       "todos":['a','b','c','d'],
        currentPage: 1,
        todosPerPage: 15,
        searchTerm:'',
        "currentlyDisplayed": ['a','b','c','d'],
        filter: ''
       
     };

     this.handleClick = this.handleClick.bind(this);
     this.api = this.api.bind(this)
     this.search = this.search.bind(this)
     this.fake = this.fake.bind(this)
     this.faked = this.faked.bind(this);
     this.onInputChange = this.onInputChange.bind(this);

   }

   handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    });
  }


onInputChange(event){
 
  let newlyDisplayed = this.state.data.filter(person=>person.quote.includes(event.target.value.toLowerCase()));

this.setState({
  searchTerm:event.target.value,
  currentlyDisplayed:newlyDisplayed
});

console.log("search-->",this.state);
}

search(){
var a = {
  "ll": this.state.ll,
  "query":this.state.query
}
  foursquare.venues.getVenues(a)
  .then(res=> {
    console.log("res",res)
    this.setState({ items: res.response.venues });
  });
  var b = {
    "ll": this.state.ll,
    "query":this.state.query,
    "venue_id" : "430d0a00f964a5203e271fe3"

  }

  foursquare.venues.getVenuePhotos(b)
  .then(res=> {
    console.log("res photos",res)
    //this.setState({ : res.response.venues });
  });

}

api(){
  fetch(`${API}`)
.then(response => response.json())
    .then(response => {
      // console.log(payload)
        console.log(response);
        this.setState({
          data: response,
        
        })

      var arr=[];
        for(var i=0;i<response.length;i++){
          arr.push(response[i].quote)
      
        }
        this.setState({
          currentlyDisplayed:arr 
        })
        console.log("this.state at response api",this.state)
        return response;
    })
    .catch(error => {
        console.log("This is error");
        return error;
    });
}
 



faked(){
  fetch(`${API}/fake`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify({"data":"fake"})
}).then(response => response.json())
    .then(response => {
      // console.log(payload)
        console.log(response);
        this.setState({
          data: response.jsonBody.businesses
        })
        return response;
    })
    .catch(error => {
        console.log("This is error");
        return error;
    });
}

//callfunction();


fake(){
  
  callCount = 1;
  var repeater = setInterval(()=> {
    if (callCount < 10) {
      this.faked();
      console.log("call count",callCount)
      this.setState({
        "tem":callCount
      })
      callCount += 1;
    } else {
      clearInterval(repeater);
    }
  }, 2000);
}






success1(){
  
this.api()
}

render() {
  const todos = this.state.currentlyDisplayed;
  const { currentPage, todosPerPage } = this.state;
    console.log("line 174",this.state)
//const todos=['a','b']
  // Logic for displaying todos
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  
  
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const renderTodos = currentTodos.map((todo, index) => {
    return <li key={index}><h6>{todo}</h6></li>;
  });

  // Logic for displaying page numbers
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(todos.length / todosPerPage); i++) {
    pageNumbers.push(i);
  }

  const renderPageNumbers = pageNumbers.map(number => {
    return (
      <li
        key={number}
        id={number}
        onClick={this.handleClick}
        style={{color:"teal",float:"left",marginLeft:"25px"}}
      >
      {number}  
      </li>

    );
  });
 console.log("callCount",this.callCount)
    return (
      <div>

    <div style={{height:"700px",width:"1550px","backgroundSize": "cover",backgroundImage:"url(" +"https://www.setaswall.com/wp-content/uploads/2017/06/Linkedin-Backgrounds-14-1400-x-350.png"+")"}}>
    <div>

    
    <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">React App</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>


        </Nav>
      </Collapse>
    </Navbar>
  </div>

  <Button color="success" style={{float:"left"}} onClick={()=>{
    //  this.search();
      this.success1();
      }}> Click here to load the Api</Button>
<br />
<br />
  <Input type="search" name="search" id="exampleSearch" placeholder="search quotes" style={{width:400}} onChange={(event) => {
          
    let newDisplay = this.state.currentlyDisplayed.filter(project=>project.includes(event.target.value));
// console.log("filter=======>",this.props.projectList.filter(project=>project.skills.includes("Java")));

    this.setState({
      search:event.target.value,
      currentlyDisplayed: newDisplay
    });
  
    console.log("search-->",this.state)
                
  }}/>




  <div>

  <ul>
    {renderTodos}
  </ul>
  
   <a> {renderPageNumbers}</a>

</div>    
<div style={{marginTop:"20px",height:"200px",backgroundColor:"black"}}>
   
<p>.</p>
          
          </div>
        
       
       </div>
    </div>
    </div>
  )
  }
}

ReactDOM.render(
  <FoursquareDemo />,
  document.getElementById('root')
);


















// import React, { Component } from 'react';
// import logo from './logo.svg';
// import './App.css';

// class App extends Component {
//   render() {
//     return (
//       <div className="App">
//         <header className="App-header">
//           <img src={logo} className="App-logo" alt="logo" />
//           <h1 className="App-title">Welcome to React</h1>
//         </header>
//         <p className="App-intro">
//           To get started, edit <code>src/App.js</code> and save to reload.
//         </p>
//       </div>
//     );
//   }
// }

// export default App;
