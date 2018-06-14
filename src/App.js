import React, { Component } from 'react'
import {VortexGate, VortexWeb3Loaded, VortexWeb3LoadError, VortexWeb3NetworkError, VortexWeb3Loading, VortexWeb3Locked, VortexMetamaskLoader} from "vort_x-components";
import MyToken from '../build/contracts/MyToken.json'
import Web3 from 'web3';
import {FeedNotifications} from "./demo-sections/feed-notifications";
import {Balances} from "./demo-sections/balances";

class App extends Component {
    render() {
        return (
            <VortexGate contracts={{
                type: 'truffle',
                truffle_contracts: [MyToken],
                preloaded_contracts: ["MyToken"]
            }} network_contracts={[MyToken]} loader={VortexMetamaskLoader(Web3)}>


                <VortexWeb3Loaded>
                    <FeedNotifications>
                        <div className="App">
                            <main className="container">
                                <div className="pure-g">
                                    <div className="pure-u-1-1">
                                        <h1>VortΞx Demo Loaded !</h1>
                                    </div>
                                    <div>
                                        <Balances MyToken={['0x0d0020758c4f1f85b2b89322ff01a67ce30fb0f8']} account='0xe87529a6123a74320e13a6dabf3606630683c029' />
                                    </div>
                                </div>
                                
                            </main>
                        </div>
                    </FeedNotifications>
                </VortexWeb3Loaded>


                <VortexWeb3Loading>
                    <div className="App">

                        <main className="container">
                            <div className="pure-g">
                                <div className="pure-u-1-1">
                                    <h1>Loading ... </h1>
                                </div>
                            </div>
                        </main>
                    </div>
                </VortexWeb3Loading>


                <VortexWeb3LoadError>
                    <div className="App">

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


                <VortexWeb3Locked>
                    <div className="App">

                        <main className="container">
                            <div className="pure-g">
                                <div className="pure-u-1-1">
                                    <h1>Psst!</h1>
                                    <p>Looks like someone forgot to unlock its wallet provider ;)</p>
                                </div>
                            </div>
                        </main>
                    </div>
                </VortexWeb3Locked>


            </VortexGate>
        );
    }
}

export default App
