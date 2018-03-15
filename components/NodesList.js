import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, Text, FlatList, View, RefreshControl } from 'react-native';
import TempHumBox from './TempHumBox';
import WashmachineBox from './WashmachineBox';
import styles from '../styles/nodesList';

export default class NodesList extends Component {

    static propTypes = {
        nodes: PropTypes.array.isRequired,
        pending: PropTypes.bool,
        onRefresh: PropTypes.func.isRequired,
        onWashmachineAck: PropTypes.func
    }

    static defaultProps = {
        pending: false
    }

    renderNode(node) {
        switch(node.item.id) {
            case 'washmachine' : return <WashmachineBox node={node.item} index={node.index} onAck={() => this.props.onWashmachineAck()} />
            default : return <TempHumBox node={node.item} index={node.index} />
        }
    }

    renderSeparator() {
        return (
            <View style={styles.separator} />
        );
    }

    render() {
        return (
                <FlatList data={this.props.nodes}
                    style={styles.container}
                    refreshControl={
                          <RefreshControl
                            refreshing={this.props.pending}
                            onRefresh={() => this.props.onRefresh()}
                          />
                    }
                    ItemSeparatorComponent={(index) => this.renderSeparator(index)}
                    keyExtractor={(node) => node.id}
                    renderItem={(node) => this.renderNode(node)} />

        );
    }

}