
import React, { Component } from 'react';
import { Text, View, Button, AsyncStorage, Dimensions } from 'react-native';
import clone from 'clone';
import Header from './components/Header';
import Feed from './components/Feed';
import styles from './styles/main';
import tabsStyles from './styles/tabs';
import common from './styles/common';
import firebase from 'react-native-firebase';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import { Client, Message } from 'react-native-paho-mqtt';

const myStorage = {
  setItem: (key, item) => {
    myStorage[key] = item;
  },
  getItem: (key) => myStorage[key],
  removeItem: (key) => {
    delete myStorage[key];
  },
};

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
					press: null,
					windAvg: null,
                    windMax: null,
                    waterColumn: null,
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
                    id: 'sprinklers',
                    title: 'Zavlažování',
                    status: null,
                    lastIrrigated: null,
                    moist: null,
                    time: null,
                    supplyV: null
                },  {
                    id: 'pool',
                    title: 'Bazén',
                    temp: null,
                    time: null,
                    supplyV: null
                }, {
                    id: 'fan',
                    title: 'Větrání',
                    status: null,
                    supplyV: null
                }, {
					id: 'washmachine',
					title: 'Pračka',
					status: 'idle',
					time: null,
					supplyV: null,
					acked: false
				}
			],
			light: false,
			tabs: {
			    index: 0,
			    routes: [
                    { key: 'feed', title: 'Live Feed' },
                    { key: 'stats', title: 'Stats' },
                    { key: 'controls', title: 'Controls' }
                ]
			}
		};

		this.client = null;
		this.config = {
		    qos: 1,
			broker: 'ws://home.websense.cz:9001/',
			clientId: 'SmartHome-RNA' + Math.round(Math.random()*100000)
		};
	}

	componentDidMount() {
	    firebase.auth()
            .signInAnonymouslyAndRetrieveData()
            .then(credential => {
                if (credential) {
//                    console.log('default app user ->', credential.user.toJSON());
                }
            });

        this.client = new Client({ uri: this.config.broker, clientId: this.config.clientId, storage: myStorage })
        this.client.on('connectionLost', (responseObject) => this.handleConnectionLost(responseObject));
        this.client.on('messageReceived', (message) => this.handleMessage(message));
        this.connect();

        this.registerFCM();
	}

	connect() {
	    if(this.state.status !== 'connected') {
            this.setState({pending: true});
            this.client.connect({reconnect: false, keepAliveInterval: 30, mqttVersion: 4})
                .then(() => {
                    console.log('onConnect');
                    this.handleConnect();
                })
                .catch((responseObject) => {
                    if (responseObject.errorCode !== 0) {
                      console.log('onConnectionLost:' + responseObject.errorMessage);
                    }
            });
        }
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
	    console.log('connection lost', responseObject);
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
                },
                onFailure: (invocationContext, errorCode, errorMessage) => {
                    this.handleSubscribeFailure(invocationContext, errorCode, errorMessage);
                }
		    });
		    this.registerDevice();
	    });
	}

	handleConnectFailed(responseObject) {
		console.log('connection failed', responseObject.errorMessage);
		this.setState({status: 'connection failed'});
		setTimeout(() => this.connect(), 1000);
	}

	handleSubscribeSuccess() {
		this.setState({status: 'subscribed'});
	}

	handleSubscribeFailure(invocationContext, errorCode, errorMessage) {
	    console.log('subscription failed', errorMessage);
		this.setState({status: 'subscription failed'});
	}

	handleMessage(message) {
	    let data;
	    try {
		    data = JSON.parse(message.payloadString);
		}
        catch(e) {
            console.log('chyba pri parsovani zpravy, zahazuji');
            return false;
        }

		let nodes = clone(this.state.nodes);
		let i, j = null;

		switch(message.destinationName) {
			case 'smarthome/outside':
				i = nodes.findIndex((item) => item.id == 'outside');
				nodes[i].temp = data.temp;
				nodes[i].hum = data.hum;
				j = nodes.findIndex((item) => item.id == 'sprinklers');
                nodes[j].moist = data.moist;
                if(data.time) {
                    nodes[j].time = data.time;
                }
				break;
			case 'smarthome/wind':
                i = nodes.findIndex((item) => item.id == 'outside');
                nodes[i].windAvg = data.windAvg;
                nodes[i].windMax = data.windMax;
                if(data.time) {
                    nodes[i].time = data.time;
                }
                break;
            case 'smarthome/rain':
                i = nodes.findIndex((item) => item.id == 'outside');
                nodes[i].waterColumn = data.waterColumn;
                if(data.time) {
                    nodes[i].time = data.time;
                }
                break;
			case 'smarthome/office':
                i = nodes.findIndex((item) => item.id == 'office');
                nodes[i].temp = data.temp;
                nodes[i].hum = data.hum;
                j = nodes.findIndex((item) => item.id == 'outside');
                nodes[j].press = data.press;
                if(data.time) {
                    nodes[j].time = data.time;
                }
                break;
			case 'smarthome/sprinklers':
				i = nodes.findIndex((item) => item.id == 'sprinklers');
				nodes[i].status = data.status;
				break;
			case 'smarthome/fan':
                i = nodes.findIndex((item) => item.id == 'fan');
                nodes[i].status = (parseInt(data) === 1);
                break;
			case 'smarthome/washmachine':
				i = nodes.findIndex((item) => item.id == 'washmachine');
//				if(this.state.acked === false) {
//				    nodes[i].status = data.status;
//				}
				break;
			default:
			    const topic = message.destinationName.replace('smarthome/', '');
                i = nodes.findIndex((item) => item.id == topic);

                if(i > -1) {
                    nodes[i].temp = data.temp;
                    nodes[i].hum = data.hum;
                }
		}

		if(i > -1 && data.supplyV) {
			nodes[i].supplyV = data.supplyV;
		}

		if(i > -1 && data.time) {
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
	console.log('registerDevice', this.state.connected, this.state.registered);
	    if(this.state.connected && !!this.state.deviceToken && !this.state.registered) {
	        console.log('messaging token', this.state.deviceToken);
            this.publish('smarthome/registration', JSON.stringify({deviceId: this.state.deviceToken}), 0, false);
            this.setState({registered: true});
        }
	}

	handleLightButtonPress() {
	    this.setState({light: !this.state.light}, () => {
//	        this.publish('smarthome/controls/sprinklers', JSON.stringify({action: (this.state.light ? 'start' : 'stop')}), 2, false);
	    });
	}

	handleCommand(node, param) {
        this.publish('smarthome/controls/' + node, JSON.stringify(param), 2, false);
    }

	handleTabChange(index) {
	    this.state.tabs.index = index;
	    this.forceUpdate();
	}

	publish(topic, payload, qos, retain) {
	    const message = new Message(payload);
        message.destinationName = topic;
        message.qos = qos;
        message.retain = retain;
        this.sendMessage(message);
	}

	sendMessage(message) {
	    if(this.state.connected) {
	        this.client.send(message);
        } else {
	        setTimeout(() => {
	            this.sendMessage(message);
	        }, 500);
	    }
	}

	renderTabBar(props) {
	    return (
	        <View style={styles.appHeader}>
	            <Header status={this.state.status} />
	            <TabBar {...props}
	                style={tabsStyles.tabBar}
	                indicatorStyle={tabsStyles.indicator}
	                labelStyle={tabsStyles.tabLabel}
                />
            </View>
        );
    }

	render() {
        const scene = ({ route }) => {
             switch (route.key) {
                case 'feed':
                    return <Feed {...this.props}
                                    nodes={this.state.nodes}
                                    onRefresh={() => this.reconnect()}
                                    onWashmachineAck={() => this.handleWashmachineAck()}
                                    onCommand={(node, param) => this.handleCommand(node, param)} />;
                case 'stats':
                    return <View style={[styles.container, {backgroundColor: common.colors.blue} ]}>

                           </View>;
                case 'controls':
                    return <View style={[styles.container, {backgroundColor: common.colors.yellow} ]}></View>;
                default:
                    return null;
            }
        };

		return (
            <TabView
                navigationState={this.state.tabs}
                renderScene={scene}
                renderTabBar={(props) => this.renderTabBar(props)}
                onIndexChange={index => this.handleTabChange(index)}
                initialLayout={{
                    width: Dimensions.get('window').width,
                    height: 500
                }}
            />
		);
	}
}
