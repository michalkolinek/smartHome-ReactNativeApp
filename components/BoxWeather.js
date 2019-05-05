import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import moment from 'moment';
import styles from '../styles/nodeBox';
import common from '../styles/common';
import Icon from './Icon';

export default class BoxWeather extends Component {

    static propTypes = {
        value: PropTypes.object
    }

    render() {
        if(this.props.value) {
            return (
                <View style={[styles.box, styles.boxBlack]}>
                    <Icon name="wind" color={common.colors.black} size={28} />
                    <Text style={[styles.boxText, styles.blackText]}>
                        {this.props.value.avg}<Text style={styles.gray}>/{this.props.value.max}</Text> <Text style={styles.unit}>m/s</Text>
                    </Text>
                </View>
            );
        } else {
            return false;
        }
    }

}