
import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage } from 'react-native';
import clone from 'clone';
import init from 'react_native_mqtt';
import NodesList from './components/NodesList';
import Header from './components/Header';
import styles from './styles/main';
import firebase from 'react-native-firebase';
import RNLocalNotifications from 'react-native-local-notifications';

init({
	size: 10000,
	storageBackend: AsyncStorage,
	defaultExpires: 1000 * 3600 * 24,
	enableCache: true,
	reconnect: true,
	sync : {
	}
});

export default class App extends Component {

	constructor(props) {
		super(props);

		this.state = {
			status: 'idle',
			pending: false,
			deviceToken: null,
			registered: false,
			connected: false,
			nodes: [
				{
					id: 'outside',
					title: 'Venku',
					temp: null,
					hum: null,
					time: null,
					supplyV: null
				}, {
					id: 'livingroom',
					title: 'Obyvák',
					temp: null,
					hum: null,
					time: null,
                    supplyV: null
				}, {
                    id: 'bedroom',
                    title: 'Ložnice',
                    temp: null,
                    hum: null,
                    time: null,
                    supplyV: null
                }, {
                    id: 'office',
                    title: 'Pracovna',
                    temp: null,
                    hum: null,
                    time: null,
                    supplyV: null
                }, {
                    id: 'basement',
                    title: 'Sklep',
                    temp: null,
                    hum: null,
                    time: null,
                    supplyV: null
                },  {
					id: 'washmachine',
					title: 'Pračka',
					status: 'idle',
					time: null,
					supplyV: null,
					acked: false
				}, {
                    id: 'sprinklers',
                    title: 'Spriklery',
                    status: null,
                    time: null,
                    supplyV: null
                }
			]
		};

		this.client = null;
		this.config = {
			qos: 2,
			port: 9001,
			broker: 'home.websense.cz'
		};
	}

	componentDidMount() {
	    firebase.auth()
          .signInAnonymouslyAndRetrieveData()
          .then(credential => {
            if (credential) {
              console.log('default app user ->', credential.user.toJSON());
            }
          });

	    this.connect();
        this.registerFCM();
	}

	connect() {
	    this.setState({pending: true});
		this.client = new Paho.MQTT.Client(this.config.broker, this.config.port, '/mqtt', 'michal1');
		this.client.onConnectionLost = (responseObject) => this.handleConnectionLost(responseObject);
		this.client.onMessageArrived = (message) => this.handleMessageArrived(message);
		this.client.connect({
			onSuccess: () => { this.handleConnect(); },
			useSSL: false,
			onFailure: (responseObject) => { this.handleConnectFailed(responseObject); }
		});
	}

	disconnect() {
		if(this.state.status == 'connected') {
			this.client.disconnect();
		}
		this.setState({status: 'disconnected'});
	}

	reconnect() {
	    this.setState({pending: true}, () => {
            this.disconnect();
            this.connect();
	    });
	}

	handleConnectionLost(responseObject) {
	    console.log(+ responseObject.errorMessage);
		this.setState({status: 'connection lost'});
		setTimeout(() => this.connect(), 1000);
	}

	handleConnect() {
		this.setState({status: 'connected', connected: true}, () => {
			this.client.subscribe('smarthome/#', {
				qos: this.config.qos,
				timeout: 10,
				onSuccess: () => {
					this.handleSubscribeSuccess();
					this.registerDevice()
				},
				onFailure: () => {
					this.handleSubscribeFailure();
				}
			});
		});
	}
	handleConnectFailed(responseObject) {
		console.log(responseObject.errorMessage);
		this.setState({status: 'connection failed'});
		setTimeout(() => this.connect(), 10000);
	}

	handleSubscribeSuccess() {
		this.setState({status: 'subscribed'});
	}

	handleSubscribeFailure() {
		this.setState({status: 'subscription failed'});
	}

	handleMessageArrived(message) {
		const data = JSON.parse(message.payloadString);
		let nodes = clone(this.state.nodes);
		let i = null;

		console.log(message.topic, data);

		switch(message.topic) {
			case 'smarthome/outside':
				i = nodes.findIndex((item) => item.id == 'outside');
				nodes[i].temp = data.temp;
				nodes[i].hum = data.hum;
				break;
			case 'smarthome/washmachine':
//				i = nodes.findIndex((item) => item.id == 'washmachine');
//				if(this.state.acked === false) {
//				    nodes[i].status = data.status;
//				}
				break;
			default:
                i = nodes.findIndex((item) => item.id == message.topic.replace('smarthome/', ''));
                nodes[i].temp = data.temp;
                nodes[i].hum = data.hum;
                break;
		}
		if(i !== null && data.supplyV) {
			nodes[i].supplyV = data.supplyV;
		}

		if(i !== null && data.time) {
        	nodes[i].time = data.time;
        }

		this.setState({status: 'receiving', pending: false, nodes});

	}

	handleWashmachineAck() {
		let nodes = clone(this.state.nodes);
        const i = nodes.findIndex((item) => item.id == 'washmachine');
        nodes[i].acked = true;
        this.setState({nodes});

		setTimeout(() => {
		    let nodes = clone(this.state.nodes);
		    const i = nodes.findIndex((item) => item.id == 'washmachine');
        	nodes[i].status = 'idle';
        	nodes[i].acked = false;
		    this.setState({nodes});
		}, 10)
	}

//	triggerNotification(message) {
//		RNLocalNotifications.createNotification(1, message, '2018-03-06 12:30', 'default');
//	}

	registerFCM() {
	    const fcm = firebase.messaging();
        fcm.getToken().then((token) => {
            this.setState({deviceToken: token});
            this.registerDevice();
        });
        fcm.subscribeToTopic('notifications');
        fcm.onMessage((message) => {
            console.log('new FCM message', message);

            let nodes = clone(this.state.nodes);
            const i = nodes.findIndex((item) => item.id == 'washmachine');

            if(this.state.nodes[i].acked === false && nodes[i].status !== 'finished') {
                nodes[i].status = 'finished';
                const d = new Date();
                nodes[i].time = d.getTime();
                this.setState({nodes});
            }
        });
	}

	registerDevice() {
	    if(this.state.connected && !!this.state.deviceToken && !this.state.registered) {
	        console.log('messaging token', this.state.deviceToken);
            this.client.publish('smarthome/registration', this.state.deviceToken, 2, false);
            this.setState({registered: true});
        }
	}

	render() {

		return (
			<View style={styles.container}>
			    <Header status={this.state.status} />
                <NodesList
                    pending={this.state.pending}
                    nodes={this.state.nodes}
                    onRefresh={() => this.reconnect()}
                    onWashmachineAck={() => this.handleWashmachineAck()}/>
			</View>
		);
	}
}
