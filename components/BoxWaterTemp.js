import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';
import styles from '../styles/nodeBox';
import common from '../styles/common';
import Icon from './Icon';

export default class BoxWaterTemp extends Component {

    static propTypes = {
        value: PropTypes.number
    }

    render() {
        if(this.props.value) {
            return (
                <View style={[styles.box, styles.boxBlue]}>
                    <Icon name={'temp-3'} color={common.colors.blue} />
                    <Text style={[styles.boxText, styles.blueText]}>{this.props.value}°C</Text>
                </View>
            );
        } else {
            return false;
        }
    }

}