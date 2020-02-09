import React from 'react';
import {View,Image,Linking,TouchableOpacity,SafeAreaView,Platform, AsyncStorage} from 'react-native';
import getDirections from 'react-native-google-maps-directions'
import {Text,Icon,Button,Header,Left,Body,Right} from 'native-base';
import * as Animatable from 'react-native-animatable';
import HeaderCard from '../../HeaderCard';
import LottieView from "lottie-react-native";
import MapCard from '../../MapCard';
import Images from '../../../commons/Images';
import LottieFiles from '../../../commons/LottieFiles'
import {inject,observer} from 'mobx-react';
import {googleapi} from '../../../service';
import axios from 'axios';
@inject('manger')
@inject('socketmanger')
@inject('settings')
@inject('locations')
@inject('processor')
@inject('auth')
@observer
export default class StateTow extends React.Component {
    constructor(props) {
        super(props);


        this.state = {state:1,start_route_button:false,end_route_button:true,navigator_button:false};
        this._start_towing = this._start_towing.bind(this);
    }

    handleGetDirections = () => {
        let url = 'https://www.google.com/maps/dir/?api=1&origin=' + this.props.locations.user_coords.latitude +','+ this.props.locations.user_coords.longitude +'&destination=' + this.props.processor.service.dropoff_location +'&travelmode=driving';
         Linking.canOpenURL(url).then(supported => {
             if (!supported) {
             return Promise.reject(new Error(`Could not open the url: ${url}`))
             } else {
             return Linking.openURL(url)
             }
         });
       }

       
    
    async _start_towing () {
        let self = this;
        let polyline = await googleapi.directions(this.props.processor.service.dropoff_location,this.props.processor.client_coords);
        this.props.processor.direction_polyline = polyline;
        this.props.manger.MapParts.client_directions = true;
        this.props.manger.MapParts.client_icon = true;
        this.props.socketmanger.start_route(this.props.auth.user.id);
        this.setState({start_route_button:false,state:2,navigator_button:true});

        try {
            const value = await AsyncStorage.getItem('driver_order');
            if (value !== null) {
            // We have data!!
                let data = JSON.parse(value);
                data.MapParts = self.props.manger.MapParts;
                data.direction_polyline = self.props.processor.direction_polyline;
                data.towing = true;
                let cache_data = JSON.stringify(data);
                await AsyncStorage.setItem('driver_order',cache_data);
            }
        } catch (error) {
            console.warn(error);
        }
    }

    async _end_service () {
        let self = this;
        this.props.manger._relayout();
        this.props.socketmanger.end_route(this.props.auth.user.id);
        this.props.manger.state = 3;
        await AsyncStorage.removeItem('driver_order');
        axios.post(this.props.settings.serverUri + 'api/order/change_to_state_three',{
            user_id:this.props.processor.client.id,
            driver_id:this.props.auth.user.id
        }).then(response => {

        }).catch(err => {
            console.log(err);
        });
    }
    async componentWillMount() {
        // relayout
        let self = this;
        this.setState({start_route_button:this.props.processor.service.have_towing?true:false});
        try {
            const value = await AsyncStorage.getItem('driver_order');
            if (value !== null) {
            // We have data!!
                let data = JSON.parse(value);
                if(data.towing) {
                    self.setState({start_route_button:false,state:2,navigator_button:true});
                }
            }
        } catch (error) {
            console.warn(error);
        }
    }

    render() {
        return [
            <SafeAreaView key={'TopCard'} style={{position:'absolute',top:0,left:0,width:'100%'}}>
                <View >
                    <View style={{backgroundColor:'rgba(32, 44, 62,0.8)',paddingVertical:8,paddingHorizontal:20,flexDirection:'row',alignItems:'center',borderWidth:2,borderColor:'#202c3e'}}>
                        <Icon type="Entypo" name="location-pin" style={{color:'rgba(255,255,255,0.3)'}} />
                        <View style={{width:5}}></View>
                        <Text style={{fontWeight:'700',fontSize:18,color:'rgba(255,255,255,0.7)',fontFamily:'Roboto_medium'}}>{this.state.state == 1?'On Service':'On Way'}</Text>
                    </View>
                </View>
            </SafeAreaView>,
            <Animatable.View animation="slideInUp" key={'BottomCard'} style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
            <MapCard>
                    <View style={{flexDirection:'row',paddingBottom:0,alignItems:'center'}}>
                        <View style={{width:'30%',justifyContent:'center',alignItems:'center'}}>
                            <Image source={{uri:this.props.settings.serverUri + this.props.processor.client.avatar}} style={{width:60,height:60,borderRadius:60 / 2}} resizeMode="cover" />
                        </View>
                        <View style={{flexDirection:'column',width:'80%',justifyContent:'center'}}>
                            <TouchableOpacity >
                                <Text style={{fontWeight:'700',fontSize:18,color:'rgba(0,0,0,0.4)'}}>{this.props.processor.client.name}</Text>
                            </TouchableOpacity>
                            <View style={{height:3}}></View>
                            <View style={{flexDirection:'row',alignItems:'center'}}>
                                <Icon name="star" style={{fontSize:24,color:'#82B1FF'}} />
                                <View style={{width:5}}></View>
                                <Text style={{fontWeight:'600',fontSize:16}}>4.3</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%'}}>
                        <Text style={{textAlign:'center',fontFamily:'Roboto_medium',fontSize:14}}>{this.state.state == 1?'On Service':'On Way'}</Text>
                    </View>
                <View style={{paddingVertical:5,paddingHorizontal:2}}>
                    <View style={{flexDirection:'column'}}>
                        {this.state.start_route_button && 
                        <View style={{width:'100%'}}>
                            <Button  onPress={() => {
                                this._start_towing();
                            }} block dark><Text style={{fontWeight:'600',color:'white'}}>Start Towing</Text></Button>
                        </View>
                        }
                        <View style={{height:5}}></View>
                        {this.state.end_route_button &&
                        <View style={{width:'100%'}}>
                            <Button  onPress={() => {
                                this._end_service();
                            }} block danger><Text style={{fontWeight:'600'}}>End Service</Text></Button>
                        </View>
                        }
                        {this.state.navigator_button &&
                        <View style={{paddingHorizontal:5}} >
                        <Button light block onPress={() => {
                                this.handleGetDirections();
                            }}><Text style={{color:'#bdc3c7',fontSize:20,fontWeight:'700',fontFamily:'Roboto_medium',letterSpacing:0.5}}>Navigator</Text></Button>
                        </View>
                        }
                    </View>
                </View>
            </MapCard>
        </Animatable.View>
        ]
    }
}