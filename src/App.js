import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import {Input,Label,Button,Row,Col} from 'reactstrap'
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

const API = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3001'

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
        "tem":0
     };
     this.api = this.api.bind(this)
     this.search = this.search.bind(this)
     this.fake = this.fake.bind(this)
     this.faked = this.faked.bind(this)
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
  fetch(`${API}/api`, {
    method: 'POST',
    headers: {
        ...headers,
        'Content-Type': 'application/json'
    },
    credentials:'include',
    body: JSON.stringify({"data":this.state})
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
 console.log("callCount",this.callCount)
    return (
      <div>
    <div style={{height:"400px",width:"1550px","backgroundSize": "cover",backgroundImage:"url(" +"https://s3-media1.fl.yelpcdn.com/assets/srv0/yelp_large_assets/dde93fe399aa/assets/img/home/hero_photos/Xs7es0q4jmFY5CV3uTeuPw.jpg"+")"}}>
    <div>

    
    <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">Location App</NavbarBrand>
      <NavbarToggler onClick={this.toggle} />
      <Collapse isOpen={this.state.isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/">About Team</NavLink>
          </NavItem>

        </Nav>
      </Collapse>
    </Navbar>
  </div>











    
    <Input style = {{marginLeft:"200px",marginTop:"200px",maxWidth:"550px",float:"left"}}type="text" name="search"  placeholder="search for coffee.." onChange={(event  )=>{
      console.log("-->",event.target.value)
      this.setState({
        "query":event.target.value,
        "searchRequest":{
          "term":event.target.value,
          "location": 'san jose, ca' 
         }
      })
    }}/>
    

    <Button color="success" style={{marginTop:"200px",float:"left"}}onClick={()=>{
  //  this.search();
    this.success1();
    }}> Search</Button>


    <Button color="info" style={{marginTop:"200px", marginLeft:"100px",float:"left"}} onClick={()=>{
      //  this.search();
        this.fake();
        }}> Generate traffic</Button>
        
        <span style={{marginTop:"200px",marginLeft:"15px",float:"left"}}>{this.state.tem}</span>
    <Spinner style={{marginTop:"200px",marginLeft:"15px",float:"left"}}  name="wave" />

    </div>
    <div style={{marginTop:"320px",backgroundColor:"black"}}>
      
         
          <Row className="container">
          <Col><div style={{color:"orange",float:"right"}}>Image</div></Col>
          <Col><div style={{color:"orange"}}>Name</div></Col>
          <Col><div style={{color:"orange"}}>Address</div></Col>
          <Col><div style={{color:"orange"}}>Price</div></Col>
          <Col><div style={{color:"orange"}}>Rating</div></Col>
          </Row>
         {this.state.data.map(item=> { 
         
          return (<div  >
   
            <Row className="container">
            <Col> <img className="image" src={item.image_url}  /></Col>
            <Col><div style={{color:"teal"}} key={item.id}>{item.name}</div></Col>
            <Col><div style={{color:"silver"}} key={item.location.address1}>{item.location.address1}</div></Col>
            <Col><div style={{color:"red"}}key={item.price}>{item.price}</div></Col>
            <Col><div style={{color:"red"}}key={item.rating}>{item.rating}</div></Col>
            </Row>
            </div>)
        })
       }
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
