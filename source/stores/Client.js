import {observable,computed,action} from 'mobx';
import axios from 'axios';
export default class Locations {
    /** Observable */
    @observable settings = {};

    /** Strings */
    @observable user ={
        name:'Ahmed',
        phone:'009628483294823',
        avatar:'images/driver/avatar/15796345415e274f6df111e.jpg'
    };

    @observable order = {
        main_service:'Towing',
        sub_service:'Flat tire',
        towing:false,
        note:'Hello there is that note WOW !!',
        latlng_user:'32.34755806627902,36.215155189890616',
        distance:''
    };


    constructor(settings) {
         this.settings = settings;
    }


} 