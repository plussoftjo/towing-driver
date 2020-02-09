import React from 'react';
import {View,} from 'react-native';
import { Colors,Cars,CarColors} from '../../../commons';
import {Content,Text,Item,Icon,Button,Picker} from 'native-base';
import {helper} from '../../../service'
import {inject,observer} from 'mobx-react';



@inject('auth')
@observer
export default class StepOnePointOne extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            make_selected:'',
            model_selected:'',
            car_models_list:[],
            car_model:'',
            car_color:'',
            vaild:true
        };
    }


    carMakeChange(value) {
        let list = [];
        value.models.forEach((trg,index) => {
            list.push(<Picker.Item label={trg.title}  key={index} value={trg.value}  />);
        });
        this.setState({car_models_list:list});
        this.setState({
            make_selected: value
        });
      }

      modalChange(value) {
        this.setState({
            model_selected: value
        });
      }

      carModelChange(value) {
        this.setState({
            car_model: value
        });
      }

      carColorChange(value) {
        this.setState({
            car_color: value
        });
      }

    render() {
        const modelItems = [];
        const started_modal = 2020;
        for (let index = 0; index < 50; index++) {
            modelItems.push(<Picker.Item label={started_modal -index}  key={index} value={started_modal -index} />);
        }
        return (
            <Content contentContainerStyle={{ justifyContent: 'center', flex: 1 }}>
                <View style={{position:'absolute',left:0,top:50,paddingHorizontal:10}}>
                    <Icon onPress={() => {
                        this.props.onBack();
                    }} type="AntDesign" name="leftcircleo" style={{color:'white',fontSize:38}}></Icon>
                </View>
            <Text key="top" style={{color:Colors.StylesColor.labels,textAlign:'left',paddingLeft:30,fontSize:16,fontWeight:'500'}}>Vehicle information</Text>
            <View key="bottom" style={{padding:30}}>
                <Item regular picker style={{width:'100%',backgroundColor:'white',borderRadius:10}}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: '100%' }}
                    placeholder="Modal"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#bfc6ea"
                    selectedValue={this.state.model_selected}
                    onValueChange={this.modalChange.bind(this)}
                >
                    {modelItems}
                </Picker>
                </Item>
                <Item regular picker style={{width:'100%',backgroundColor:'white',borderRadius:10,marginTop:20}}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: '100%' }}
                    placeholder="Vehicle Make"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#bfc6ea"
                    selectedValue={this.state.make_selected}
                    onValueChange={this.carMakeChange.bind(this)}
                >
                    {Cars.map((trg,index) => 
                        <Picker.Item label={trg.title} key={index} value={trg} />
                    )}
                </Picker>
                </Item>
                <Item regular picker style={{width:'100%',backgroundColor:'white',borderRadius:10,marginTop:20}}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: '100%' }}
                    placeholder="Vehicle Model"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#bfc6ea"
                    selectedValue={this.state.car_model}
                    onValueChange={this.carModelChange.bind(this)}
                >
                    {this.state.car_models_list}
                </Picker>
                </Item>
                <Item regular picker style={{width:'100%',backgroundColor:'white',borderRadius:10,marginTop:20}}>
                <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: '100%' }}
                    placeholder="Vehicle Color"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#bfc6ea"
                    selectedValue={this.state.car_color}
                    onValueChange={this.carColorChange.bind(this)}
                >
                    {CarColors.map((trg,index) => 
                        <Picker.Item label={trg} key={index} value={trg} />
                    )}
                </Picker>
                </Item>
            </View>
            {!this.state.vaild &&
            <Text style={{color:'red',fontWeight:'500',marginBottom:10}}>please complete all the required fields</Text>
            }
            <View key="button" style={{flexDirection:'row',justifyContent:'flex-end',marginRight:30,marginTop:0}}>
                <Button success onPress={() => {
                    if(helper.check_values([this.state.model_selected,this.state.make_selected,this.state.car_color])) {
                        this.props.auth.user_car = {model:this.state.model_selected,car_make:this.state.make_selected.title,car_model:this.state.car_model,car_color:this.state.car_color};
                        this.props.pressed();
                    }else {
                        this.setState({vaild:false});
                    }
                    
                    }} style={{borderRadius:30,justifyContent:'center',alignContent:'center',alignItems:'center'}}>
                    <Text style={{color:'white',fontWeight:'700'}}>Next Step</Text>
                    <Icon name='arrow-forward' style={{textAlign:'center',color:'white',fontSize:32}} />
                </Button>
            </View>
            </Content>
        )
    }
}