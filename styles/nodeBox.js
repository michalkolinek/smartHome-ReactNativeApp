import { StyleSheet } from 'react-native';
import common from './common';

export default StyleSheet.create({
	container: {
        width: '100%',
        padding: 10
	},

	header: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
	},

	data: {
        flex: 1,
	    flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 6
	},

	info: {
	    flex: 1,
	    flexDirection: 'row',
        justifyContent: 'flex-end'
	},

	voltage: {
	    marginRight: 10,
	    fontSize: 12,
	    color: common.colors.gray
	},

	time: {
        fontSize: 12,
        color: common.colors.gray
    },

	title: {
	    color: common.colors.darkGray,
	    fontSize: 24
	},

	box: {
	    flex: 1,
	    marginRight: 10,
	    borderWidth: 1,
	    borderRadius: 3,
	    padding: 10,
	    flexDirection: 'row',
	    justifyContent: 'center'
	},

	boxText: {
	    fontSize: 24,
	    marginLeft: 10
	},

	boxRed: {
        borderColor: common.colors.red
	},

    boxBlue: {
         borderColor: common.colors.blue,
    },

    boxYellow: {
         borderColor: common.colors.yellow
    },

    blueText: {
        color: common.colors.blue,
    },

    redText: {
        color: common.colors.red
    },

    yellowText: {
         color: common.colors.black
    },

    notification: {
        fontSize: 18
    },

    boxButton: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },

    ackButton: {
        width: 60,
        fontSize: 18
    }

});