import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

//For API Requests
import axios from 'axios';

//Import react routes and its other modules
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';

class Shop extends React.Component
{
    //Declare state varible to store request data
  constructor(props) {
    super(props)
      this.state = {
        data: []
        
              }
      }
      componentDidMount(){
        //Get all products details in bootstrap table
        axios.get('http://URL/Products').then(res => 
        {
        //Storing products detail in state array object<br>        this.setState({data: res.data});
           }); 
        
        }

        
     
  render()
  {
    return (
       <div className="shop">
         

              <div class="row">
                {this.state.data.map((result) => {
                return (
                    <div class="col-lg-4 col-md-6 mb-4">
                      <div class="card h-100">
                        <a href="#"><img class="card-img-top" src={"http://URL/Products/Images/" + result.image} alt={result.image} /></a>
                        <div class="card-body">
                          <h4 class="card-title">
                            <a href="#">{result.name}</a>
                          </h4>
                          <h5>{result.price}</h5>
                          <p class="card-text">{result.description}</p>
                        </div>
                        <div class="card-footer">
                          <small class="text-muted">&#9733; &#9733; &#9733; &#9733; &#9734;</small>
                        </div>
                        <div class="overlay"></div>
                        <div class="button">  <Link to={'/product/'+result.id}>View Product</Link></div>
                      </div>
                    </div>
                  )
                  })}
                

              </div>

              
       </div>
    )
  }
}
export default Shop;
