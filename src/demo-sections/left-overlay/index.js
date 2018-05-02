import React, { Component} from 'react';
import Modal from 'react-modal';
import SlidingPane from 'react-sliding-pane';
import {Panel, Button} from 'react-bootstrap';
import 'react-sliding-pane/dist/react-sliding-pane.css';

export class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPaneOpen: false,
            isPaneOpenLeft: false
        };
    }

    componentDidMount() {
        Modal.setAppElement(this.el);
    }

    render() {
        return <Panel>
            <Panel.Heading>Press this magic button !</Panel.Heading>
            <Panel.Body>
                <p>You can easily access all the data created by your user's activity. This is a great tool to give more informations to the user about what is happening behind the scene.</p>
                <div ref={ref => this.el = ref}>
                    <Button onClick={ () => this.setState({ isPaneOpenLeft: true }) }>
                        This is the Magic Button, press me if you want to see puuuuuure magic
                    </Button>
                    <SlidingPane
                        isOpen={ this.state.isPaneOpenLeft }
                        title='VortΞx Transaction Summary'
                        from='left'
                        width={window.innerWidth * 0.2}
                        onRequestClose={ () => this.setState({ isPaneOpenLeft: false }) }>
                        <div>And I am pane content on left.</div>
                    </SlidingPane>
                </div>
            </Panel.Body>
        </Panel>;
    }
}
