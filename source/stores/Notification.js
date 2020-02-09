import {observable,computed,action} from 'mobx';
import axios from 'axios';

export default class Notification {

    /** Settings  */
    @observable settings = null;

    @action send_approve_to_client(data) {
        /** Receive data */
        axios.post(this.settings.socketUri + 'send_notification_aprove_to_client',{values:data}).then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err.response);
        });
    }

    /** When Fire */
    constructor(Settings) {
        this.settings = Settings;
    }
}