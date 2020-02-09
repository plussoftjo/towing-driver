import React from 'react';
import {View,TouchableOpacity,Text} from 'react-native'
import {Content, Container} from 'native-base';
import * as RegisterPart from './RegisterPart';
import {inject,observer} from 'mobx-react';


@inject('auth')
@observer
export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {step:1};
    }
    render() {
        return (
            <Container style={{backgroundColor:'transparent'}}>
                {this.state.step == 1 &&
                    <RegisterPart.StepOne pressed={() => {this.setState({step:this.state.step + 2})}} />
                }
                {this.state.step == 2 &&
                    <RegisterPart.StepTow onBack={() => {this.setState({step:this.state.step - 1})}} pressed={() => {this.setState({step:this.state.step + 1})}} />
                }
                {this.state.step == 3 &&
                    <RegisterPart.StepThree onBack={() => {this.setState({step:this.state.step - 2})}} pressed={() => {this.setState({step:1.1})}} />
                }
                {this.state.step == 1.1 &&
                    <RegisterPart.StepOnePointOne onBack={() => {this.setState({step:3})}} pressed={() => {this.setState({step:4})}} />
                }
                {this.state.step == 4 &&
                    <RegisterPart.StepFour pressed={() => {this.setState({step:this.state.step + 1})}} onBack={() => {this.setState({step:this.state.step - 1})}} />
                }
                {this.state.step == 5 &&
                    <RegisterPart.StepFive pressed={() => {this.setState({step:this.state.step + 1})}} onBack={() => {this.setState({step:this.state.step - 1})}}/>
                }
                {this.state.step == 6 &&
                    <RegisterPart.StepSix pressed={() => {
                        this.props.navigation.navigate('Main');
                    }} onBack={() => {this.setState({step:this.state.step - 1})}} />
                }
                <View style={{position:'absolute',bottom:5,left:0,width:'100%',flexDirection:'row',justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{color:'grey',fontWeight:'700'}}>Have account ?</Text>
                    <View style={{width:5}}></View>
                    <TouchableOpacity onPress={() => {this.props.auth.method = 'login'}}><Text style={{color:'white',fontWeight:'600'}}>Sign in</Text></TouchableOpacity>
                </View>
            </Container>
        )
    }
}