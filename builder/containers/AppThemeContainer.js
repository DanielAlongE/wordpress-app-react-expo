import React, {Component} from 'react';
import { connect } from 'react-redux';
import AppThemeComp from '../components/AppThemeComp';
import set from '../../redux/global-state';
//import {getApi} from '../../redux/api/action';
import { DefaultTheme } from 'react-native-paper';


import {View} from 'react-native';


//import { WordPressClass } from './WordPressPostsContainer';

 class AppThemeContainer extends Component {
    constructor(props){
  
        super(props);
    
        this.state = {

        }
    
       
      this.handleChange = this.handleChange.bind(this);
      
      this.defaultTheme = {...DefaultTheme, colors:{...DefaultTheme.colors}};
    
      }

    getAllApps(){
        const {apps} = this.props.gState;

        return apps || [];
    }
  
      getCurrentApp(){
          const {appIndex} = this.props;
          const apps = this.getAllApps();
  
          const app = apps[appIndex] || {};
  
          return app;
      }

      getThemeById(index=0){
          const apps = this.getAllApps();

          const theme = apps[index].theme || DefaultTheme;

          console.log("getThemeById ", index)

        return theme;
      }
  
      handleChange({name, type, value}){
        const {defaultTheme} = this;
        const { appIndex } = this.props;
  
          var apps = this.getAllApps();

          var app = this.getCurrentApp();

          const oldTheme = this.props.theme || {};

          var theme = { ...defaultTheme, ...oldTheme }
  
          if(type==="colors"){
                theme.colors[name] = value;
          }else{
              theme[name] = value;
          }

          app.theme = theme;

          apps[appIndex] = app;
          
          this.props.set({apps});
      }
    
      
      componentWillMount(){
          this._isMounted = false;
      
      
      }
      
      
      componentDidMount() {
          this._isMounted = true;
          
          //this.addMenuItem({name:'New page', type:'wp_page', id:4});

          //console.log('---typeof', typeof super.fetchCategories())
      }
  
      
      componentWillUnmount() {
          this._isMounted = false;
      
      }  
      
  
      render() {
        
        const { isFocused, appIndex } = this.props;
        const { handleChange, defaultTheme } = this;

        const currentTheme = this.props.theme || {};

        const theme =  {...defaultTheme, ...currentTheme};


        console.log({defaultTheme}, appIndex, isFocused)

        const args = { theme, handleChange, isFocused, appIndex };

            //force rerender using isFocused 
            if(!isFocused){
                return <View />;
            }        
            


  
          return (
              <AppThemeComp {...args} />
          );
      }
  
  
  }
  
  
    const mapStateToProps = state => {
  
      const appIndex =  state.globalState.currentApp || 0;
      const apps = state.globalState.apps || [];
      const theme = apps && apps[appIndex] && apps[appIndex]['theme'];

          return ({
              url: state.globalState.url,
              gState:state.globalState, 
              appIndex,
              theme 
        });
      };


  export default connect(mapStateToProps, {set})(AppThemeContainer);