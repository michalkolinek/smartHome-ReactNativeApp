import React from 'react';
import { View } from 'react-native';
import NodeBox from './NodeBox';
import BoxMoist from './BoxMoist';
import BoxStatus from './BoxStatus';
import styles from '../styles/nodeBox';

export default class SprinklersBox extends NodeBox {

    renderContent() {
        return <View style={styles.data}>
            <BoxMoist key="moist" value={this.props.node.moist} />
            <BoxStatus key="status" value={this.props.node.status} />
        </View>;
    }

}