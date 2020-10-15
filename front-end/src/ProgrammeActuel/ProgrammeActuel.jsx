import React, { Component } from 'react';
import PrintProgramme from './PrintProgramme';
import Navbar from '../Navigation/Navbar';

class ProgrammeActuel extends Component {
    render() {
        return (
            <div>
                <Navbar/>
                <PrintProgramme/>
            </div>
        );
    }
}

export default ProgrammeActuel;