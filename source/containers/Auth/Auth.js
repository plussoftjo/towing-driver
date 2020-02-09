import React from 'react';
import {View,ImageBackground,TouchableOpacity} from 'react-native';
import {Container,Content,Text,Item,Icon,Input,Button} from 'native-base';
import {Images,Colors} from '../../commons';
import * as Animatable from 'react-native-animatable';
import {inject,observer} from 'mobx-react';
import Register from './Register';
import Login from './Login'
/** Enums */
let AuthMethods = {
    LOGIN:'login',
    REGISTER:'register',
    MAIN:'main'
};
@inject('auth')
@observer
export default class Auth extends React.Component {
    componentDidMount() {
        this.props.auth.fetch_info();
    }
    render() {
        return (
            <ImageBackground source={Images.background} style={{flex:1,flexDirection:'column'}}>
                <View style={{flex:1}}>
                    <Animatable.View animation="bounceInDown" style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:Colors.StylesColor.labels,fontSize:24,fontWeight:'600',textAlign:'right'}}>UBR-TOWING</Text>
                        <Text style={{color:Colors.StylesColor.labels,fontSize:16,fontWeight:'500',textAlign:'center',paddingTop:5}}>Driver App</Text>
                    </Animatable.View>
                </View>
                <View style={{flex:2}}>
                    <View style={{flex:1,flexDirection:'column-reverse',marginHorizontal:25,marginBottom:50}}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('SignUp');
                        }}>
                            <StyledButton text={'Register'} active={true}></StyledButton>
                        </TouchableOpacity>
                        <View style={{height:5}}></View>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.navigate('Login');
                        }}>
                            <StyledButton text={'Login'} active={this.props.auth.method == AuthMethods.REGISTER ? true :false}></StyledButton>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        )
    }
}

@inject('auth')
@observer
class ButtonsManger extends React.Component {
    render() {
        return (
            <View style={{padding:20,paddingTop:50}}>
                <View style={{flexDirection:'row',position:'relative'}}>
                    <TouchableOpacity onPress={() => {
                        this.props.navigation.navigate('SignUp');
                    }}>
                        <StyledButton text={'Register'} active={this.props.auth.method == AuthMethods.REGISTER ? true :false}></StyledButton>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {this.props.auth.change_method('login')}}>
                        <StyledButton  text={'Login'} active={this.props.auth.method == AuthMethods.LOGIN ? true :false}></StyledButton>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}


class StyledButton extends React.Component {
    render() {
        return (
            <View style={{padding:15,paddingLeft:20,paddingRight:20,borderWidth:1,borderColor:Colors.StylesColor.Borders,borderRadius:20,backgroundColor:this.props.active ? 'rgba(0,0,0,0.9)':'rgba(0,0,0,0.2)'}}>
                <Text style={{fontWeight:'600',color:Colors.StylesColor.labels,textAlign:'center'}}>
                    {this.props.text}
                </Text>
            </View>
        )
    }
}


class MainScreen extends React.Component {
    render() {
        return (
            <View style={{position:"absolute",bottom:'30%',right:'10%'}}>
            <Text style={{color:Colors.StylesColor.labels,fontSize:24,fontWeight:'600',textAlign:'right'}}>UBR-TOWING</Text>
                <Text style={{color:Colors.StylesColor.labels,fontSize:16,fontWeight:'500',textAlign:'center',paddingTop:5}}>Driver App</Text>
            </View>
        )
    }
}