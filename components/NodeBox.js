import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import styles from '../styles/nodeBox';

export default class NodeBox extends Component {

    static propTypes = {
        node: PropTypes.object.isRequired,
        index: PropTypes.number,
        onAck: PropTypes.func
    }

    renderTime() {
        let time = false;
        if(this.props.node.time) {
            time = <Text style={styles.time}>{moment(this.props.node.time).format('H:mm')}</Text>;
        }
        return time;
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{this.props.node.title}</Text>
                    <View style={styles.info}>
                        {this.props.node.supplyV && <Text style={styles.voltage}>{this.props.node.supplyV}V</Text>}
                        {this.renderTime()}
                    </View>
                </View>
                {this.renderContent()}
            </View>
        );
    }

}