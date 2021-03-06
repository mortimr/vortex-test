import * as React from "react";
import {VortexContractsList, connect, VortexMethodCallList} from 'vort_x-components';
import {FormGroup, ControlLabel, FormControl, HelpBlock, Button} from 'react-bootstrap';
import {Panel} from "react-bootstrap";
import {CallContainer, SingleCall} from "../list-method-calls";

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
                    this.props.contract.instance.vortex.set.vortexSend({from: this.props.web3.coinbase, gas: 100000}, newValue);
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
                    <VortexMethodCallList container={CallContainer} element={SingleCall} methodName="times" contractName={this.props.contract_name} contractAddress={this.props.contract_address} arguments={
                        [
                            [{from: this.props.web3.coinbase}, 2],
                            [{from: this.props.web3.coinbase}, 3],
                            [{from: this.props.web3.coinbase}, 4]
                        ]
                    }/>
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
            <Panel.Heading>Example #3: List all of your contracts very easily !</Panel.Heading>
            <Panel.Body>
                <VortexContractsList element={ContractsContainer} contract_name="SimpleStorage"/>
            </Panel.Body>
        </Panel>
    }

}
