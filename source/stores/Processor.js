import {observable,computed,action} from 'mobx';

export default class Processor {
    /** Service
     * Main Service type * What the main service the client need it 
     * Sub Service type * if have sub service 
     * note -> if type note in it 
     */
    @observable service = {
        main_service:'',
        sub_service:'',
        dropoff_location:'',
        direction_polyline:{},
        have_towing:true,
        car:'',
        pickup:'',
        payment_options:'',
        credit_card_token:'',
        car_type:0
    };


    /*** Driver Details coming from the socket */
    @observable client = {
    };
    @observable client_coords = {
    };

    @observable direction_polyline = null;
    @observable geocode = {
        formatted_address:'UnNamed road'
    };
    @observable distance_matrix = {
        duration:{
            text:''
        },
        distance:{
            text:''
        }
    };
    @observable distance = {};


    @action register_data(data) {
        this.service = data.service;
        this.client = data.user;
        this.client_coords = data.user_coords;
    }

}