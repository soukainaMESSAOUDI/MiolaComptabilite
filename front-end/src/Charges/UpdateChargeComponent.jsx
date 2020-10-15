import axios from 'axios';
import React, { Component } from 'react';
import ChargeService from '../Services/ChargeService';


class UpdateChargeComponent extends Component {
    constructor(props){
        super(props)
        this.state={
            id: this.props.match.params.id,

            rubrique: '',
            designation: '',
            creditDisponible:'',

        }
        this.updateCharge = this.updateCharge.bind(this);

    }
    componentDidMount(){
        ChargeService.getChargeById(this.state.id).then( (res) =>{
            let charge = res.data;
            this.setState({rubrique: charge.rubrique,
                designation: charge.designation,
                creditDisponible : charge.creditDisponible
            });
        });
    }

    updateCharge=(e)=>{
        e.preventDefault();
        let charge = {rubrique: this.state.rubrique, 
            designation: this.state.designation,
             creditDisponible: this.state.creditDisponible,
            };
           console.log('charge=>'+JSON.stringify(charge));
           console.log('id => ' + JSON.stringify(this.state.id));
           ChargeService.updateCharge(charge,this.state.id)
            .then(response => {
                this.props.history.push('/charges');

            });          
    }
    changeRubriqueHandler=(event)=>{
        this.setState({rubrique: event.target.value});
    }
    changeDesignationHandler=(event)=>{
        this.setState({designation: event.target.value});
    }
    changeCreditHandler=(event)=>{
        this.setState({creditDisponible: event.target.value});
    }
    cancel(){
        this.props.history.push('/charges');

        
    }
    render() {
        return (
            <div>
                <br></br>
                   <div className = "container">
                        <div className = "row">
                            <div className = "card col-md-6 offset-md-3 offset-md-3">
                                <h3 className="text-center">Update Charge</h3>
                                <div className = "card-body">
                                    <form>
                                        <div className = "form-group">
                                            <label> Rubrique: </label>
                                            <input placeholder="Numero de rubrique" name="rubrique" className="form-control" 
                                                value={this.state.rubrique} onChange={this.changeRubriqueHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Designation: </label>
                                            <input placeholder="abc" name="designation" className="form-control" 
                                                value={this.state.designation} onChange={this.changeDesignationHandler}/>
                                        </div>
                                        <div className = "form-group">
                                            <label> Credit Disponible: </label>
                                            <input placeholder="0.00" name="creditDisponible" className="form-control" 
                                                value={this.state.creditDisponible} onChange={this.changeCreditHandler}/>
                                        </div>

                                        <button className="btn btn-success" onClick={this.updateCharge}>Save</button>
                                        <button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft: "10px"}}>Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </div>

                   </div>
            </div>
        );
    }
}

export default UpdateChargeComponent;
