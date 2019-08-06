import React from 'react';
import { View } from 'react-native';
import styles from './styles';



const FrameBox = ({children,style={}}) => {

    var {frameBox}  = styles;
    
    return (<View style={{
        ...frameBox,
        ...style}}>{children}</View>);
}

export default FrameBox;