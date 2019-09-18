import React, {Component} from 'react';
import { connect } from 'react-redux';
import AppMenusComp from '../components/AppMenusComp';
import set from '../../redux/global-state';
import {getApi} from '../../redux/api/action';
import * as dotProp from './_dotProp';
//import {View} from 'react-native';


import { WordPressClass } from './WordPressPostsContainer';

 class AppMenusContainer extends WordPressClass {
    constructor(props){
  
        super(props);
    
        this.state = {
            inputs:{
  
            },
            errors:[],
            visible: false,
            target:'main_menu',
            editModal: {visible:false},
            deleteDialog: {visible:false}
            
        }

    this.defaultMenuObj = {
            main_menu:[],
            sub_menu:[],
            custom_menu:[]
          }
    
       
      this.toggleModal = this.toggleModal.bind(this);
      this.addMenuItem = this.addMenuItem.bind(this);
      this.openMenuModal = this.openMenuModal.bind(this);
      this.getCategories = this.getCategories.bind(this);
      this.getPages = this.getPages.bind(this);
    

      this.deleteMenuItem = this.deleteMenuItem.bind(this);
      this.updateMenuItem = this.updateMenuItem.bind(this);
      this.setEditModal = this.setEditModal.bind(this);
      this.setDeleteDialog = this.setDeleteDialog.bind(this);
    
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

      getCategories(){

        const { categories } = this.props;

        if(categories){
            //doNoting
        }else{
            this.fetchCategories();
        }
          
      }

      getPages(){

        let obj = {orderby:'id', order:'asc', per_page:20};
    
        const { pages } = this.props;

        if(pages){

        }else{
            this.fetchPages(obj);
        }

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
  
          //var app = this.getCurrentApp();

          const {appIndex, gState} = this.props;

          const newState = dotProp.set(gState, `apps.${appIndex}.${name}`, value)
  
          //app[name] = value

          console.log('AppMenus - handleChange', name)
          
          this.props.set(newState);
      }
    
      
      componentWillMount(){
          this._isMounted = false;
      
      
      }
      
      
      componentDidMount() {
          this._isMounted = true;
          
          //this.addMenuItem({name:'New page', type:'wp_page', id:4});

          //console.log('---typeof', typeof super.fetchCategories())

          //this.getPages();
      }
  
      
      componentWillUnmount() {
          this._isMounted = false;
      
      }
  
  
      toggleModal(){
          var visible = !this.state.visible;
          this.setState({visible});
          //console.log("callled visible", visible);
      }
  
      openMenuModal(target="main_menu"){
        this.setState({target, visible:true});
      }
  
      addMenuItem(item={}){

        const { target } = this.state;

        //const {defaultMenuObj} = this;
  

        const {appIndex, gState} = this.props;

        //set the defaultMenuObj if not available
        //let newState = dotProp.set(gState, `apps.${appIndex}.menus`, menu=>({...defaultMenuObj, ...menu}));

        //console.log(`**********###### apps.${appIndex}.menus`, dotProp.get(newState,`apps.${appIndex}.menus`) )

        let newState = dotProp.set(gState, `apps.${appIndex}.menus.${target}`, menu=>{

          /*
          if(Array.isArray(menu)){}else{
            console.log("target not found", typeof menu);
            menu = []
          }
          */

          menu = Array.isArray(menu) ? menu : [];

          if(Array.isArray(item)){
            console.log(`Added ${item.length} items to ${target}`)
            return [...menu, ...item];
          }else{
            return [...menu, item]
          }

        });

        //app[name] = value
        this.props.set(newState);
        //end
      }

      deleteMenuItem(index, target){
        const {appIndex, gState} = this.props;

        const newState = dotProp.delete(gState, `apps.${appIndex}.menus.${target}.${index}`);

        console.log(`Deleting - apps.${appIndex}.menus.${target}.${index}`);

        this.props.set(newState);
        //console.log('AppMenu delete', menus[target].length);

      }
  
      updateMenuItem(index, item={},  target){

        const {appIndex, gState} = this.props;

        const newState = dotProp.set(gState, `apps.${appIndex}.menus.${target}.${index}`, item);

        console.log(`Updated apps.${appIndex}.menus.${target}.${index}`)


/*
        const {appIndex} = this.props;

        var apps = this.getAllApps();

        var app = apps[appIndex] || {};

        var menus = app.menus;

        if(menus && menus[target]){
            //const oldMenu = app.menus[target];
            
            app.menus[target][index] = item;

            apps[appIndex] = app;
        }
*/

        this.props.set(newState);
      }

      setEditModal(obj={}){
          this.setState({editModal:{...obj}});
      }

      setDeleteDialog(obj={}){
        this.setState({deleteDialog:{...obj}});
    }
    
      
  
      render() {
  
          const { isFocused } = this.props;

          const state = this.getCurrentApp();//apps[currentApp] || {};
  
          var menus = this.defaultMenuObj;

          if(state.menus){
              menus = {...menus, ...state.menus};
          }
          
          const categories = this.props.categories && this.props.categories.data ? this.prepareCategories(this.props.categories.data) : [];

          const pages = this.props.pages && this.props.pages.data ? this.preparePosts(this.props.pages.data) : [];
  
          const {toggleModal, addMenuItem, openMenuModal, 
            getPages, getCategories, deleteMenuItem, setEditModal, setDeleteDialog, updateMenuItem} = this;
          const {visible, editModal, deleteDialog, handleChange} = this.state;
  
          //const state = this.getCurrentApp();
          //const action = this.addWordpressFormAction;

          //console.log('AppMenus', this.state.target);
  
          const args = {handleChange, state, menus, toggleModal, 
            visible, addMenuItem, deleteMenuItem, editModal, setEditModal, updateMenuItem,
            openMenuModal, getCategories, categories, getPages, pages,
            deleteDialog, setDeleteDialog};

            //console.log(pages);

            //force rerender using isFocused
            if(isFocused===false){
                return null;
            }
  
          return (
              <AppMenusComp {...args} />
          )
      }
  
  
  }
  
  
    const mapStateToProps = state => {
  
      const appIndex =  state.globalState.currentApp || 0;
        
          return ({
              url: state.globalState.url,
//              posts:state.api[`posts-${appIndex}`],
              categories:state.api[`categories-${appIndex}`], 
              pages:state.api[`pages-${appIndex}`],
              gState:state.globalState, 
              appIndex
        });
      };


  export default connect(mapStateToProps, {set, getApi})(AppMenusContainer);