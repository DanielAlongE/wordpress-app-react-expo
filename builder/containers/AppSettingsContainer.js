import React, {Component} from 'react';
import { connect } from 'react-redux';
import AppSettingsComp from '../components/AppSettingsComp';
import set from '../../redux/global-state';
import {getApi} from '../../redux/api/action';
import * as dotProp from './_dotProp';

 class AppSettingsContainer extends Component {
   
    constructor(props){
  
      super(props);
  
      this.state = {
          inputs:{

          },
          errors:[]
          
      }
     
    this.handleChange = this.handleChange.bind(this);
    this.addWordpressFormAction = this.addWordpressFormAction.bind(this);
    //this.enterSettings = this.enterSettings.bind(this);
  
  
    }

    getCurrentApp(){
        const {currentApp=0, apps} = this.props.gState;

        const app = apps[currentApp] || {};

        return app;
    }


    addWordpressFormAction({inputs, errors}, callback){

        var  app = this.getCurrentApp();

        const {url} = inputs;

        this.props.getApi(`${url}/wp-json/wp/v2/categories`,{per_page:1}).then(res=>{

            const {status, data} = res;

            //console.log(res);

            if(status === 200 &&  data.length === 1){
                app.url = url;
                this.props.set({app, url});
                
                console.log('Successful');
                callback({success:true});
            }else{
                console.log('Failed')
                callback({success:false});
            }

        }).catch(err=>callback({success:false}));

    }


    handleChange({name, value}){

        var app = this.getCurrentApp();

        app[name] = value
        //const {gState, appIndex} = this.props;

        //const newState = dotProp.set(gState, `apps.${appIndex}.${name}`, value);
        //console.log(`apps.${appIndex}.${name}`, value);

        this.props.set({...app});


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

    componentDidUpdate(prevProps) {
        if (prevProps.isFocused !== this.props.isFocused) {
          console.log("AppSettings focus changed: ", this.props.isFocused)
        }
    
      }


    render() {

        const {handleChange} = this;
        const state = this.getCurrentApp();
        const action = this.addWordpressFormAction;

        const {isFocused} = this.props;

        //console.log('app', state);

        const args = {handleChange, state, action, isFocused};

        return (
            <AppSettingsComp {...args} />
        )
    }


}

//const mapState = state => ({gState:state.globalState})
const mapStateToProps = state => {
  
    const appIndex =  state.globalState.currentApp || 0;
      
        return ({
            gState:state.globalState, 
            appIndex
      });
    };

export default connect(mapStateToProps, {set, getApi})(AppSettingsContainer);