import React from 'react';

import './App.css';
//Bootstrap4.5
import 'bootstrap/dist/css/bootstrap.min.css';
//All components
import Shop from './Shop';
import Product from './Product';

//Import react routes and its other modules
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


class App extends React.Component {

  
  
  render() {
    return (
      <Router>
      <div className="MainDiv">
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div class="container">
            <a class="navbar-brand" href="#">Group1</a>
           
           
              <ul class="navbar-nav ml-auto">
                <li class="nav-item active">
                <Link class="nav-link" to={''}>Shop</Link>
                  
                </li>
              </ul>
          
          </div>
        </nav>

        <div class="container">

          <div class="row">

            <div class="col-lg-3">

              <h1 class="my-4">Therichpost Shop</h1>
              <div class="list-group">
                <a href="#" class="list-group-item">Category 1</a>
                <a href="#" class="list-group-item">Category 2</a>
                <a href="#" class="list-group-item">Category 3</a>
              </div>

            </div>
            

            <div class="col-lg-9">

            <Switch>
            <Route exact path='/' component={Shop} />
            <Route exact path='/product/:id' component={Product} />
            
          </Switch>
             

            </div>
           

          </div>
        

        </div>
       
        <footer class="py-5 bg-dark">
          <div class="container">
            <p class="m-0 text-center text-white">Copyright &copy; Your Website 2020</p>
          </div>
        
        </footer>

        
      </div>
      </Router>
    );
  }
}

export default App;
