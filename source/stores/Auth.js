import {observable,computed,action,toJS} from 'mobx';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
import publicIP from 'react-native-public-ip';

export default class Settings {
    /*--Global Value--*/
    @observable settings = {};

    /** Device & info */
    @observable ip = '';
    @observable country_code = '';

    /** Sms activate */
    @observable sms_code = '';
    /*--Static Value--*/
    @observable method = 'main';
    /** Register */
    @observable user_input = {phone:'',password:'',confirm_password:''};
    @observable user_profile = {
            first_name:'',last_name:'',country:{states:[],value:''},state:'',city:'',address:'',zip:'',
            user_image:{base64:'',url:''},
            driver_licanse:{base64:'',url:''}
            };
    @observable driver_car = {type_selected:'',car_no:'',services:[]};
    @observable company_input = {name:'',city:'',state:'',zip_code:'',phone:'',tax_id:'',owner_name:''};
    @observable user_car = {model:'',car_make:'',car_model:'',truck_type:'',truck_color:'',towing_type:'',plate_number:''};
    @observable user_images = {
        truckImage:[],
        plateNumber:[],
        regImage:[],
        insImage:[]
    };
    /** Login */
    @observable login_input = {phone:'',password:''};

    /** User Details */
    @observable user = {};
    @observable token = '';


    @action relayout() {
        this.user_input = {phone:'',password:'',confirm_password:''};
        this.user_profile = {
            first_name:'',last_name:'',country:{states:[],value:''},state:'',city:'',address:'',zip:'',
            user_image:{base64:'',url:''},
            driver_licanse:{base64:'',url:''}
        };
        this.company_input = {name:'',city:'',state:'',zip_code:'',phone:'',tax_id:'',owner_name:''};
        this.user_car = {model:'',car_make:'',car_model:'',truck_type:'',truck_color:'',towing_type:'',plate_number:''};
        this.user_images = {
            truckImage:[],
            plateNumber:[],
            regImage:[],
            insImage:[]
        };
    }

    /** Functions and actions  */
    @action change_method(method) {
        this.method = method;
    }

    @action register = async(navigation) => {
        //** Register Value */
        let vaild = false;

        let user_profile = {
            address:this.user_profile.address,
            city:this.user_profile.city,
            country:this.user_profile.country.value,
            driver_licanse:this.user_profile.driver_licanse.url,
            name:this.user_profile.first_name + ' ' +this.user_profile.last_name,
            state:this.user_profile.state,
            user_image:this.user_profile.user_image.url?this.user_profile.user_image.url:'images/avatar.png',
            zip:this.user_profile.zip
        };



        await axios.post(this.settings.serverUri + 'api/driver/auth/register',
        {user_input:this.user_input,user_profile:user_profile,user_car:this.user_car,user_images:this.user_images,company_input:this.company_input}
        ).then(async(response) => {
            this.user = response.data.user;
            this.token = response.data.token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            await AsyncStorage.setItem('driver_token',response.data.token);
            vaild = true;
            this.relayout();
        }).catch(err => {
            console.log(err.response);
            vaild = false;
        });
        return vaild;
    }

    @action login(navigation,onError) {
        /** Login Value */
        axios.post(this.settings.serverUri + 'api/driver/auth/login', this.login_input).then(async(response) => {
            this.user = response.data.user;
            this.token = response.data.token;
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
            await AsyncStorage.setItem('driver_token',response.data.token);
            setTimeout(() => {
                navigation.navigate('Main');
            });
        }).catch(err => {
            onError();
        });
    }

    @action auth = async(navigation) => {
        let self = this;
        // var distance = helper.point_distance([32.351212,36.208356],[32.343327,36.204195]);
        // Last function to get the closest driver 
        try {
            let token = await AsyncStorage.getItem('driver_token');
            if(token !== null) {
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
                self.token = token;
                axios.get(self.settings.serverUri + 'api/driver/auth/index').then(response => {
                    self.user = response.data;
                    navigation.navigate('Main');
                }).catch(err => {
                    console.log(err.response)
                    navigation.navigate('Auth');
                });
            }else {
                navigation.navigate('Auth');
            }
        } catch (error) {
            navigation.navigate('Auth');
        }
    }

    @action fetch_info = async() => {
        let ip = await publicIP().then(ip => {
            this.ip = ip;
            return ip;
        }).catch(err => {
            console.log(err);
        });
        axios.get('https://api.ipgeolocationapi.com/geolocate/' + ip).then(response => {
            this.country_code = '+' + response.data.country_code;
        }).catch(err => {
            console.log(err)
        });
    }

    @action make_sms_vertify() {
        var val = Math.floor(1000 + Math.random() * 9000);
        this.sms_code = val;

        axios.post(this.settings.socketUri + 'send_sms', {code:this.sms_code,number:this.country_code + this.user_input.phone}).then(response => {
        }).catch(err => {
            console.log(err.response);
        });
    }

   constructor(settings) {
    /*--When-Fire--*/
    this.settings = settings;
   }
}