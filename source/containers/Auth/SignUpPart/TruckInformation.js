import React from 'react';
import {View,Text,TouchableOpacity,Image, Alert} from 'react-native';
import {Container,Content,Header,Left, Body, Right, Button, Icon, Title,Form,H3,Item, Input,Label,Picker} from 'native-base';
import { Colors,Cars,CarColors} from '../../../commons';
import {inject,observer} from 'mobx-react';
import {helper} from '../../../service'
import {Alertx} from '../../../components';
@inject('auth')
@inject('cartype')
@observer
export default class CompanyInformation extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            model_selected:this.props.auth.user_car.model == ''?'':this.props.auth.user_car.model,
            truck_type:this.props.auth.user_car.truck_type == ''?'':this.props.auth.user_car.truck_type,
            truck_color:this.props.auth.user_car.truck_color == ''?'':this.props.auth.user_car.truck_color,
            towing_type:this.props.auth.user_car.towing_type == ''?'':this.props.auth.user_car.towing_type,
            error:false,
            error_text:''
        };
    }
    componentDidMount() {
        this.setState({error:false,error_text:''});
    }
    modalChange(value) {
        this.setState({
            model_selected: value
        });
        this.props.auth.user_car.model = value;
      }

      truckTypeChange(value) {
        this.setState({
            truck_type: value
        });
        this.props.auth.user_car.truck_type = value;
      }

      truckColorChange(value) {
        this.setState({
            truck_color: value
        });
        this.props.auth.user_car.truck_color = value;
      }
      towingTypeChange(value) {
        this.setState({
            towing_type: value
        });
        this.props.auth.user_car.towing_type = value;
      }
    render() {
        const modelItems = [];
        const started_modal = 2020;
        for (let index = 0; index < 50; index++) {
            modelItems.push(<Picker.Item label={started_modal -index}  key={index} value={started_modal -index} />);
        }
        return (
            <Container>
                <Header>
                    <Left>
                        <Button danger transparent onPress={() => {this.props.navigation.goBack()}}>
                        <Icon name='arrow-back' />
                        </Button>
                    </Left>
                    <Body>
                        <Title></Title>
                    </Body>
                    <Right/>
                </Header>
                <Content padder>
                    <H3 style={{marginVertical:30,marginHorizontal:10}}>Truck Information</H3>
                    <Form>
                        <Item picker style={{height:70,marginLeft:15}}>
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
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Truck Make</Label>
                            <Input value={this.props.auth.user_car.car_make} onChangeText={(value) => {this.props.auth.user_car.car_make = value;}} />
                        </Item>
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Truck Model</Label>
                            <Input value={this.props.auth.user_car.car_model} onChangeText={(value) => {this.props.auth.user_car.car_model = value;}} />
                        </Item>
                        <Item stackedLabel style={{flexGrow:1}}>
                            <Label>Plate Number</Label>
                            <Input value={this.props.auth.user_car.plate_number} onChangeText={(value) => {this.props.auth.user_car.plate_number = value;}} />
                        </Item>
                        <Item picker style={{height:70,marginLeft:15}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%' }}
                            placeholder="Truck Type"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#bfc6ea"
                            selectedValue={this.state.truck_type}
                            onValueChange={this.truckTypeChange.bind(this)}
                        >
                            {this.props.cartype.car_type.map((trg,index) => 
                                <Picker.Item label={trg.title}  key={index} value={trg.title} />
                            )}
                        </Picker>
                        </Item>
                        <Item picker style={{height:70,marginLeft:15}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%' }}
                            placeholder="Towing Type"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#bfc6ea"
                            selectedValue={this.state.towing_type}
                            onValueChange={this.towingTypeChange.bind(this)}
                        >
                                <Picker.Item label="Flatbed" value="Flatbed"/>
                                <Picker.Item label="Wheel-Lift" value="Wheel-Lift"/>
                        </Picker>
                        </Item>
                        <Item picker style={{height:70,marginLeft:15}}>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="arrow-down" />}
                            style={{ width: '100%' }}
                            placeholder="Truck Color"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#bfc6ea"
                            selectedValue={this.state.truck_color}
                            onValueChange={this.truckColorChange.bind(this)}
                        >
                            {CarColors.map((trg,index) => 
                                <Picker.Item label={trg} key={index} value={trg} />
                            )}
                        </Picker>
                        </Item>
                    </Form>
                    {this.state.error &&
                        <Alertx>
                            {this.state.error_text}
                        </Alertx>
                    }
                    <View style={{height:30}}></View>
                        <Button dark block onPress={() => {
                            if(helper.check_values([
                                this.state.model_selected,
                                this.props.auth.user_car.car_make,
                                this.props.auth.user_car.car_model,
                                this.props.auth.user_car.plate_number,
                                this.state.truck_type,
                                this.state.truck_color,
                                this.state.towing_type
                            ])) {
                                this.props.navigation.navigate('TruckImage');
                                this.setState({error:false,error_text:''});
                            }else {
                                this.setState({error:true,error_text:'please fill all required fields'});
                            }
                        }}><Text style={{color:'white',fontFamily:'Roboto_medium'}}>Next Step</Text></Button>
                </Content>
            </Container>
        )
    }
}