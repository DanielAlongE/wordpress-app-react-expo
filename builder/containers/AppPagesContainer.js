import React from 'react';
import { connect } from 'react-redux';
import AppPagesComp from '../components/AppPagesComp';
import set from '../../redux/global-state';
//import {getApi} from '../../redux/api/action';

//import {View} from 'react-native';

 class AppPagesContainer extends React.Component {
    constructor(props){
  
        super(props);
    
        this.state = {

        }
    
       
      this.creactPageFormAction = this.creactPageFormAction.bind(this);
    
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
  
      getAppPages(){
          const {appIndex, apps} = this.props;
  
          const pages = apps[appIndex].pages || [];
  
          return pages;
      }
    
      
      componentWillMount(){
          this._isMounted = false;
      }
      
      
      componentDidMount() {
          this._isMounted = true;
      }
  
      
      componentWillUnmount() {
          this._isMounted = false;
      }

    shouldComponentUpdate(nextProps) {
         const {apps, appIndex} = nextProps;

         console.log("AppPages SCU", apps[appIndex].pages);
         
         return true;
    }      

      creactPageFormAction({inputs, errors}, callback){

        const {appIndex} = this.props;

        var apps = this.getAllApps();

        var app = this.getCurrentApp();

        const oldPages = this.getAppPages();

        var pages = [...oldPages];

        pages.push({data:[], ...inputs});

        app.pages = pages;

        apps[appIndex] = {...app};

        this.props.set({apps});
        
        
        //console.log('creactPageFormAction', pages.length);
        
        callback({success:true});
    }
      
  
      render() {
        
        const { isFocused, apps, appIndex } = this.props;

        const { creactPageFormAction } = this;

        const pages = this.getAppPages();

        const args = { pages, creactPageFormAction };

        //console.log({apps})

            //force rerender using isFocused 
            if(isFocused===false){
                return null;
            }
  
          return (
              <AppPagesComp {...args} />
          );
      }
  
  
  }
  
  
    const mapStateToProps = state => {
  
      const appIndex =  state.globalState.currentApp || 0;
        
          return ({
              apps:state.globalState.apps,
              gState:state.globalState, 
              appIndex      
        });
      };


  export default connect(mapStateToProps, {set})(AppPagesContainer);