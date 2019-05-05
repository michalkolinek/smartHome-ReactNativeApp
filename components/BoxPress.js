import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';
import styles from '../styles/nodeBox';
import common from '../styles/common';
import Icon from './Icon';

export default class BoxPress extends Component {

    static propTypes = {
        value: PropTypes.number
    }

    render() {
        if(this.props.value) {
            return (
                <View style={[styles.box, styles.boxBlack]}>
                    <Text style={[styles.boxText, styles.blackText]}>{Math.round(this.props.value)} <Text style={styles.unit}>hPa</Text></Text>
                </View>
            );
        } else {
            return false;
        }
    }

}