import React from 'react';
import { View } from 'react-native';
import NodeBox from './NodeBox';
import BoxTemp from './BoxTemp';
import BoxHum from './BoxHum';
import BoxMoist from './BoxMoist';
import styles from '../styles/nodeBox';

export default class TempHumBox extends NodeBox {

    renderContent() {
        return <View style={styles.data}>
            <BoxTemp key="temp" value={this.props.node.temp} />
            <BoxHum key="hum" value={this.props.node.hum} />
            <BoxMoist key="moist" value={this.props.node.moist} />
        </View>;
    }
}