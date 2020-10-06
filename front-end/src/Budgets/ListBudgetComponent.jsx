import React, { Component } from 'react';
import { Button, Table } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import axios from 'axios';

class ListBudgetComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            budgets: [],
            //===============
            offset: 0,
            data: [],
            elements: [],
            perPage: 4,
            currentPage: 0,
            //================
            annee: '',
            nombreInscrit: '',
            coutFormation: '',
            budget: '',
            hidden: true,
        }

        this.changeAnneeHandler = this.changeAnneeHandler.bind(this);
        this.changeCoutHandler = this.changeCoutHandler.bind(this);
        this.changeNbrEtudiantsHandler = this.changeNbrEtudiantsHandler.bind(this);
        this.calculerHandler = this.calculerHandler.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8080/all-programmes").then((res) => {
            this.setState({ data: res.data, pageCount: Math.ceil(res.data.length / this.state.perPage) },
                () => this.setElementsForCurrentPage());
        });
    }

    setElementsForCurrentPage() {
        let elements = this.state.data
            .slice(this.state.offset, this.state.offset + this.state.perPage);
        this.setState({ elements: elements });
    }

    changeAnneeHandler = (event) => {
        this.setState({ annee: event.target.value });
    }

    changeNbrEtudiantsHandler = (event) => {
        this.setState({ nombreInscrit: event.target.value });
    }

    changeCoutHandler = (event) => {
        this.setState({ coutFormation: event.target.value });
    }

    ajouterHandler = (e) => {
        this.setState({ hidden: false })
    }

    calculerHandler = (e) => {
        e.preventDefault();
        const programme = {
            annee: this.state.annee,
            nombreInscrit: this.state.nombreInscrit,
            coutFormation: this.state.coutFormation,
        };
        axios.post("http://localhost:8080/save-programme", programme)
            .then(response => {
                if (response.data != null) {
                    console.log(programme);
                }
            });
        window.location.reload(false);
    }

    cancel() {
        this.setState({ hidden: true });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        console.log(e);
        const offset = selectedPage * this.state.perPage;
        this.setState({ currentPage: selectedPage, offset: offset }, () => {
            this.setElementsForCurrentPage();
        });
    }

    render() {
        let paginationElement;
        {
            paginationElement = (
                <ReactPaginate
                    className="pagination-budget"
                    previousLabel={"← Précédent "}
                    nextLabel={" Suivant →"}
                    breakLabel={<span className="gap">...</span>}
                    pageCount={this.state.pageCount}
                    onPageChange={this.handlePageClick}
                    forcePage={this.state.currentPage}
                    containerClassName={"pagination justify-content-center"}
                    disabledClassName={"disabled"}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    nextClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextLinkClassName={"page-link"}
                />
            );
        }

        return (
            <div className="container">
                <h3>BUDGETS ANNUELS</h3>
                <div className="container">
                    <div className="row">
                        <Button type="button" variant="primary" className="button-add" style={{ width: "150px" }}
                            onClick={this.ajouterHandler}>Ajouter budget</Button>
                    </div>
                    <br />
                </div>
                <div className="row">
                    <Table striped bordered hover className="margin-top-bottom" >
                        <thead>
                            <tr>
                                <th>Année</th>
                                <th>Nombre d'inscrits</th>
                                <th>Coût de formation</th>
                                <th>Budget</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="form" hidden={this.state.hidden} >
                                <td><input type="text" placeholder="yyyy" name="annee" className="form-control"
                                    value={this.state.annee} onChange={this.changeAnneeHandler} /></td>
                                <td><input type="text" placeholder="000" name="nombreInscrit" className="form-control"
                                    value={this.state.nombreInscrit} onChange={this.changeNbrEtudiantsHandler} /></td>
                                <td><input type="text" placeholder="0.00" name="coutFormation" className="form-control"
                                    value={this.state.coutFormation} onChange={this.changeCoutHandler} /></td>
                                <td><Button variant="dark" className="margin-left-right" onClick={this.calculerHandler} >Calculer</Button>
                                    <Button variant="secondary" className="margin-left-right" onClick={this.cancel.bind(this)}>Annuler</Button></td>
                            </tr>
                            {
                                this.state.elements.map(
                                    programme =>
                                        <tr key={programme.id}>
                                            <td>{programme.annee}</td>
                                            <td>{programme.nombreInscrit}</td>
                                            <td>{programme.coutFormation}</td>
                                            <td>{programme.budget}</td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    {paginationElement}
                </div>
            </div>
        );
    }
}

export default ListBudgetComponent;