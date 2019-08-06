import React from 'react';
import { View } from 'react-native';
import styles from './styles';



const Row = ({children,style={}}) => {

    var {row}  = styles;
    
    return (<View style={{
        ...row,
        ...style}}>{children}</View>);
}

const Col = ({children,style={}}) => {

    var {col}  = styles;
    
    return (<View style={{
        ...col,
        ...style}}>{children}</View>);
}

const Box = ({children,style={}, ...rest}) => {

    var {box}  = styles;
    
    return (<View style={{
        ...box,
        ...style}}
        {...rest}
        >{children}</View>);
}

export {Row, Col, Box};