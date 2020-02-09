import React from 'react';
import {View,Image,Linking,SafeAreaView,TouchableOpacity,Platform,AsyncStorage} from 'react-native';
import {Text,Icon,Button,Header,Left,Body,Right} from 'native-base';
import * as Animatable from 'react-native-animatable';
import call from 'react-native-phone-call'
import { GiftedChat } from 'react-native-gifted-chat'
import Modal from "react-native-modal";
import MapCard from '../../MapCard';
import {inject,observer} from 'mobx-react';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
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

        this.state = {chat:false};
    }
    handleGetDirections = () => {
       let url = 'https://www.google.com/maps/dir/?api=1&origin=' + this.props.locations.user_coords.latitude +','+ this.props.locations.user_coords.longitude +'&destination=' + this.props.processor.client_coords.latitude +','+ this.props.processor.client_coords.longitude +'&travelmode=driving';
        Linking.canOpenURL(url).then(supported => {
            if (!supported) {
            return Promise.reject(new Error(`Could not open the url: ${url}`))
            } else {
            return Linking.openURL(url)
            }
        });
      }
      _call() {
        const args = {
            number: this.props.processor.client.phone, // String value with the number to call
            prompt: true // Optional boolean property. Determines if the user should be prompt prior to the call 
        }
        
        call(args).catch(console.error)
    }

    _chat() {
        /** Open Chat dialog */
        this.setState({chat:!this.state.chat});
    }

    _cancel() {
        /**
         * Cancel
         * @methods -> 01: create alert with check if ok go 02 if no exit
         *              02: Make like the first make all to default 
         */
        let self = this;
        let map = this.props.map;
        let manger = this.props.manger;
        let locations = this.props.locations;
        Alert.alert(
            'Cancel Trip',
            'Are you sure you want to cancel trip ?',
            [
                {text: 'No',onPress: () => console.log('Cancel Pressed'),style: 'cancel',},
                {text: 'Yes', onPress: () => _onCancel()},
            ],
            {cancelable: false},
        );

        /**
         * 02 When the Approve cancelation
         */
        let _onCancel = function() {
            /** Change map directions to the map */
            map.animateToRegion({
                latitude:locations.map_coords.latitude,
                longitude:locations.map_coords.longitude,
                latitudeDelta:0.015,
                longitudeDelta:0.0121
            });
            /** Change manger to step 0 */
            manger._change_step(0);
            Alert.alert('The trip has been canceled');
        }
    }

    componentDidMount() {
       // 
       let self = this;
       Location.watchPositionAsync({
           accuracy:Location.Accuracy.BestForNavigation,
           timeInterval:10000,
           enableHighAccuracy:true,
           distanceInterval:100 //Change after test
       },(data) => {
           let coords = data.coords;
           self.props.socketmanger.send_real_time_location(coords,this.props.auth.user.id);
           self.props.locations.user_coords = coords;
           
       });

    }
    render() {
        return [
            <SafeAreaView key={'TopCard'} style={{position:'absolute',top:Platform.OS == 'android'?10:0,left:0,width:'100%'}}>
                <View style={{backgroundColor:'rgba(32, 44, 62,0.8)',paddingVertical:8,paddingHorizontal:20,flexDirection:'row',alignItems:'center',borderWidth:2,borderColor:'#202c3e'}}>
                    <Icon type="Entypo" name="location-pin" style={{color:'rgba(255,255,255,0.3)'}} />
                    <View style={{width:5}}></View>
                    <Text style={{fontWeight:'700',fontSize:14,color:'rgba(255,255,255,0.7)',fontFamily:'Roboto_medium'}}>{this.props.processor.geocode.formatted_address}</Text>
                </View>
            </SafeAreaView>,
            <Animatable.View animation="slideInUp" key={'BottomCard'} style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
                <MapCard>
                    <View style={{flexDirection:'row',paddingBottom:10,alignItems:'center'}}>
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
                    <View style={{flexDirection:'column',paddingRight:50,paddingLeft:50,paddingTop:5}}>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.4)',fontSize:14}}>Car</Text>
                            <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.8)',fontSize:16}}> {this.props.processor.service.car}</Text>
                        </View>
                        <View style={{flexDirection:'row',alignItems:'center'}}>
                            <Text style={{fontWeight:'700',color:'rgba(0,0,0,0.4)',fontSize:14}}>{this.props.processor.service.main_service}</Text>
                        </View>
                    </View>
                    <View style={{paddingBottom:5,paddingTop:0}}>
                    <View style={{marginTop:10,paddingRight:30,paddingRight:30,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                            <TouchableOpacity onPress={() => {this._call();}} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Icon name="call" style={{fontSize:30,color:'#82B1FF'}} />
                                <View style={{width:5}}></View>
                                <Text style={{fontWeight:'700',fontSize:16}}>Call</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this._chat();}} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Icon name="chatboxes" style={{fontSize:30,color:'#82B1FF'}} />
                                <View style={{width:5}}></View>
                                <Text style={{fontWeight:'700',fontSize:16}}>Chat</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {this._cancel();}} style={{flex:1,flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                <Icon name="close" type="MaterialIcons" style={{fontSize:30,color:'#F44336'}} />
                                <View style={{width:1}}></View>
                                <Text style={{fontWeight:'700',fontSize:16}}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{width:'100%',height:1,backgroundColor:'rgba(32, 44, 62,0.05)'}}></View>
                    <View style={{paddingHorizontal:5}} >
                        <Button light block onPress={async() => {
                            let self = this;
                            self.props.socketmanger.start_service(self.props.auth.user.id);
                            self.props.manger._relayout();
                            self.props.map.animateToRegion({
                                latitude:self.props.locations.user_coords.latitude,
                                longitude:self.props.locations.user_coords.longitude,
                                latitudeDelta:0.015,
                                longitudeDelta:0.0121
                            });
                            setTimeout(()=>{
                                self.props.manger.state = 2.1;
                            },500)

                            // Change To Tow
                            axios.post(self.props.settings.serverUri + 'api/order/change_to_state_tow',{
                                user_id:self.props.processor.client.id,
                                driver_id:self.props.auth.user.id
                            }).then(response => {

                            }).catch(err => {
                                console.log(err);
                            });

                            //change data 
                             /** Get Data */
                            try {
                                const value = await AsyncStorage.getItem('driver_order');
                                if (value !== null) {
                                // We have data!!
                                    let data = JSON.parse(value);
                                    data.state = 2.1;
                                    data.MapParts = self.props.manger.MapParts;
                                    let cache_data = JSON.stringify(data);
                                    await AsyncStorage.setItem('driver_order',cache_data);
                                }
                            } catch (error) {
                                console.warn(error);
                            }
                        }}><Text style={{color:'#82B1FF',fontSize:20,fontWeight:'700',fontFamily:'Roboto_medium',letterSpacing:0.5}}>Arrive</Text></Button>
                    </View>
                    <View style={{width:'100%',height:1,backgroundColor:'rgba(32, 44, 62,0.05)'}}></View>
                    <View style={{paddingHorizontal:5}} >
                        <Button light block onPress={() => {
                            this.handleGetDirections();
                        }}><Text style={{color:'#bdc3c7',fontSize:20,fontWeight:'700',fontFamily:'Roboto_medium',letterSpacing:0.5}}>Navigator</Text></Button>
                    </View>
                </MapCard>
            </Animatable.View>,
            <Modal isVisible={this.state.chat} key={'chatScreen'} style={{backgroundColor:'transparent'}}>
                <View style={{ flex: 1,backgroundColor:'white',borderRadius:10}}>
                    <View style={{padding:5,paddingLeft:15}}>
                        <View >
                            <Icon onPress={() => {this._chat();}} name="close" style={{fontSize:42}} />
                        </View>
                    </View>
                    <View style={{height:1,width:'100%',backgroundColor:'rgba(0,0,0,0.3)'}}></View>
                    <ChatScreen />
                </View>
            </Modal>
        ]
    }
}

class ChatScreen extends React.Component {
    state = {
        messages: [],
      }
    
      componentDidMount() {
        this.setState({
          messages: [
            {
              _id: 1,
              text: 'Hello, How I can help you ?',
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'React Native',
                avatar: 'https://placeimg.com/140/140/any',
              },
            },
          ],
        })
      }
    
      onSend(messages = []) {
        this.setState(previousState => ({
          messages: GiftedChat.append(previousState.messages, messages),
        }))
      }
    render() {
        return (
          <GiftedChat
            messages={this.state.messages}
            onSend={messages => this.onSend(messages)}
            user={{
              _id: 1,
            }}
          />
        )
    }
}