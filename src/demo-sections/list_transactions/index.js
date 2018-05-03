import * as React from "react";
import {VortexTransactionsList} from 'vort_x-components';
import {Panel} from "react-bootstrap";

class TxContainer extends React.Component {
    render() {
        if (this.props.tx) {
            let status = "warning";
            switch (this.props.tx.status.type) {
                case 'BROADCASTED':
                    status = "primary";
                    break;
                case 'CONFIRMED':
                    break;
                case 'RECEIPT':
                    status = "success";
                    break ;
                case 'ERROR':
                    status = "danger";
                    break ;
                default:
                    status = "danger";
                    break ;
            }
            return <Panel bsStyle={status}>
                <Panel.Heading>{this.props.tx.status.transaction_hash}</Panel.Heading>
                <Panel.Body>
                    <h3>{this.props.tx.status.type}</h3>
                </Panel.Body>
                <Panel.Body>
                    <p>Transaction
                        from {this.props.tx.transaction_arguments.from} to {this.props.tx.transaction_arguments.to} for {parseInt(this.props.tx.transaction_arguments.value, 16)} WΞI</p>
                </Panel.Body>
            </Panel>;
        } else
            return <div/>;
    }
}

export class ListTransactions extends React.Component {

    render() {
        return <Panel>
            <Panel.Heading>Very REACTive data !</Panel.Heading>
            <Panel.Body>
                <VortexTransactionsList element={TxContainer}/>
            </Panel.Body>
        </Panel>
    }

}
