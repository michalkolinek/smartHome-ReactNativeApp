import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import styles from '../styles/nodeBox';

export default class BoxMoist extends Component {

    static propTypes = {
        value: PropTypes.number
    }

    render() {
        if(this.props.value) {
            return (
                <View style={[styles.box, styles.boxYellow]}>
                    <Text style={[styles.boxText, styles.yellowText]}>{this.props.value}</Text>
                </View>
            );
        } else {
            return false;
        }
    }

}