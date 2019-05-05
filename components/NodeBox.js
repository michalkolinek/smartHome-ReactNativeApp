import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';
import Icon from './Icon';
import styles from '../styles/nodeBox';
import common from '../styles/common';

export default class NodeBox extends Component {

    static propTypes = {
        node: PropTypes.object.isRequired,
        index: PropTypes.number,
        onAck: PropTypes.func
    }

    renderTime() {
        let time = false;
        if(this.props.node.time) {
            const d = new Date();

            let warningIco = false;
            if(this.props.node.time < d.getTime() - 30 * 60 * 1000) {
                warningIco = <View key='ico' style={styles.warningIcon}>
                    <Icon name={'warning'} size={14} color={common.colors.red} />
                </View>
            }

            let timeString;
            if(this.props.node.time < d.getTime() - 24 * 60 * 60 * 1000) {
                timeString = moment(this.props.node.time).format('D.M. H:mm');
            } else {
                timeString = moment(this.props.node.time).format('H:mm');
            }

            time = [
                        warningIco,
                        <Text key='time' style={styles.time}>{timeString}</Text>
                   ];
        }
        return time;
    }

    render() {
        const voltage = Math.round(this.props.node.supplyV * 100) / 100;
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{this.props.node.title}</Text>
                    <View style={styles.info}>
                        {this.props.node.supplyV && <Text style={styles.voltage}>{voltage}V</Text>}
                        {this.renderTime()}
                    </View>
                </View>
                {this.renderContent()}
            </View>
        );
    }

}