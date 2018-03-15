import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import moment from 'moment';
import styles from '../styles/nodeBox';
import common from '../styles/common';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class BoxHum extends Component {

    static propTypes = {
        value: PropTypes.number
    }

    render() {
        if(this.props.value) {
            return (
                <View style={[styles.box, styles.boxBlue]}>
                    <Icon name="tint" size={30} color={common.colors.blue} />
                    <Text style={[styles.boxText, styles.blueText]}>{this.props.value}%</Text>
                </View>
            );
        } else {
            return false;
        }
    }

}