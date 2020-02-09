import {observable,computed,action} from 'mobx';


export default class Manger {
    /*--Global Value--*/
   @observable state = 0;
    /*--Static Value--*/
    @observable MapParts = {
        client_directions:false,
        client_icon:false
    };


    @action _relayout() {
        this.MapParts = {
            client_directions:false,
            client_icon:false
        }
    }


   constructor() {
    /*--When-Fire--*/
    
   }
}