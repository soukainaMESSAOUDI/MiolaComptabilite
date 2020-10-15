import React, { Component } from 'react';
import PropTypes from "prop-types";
import "./Stepper.css";

class Stepper extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // Completed - to add a check mark
            // Selected - to fill step with color
            // Highlighted - to make text of selected step bold
            steps: []
        };
    }

    componentDidMount() {
        const { steps, currentStepNumber } = this.props;
        const stepsState = steps.map((step, index) => {
            const stepObj = {};
            stepObj.description = step;
            stepObj.completed = false;
            stepObj.highlighted = index === 0 ? true : false;
            stepObj.selected = index === 0 ? true : false;
            return stepObj;
        });

        const currentSteps = this.updateStep(currentStepNumber, stepsState);
        this.setState({
            steps: currentSteps
        });
    }

    componentDidUpdate(prevProps) {
        const { steps } = this.state;
        const currentSteps = this.updateStep(this.props.currentStepNumber, steps);

        if (prevProps.currentStepNumber !== this.props.currentStepNumber)
            this.setState({
                steps: currentSteps
            });
    }

    updateStep(stepNumber, steps) {
        const newSteps = [...steps];
        let stepCounter = 0;

        while (stepCounter < newSteps.length) {
            // Current step
            if (stepCounter === stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: true,
                    selected: true,
                    completed: false
                };
                stepCounter++;
            }
            // Past step
            else if (stepCounter < stepNumber) {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: true,
                    completed: true
                };
                stepCounter++;
            }
            // Future step
            else {
                newSteps[stepCounter] = {
                    ...newSteps[stepCounter],
                    highlighted: false,
                    selected: false,
                    completed: false
                };
                stepCounter++;
            }
        }
        return newSteps;
    }

    render() {
        const { steps } = this.state;
        const stepsDisplay = steps.map((step, index) => {
            return (
                <div className="step-wrapper" key={index}>
                    <div className={`step-number ${step.selected ? "step-number-active" : "step-number-disabled"}`}>
                        {step.completed ? <h6> &#10003; </h6> : index + 1}
                    </div>
                    <div className={`step-desciption ${step.highlighted && "step-description-active"}`}> {step.description} </div>
                    <div className={index !== steps.length - 1 && "divider-line"} />
                </div >
            );
        });

        return (
            <div className="stepper-wrapper-horizontal" >
                { stepsDisplay}
            </div>
        );
    }
}

Stepper.propTypes = {
    steps: PropTypes.array.isRequired,
    currentStepNumber: PropTypes.number.isRequired,
};

export default Stepper;