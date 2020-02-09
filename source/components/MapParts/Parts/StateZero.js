import React from 'react';
import {View,Image,TouchableOpacity} from 'react-native';
import {Text,Icon} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {inject,observer} from 'mobx-react';
import MapCard from '../../MapCard'
import { Switch } from 'react-native-switch';
import HeaderCard from '../../HeaderCard';
import Images from '../../../commons/Images';
@inject('manger')
@inject('auth')
@inject('locations')
@observer

export default class StateZero extends React.Component{
    change_state(val) {
        let state = '';
        if(val){
            state = 'online';
        }else {
            state = 'offline';
        }
        this.props.locations.change_state(state);
        this.props.auth.user.driver_state.state = state;
    }
    render() {
        let name = this.props.auth.user.name.split(" ");
        let state = this.props.auth.user.driver_state.state;
        return [
                <View key={'TopCard'} style={{position:'absolute',top:20,left:0,width:'100%'}}>
                    <HeaderCard openDrawer={this.props.openDrawer}/>
                </View>,
                <Animatable.View animation="slideInUp" key={'BottomCard'} style={{position:'absolute',bottom:0,left:0,width:'100%'}}>
                    <MapCard >
                        <View style={{paddingTop:5,paddingLeft:20,paddingRight:20,paddingBottom:5}}>
                            <Text style={{fontSize:18,fontWeight:'900'}}>Welcome, {name[0]}</Text>
                            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-between',marginTop:0}}>
                                <Text style={{fontSize:16,fontWeight:'600'}}></Text>
                                <Switch
                                value={state == 'online'?true:false}
                                onValueChange={(val) => this.change_state(val)}
                                activeText={'Online'}
                                inActiveText={'Offline'}
                                backgroundActive={'#2ecc71'}
                                renderActiveText={state == 'online'?true:false}
                                renderInActiveText={state == 'offline'?true:false}
                                switchWidthMultiplier={3}
                                circleActiveColor={'#f0f0f0'}
                                circleInActiveColor={'#f0f0f0'}
                                circleSize={45}
                                changeValueImmediately={true}
                                />
                            </View>
                        </View>
                    </MapCard>
                </Animatable.View>
        ]
    }
}