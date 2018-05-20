import React from 'react';
import { View } from 'react-native';
import NodeBox from './NodeBox';
import BoxWaterTemp from './BoxWaterTemp';
import styles from '../styles/nodeBox';

export default class PoolBox extends NodeBox {

    renderContent() {
        return <View style={styles.data}>
            <BoxWaterTemp key="temp" value={this.props.node.temp} />
        </View>;
    }

}