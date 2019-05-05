import React from 'react';
import { View } from 'react-native';
import NodeBox from './NodeBox';
import BoxTemp from './BoxTemp';
import BoxHum from './BoxHum';
import BoxPress from './BoxPress';
import BoxWeather from './BoxWeather';
import BoxWaterColumn from './BoxWaterColumn';
import styles from '../styles/nodeBox';

export default class OutsideBox extends NodeBox {

    renderContent() {
        return [
            <View style={styles.data} key={'row-1'}>
                <BoxTemp key="temp" value={this.props.node.temp} />
            </View>,
            <View style={styles.data} key={'row-2'}>
                 <BoxHum key="hum" value={this.props.node.hum} />
                 <BoxPress key="press" value={this.props.node.press} />
            </View>,
            <View style={styles.data} key={'row-3'}>
                 <BoxWeather key="wind" value={{avg: this.props.node.windAvg, max: this.props.node.windMax}} />
                 <BoxWaterColumn key="rain" value={Math.round(this.props.node.waterColumn*100)/100} />
            </View>
        ];
    }
}