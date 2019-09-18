import React from 'react';
import { connect } from 'react-redux';
import AppPagesComp from '../components/AppPagesComp';
import set from '../../redux/global-state';
import * as dotProp from './_dotProp';
//import {getApi} from '../../redux/api/action';

//import {View} from 'react-native';

 class AppPagesContainer extends React.Component {
    constructor(props){
  
        super(props);
    
        this.state = {

        }
    
       
      this.creactPageFormAction = this.creactPageFormAction.bind(this);
      //this.preparePages = this.preparePages.bind(this);
    
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

      preparePages(data=[]){

        const {navigate} = this.props.navigation;

        return data.map((page, id)=>{
          let onPress;
          if(navigate){
            onPress = ()=>navigate('Editor',{id})
          }
          //onPress:()=>console.log('you just clicked me'),
          return ({key:`page-${id}`, onPress,  ...page})
        });

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

        const {appIndex, gState} = this.props;

        const newState = dotProp.set(gState, `apps.${appIndex}.pages`, pages=>{
          pages = Array.isArray(pages) ? pages : [];
          console.log(`New page - apps.${appIndex}.pages`);
          return [...pages, {...inputs, data:[]}]
        });

        
        this.props.set(newState);
        //console.log('creactPageFormAction', pages.length);
        
        callback({success:true});
    }
      
  
      render() {
        
        const { isFocused, navigation, apps, appIndex } = this.props;

        const { creactPageFormAction } = this;

        const data = this.getAppPages();

        const pages = data.length > 0 ? this.preparePages(data) : [];

        const args = { pages, creactPageFormAction, navigation };

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