import React from 'react';
import {  View, ScrollView, StyleSheet } from 'react-native';
import { Colors, FAB, Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
//import FormBuilder from '../containers/FormBuilderContainer';
//import {default as Box} from '../../layouts/ResponsiveBox';

import Accordion from './AccordionGroupComp';
import { SimpleModal } from './ModalComp';
import {ConfirmDialog} from './DialogComp';
import ShyButton from './ShyButton';


const FabMenu = ({onPress}) => (
<View style={styles.fab}>
    <FAB
        small
        icon="add"
        onPress={() => {console.log('Pressed'); onPress()}}
    />    
</View>

);

const MenuList = ({items, setEditModal, setDeleteDialog, target}) => {

    const showList = items.map((menu, index)=>{
        const visible = true;

        return <List.Item 
        key={`menu-${index}`} 
        title={menu.name}
        right={props=><View style={{flex:1, flexDirection:'row', alignContent:'flex-end', justifyContent:'flex-end'}}>
          <IconButton icon="edit"  onPress={() => setEditModal({index, visible, target})} />
          <IconButton icon="delete"  onPress={() => setDeleteDialog({visible, index, target})} />
        </View>} />
    })

    return (
    <View style={{marginLeft:10}}>
        {showList}
    </View>)
}


  const MenuTab = ({data, addAction, deleteAction, setEditModal, setDeleteDialog}) => {

      const menus= Object.entries(data);

      //console.log(menus);
      const style = {backgroundColor:Colors.lime200, margin:5}

      const showMenu = menus.map((menu, index)=>{

          const [title, items] = menu;

  //          key:`list-${index}`,
          return (
          {
            title:title.replace('_', ' ').toUpperCase(), style,
            render:()=><View>
              <Button style={{margin:10}} icon="add" mode="contained" onPress={() => addAction(title)}>
                Add New Menu Item
              </Button>
              <MenuList items={items} deleteAction={deleteAction} setEditModal={setEditModal} setDeleteDialog={setDeleteDialog} target={title} />
            </View>
          }
        )
      })

      return (
        <ScrollView style={{flex:1, marginTop:20}}>
              <Accordion data={showMenu} />        
        </ScrollView>

          
      )
  }

  class CategoryBox extends React.Component {

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
      const {getCategories} = this.props;
      
      if(getCategories){
        getCategories();
      }

      console.log("Categories cdm")
    }

    handlePress(index, menuObj){
      let {pressed, menus} = this.state;

      pressed.push(index);
      menus.push(menuObj);

      console.log("handlePress", index);

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

    componentWillUnmount() {

      console.log("Categories cwu")      
    }

    render(){
      const categories = this.props.categories || [];

      const { addMenuItem } = this.props;
      const { pressed } = this.state;
      const ready = pressed.length > 0;

      console.log(pressed)

      var showCat = categories.map((item, index) => {
        const {name, id} = item;

        const menuObj = {name, id};

        return (
        <ShyButton key={`item-${index}`} style={{backgroundColor:Colors.grey200, margin:2}} onPress={()=>this.handlePress(index,menuObj)}>
          {item.name}
        </ShyButton>);

//        ()=>addMenuItem(menuObj)
        
        return (<List.Item key={`item-${index}`} title={item.name} style={ pressed.indexOf(index) > -1 ? {backgroundColor:'pink'} : {} }
                  onPress={()=>{
                    this.handlePress(index,menuObj);
                    //addMenuItem(menuObj)
                  }} />)
      });

      return (<View>
        {ready && <Button mode="contained" icon="save" onPress={this.handleSubmit} >Save</Button>}
        
          {showCat}
      </View>)
    }
  }

  const EditMenuModal = ({editModal, setEditModal}) => {

    const {visible} = editModal;

    return (
    <SimpleModal title="Edit Menu Item" visible={visible} onDismiss={()=>setEditModal({visble:false})}>

    </SimpleModal>
    );

  }

  const ConfirmDelete = ({setDeleteDialog, deleteDialog, onConfirm}) => {

    const {visible, index, target} = deleteDialog;

    const onDismiss = () => setDeleteDialog({visble:false});

    const doAction = ()=> {
      if(onConfirm){
        onConfirm(index, target);
      }

      onDismiss();
    }


    return (
      <ConfirmDialog visible={visible} message="Are you sure you sure?" onDismiss={()=>onDismiss()} onConfirm={()=>doAction()} />
    );
  }

const AppMenusComp = ({handleChange, state, 
  menus, toggleModal, visible, 
  addMenuItem, deleteMenuItem, editModal, setEditModal,
  openMenuModal, getCategories, categories,
  setDeleteDialog, deleteDialog
}) => {

    //wordpressUrl
    const url = state.url || '';

    const args = {handleChange, state};


    const accordionData = [];

    if(!!state.url){
      accordionData.push({title:'Categories', style:{backgroundColor:Colors.grey100},
      render:({handleOpen})=><CategoryBox getCategories={getCategories} categories={categories} addMenuItem={addMenuItem} handleOpen={handleOpen} />});
    }

    return (
        <View style={{flex:1, marginTop:30}}>
            <ScrollView style={{flex:1}}>

                <MenuTab data={menus} addAction={openMenuModal} 
                  deleteAction={deleteMenuItem} setEditModal={setEditModal}
                  setDeleteDialog={setDeleteDialog} />

                <EditMenuModal editModal={editModal} setEditModal={setEditModal} />

                <ConfirmDelete setDeleteDialog={setDeleteDialog} deleteDialog={deleteDialog} onConfirm={deleteMenuItem} />

                <SimpleModal title="Add Menu Items" visible={visible} onDismiss={toggleModal}>
                      <Accordion data={accordionData} />
                </SimpleModal>            

            
            </ScrollView>
            
        </View>
        );

}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })

export default AppMenusComp;