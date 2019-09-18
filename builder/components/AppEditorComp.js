import React from 'react';
import {  View, ScrollView, StyleSheet } from 'react-native';
import { Colors, FAB, Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
import AccordionGroup from './AccordionGroupComp';
import MyModal from './ModalComp';
import FormBuilder from '../containers/FormBuilderContainer';
import PageRender from '../containers/ComponentBuilderContainer';



    const AppEditorComp = ({page, creactPageFormAction}) => {

        let data = [
            {view:{style:{height:50, backgroundColor:'red'}, }},
            {text:{text:'This is the way we rock', style:{margin:2, color:'blue'}}},
            {view:{ style:{margin:10, backgroundColor:'pink', flex:1}, 
                children:[
                    {text:{text:'ABC'}},
                    {text:{text:'EFG'}},
                    {text:{text:'HIJ'}},
                    {text:{text:'KLM'}},
                    {text:{text:'NOP'}},

                        {view:{ style:{margin:10, backgroundColor:"violet", flex:1}, 
                            children:[
                                {text:{text:'ABC'}},
                                {text:{text:'EFG'}},
                                {text:{text:'HIJ'}},
                                {text:{text:'KLM'}},
                                {text:{text:'NOP'}},

                            ]
                        }}
                ]
            }}
        ];

        return (
            <View style={{flex:1, marginTop:30}}>
                <ScrollView style={{flex:1}}>
                    <PageRender isEditor={true} data={data} />                       
                </ScrollView>
             
            </View>            
        );
    }

export default AppEditorComp;