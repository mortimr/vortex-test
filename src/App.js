import React, { Component } from 'react'
import {VortexGate, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError} from "vort_x-components";
import SimpleStorageContract from '../build/contracts/SimpleStorage.json'
import getWeb3 from './utils/getWeb3'
import {TransactionPanel} from "./demo-sections/transactions";
import {Grid, Row, Col} from 'react-bootstrap';

import './css/oswald.css'
import './css/open-sans.css'
import './css/pure-min.css'
import './App.css'
import {FeedNotifications} from "./demo-sections/feed-notifications";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            storageValue: 0,
        }
    }


    render() {
        return (
            <VortexGate contracts={[SimpleStorageContract]} network_contracts={[SimpleStorageContract]} loader={getWeb3}>
                <VortexWeb3Loaded>
                    <FeedNotifications>
                        <div className="App">
                            <nav className="navbar pure-menu pure-menu-horizontal">
                                <a href="#" className="pure-menu-heading pure-menu-link">VortΞx Demo</a>
                            </nav>

                            <main className="container">
                                <div className="pure-g">
                                    <div className="pure-u-1-1">
                                        <h1>Good to Go!</h1>
                                    </div>
                                </div>
                                <Grid>
                                    <Row>
                                        <Col xs={6}>
                                            <TransactionPanel/>
                                        </Col>
                                    </Row>
                                </Grid>
                            </main>
                        </div>
                    </FeedNotifications>
                </VortexWeb3Loaded>
                <VortexWeb3LoadError>
                    <div className="App">
                        <nav className="navbar pure-menu pure-menu-horizontal">
                            <a href="#" className="pure-menu-heading pure-menu-link">VortΞx Demo</a>
                        </nav>

                        <main className="container">
                            <div className="pure-g">
                                <div className="pure-u-1-1">
                                    <h1>Oops!</h1>
                                    <p>Looks like there is a problem with your Web3. Check that you unlocked your account, that Web3 is properly connected to a network and that your loader resolves a web3@1.0.0+ version of Web3 !</p>
                                </div>
                            </div>
                        </main>
                    </div>
                </VortexWeb3LoadError>
                <VortexWeb3NetworkError>
                    <div className="App">
                        <nav className="navbar pure-menu pure-menu-horizontal">
                            <a href="#" className="pure-menu-heading pure-menu-link">VortΞx Demo</a>
                        </nav>

                        <main className="container">
                            <div className="pure-g">
                                <div className="pure-u-1-1">
                                    <h1>Oops!</h1>
                                    <p>We could not find your smart contracts on the current network :(.<br/> Please check if you are on the good network !</p>
                                </div>
                            </div>
                        </main>
                    </div>
                </VortexWeb3NetworkError>
            </VortexGate>
        );
    }
}

export default App
