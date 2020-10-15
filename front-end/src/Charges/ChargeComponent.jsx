import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import ChargeService from '../Services/ChargeService';
import CardCharge from './CardCharge';


class ChargeComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            parties: [],
            charges:[],
            rubrique: '',
            designation: '',
            creditDisponible:'',
            hidden: true,
        };
        this.editCharge=this.editCharge.bind(this);
        this.deleteCharge=this.deleteCharge.bind(this);

    }
    editCharge(id){
         this.props.history.push(`/update-charges/${id}`);

    }
    deleteCharge(id){
        ChargeService.deleteCharge(id).then(res=>{
            this.setState({charges:this.state.charges.filter(charge=>charge.id!==id)});
        });
    }

    componentDidMount() {
        this.getParties();
        axios.get("http://localhost:8080/charges").then((res)=>{
            this.setState({charges:res.data});

        });  
    }

    getParties() {
        axios.get("http://localhost:8080/parties")
            .then(response => response.data)
            .then((data) => {
                this.setState({ parties: data });
            })
    }
    ajouterHandler = (e) => {
        this.setState({ hidden: false })
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
    calculerHandler=(e)=>{
        e.preventDefault();
        let charge = {rubrique: this.state.rubrique, 
            designation: this.state.designation,
             creditDisponible: this.state.creditDisponible,
            };
            axios.post("http://localhost:8080/save-charge", charge)
            .then(response => {
                if (response.data != null) {
                    console.log(charge);
                }
            });
        window.location.reload(false);

    }
    cancel(){
        this.setState({hidden:true});
    }


    render() {
        const items = this.state.parties.map((partie) =>
            <option key={partie.id}> {partie.designation} : {partie.somme}  </option>
        );

        return (
            <div>
                <h3>GESTION DES CHARGES</h3>
                <div class="row">
                   <div className="col-md-6 centre" >
                       <CardCharge/>
                     </div>
            
              </div> 

                
                <div className="container">
                    <div className="row">
                    <button type="button" class="btn btn-info margin-top-bottom " onClick={this.ajouterHandler}>Ajouter </button>
                    </div>

                </div>
                <div className="row">
                    <table class="table table-striped margin-top-bottom margin-left-right">
                        <thead>
                            <tr>
                                <th>Rubrique</th>
                                <th>Designation</th>
                                <th>Credit disponible</th>
                                <th>Actions</th>

                            </tr>
                        </thead>
                        <tbody>
                        <tr id="form" hidden={this.state.hidden} >
                                <td><input type="text" placeholder="abc" name="rubrique" className="form-control"
                                    value={this.state.label} onChange={this.changeRubriqueHandler} /></td>
                                <td><input type="text" placeholder="abc" name="designation" className="form-control"
                                    value={this.state.description} onChange={this.changeDesignationHandler}/></td>
                                <td><input type="text" placeholder="0.00" name="creditDisponible" className="form-control"
                                    value={this.state.nbrUnite}  onChange={this.changeCreditHandler}/></td>
                         
                                <td>
                                    <button type="button" class="btn btn-info  margin-left-right-bis "onClick={this.calculerHandler.bind(this)} >Ajouter</button>
                                     <button type="button" class="btn btn-danger margin-left-right-bis  "onClick={this.cancel.bind(this)}> Annuler </button>
                                </td>
                            </tr>
                            {
                                this.state.charges.map(
                                    charge=>
                                    <tr key={charge.id}>
                                        <td>{charge.rubrique}</td>
                                        <td>{charge.designation}</td>
                                        <td>{charge.creditDisponible}</td>
                                        <td>
                                            <button  onClick={()=>this.editCharge(charge.id) }className="btn btn-success margin-left-right-bis">Modifier</button>
                                            <button  onClick={()=>this.deleteCharge(charge.id) }className="btn btn-danger margin-left-right-bis">Supprimer</button>

                                        </td>

                                    </tr>
                                )
        
                            }

                        </tbody>

                    </table>

                </div>
            </div>
        );
    }
}

export default ChargeComponent;