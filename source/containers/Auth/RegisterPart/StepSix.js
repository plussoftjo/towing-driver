import React from 'react';
import {View} from 'react-native';
import {Container,Content,Text,Item,Icon,Input,Button, Form,Picker,ListItem, CheckBox,Body,List} from 'native-base';

export default class StepSix extends React.Component {
    render() {
        return (
            <View style={{flex:1,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                <Text style={{fontWeight:'700',color:'white',fontSize:24}}>Register complete</Text>
                <Text style={{fontWeight:'600',color:'white',fontSize:16,textAlign:'center',marginTop:20}}>We Will recive data and return the response to you </Text>
                <Button success onPress={() => {
                    this.props.pressed();
                    }} style={{borderRadius:30,justifyContent:'flex-end',marginTop:30}}>
                    <Text style={{color:'white',fontWeight:'700'}}>Lets go</Text>
                    <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                </Button>
            </View>
        )
    }
}