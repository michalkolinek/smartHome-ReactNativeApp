import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import config from '../assets/selection.json';
const Icomoon = createIconSetFromIcoMoon(config);
import common from '../styles/common';

export default class Icon extends Component {

    static propTypes = {
        name: PropTypes.string.isRequired,
        color: PropTypes.string,
        size: PropTypes.number
    }

    static defaultProps = {
        color: common.colors.black,
        size: 30
    }

    render() {
        return <Icomoon name={this.props.name} size={this.props.size} color={this.props.color} />
    }

}