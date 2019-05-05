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

	diode: {
	    position: 'absolute',
	    right: 10,
	    top: 10,
	    width: 8,
	    height: 8,
	    borderRadius: 4,
	    backgroundColor: common.colors.gray
    },

	diodeActive: {
	    backgroundColor: common.colors.greenHighlight
	},

	box: {
	    flex: 1,
	    marginRight: 10,
	    borderWidth: 1,
	    borderRadius: 3,
	    padding: 10,
	    flexDirection: 'row',
	    justifyContent: 'center',
	},

	touchableBox: {
	    flex: 1
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

    boxGreen: {
         borderColor: common.colors.green
    },

    blueText: {
        color: common.colors.blue,
    },

    redText: {
        color: common.colors.red
    },

    yellowText: {
         color: common.colors.yellow
    },

    greenText: {
         color: common.colors.green
    },

    blackText: {
        color: common.colors.black
    },

    warningIcon: {
        marginRight: 6,
        marginTop: 1
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
    },

    gray: {
        color: common.colors.darkGray,
        fontSize: 18
    },

    unit: {
        fontSize: 18
    }

});