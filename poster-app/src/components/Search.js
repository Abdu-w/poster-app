import React, { Component } from 'react';
import axios from 'axios';
import '../styles/Home.css';
import ErrorMessage from './ErrorMessage';
import {Form, FormControl, Button} from "react-bootstrap";

const API_KEY=process.env.REACT_APP_API_KEY;
console.log(process.env.REACT_APP_API_KEY)

export default class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            displayResults: '',
            displayData:[ ],
            img: '',
            searchText:'',
            resultLength: ''
        }
    }
 
    // componentDidMount(){
    //     this.searchRequest();
    // }
    
     searchText = (e) =>{
            e.preventDefault();
            console.log(e.target.value);
            this.setState({searchText : e.target.value})
     }

     handleSearch = (e) =>{
        e.preventDefault();
        console.log(this.state.searchText);
        this.searchRequest();
 }

    searchRequest = async () =>{
        console.log(API_KEY)
        try{
            // const response = await axios.get("https://api.pexels.com/v1/search?query=people",
            // {headers: {
            //     "Authorization" : API_KEY
            //   }
            // })
            console.log(this.state.searchText)
            const searchText = this.state.searchText;
            const response = await axios.get("https://api.pexels.com/v1/search?query=" +searchText ,
            {headers: {
                "Authorization" : API_KEY
              }
            })
            console.log(response);
            console.log(response.data);
            console.log(response.data.total_results);
            // console.log(response.data.photos.src.portrait);
            // let url=JSON.stringify(response.data.photos[0].src.portrait);
            // let url=response.data.photos[0].src.portrait;
            //console.log(url)
        // this.setState({img : url});
        let resultLength = response.data.total_results;
        let url=response.data.photos;
        if(resultLength >0){
            this.setState({displayData : url});
            this.setState({resultLength : false})
          }
        else{
            this.setState({resultLength : true})        
          }
       }
        catch(e){
            console.log(e);
        }
    }
    render() {
        console.log(this.state.displayData );
        let response = this.state.displayData;
        return (
            <React.Fragment>
                <Form className="search-container">
                    <FormControl type="text" value={this.state.searchText} id="search-text" onChange={this.searchText} placeholder="search text" />
                    <Button  id="search-button" onClick={this.handleSearch}>Search</Button>
                    {/* <FormText id="form-text">Search for your favorite category</FormText>
                    <Form.T */}
                </Form>
                <div className="results-container"> 
                {
                    this.state.resultLength ? <ErrorMessage /> : 
                    response.map((result) => {
                        return (
                        <div className="poster-results"><ul key= {result.id} className="lists-display">
                        <li className="results-li"> <img src= {result.src.portrait} alt="different Images" height = "400px" width="260px" /> <h5>Poster ID: {result.id} </h5> <Button id="view-details" variant="link">View Details</Button>  </li>
                        </ul> </div>)
                    } )
                }
                </div>
               {/* {this.searchRequest()} */}
               {/* <img src = "https://images.pexels.com/photos/853168/pexels-photo-853168.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=1200&w=800" /> */}
              
               </React.Fragment>
        )
    }
}
