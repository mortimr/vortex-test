import * as React from "react";
import {Panel} from "react-bootstrap";

export class SingleCall extends React.Component {
    render() {
        return (
            <p>
                Result is => {this.props.result}
            </p>
        )
    }
}

export class CallContainer extends React.Component {
    render() {
        return (
            <Panel bsStyle="primary">
                <Panel.Heading>Call List</Panel.Heading>
                <Panel.Body>
                    <div>
                        {this.props.children}
                    </div>
                </Panel.Body>
            </Panel>
        )
    }
}

