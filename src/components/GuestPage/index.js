import React, { Component } from 'react';
//simpe ui compoents
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import awsExportConfig from '../../aws-exports.js';

import Amplify, {
    API,
    graphqlOperation
} from 'aws-amplify';

import { Auth } from "aws-amplify";

Amplify.configure(awsExportConfig);

class TestPage extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <div>
                <div>This is unauthorized / guest user page</div>
            </div>
        );
    }
}

export default withRouter(connect(
    state => {
        return {
        };
    },
    dispatch => {
        return {
            actions: {
            }
        };
    }
)(TestPage));
