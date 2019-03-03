import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Fab from '@material-ui/core/Fab';
import NavigationIcon from '@material-ui/icons/Navigation';

import MessageLib from "../../src/util/message";
import {Pages as PageLib} from "../../src/util/pages";
import {ExtBasicSetting}  from "../../src/util/setting";

const page = new PageLib();
const Setting = new ExtBasicSetting();
class Settings extends React.Component {
    state = {
        isExtAllowed: true ,
        timeStamp: +new Date ,
        data: "" ,
        isOverridable: false
    };
    componentDidMount() {
        const message = new MessageLib();
        Setting.get()
            .then(res => {
                console.log("componentDidMount",res);
                this.setState(res.settings);
            });
    }
    handleChange = name => event => {
        this.setState({ [name]: event.target.checked });
        Setting.set({[name]: event.target.checked });
    };
    openOptionPage() {
        page.openPage("option.html");
    }
    render() {
        return (
            <FormControl component="fieldset">
                <FormLabel component="legend">Basic Settings</FormLabel>
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.isExtAllowed}
                                onChange={this.handleChange('isExtAllowed')}
                                value="Enable/Disable Extension"
                            />
                        }
                        label="Enable/Disable Extension"
                    />
                    <FormControlLabel
                        control={
                            <Switch
                                checked={this.state.isOverridable}
                                onChange={this.handleChange('isOverridable')}
                                value="Override text"
                            />
                        }
                        label="Override Text"
                    />
                    {this.state.isExtAllowed && <FormControlLabel
                        control={
                            <Fab variant="extended" aria-label="Delete" onClick={this.openOptionPage}>
                                <NavigationIcon />
                                Speech/Gesture Recognition
                            </Fab>
                        }
                        label=""
                    />}
                </FormGroup>
            </FormControl>
        );
    }
}

export default Settings;
