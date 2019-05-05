import { StyleSheet, Platform } from 'react-native';
import common from './common';

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    scroll: {
        overflow: Platform.OS === 'web' ? ('auto': any) : 'scroll',
    },
    tabBar: {
        backgroundColor: common.colors.lightGray,
        elevation: 0
    },
    tabContent: {
        flexDirection: 'row',
        flexWrap: 'nowrap',
    },
    tabLabel: {
        backgroundColor: 'transparent',
        color: common.colors.darkGray,
        margin: 8,
    },
    tabItem: {
        flex: 1,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badge: {
        position: 'absolute',
        top: 0,
        right: 0,
    },
    indicatorContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    indicator: {
        backgroundColor: common.colors.blue,
        position: 'absolute',
        left: 0,
        bottom: 0,
        right: 0,
        height: 3,
    },
});