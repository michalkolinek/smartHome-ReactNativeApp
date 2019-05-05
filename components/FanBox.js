import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import NodeBox from './NodeBox';
import BoxStatusButton from './BoxStatusButton';
import styles from '../styles/nodeBox';

export default class FanBox extends NodeBox {

    static PropTypes = {
        onCommand: PropTypes.func.isRequired
    }

    handlePress() {
        this.props.onCommand(this.props.node.status ? 0 : 1);
    }

    renderContent() {
        return <View style={styles.data}>
            <BoxStatusButton key="status" value={this.props.node.status} onPress={() => this.handlePress()} />
        </View>;
    }

}