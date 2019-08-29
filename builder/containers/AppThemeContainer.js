import React, {Component} from 'react';
import { connect } from 'react-redux';
import AppThemeComp from '../components/AppThemeComp';
import set from '../../redux/global-state';
//import {getApi} from '../../redux/api/action';
import { DefaultTheme } from 'react-native-paper';


//import {View} from 'react-native';


//import { WordPressClass } from './WordPressPostsContainer';

 class AppThemeContainer extends Component {
    constructor(props){
  
        super(props);
    
        this.state = {

        }
    
       
      this.handleChange = this.handleChange.bind(this);
    
      }

    getAllApps(){
        const {apps} = this.props.gState;

        return apps || [];
    }
  
      getCurrentApp(){
          const {currentApp, apps} = this.props.gState;
  
          const app = apps[currentApp] || {};
  
          return app;
      }

      getCurrentTheme(){
          const app = this.getCurrentApp();

        return app.theme || DefaultTheme;
      }
  
      handleChange({name, type, value}){

        const { appIndex } = this.props;
  
          var apps = this.getAllApps();

          var app = this.getCurrentApp();

          var theme = this.getCurrentTheme();
  
          if(type==="colors"){
            if(!!theme.colors){
                theme.colors[name] = value;
            }else{
                theme.colors = {[name]: value}
            }
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
        
        const { isFocused } = this.props;
        const { handleChange } = this;

        const theme = this.getCurrentTheme();

        const args = { theme, handleChange };

            //force rerender using isFocused 
            if(isFocused===false){
                return null;
            }
  
          return (
              <AppThemeComp {...args} />
          );
      }
  
  
  }
  
  
    const mapStateToProps = state => {
  
      const appIndex =  state.globalState.currentApp || 0;
        
          return ({
              url: state.globalState.url,
              gState:state.globalState, 
              appIndex      
        });
      };


  export default connect(mapStateToProps, {set})(AppThemeContainer);