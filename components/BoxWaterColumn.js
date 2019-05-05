import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';
import styles from '../styles/nodeBox';
import common from '../styles/common';
import Icon from './Icon';

export default class BoxWaterColumn extends Component {

    static propTypes = {
        value: PropTypes.number
    }

    render() {
    console.log('this.props.value', this.props.value);

        if(this.props.value !== null) {
            return (
                <View style={[styles.box, styles.boxBlue]}>
                    <Icon name="water" color={common.colors.blue} size={28} />
                    <Text style={[styles.boxText, styles.blueText]}>
                        {this.props.value} <Text style={styles.unit}>mm/h</Text>
                    </Text>
                </View>
            );
        } else {
            return false;
        }
    }

}