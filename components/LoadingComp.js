import React from 'react';
import { ActivityIndicator, Colors } from 'react-native-paper';

const LoadingComp = ({...rest}) => <ActivityIndicator animating={true} color={Colors.red800} {...rest} />

export default LoadingComp;