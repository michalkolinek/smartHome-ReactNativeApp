import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import NodesList from '../components/NodesList';
import styles from '../styles/main';

export default class Feed extends Component {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        pending: PropTypes.bool,
        onRefresh: PropTypes.func.isRequired,
        onCommand: PropTypes.func.isRequired,
        onWashmachineAck: PropTypes.func
    };

    render() {
        return (
            <View style={styles.container}>
                <NodesList {...this.props} />
            </View>
        );
    }

}