import React, {Component} from 'react';
import { connect } from 'react-redux';
import AppSettingsComp from '../components/AppSettingsComp';
import set from '../../redux/global-state';
import {getApi} from '../../redux/api/action';

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
        const {currentApp, apps} = this.props.gState;

        const app = apps[currentApp] || {};

        return app;
    }


    addWordpressFormAction({inputs, errors}, callback){

        var  app = this.getCurrentApp();

        const {url} = inputs;

        this.props.getApi(`${url}/wp-json/wp/v2/categories`,{per_page:1}).then(res=>{

            const {status, data} = res;

            if(status === 200 &&  data.length === 1){
                app.url = url;
                this.props.set({app});
                
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



    render() {

        const {handleChange} = this;
        const state = this.getCurrentApp();
        const action = this.addWordpressFormAction;

        const args = {handleChange, state, action};

        return (
            <AppSettingsComp {...args} />
        )
    }


}

const mapState = state => ({gState:state.globalState})

export default connect(mapState, {set, getApi})(AppSettingsContainer);