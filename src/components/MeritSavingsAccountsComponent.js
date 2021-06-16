import React, { Component } from 'react';
import { Alert, Table } from 'reactstrap';
import { withRouter} from 'react-router-dom';
import { Fade, Stagger } from 'react-animation-components';

import { Loading } from './LoadingComponent';
import MeritJumbotron from './MeritJumbtronComponent';

function RenderAccount({account}) {
    return (
            <tr>
                <th scope="row">{account.id}</th>
                <td>{account.balance}</td>
                <td>{account.interestRate}</td>
            </tr>
    );   
} 

class SavingsAccounts extends Component {
constructor(props) {    
    super(props); 
}

render() {
    if (this.props.accountHolderData.accountHolder.savingsAccounts[0] == null) {
        return(
            <div>
            </div>
        )
    } else {
        return(
            <div>
                <div className="container">
                    <div className="row align-items-start">
                        <div className="col-12 col-md m-1">
                            <Stagger in>
                                <Fade in>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Savings Account Number</th>
                                                <th>Balance</th>
                                                <th>Interest Rate</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.props.accountHolderData.accountHolder.savingsAccounts.map((account) => {
                                                    return (
                                                        <RenderAccount account={account} />
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </Fade>
                            </Stagger>
                        </div>
                    </div>
                </div>
            </div>
        );    
    }
    
}
}

export default SavingsAccounts;
