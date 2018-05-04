import * as React from "react";
import {VortexContractsList, connect, VortexContract} from 'vort_x-components';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
import {Panel} from "react-bootstrap";

function FieldGroup({ id, label, help, ...props }) {
    return (
        <FormGroup controlId={id}>
            <ControlLabel>{label}</ControlLabel>
            <FormControl {...props} />
            {help && <HelpBlock>{help}</HelpBlock>}
        </FormGroup>
    );
}

class ContractCallReturnContainer extends React.Component {

   constructor(props) {
       super(props);
       this.newValue = this.newValue.bind(this);
   }

   newValue(event) {
       event.preventDefault();
       this.props.update(this.newVal.valueAsNumber);
   }

    render() {
        return (<div>
            <p>Current value {this.props.result}</p>
            <form onSubmit={this.newValue}>
                <FieldGroup
                    id="newVal"
                    type="number"
                    label="Change Stored Value"
                    placeholder="Enter New Value"
                    inputRef={input => this.newVal = input}
                />
                <Button type="submit">Send !</Button>
            </form>
        </div>)
    }
}

class ContractsContainer extends React.Component {
    constructor(props) {
        super(props);
        this.props.contract.instance.vortex.get.vortexData({from: this.props.web3.coinbase});
        const mapStateToProps = (state) => {
            return {
                result: state.contracts[this.props.contract_name][this.props.contract_address].instance.vortex.get.vortexData({from: this.props.web3.coinbase}),
                update: (newValue) => {
                    this.props.contract.instance.vortex.set.vortexSend({from: this.props.web3.coinbase}, newValue);
                }
            }
        };
        this.resultContainer = connect(ContractCallReturnContainer, mapStateToProps);
    }

    render() {
        if (this.props.contract) {
            return <Panel bsStyle="primary">
                <Panel.Heading>{this.props.contract_name} : {this.props.contract_address}</Panel.Heading>
                <Panel.Body>
                    <this.resultContainer/>
                </Panel.Body>
            </Panel>;
        } else
            return <div/>;
    }
}

export class ListContracts extends React.Component {

    render() {
        return <Panel>
            <Panel.Heading>Very REACTive data !</Panel.Heading>
            <Panel.Body style={{maxHeight: 400, overflow: 'scroll'}}>
                <VortexContractsList element={ContractsContainer} contract_name="SimpleStorage"/>
            </Panel.Body>
        </Panel>
    }

}
