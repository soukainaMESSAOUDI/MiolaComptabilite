import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ReactToPrint, { PrintContextConsumer } from 'react-to-print';
import ProgrammeActuelComponent from './ProgrammeActuelComponent';
import { connect } from "react-redux";
import Navbar from "../Navigation/Navbar";

class PrintProgramme extends Component {
    render() {
        return (
            <div>
                  <Navbar/>
                <ProgrammeActuelComponent ref={el => (this.componentRef = el)} />
                <br />
                <ReactToPrint content={() => this.componentRef}>
                    <PrintContextConsumer>
                        {({ handlePrint }) => (
                            <Button onClick={handlePrint} style={{ float: "right" }}> Imprimer </Button>
                        )}
                    </PrintContextConsumer>
                </ReactToPrint>
                <br />
                <br />
                <br />

            </div>
        );
    }
}

export default PrintProgramme;