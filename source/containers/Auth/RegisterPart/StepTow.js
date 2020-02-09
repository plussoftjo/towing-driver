import React from 'react';
import {View} from 'react-native';
import {inject,observer} from 'mobx-react';
import {Colors} from '../../../commons';
import {Container,Content,Text,Item,Icon,Input,Button, Form,Picker,CheckBox} from 'native-base';
import SmoothPinCodeInput from 'react-native-smooth-pincode-input';

@inject('auth')
@observer
export default class StepTow extends React.Component {
    state = {
        code: '',
        password: '',
        timer:59,
        send_again_button:false
      };
      pinInput = React.createRef();
    
      _checkCode = (code) => {
        if (code != this.props.auth.sms_code) {
          this.pinInput.current.shake()
            .then(() => this.setState({ code: '' }));
        }else {
            this.props.pressed();
        }
      }
      componentDidMount() {
          setInterval(() => {
            if(this.state.timer !== 0) {
                this.setState({timer:this.state.timer - 1});
            }else {
              this.setState({send_again_button:true});
            }
          },1000)
      }
      render() {
        const { code, password } = this.state;
        return (
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{position:'absolute',left:0,top:50,paddingHorizontal:10}}>
                    <Icon onPress={() => {
                        this.props.onBack();
                    }} type="AntDesign" name="leftcircleo" style={{color:'white',fontSize:38}}></Icon>
                </View>
                <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>Confirm register</Text>
                <View key="bottom" style={{padding:30,justifyContent:'center',alignItems:'center',alignContent:'center'}}>
                    <Text style={{fontWeight:'700',fontSize:12,color:'white'}}>We send active code for you please for number:</Text>
                    <Text style={{fontSize:16,fontWeight:'700',color:'green',paddingBottom:20}}>{this.props.auth.country_code + this.props.auth.user_input.phone}</Text>
                    <SmoothPinCodeInput
                    ref={this.pinInput}
                    value={code}
                    onTextChange={code => this.setState({ code })}
                    onFulfill={this._checkCode}
                    onBackspace={() => console.log('No more back.')}
                    />
                </View>
                <View style={{paddingTop:20,paddingLeft:50}}>
                    <View style={{flexDirection:'row',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'700',fontSize:12}}>Send code again: </Text>
                        {this.state.send_again_button &&
                            <TouchableOpacity onPress={() => {
                                this.props.auth.make_sms_vertify();
                            }}>
                                <Text style={{color:'white',fontSize:14}}>Send.</Text>
                            </TouchableOpacity>
                        }
                       {!this.state.send_again_button &&
                        <Text style={{color:'white',fontSize:14}}>{this.state.timer} secound</Text>
                       }
                    </View>
                </View>
                <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                    <Button success onPress={() => {this.props.pressed();}} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                        <Text style={{color:'white',fontWeight:'700'}}>Next Step</Text>
                        <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                    </Button>
                </View>
            </Content>
        )
    }
}