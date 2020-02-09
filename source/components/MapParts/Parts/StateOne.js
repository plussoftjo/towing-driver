import React from 'react';
import {View,Image,AsyncStorage} from 'react-native';
import {Text,Icon,Button} from 'native-base';
import * as Animatable from 'react-native-animatable';
import HeaderCard from '../../HeaderCard';
import MapCard from '../../MapCard';
import {inject,observer} from 'mobx-react';
import axios from 'axios';
import {toJS} from 'mobx'
import {googleapi} from '../../../service';
@inject('manger')
@inject('socketmanger')
@inject('processor')
@inject('locations')
@inject('auth')
@inject('settings')
@inject('notification')
@observer
export default class StateOne extends React.Component {
    constructor(props) {
        super(props);

        this.state = {time:10};
    }
    componentDidMount() {
        let self = this;
        let timer = setInterval(timerFunction,1000);

        function timerFunction() {
            self.state.time == 0? stopTimer():self.setState({time:self.state.time - 1});
        }

        function stopTimer() {
            self.props.socketmanger.send_approve(self.props.auth.user,self.props.locations.user_coords,'reject');
            self.props.manger.state = 0;
            clearInterval(timer);
        }
    }

    _return_car_name(type) {
        if(type == 0) {
            return 'Light Duty';
        }
        if(type == 1) {
            return 'Medium Duty';
        }
        if(type == 2) {
            return "Heavy Duty";
        }
        if(type == 3) {
            return "Motorcycle"
        } 
    }
    render() {
        return [
            <View key={'TopCard'} style={{position:'absolute',top:20,left:0,width:'100%'}}>
                <HeaderCard openDrawer={this.props.openDrawer}/>
            </View>,
            <Animatable.View animation="slideInUp" key={'BottomCard'} style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
                <MapCard >
                    <View style={{paddingVertical:5,paddingHorizontal:20}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Image source={{uri:this.props.settings.serverUri + this.props.processor.client.avatar}} style={{width:55,height:55,borderRadius:55 / 2}} resizeMode="contain" />
                            <View style={{width:10}}></View>
                            <View style={{flexDirection:'column'}}>
                                <Text style={{fontWeight:'700',fontSize:20,color:'rgba(0,0,0,0.4)'}}>{this.props.processor.client.name}</Text>
                                <Text style={{fontWeight:'600',fontSize:14,color:'rgba(0,0,0,0.4)'}}>{this.props.processor.service.car}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{width:'100%',height:1,backgroundColor:'rgba(32, 44, 62,0.05)'}}></View>
                    <View style={{paddingVertical:10,paddingHorizontal:30}}>
                        <View style={{flexDirection:'row',justifyContent:'center'}}>
                            <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                <Text style={{fontWeight:'700',fontSize:22,textAlign:'center',color:'rgba(0,0,0,0.4)'}}>Service</Text>
                                <Text style={{fontWeight:'700',fontSize:16,textAlign:'center',marginTop:5,fontFamily:'Roboto_medium'}}>{this.props.processor.service.main_service}</Text>
                            </View>
                            <View style={{width:'20%'}}></View>
                            <View style={{justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                                <Text style={{fontWeight:'700',fontSize:22,textAlign:'center',color:'rgba(0,0,0,0.4)'}}>Car type</Text>
                                <Text style={{fontWeight:'700',fontSize:16,textAlign:'center',marginTop:5,fontFamily:'Roboto_medium'}}>{this._return_car_name(this.props.processor.service.car_type)}</Text>
                            </View>
                        </View>
                        <View style={{height:5}}></View>
                    </View>
                    <View style={{paddingVertical:5,paddingHorizontal:2}}>
                        <View style={{flexDirection:'row'}}>
                            <View style={{width:'48%'}}>
                                <Button block danger onPress={() => {
                                    this.props.manger.state = 0;
                                    this.props.socketmanger.send_approve(this.props.auth.user,this.props.locations.user_coords,'reject');
                                }}><Text style={{fontWeight:'900',color:'white'}}>Reject</Text></Button>
                            </View>
                            <View style={{width:'4%'}}></View>
                            <View style={{width:'48%'}}>
                                <Button onPress={async() => {
                                    let self = this;
                                    this.props.manger.state = 2;
                                    /** Send noitifaction */
                                    let data = {
                                        user:toJS(self.props.auth.user),
                                        room:toJS(self.props.auth.user.id),
                                        coords:toJS(self.props.locations.user_coords),
                                        notifiaction_token:toJS(self.props.processor.client.notifaction_token)
                                    }
                                    self.props.notification.send_approve_to_client(data);
                                    this.props.socketmanger.send_approve(this.props.auth.user,this.props.locations.user_coords,'approve');
                                    let polyline = await googleapi.direction_with_coords(this.props.locations.user_coords,this.props.processor.client_coords);
                                    let geocode = await googleapi.geocoding(this.props.processor.client_coords);

                                    this.props.processor.direction_polyline = polyline;
                                    this.props.processor.geocode = geocode;
                                    this.props.manger.MapParts.client_directions = true;
                                    this.props.manger.MapParts.client_icon = true;

                                    let order_data = {
                                        service:self.props.processor.service,
                                        client:self.props.processor.client,
                                        client_coords:self.props.processor.client_coords,
                                        direction_polyline:self.props.processor.direction_polyline,
                                        geocode:self.props.processor.geocode,
                                        distance_matrix:self.props.processor.distance_matrix,
                                        distance:self.props.processor.distance,
                                        //manger step
                                        state:self.props.manger.state,
                                        MapParts:self.props.manger.MapParts,
                                        towing:false
                                    };
                                    let order_data_string = JSON.stringify(order_data);
                                    try {
                                        await AsyncStorage.setItem('driver_order',order_data_string);
                                    } catch (error) {
                                        
                                    }

                                    }} block success><Text style={{fontWeight:'900'}}>Accept {this.state.time}</Text></Button>
                            </View>
                        </View>
                    </View>
                </MapCard>
            </Animatable.View>
        ]
    }
}