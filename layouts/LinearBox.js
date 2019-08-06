import React from 'react';
import { View } from 'react-native';
import styles from './styles';



const FrameBox = ({children,style={}}) => {

    var {linearBox}  = styles;
    
    return (<View style={{
        ...linearBox,
        ...style}}>{children}</View>);
}

export default FrameBox;