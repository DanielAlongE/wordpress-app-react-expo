import { DefaultTheme, Colors } from 'react-native-paper';
import store from './redux/store';

/*
primary - primary color for your app, usually your brand color.
accent - secondary color for your app which complements the primary color.
background - background color for pages, such as lists.
surface - background color for elements containing content, such as cards.
text - text color for content.
disabled - color for disabled elements.
placeholder - color for placeholder text, such as input placeholder.
backdrop - color for backdrops of various components such as modals.
    primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    disabled: string;
    placeholder: string;
    backdrop: string;


const theme = {
  ...DefaultTheme,
//  roundness: 10,
  colors: {
    ...DefaultTheme.colors,
//    primary: Colors.lightBlue900, //'#3498db',
//    accent: Colors.lightBlue500, //'#f1c40f',
//    background: Colors.lightBlue50
  },
  dark:false
};
*/

const theme = () => {

  const state = store.getState();
  
  const appIndex =  state && state.globalstore && state.globalState.currentApp ? state.globalState.currentApp : 0;

  const apps = state && state.globalstore && state.globalstore.apps || [];

  const theme = apps[appIndex] && apps[appIndex]['theme'] || DefaultTheme;
    
  //console.log("appIndex", appIndex, "theme from state", theme);

      return theme;
  };


export default theme;
