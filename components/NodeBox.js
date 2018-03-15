import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import styles from '../styles/nodeBox';
import BoxTemp from './BoxTemp';
import BoxHum from './BoxHum';
import BoxMoist from './BoxMoist';

export default class NodeBox extends Component {

    static propTypes = {
        node: PropTypes.object.isRequired,
        index: PropTypes.number
    }

    render() {
        let time = false;
        if(this.props.node.time) {
            time = moment(this.props.node.time).format('H:mm');
        }

        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>{this.props.node.title}</Text>
                    <View style={styles.info}>
                        {this.props.node.supplyV && <Text style={styles.voltage}>{this.props.node.supplyV}V</Text>}
                        {time && <Text style={styles.time}>{time}</Text>}
                    </View>
                </View>
                <View style={styles.data}>
                    <BoxTemp value={this.props.node.temp} />
                    <BoxHum value={this.props.node.hum} />
                    <BoxMoist value={this.props.node.moist} />
                </View>
            </View>
        );
    }

}