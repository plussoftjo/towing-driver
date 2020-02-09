import React from 'react';
import {View,Text,Image,ImageBackground} from 'react-native';
import {Images} from '../../commons';
import {Spinner} from 'native-base';

import {inject,observer} from 'mobx-react';


@inject('auth')
@observer
export default class AppLoader extends React.Component {
    componentDidMount() {
        let self = this;

       self.props.auth.auth(this.props.navigation);
    }
    render() {
        return (
            <ImageBackground source={Images.background} resizeMode="cover" style={{flex:1,justifyContent:'center',alignItems:'center',alignContents:'center'}}>
                <Image source={require('../../images/logo.jpeg')} style={{width:100,height:100}} resizeMode="cover"></Image>
                <Spinner color='white' />
            </ImageBackground>
        )
    }
}