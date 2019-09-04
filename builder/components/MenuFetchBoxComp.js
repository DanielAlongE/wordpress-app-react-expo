import React from 'react';
import {  View } from 'react-native';
import { Colors, Text, Button } from 'react-native-paper';

import ShyButton from './ShyButton';
import Loading from "../../components/LoadingComp";




export default class MenuFetchBox extends React.Component {

    constructor(props){
      super(props);

      this.state = {
        pressed : [],
        menus: []
      }

      this.handlePress = this.handlePress.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      const {fetchData} = this.props;
      
      if(fetchData){
        fetchData();
      }

    }

    handlePress(index, menuObj){
      let {pressed, menus} = this.state;

      pressed.push(index);
      menus.push(menuObj);

      //console.log("handlePress", index);

      this.setState({pressed, menus});
    }

    handleSubmit(){
      const { addMenuItem, handleOpen } = this.props;
      let {menus} = this.state;

      addMenuItem(menus);
      //this.setState({pressed, menus})

      if(handleOpen){
        handleOpen(-1);
      }
    }

    prepareData(){

      const {prepareData} = this.props;

      const data = this.props.data || [];

      if(prepareData){
        return prepareData(data);
      }else{

        //console.log("Prepare Doing default!");
        return data.map(item=>{
          const {name, id} = item;

          return {name, id};
        });

      }

    }

    componentWillUnmount() {

      //console.log("Categories cwu")      
    }

    render(){

      const { pressed } = this.state;
      const ready = pressed.length > 0;

      const data = this.prepareData();
      const isFetching = data.length === 0;


      //const { addMenuItem } = this.props;


      var showCat = data.map((item, index) => {

        return (
          <ShyButton key={`item-${index}`} style={{backgroundColor:Colors.grey200, margin:5}} onPress={()=>this.handlePress(index,item)}>
            {item.name}
          </ShyButton>
        );

      });

      return (<View>
        {ready && <Button mode="contained" icon="save" onPress={this.handleSubmit} >Save</Button>}
        
          {showCat}

        {isFetching && <Loading />}
      </View>)
    }
  }