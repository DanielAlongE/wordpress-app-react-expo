import React from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-native-paper';
//import NavigationService from './navigation/NavigationService';
import { DefaultTheme } from 'react-native-paper';


function PaperProvider({children, theme=DefaultTheme, ...rest}) {

    
    return (
      <Provider theme={theme} {...rest}>
        {children}
      </Provider>
    );
  
}


const mapStateToProps = state => {
  
    const appIndex =  state.globalState.currentApp || 0;
  
    const apps = state.globalState.apps || [];
  
    const theme = apps && apps[appIndex] && apps[appIndex]['theme'];

    //console.log("PaperProvider", appIndex, theme)
      
        return ({theme, appIndex});
    };

  
    export default connect(mapStateToProps)(PaperProvider);
  