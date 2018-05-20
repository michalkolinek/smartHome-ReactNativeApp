import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, View, Image } from 'react-native';
import styles from '../styles/header';
import favicon from '../assets/img/favicon.png';

export default class Header extends Component {

        static propTypes = {
            status: PropTypes.string.isRequired
        }

        render() {
            return (
                <View style={styles.container}>
                    <View style={styles.wrapper}>
                        <View style={styles.logo}>
                            <Image source={favicon} style={styles.logoImg} />
                        </View>
                        <Text style={styles.title}>Soběšice</Text>
                        <View style={styles.spacer} />
                        <Text style={styles.status}>Status: {this.props.status}</Text>
                    </View>
                </View>
           )
       }
   }