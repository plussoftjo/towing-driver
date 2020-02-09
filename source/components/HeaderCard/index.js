import React from 'react';
import {View,Image,TouchableOpacity} from 'react-native';
import {Text,Icon} from 'native-base';
import * as Animatable from 'react-native-animatable';
import {inject,observer} from 'mobx-react';
import Images from '../../commons/Images';
@inject('auth')
@inject('settings')
@observer
export default class HeaderCard extends React.Component {
    render() {
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Animatable.View animation="slideInLeft"><Icon onPress={() => {
                    this.props.openDrawer();
                }} type="Entypo" name="menu" style={{color:'#e5e5e5',fontSize:48}} /></Animatable.View>
                <View style={{flex:2,flexDirection:'row',justifyContent:'center'}}>
                    <Animatable.View animation="slideInDown" style={{backgroundColor:'rgba(32, 44, 62,0.8)',paddingVertical:10,paddingHorizontal:45,borderRadius:40,borderWidth:3,borderColor:'#202c3e'}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{color:'white',fontWeight:'700',textAlign:'center',fontSize:20}}>{this.props.auth.user.wallet.net}</Text>
                            <View style={{width:0.5}}></View>
                            <Text style={{color:'#85bb65',fontWeight:'700',textAlign:'center',fontSize:20}}>$</Text>
                        </View>
                    </Animatable.View>
                </View>
                <Animatable.View animation="slideInRight" style={{paddingRight:5}}>
                    <TouchableOpacity style={{width:50,height:50,borderRadius:25,borderWidth:1,borderColor:'#202c3e'}}>
                        {this.props.auth.user.avatar == 'images/avatar.png' &&
                        <Image source={require('../../images/avatar.png')} style={{width:50,height:50,borderRadius:25}} resizeMode="center" />
                        }
                        {this.props.auth.user.avatar !== 'images/avatar.png' &&
                        <Image source={{uri:this.props.settings.serverUri + this.props.auth.user.avatar}} style={{width:50,height:50,borderRadius:25}} resizeMode="center" />
                        }
                    </TouchableOpacity>
                </Animatable.View>
            </View>
        )
    }
}