import { StyleSheet } from 'react-native';
import common from './common';

export default StyleSheet.create({
	container: {
		backgroundColor: common.colors.lightGray,
        width: '100%',
        height: 60,
        paddingLeft: 10,
        flexDirection: 'row'
	},

	wrapper: {
	    flex: 1,
	    flexDirection: 'row',
	    justifyContent: 'flex-start',
        alignItems: 'center'
	},

	logo: {
        borderRadius: 20,
        backgroundColor: '#fff',
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center'
    },

    logoImg: {
        width: 30,
        height: 30,
        flexGrow: 0
    },

    title: {
        fontSize: 24,
        color: common.colors.red,
        marginLeft: 10,
        flexGrow: 0
    },

    status: {
        marginRight: 10,
        flexGrow: 0
    },

    spacer: {
        flexGrow: 1
    }

});