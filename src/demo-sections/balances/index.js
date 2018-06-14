import {connect} from 'vort_x-components';
import React from 'react';
import {Vortex} from 'vort_x';

class _Balances extends React.Component {

        constructor(props) {
        super(props);

        this.props.MyToken[0] = this.props.MyToken[0].toLowerCase()

        if (!this.props.store.getState().contracts.MyToken[this.props.MyToken[0]])
            Vortex.get().loadContract("MyToken", this.props.MyToken[0]);
    }

    render() {
                return (<div>
                    <p>{this.props.balance_one || 'Loading ...'}</p>
                </div>);
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        ...ownProps, 
        balance_one: (state.contracts.MyToken[ownProps.MyToken[0]] != 'undefined') ? state.contracts.MyToken[ownProps.MyToken[0]].instance.vortex.balanceOf.vortexData({}, ownProps.account) : undefined,
    }
};

export const Balances = connect(_Balances, mapStateToProps);