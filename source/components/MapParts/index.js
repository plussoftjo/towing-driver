import React from 'react';
import {inject,observer} from 'mobx-react';
import * as Parts from './Parts'
@inject('manger')
@observer
export default class MapParts extends React.Component {
    render() {
        if(this.props.manger.state == 0) {
            return (
                <Parts.StateZero openDrawer={this.props.openDrawer} />
            )
        }else if(this.props.manger.state == 1) {
            return (
                <Parts.StateOne map={this.props.map} openDrawer={this.props.openDrawer} />
            )
        }else if(this.props.manger.state == 2) {
            return (
                <Parts.StateTow map={this.props.map} openDrawer={this.props.openDrawer} />
            )
        }else if(this.props.manger.state == 2.1) {
            return (
                <Parts.StateTowPointOne map={this.props.map} openDrawer={this.props.openDrawer} />
            )
        }else if(this.props.manger.state == 3){
            return (
                <Parts.StateThree map={this.props.map} openDrawer={this.props.openDrawer} />
            )
        }
        else {
            return null;
        }
    }
}

