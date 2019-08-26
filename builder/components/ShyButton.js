import React from 'react';
import {Button} from 'react-native-paper';
import {View} from 'react-native';


export default class ShyButton extends React.Component {

    constructor(props){

        super(props);

        this.state = {
            visible: true
        }

        this.handlePress = this.handlePress.bind(this);
    }

    handlePress(action){

        this.setState({visible:false})

        if(action){
            action();
        }

    }

    render(){

        const {children, onPress, ...rest} = this.props;

        const {visible} = this.state;

        if(!visible){
            return <View />;
        }

        if(children){
            return (<Button {...rest} onPress={()=>this.handlePress(onPress)}>
                {children}
            </Button>);
        }else{
            return <Button {...rest} onPress={()=>this.handlePress(onPress)} />            
        }

    }
}