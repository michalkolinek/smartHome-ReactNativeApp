import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Text, View } from 'react-native';
import NodeBox from './NodeBox';
import styles from '../styles/nodeBox';
import moment from 'moment';

export default class WashmachineBox extends NodeBox {

    handleButtonPress() {
        this.props.onAck();
    }

    renderContent() {
        let content = false;
        if(this.props.node.status == 'finished' && this.props.node.acked === false) {
            content = <View style={styles.boxButton}>
                <Text style={styles.notification}>Praní dokončeno {moment(this.props.node.time).format('H:mm')}</Text>
                <Button title="OK" style={styles.ackButton} onPress={() => this.handleButtonPress()} />
            </View>;
        }

        return content;
    }
}