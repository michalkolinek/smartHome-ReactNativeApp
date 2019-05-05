import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
		width: '100%',
		flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
	},

	appHeader: {
	    elevation: 0,
        shadowColor: 'black',
        shadowOpacity: 0.1,
        shadowRadius: StyleSheet.hairlineWidth,
        shadowOffset: {
            height: StyleSheet.hairlineWidth,
        },
        // We don't need zIndex on Android, disable it since it's buggy
        zIndex: Platform.OS === 'android' ? 0 : 1,
	}
});