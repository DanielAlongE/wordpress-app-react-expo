import React from 'react';
import {  View, ScrollView, StyleSheet } from 'react-native';
import { Colors, FAB, Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
import AccordionGroup from './AccordionGroupComp';
import MyModal from './ModalComp';
import FormBuilder from '../containers/FormBuilderContainer';

const MyFab = ({...rest}) => (
    <FAB
      style={{
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
      }}
      small
      icon="add"
      onPress={() => console.log('Pressed')}
      {...rest}
    />
  );
  
    const NewPageForm = ({formAction, hide}) => {
        

        const helper = ({isSubmitting, success, state}) => {
            const formData = [
                {text:{name:'name', placeholder:'Page Name'}},
                {text:{name:'title', placeholder:'Page Title'}},
                {submit:{label:'Submit', mode:'contained'}},
            ];
      
              if(success){
                //close modal
              }
      
            return formData;
          }

        return (
        <View style={{flex:1, flexDirection:'row', alignContent:'center', justifyContent:'center'}}>
            <FormBuilder helper={helper} style={{flex:1}} action={formAction} onSuccess={hide} />
        </View>
        );
    }

    const AppNewPage = ({formAction}) => {


        return(
            <MyModal action={({show})=>( <MyFab onPress={()=>show()} />)}>
                <NewPageForm formAction={formAction} />
            </MyModal>
        );
    }

    const AppPagesComp = ({pages, creactPageFormAction, navigation}) => {

        const { navigate } = navigation;
        const style = {backgroundColor:Colors.indigo100,  marginTop:5};
        const left = props => <List.Icon {...props} icon="first-page" />

        
        var accordionData = pages.map(page=>({title:page.name, 
          description:page.title, 
          style, left, 
          onPress:()=>navigate('Editor',{pageIndex:0})
        }));


        return (
            <View style={{flex:1, marginTop:30}}>
                <ScrollView>  
                    <AccordionGroup data={accordionData} />
                </ScrollView>
                <AppNewPage formAction={creactPageFormAction} />
            </View>
        );
    }

export default AppPagesComp;