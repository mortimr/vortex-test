import {connect} from 'vort_x-components';
import React from 'react';
import {FeedType, FeedFilter} from 'vort_x';

// Modified Balances to automatically detect new instances of MyToken and display
// Balance for each one of them

// This Class will only contain the data from the balanceOf call
// It requires a prop address (of the contract) and recipient (the address you're checking the balance)
class _Balance extends React.Component {
    render() {
        console.log(this.props.balance);
        return (<div>
            <p>
                Balance of {this.props.recipient} at MyToken:{this.props.address}
            </p>
            <p>=> {this.props.balance ? this.props.balance : "Loading ..."}</p>
        </div>)
    }
}

// Never do != 'undefined' as it is not the same thing at all !!
const _Balance_mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps,
        balance: state.contracts.MyToken[ownProps.address] ? state.contracts.MyToken[ownProps.address].instance.vortex.balanceOf.vortexData({}, ownProps.recipient) : undefined
    }
};

const Balance = connect(_Balance, _Balance_mapStateToProps);

class _BalancesList extends React.Component {

    constructor(props) {
        super(props);
        this.elements = [];
    }

    // This method is very important, it will be called before a component renders. You will have
    // the possibility to check the props that are going to be given to the component (so in our case
    // the list of contracts). And that will allow you to check if you have to (or not to) render your
    // component. Here I only check if size differs, and if new elements are new contracts of type
    // MyToken. If so, I add a new <Balance> component inside my this.elements array.
    shouldComponentUpdate(nextProps) {
        if (nextProps.contracts.length !== this.props.contracts.length) {
            for (let idx = this.props.contracts.length; idx < nextProps.contracts.length; ++idx) {
                if (nextProps.contracts[idx].contract_name === 'MyToken') {
                    this.elements.push(<Balance address={nextProps.contracts[idx].contract_address} recipient={this.props.account} key={idx}/>);
                    return true;
                }
            }
        }
        return false;
    }

    // Simply render the array that we build progressivily each time new contracts are added into the feed
    render() {
        return (<div>
            {this.elements}
        </div>);
    }
}

// One key concept of Vortex if the Feed. The Feed is an array in the store (state.feed) that will store all
// major actions happening in your Dapp. You can built a selector and use it with the state to only get the
// feed events about contract creation.
// So now inside this.props.contracts you will have a growing array of elements with the contract name and
// contract address of new deployed contracts.
// This is great because any new MyToken contract that you load from anywhere in your app will be received
// here and you'll be able to check its balance !
//
// Of course this can be used for Transactions, Errors, Accounts ..., you just have to create an appropriate
// selector if you ever need something else
// FeedFilter(FeedType.Contract | FeedType.Transactions) will give you both new contract and new transaction
// feed elements !
const _BalancesList_mapStateToProps = (state, ownProps) => {

// At first there is no selector inside the props, so you have to create it
    let selector;
    if (!ownProps.selector)
        selector = FeedFilter(FeedType.Contracts);

    return {
        ...ownProps,
        selector: selector,
        // And of course always check if something is not undefined when you know it can be
        contracts: ownProps.selector ? ownProps.selector(state) : selector(state)
    }
};

export const BalancesList = connect(_BalancesList, _BalancesList_mapStateToProps);
