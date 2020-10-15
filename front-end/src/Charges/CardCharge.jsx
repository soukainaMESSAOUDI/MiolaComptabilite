import React, { Component } from 'react';
import { ButtonGroup, Button, Card} from 'react-bootstrap';
import axios from 'axios';



class CardCharge extends Component {
    constructor(props){
        super(props)
        this.state={
            partie:""
        }
    }
    componentDidMount() {
		this.getCharge();
    }
    getCharge() {
        axios.get("http://localhost:8080/charge/partie")
            .then(response => {
                this.setState({ partie: response.data });
                console.log(this.state.partie);
            });
    }
    render() {
        const partie = this.state.partie;
        return (
            <div class="row ">
            <div class="col-sm-6">
              <div class="card"> 
                <div class="card-body">
                  <h5 class="card-title">Budget Initial</h5>
                  <p class="card-text"> {partie.somme} MAD</p>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Difference</h5>
                   <p class="card-text">{partie.reste} MAD</p>
                </div>
              </div>
            </div>
           
            
          </div>
        );
    }
}

export default CardCharge;