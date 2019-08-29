import React from 'react';
//import PropTypes from 'prop-types';
import {compose} from 'redux';
import { connect } from 'react-redux';
//import HomeContainer from './HomeContainer';
import {getApi, cancelToken} from '../redux/api/action';
//import NavigationService from '../navigation/NavigationService.js';
//import purgeHtml from '../builder/containers/_purgeHtml';
import { WordPressClass } from '../builder/containers/WordPressPostsContainer';

const MainMenuContainer = (Comp, rest={}) => class extends WordPressClass {


  offset=0;
  per_page=50;
  categories=0;
  //author=0;
  search='';
  orderby='count';
  order='desc';
  status='publish';
  hide_empty=true


  constructor(props){

    super(props);

    this.state = {
        
    }
   
    //desc, asc |author, date, id, include, modified, parent, relevance, slug, title
   //this.fetchMore = this.fetchMore.bind(this);


  }

  getAppMenu(target="main_menu"){
    
    const {currentApp, apps} = this.props.gState;
    const app = apps[currentApp] || {} ;

    return app.menus && app.menus[target] ? app.menus[target] : []
  }


//  super methods

//  fetchMore()

//fetchCategories(obj={})


  prepareMenu(data){

    //const {navigate} = NavigationService;
    const {navigation} = this.props;
    const { navigate } = navigation;

    return data.map((menu, index)=>{

        var {title, name, id} = menu;
        var onPress;

        if(!!menu.type){
            if(menu.type==="wp_posts"){
                onPress = ()=>{navigate('Posts', {title:(title||name), categories:id});}
            }
            else if(menu.type==="wp_post"){
                onPress = ()=>{navigate('Post', {title:(title||name), id});}
            }
            else if(menu.type==="wp_page"){
                onPress = ()=>{navigate('WPage', {title:(title||name), id});}
            }            
            else if(menu.type==="page"){
                onPress = ()=>{navigate('Page', {title:(title||name), id});}
            }
        }else{
            onPress = ()=>{navigate('Posts', {title:(title||name), categories:id});
          console.log(navigate)
          }
        }

        return {key:`menu-${index}`, name, onPress, id}
    });
  }

  getMenuData(){
      const app = this.getAppMenu();
      var menu;

      if(app.length > 0){
            menu = app;
      }else{
            let data = this.props.categories ? this.props.categories.data : [];

            menu = data.filter((cat)=>cat.parent === 0);
            menu = this.prepareCategories(menu);
      }

      return this.prepareMenu(menu);
  }

componentWillMount(){
  this._isMounted = false;
  //set cancelToken
  //this.cancelToken = this.props.cancelToken();
}

componentWillUnmount() {
  this._isMounted = false;

  //if(this.cancelToken){ this.cancelToken.cancel('ComponenetWillUnmount');}
}

componentDidMount() {
  this._isMounted = true;

  const {categories} = this.props

}


        render() {

        //console.log(this.props.url);

        const {navigation} = this.props;

        
        //var categories = this.props.categories ? this.props.categories.data : [];

        

        const mainMenu = this.getMenuData();


        const args = {mainMenu};

        if(navigation){
          args.navigation = navigation;
        }

        return (
            <Comp {...args} />
        )
        }

    }



const mapStateToProps = state => {
  
  const appIndex =  state.globalState.currentApp || 0;
    
      return ({
          url: state.globalState.url,
//              posts:state.api[`posts-${appIndex}`],
          categories:state.api[`categories-${appIndex}`], 
          gState:state.globalState, 
          appIndex
  
    });
  };


export default compose(
    connect(mapStateToProps, {getApi, cancelToken}),
    MainMenuContainer
  );