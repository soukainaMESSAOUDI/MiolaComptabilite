import React, { Component } from 'react';
import { Button, Table, Modal, Container} from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import Navbar from '../Navigation/Navbar';

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
            //================
            index: '',
            selectedProgramm: this.getProgrammDetail,
            detailModalShow: false,
        }

        this.changeAnneeHandler = this.changeAnneeHandler.bind(this);
        this.changeCoutHandler = this.changeCoutHandler.bind(this);
        this.changeNbrEtudiantsHandler = this.changeNbrEtudiantsHandler.bind(this);
        this.calculerHandler = this.calculerHandler.bind(this);
        this.getProgrammDetail = this.getProgrammDetail.bind(this);
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

    getProgrammDetail() {
        axios.get("http://localhost:8080/programme-Id/" + this.state.index)
            .then(response => response.data)
            .then((data) => {
               return data;
            })
    }

    render() {
        let detailModalClose = () => this.setState({ detailModalShow: false });

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
            
            <div>
                <Navbar/>
                <Container>
                <h3>PROGRAMMES D'EMPLOI</h3>
                <div className="container">
                    <div className="row">
                        <Button type="button" variant="primary" className="button-add" style={{ width: "150px" }}
                            onClick={this.ajouterHandler}>Ajouter PE</Button>
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
                                <td><input type="text" placeholder="yyyy-yyyy" name="annee" className="form-control"
                                    value={this.state.annee} onChange={this.changeAnneeHandler} /></td>
                                <td><input type="text" placeholder="000" name="nombreInscrit" className="form-control"
                                    value={this.state.nombreInscrit} onChange={this.changeNbrEtudiantsHandler} /></td>
                                <td><input type="text" placeholder="0.00" name="coutFormation" className="form-control"
                                    value={this.state.coutFormation} onChange={this.changeCoutHandler} /></td>
                                <td><Button variant="success" className="margin-left-right" onClick={this.calculerHandler} >Calculer</Button>
                                    <Button variant="danger" className="margin-left-right" onClick={this.cancel.bind(this)}>Annuler</Button></td>
                            </tr>
                            {
                                this.state.elements.map(
                                    programme =>
                                        <tr key={programme.id}
                                            onClick={() => {
                                                this.setState({
                                                    detailModalShow: true,
                                                    index: parseInt(programme.id),
                                                    selectedProgramm: this.getProgrammDetail,
                                                })

                                            }}>
                                            <td>{programme.annee}</td>
                                            <td>{programme.nombreInscrit}</td>
                                            <td>{programme.coutFormation}</td>
                                            <td>{programme.budget}</td>
                                            <div onClick={e => e.stopPropagation()}>

                                                < Modal
                                                    show={this.state.detailModalShow}
                                                    onHide={detailModalClose}

                                                    {...this.props}
                                                    size="lg"
                                                    aria-labelledby="contained-modal-title-vcenter"
                                                    centered
                                                >
                                                    <Modal.Header closeButton>
                                                        <Modal.Title id="contained-modal-title-vcenter">
                                                            Détail du programme
                                    </Modal.Title>
                                                    </Modal.Header>
                                                    <Modal.Body>
                                                        Bonjour

                                                    </Modal.Body>
                                                    <Modal.Footer>
                                                        <Button variant="secondary" onClick={detailModalClose}>Fermer</Button>
                                                    </Modal.Footer>
                                                </Modal >
                                            </div>
                                        </tr>
                                )
                            }
                        </tbody>
                    </Table>
                    {paginationElement}
                </div>
                </Container>
            </div >
        );
    }
}

export default ListBudgetComponent;