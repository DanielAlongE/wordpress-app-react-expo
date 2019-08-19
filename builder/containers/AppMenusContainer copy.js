import React, {Component} from 'react';
import { connect } from 'react-redux';
import AppMenusComp from '../components/AppMenusComp';
import set from '../../redux/global-state';
import {getApi} from '../../redux/api/action';

 class AppMenusContainer extends Component {
   
    constructor(props){
  
      super(props);
  
      this.state = {
          inputs:{

          },
          errors:[],
          visible: false
          
      }
     
    this.toggleModal = this.toggleModal.bind(this);
    this.addMenuItem = this.addMenuItem.bind(this);
    //this.enterSettings = this.enterSettings.bind(this);
  
    }

    getCurrentApp(){
        const {currentApp, apps} = this.props.gState;

        const app = apps[currentApp] || {};

        return app;
    }

    fetchCategories(obj={}){
        var {per_page=50, orderby='count',  order='desc',  hide_empty=true} = obj;
        let {getApi, url} = this.props;

        return getApi(`${url}/wp-json/wp/v2/categories`,{per_page, orderby, order, hide_empty},'categories').then(res=>res.data);
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
        
        //this.addMenuItem({name:'New page', type:'wp_page', id:4});
    }

    
    componentWillUnmount() {
        this._isMounted = false;
    
    }


    toggleModal(){
        var visible = !this.state.visible;
        this.setState({visible});
        console.log("callled visible", visible);
    }


    addMenuItem(item={}, target="main_menu"){

        var {currentApp, apps} = this.props.gState;
        var app = apps[currentApp];

        if(!!app.menus){
            app.menus[target].push(item);
        }else{
            app.menus = {[target]:[]};
            app.menus[target].push(item);
        }

        apps[currentApp] = app;

        this.props.set({apps});
    }



    render() {

        //const {currentApp, apps} = this.props.gState;
        const state = this.getCurrentApp();//apps[currentApp] || {};

        
        const categories = this.props.categories && this.props.categories.data ? this.props.categories.data : [];

        const {toggleModal, addMenuItem} = this;
        const {visible} = this.state;

        const {handleChange} = this;
        //const state = this.getCurrentApp();
        const action = this.addWordpressFormAction;

        const args = {handleChange, state, action, toggleModal, visible, addMenuItem, categories};

        return (
            <AppMenusComp {...args} />
        )
    }


}

const mapState = state => ({categories: state.api.categories,
                            gState:state.globalState,
                            url: state.globalState.url})

export default connect(mapState, {set, getApi})(AppMenusContainer);