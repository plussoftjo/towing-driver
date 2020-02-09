import React from 'react';

/** Components */
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import {View,Text,AsyncStorage} from 'react-native';
import {styles} from './styles'
import {LocationLoader,MapParts,MainDrawer,MapExtraParts} from '../../components'
import {Drawer} from 'native-base';
import axios from 'axios';
/** Expo Librarys */
import { Notifications } from 'expo';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import {inject,observer} from 'mobx-react';
import {permissions} from '../../service';
import {Images} from '~/commons'

@inject('locations')
@inject('socketmanger')
@inject('auth')
@inject('processor')
@inject('manger')
@inject('settings')
@observer
export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isReady:false,
        };
    }

    componentWillMount() {
        this._install_coords();// Install Coords
       this._install_notifaction();
    }

    async _install_notifaction() {

        //** Check if have token */
        let notification_token = await AsyncStorage.getItem('notification_token_client');
        if(notification_token !== null) {
            // Has
            if(this.props.auth.user.notifaction_token == null) {
                axios.post(this.props.settings.serverUri + 'api/helper/notification/update',{id:this.props.auth.user.id,token:notification_token}).then(response => {

                }).catch(err => {
                    console.log(err.response);
                });
            }
        }else {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            // only asks if permissions have not already been determined, because
            // iOS won't necessarily prompt the user a second time.
            // On Android, permissions are granted on app installation, so
            // `askAsync` will never prompt the user
    
            // Stop here if the user did not grant permissions
            if (status !== 'granted') {
                alert('No notification permissions!');
                return;
            }
    
            // Get the token that identifies this device
            let token = await Notifications.getExpoPushTokenAsync();
            await AsyncStorage.setItem('notification_token_client',token);
            axios.post(this.props.settings.serverUri + 'api/helper/notification/update',{id:this.props.auth.user.id,token:notification_token}).then(response => {

            }).catch(err => {
                console.log(err.response);
            });
        }
        this._notificationSubscription = Notifications.addListener(this._handleNotification);

    }
    _handleNotification = (notification) => {
        let self = this;
        // do whatever you want to do with the notification
        this.has_request(notification.data.data);
      };

      has_request(data) {
        /** Register Client & order details */
        let self = this;
        setTimeout(() => {
            self.props.processor.register_data(data);
            self.props.manger.state = 1;
        }, 1000);
       
      }
    _install_coords = async() => {
        /** Install Coords */
        let {status} = await Permissions.askAsync(Permissions.LOCATION);// Check Permissions
        if(status !== 'granted') {permissions._onPermissionDeney();} // If Permissions Deney
        let location = await Location.getCurrentPositionAsync(); // Get Coords


        this.setState({isReady:true});

        /** Register to the stores */
        this.props.locations.register_user_coords(location.coords);
        this.props.locations.register_map_coords(location.coords);

        this.props.locations.create_location();


        /**
         * Function when call driver from socket
         */
        let self = this;
        // let has_request = function(data) {
        //     /** Register Client & order details */
        //     self.props.processor.register_data(data);
        //     self.props.manger.state = 1;
        // }
        /** Subscripe to socketmanger */
        this.props.socketmanger.subscripe_driver(this.props.auth.user.id,this.has_request);

        // check order 
        try {
            const value = await AsyncStorage.getItem('driver_order');
            if (value !== null) {
              // We have data!!
                let data = JSON.parse(value);
                
                //  Get Data one be one 
                self.props.processor.service =data.service;
                self.props.processor.client = data.client;
                self.props.processor.client_coords = data.client_coords;
                self.props.processor.direction_polyline = data.direction_polyline;
                self.props.processor.geocode = data.geocode;
                self.props.processor.distance_matrix = data.distance_matrix;
                self.props.processor.distance = data.distance;
                self.props.manger.state = data.state;
                self.props.manger.MapParts = data.MapParts;
                

            }
          } catch (error) {
            console.warn(error);
          }

    }
    closeDrawer = () =>  {
        this.props.manger.state = 0;
        this.drawer._root.close();
    };
    openDrawer = () => {
        this.props.manger.state = 404;
        this.drawer._root.open();
    }
    render() {
        let locations = this.props.locations;
        return (
            <Drawer  openDrawerOffset={0.30} panCloseMask={0.35} onClose={() => this.closeDrawer()} ref={(ref) => { this.drawer = ref; }} content={<MainDrawer closeDrawer={this.closeDrawer} navigation={this.props.navigation}/>}style={styles.container}>
                <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.mapStyle}
                ref={map => {this.map = map;}}
                showsUserLocation={true}
                region={{
                    latitude:locations.map_coords.latitude,
                    longitude:locations.map_coords.longitude,
                    latitudeDelta:this.state.isReady?0.015:0.99,
                    longitudeDelta:this.state.isReady?0.0121:0.99
                }}
                customMapStyle={require('../../commons/MapStyle.json')}
                >
                    <MapExtraParts map={this.map} />
                </MapView>

                {/** Loader 
                 * @action Destroy When Comblete
                 * @disaply LottieView -> animation Loader
                 */}
                 {!this.state.isReady &&
                    <LocationLoader/>
                 }

                 {/**
                  * Map Parts
                  */}
                  {this.state.isReady && 
                      <MapParts map={this.map} openDrawer={this.openDrawer} />
                  }
            </Drawer>
        )
    }
    
}