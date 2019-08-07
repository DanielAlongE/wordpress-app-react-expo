import React from 'react';
import { View } from 'react-native';
import { ScreenOrientation } from 'expo';


export default class ScreenRotate extends React.Component {


    componentWillMount() {
/*        Dimensions.addEventListener('change', ()=>{
            if(this.props.onChange){
                this.props.onChange();
            }
        });
*/
    }

    componentWillUnmount() {
        //Dimensions.removeEventListener('change');
    }

    componentDidMount() {
        //ScreenOrientation.allow(ScreenOrientation.OrientationLock.ALL);   
        //OrientationLock.ALL
        (async function changeScreenOrientation() {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.ALL);
          })();
    }

    render(){
        const {children} = this.props;
        return(
        <View>
            {children ? children : null}
        </View>)
    }
    
}