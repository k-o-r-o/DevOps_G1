import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
class Product extends React.Component
{
//Declare state varible to store request data
    constructor(props) {
        super(props)
          this.state = {
           
            productdetails:[]
                  }
          }
    componentDidMount()
    {
        //Get Product ID from URL
        var productid = window.location.pathname;
        productid = productid.split("product/");

        const fd = new FormData();
        fd.append('productid', productid[1]);
        axios.post('http://URL/Product' + productid[1])
          .then(res=>
          {
    
            //Storing product detail in state array object
            this.setState({productdetails: res.data[0]});
           
          
          }
          );
    }
  render()
  {
    return (
       <div className="mt-3 mb-3">
         <h1>{this.state.productdetails.name}</h1>
         <img class="d-block img-fluid" src={"http://URL/Products/Images" + this.state.productdetails.image} alt="{result.pimage}" />
         <h5 className="mt-3 mb-3">{this.state.productdetails.price}</h5><br/>
         <p className="mt-3 mb-3">{this.state.productdetails.description}</p>
       </div>
    )
  }
}
export default Product;
