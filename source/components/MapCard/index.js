import React from 'react';
import {View,TouchableOpacity} from 'react-native';
import {Text} from 'native-base';
import * as Animatable from 'react-native-animatable';
export default class MapCard extends React.Component {
    render() {
        return (
            <View style={{borderTopRightRadius:50,borderTopLeftRadius:50,backgroundColor:'#f0f0f0',width:'100%',shadowColor: "#000",shadowOffset: {width: 0,height: 2,},shadowOpacity: 0.25,shadowRadius: 3.84,elevation: 5,borderColor:'#0D0D0D',borderWidth:2}}>
                    <TouchableOpacity onPress={() => {}} style={{justifyContent:'center',alignContent:'center',alignItems:'center',width:'100%',paddingLeft:'30%',paddingRight:'30%',paddingTop:10,paddingBottom:15}}>
                        <View style={{height:2,width:'100%',backgroundColor:'rgba(0,0,0,0.4)',borderRadius:2 /2}}></View>
                    </TouchableOpacity>
                    {this.props.children}
            </View>
        )
    }
}