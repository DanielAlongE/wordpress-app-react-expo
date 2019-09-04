import React from 'react';
import {  View, ScrollView, StyleSheet } from 'react-native';
import { Colors, FAB, Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
import FormBuilder from '../containers/FormBuilderContainer';

import Accordion from './AccordionGroupComp';
import { SimpleModal } from './ModalComp';
import {ConfirmDialog} from './DialogComp';
import MenuFetchBox from './MenuFetchBoxComp';

//import {ColorPicker} from './FormComp';


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

        const extra = menu.icon ? {left:()=><IconButton icon={menu.icon} />} : {};

        return <List.Item 
        key={`menu-${index}`} 
        title={menu.name}
        right={props=><View style={{flex:1, flexDirection:'row', alignContent:'flex-end', justifyContent:'flex-end'}}>
          <IconButton icon="edit"  onPress={() => setEditModal({index, menu, visible, target})} />
          <IconButton icon="delete"  onPress={() => setDeleteDialog({visible, index, target})} />
        </View>} 
        {...extra}
        />
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


  const EditMenuModal = ({editModal, setEditModal, updateMenuItem}) => {

    const {visible, index, target, menu} = editModal;

    console.log("editModal", editModal);

    const submitAction = ({inputs}) => {
      //console.log('FormSubmmited',{inputs});
      updateMenuItem(index, inputs,  target);
      setEditModal({visble:false});
    }

    const helper = ({isSubmitting, success, state}) => {
      let data  = [
        {text:{name:'name', placeholder:'Name'}},
        {text:{name:'title', placeholder:'Title'}},
        {icon:{name:'icon', placeholder:'Icon'}},
        {color:{name:'color', placeholder:'Color'}},
        {submit:{label:'Update', mode:'contained'}},
        ]

        if(success){
          //
        }

      return data;
    }

    return (
    <SimpleModal title="Edit Menu Item" visible={visible} onDismiss={()=>setEditModal({visble:false})}>

      <FormBuilder helper={helper} clear={true} action={submitAction} defaultValues={menu} />

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
      <ConfirmDialog visible={visible} message="Are you sure you want to delete?" onDismiss={()=>onDismiss()} onConfirm={()=>doAction()} />
    );
  }

const AppMenusComp = ({handleChange, state, 
  menus, toggleModal, visible,
  addMenuItem, deleteMenuItem, updateMenuItem, editModal, setEditModal,
  openMenuModal, getCategories, categories, getPages, pages,
  setDeleteDialog, deleteDialog
}) => {

    //wordpressUrl
    const url = state.url || '';

    const args = {handleChange, state};


    const accordionData = [];
    const accordionStyle = {backgroundColor:Colors.grey100, marginTop:10};

    if(!!state.url){

      accordionData.push({title:'Wordpres Categories', style:accordionStyle,
      render:({handleOpen})=><MenuFetchBox fetchData={getCategories} data={categories} addMenuItem={addMenuItem} handleOpen={handleOpen} />});

      accordionData.push({title:'Wordpres Pages', style:accordionStyle,
      render:({handleOpen})=><MenuFetchBox fetchData={getPages} data={pages} 
      prepareData={(data)=> data.map(item=>{
        const {title, id} = item;
        return {name:title, type:'wp_page', id};
      })} addMenuItem={addMenuItem} handleOpen={handleOpen} />});

    }

    return (
        <View style={{flex:1, marginTop:30}}>
            <ScrollView style={{flex:1}}>

                <MenuTab data={menus} addAction={openMenuModal} 
                  deleteAction={deleteMenuItem} setEditModal={setEditModal}
                  setDeleteDialog={setDeleteDialog} />

                <EditMenuModal editModal={editModal} setEditModal={setEditModal} updateMenuItem={updateMenuItem} />

                <ConfirmDelete setDeleteDialog={setDeleteDialog} deleteDialog={deleteDialog} onConfirm={deleteMenuItem} />

                <SimpleModal title="Menu Chooser" visible={visible} onDismiss={toggleModal}>
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