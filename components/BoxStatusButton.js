import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import moment from 'moment';
import BoxStatus from './BoxStatus';
import styles from '../styles/nodeBox';

export default class BoxStatusButton extends Component {

    static propTypes = {
        value: PropTypes.bool,
        onPress: PropTypes.func
    }

    render() {
        return (
            <TouchableOpacity onPress={() => this.props.onPress()} style={styles.touchableBox}>
                <BoxStatus value={this.props.value} />
            </TouchableOpacity>
        );
    }

}