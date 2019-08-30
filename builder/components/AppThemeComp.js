import React from 'react';
import {  View, ScrollView, StyleSheet } from 'react-native';
import { Colors, FAB, Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
import FormBuilder from '../containers/FormBuilderContainer';
import AccordionGroup from './AccordionGroupComp';


    const ThemeForm = ({theme, handleChange}) =>{

        /*
        primary: string;
    background: string;
    surface: string;
    accent: string;
    error: string;
    text: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
        */

       //console.log(theme)

        let formData = [
            {color:{name:'primary', type:'colors', label:'Primary Color'}},
            {color:{name:'background', type:'colors', label:'Background Color'}},
            {color:{name:'surface', type:'colors', label:'Surface Color'}},
            {color:{name:'accent', type:'colors', label:'Accent Color'}},
            {color:{name:'error', type:'colors', label:'Error Color'}},
            {color:{name:'text', type:'colors', label:'Text Color'}},
            {color:{name:'disabled', type:'colors', label:'Disabled Color'}},
            {color:{name:'placeholder', type:'colors', label:'Placeholder Color'}},
            {color:{name:'backdrop', type:'colors', label:'Backdrop Color'}},
        ]

        return <FormBuilder data={formData} handleChange={handleChange} defaultValues={theme.colors} />
    }

    const AppThemeComp = ({theme, isFocused, handleChange}) => {

        const style = {backgroundColor:theme.colors.accent,  marginTop:5};

        
        const accordionData = [];

        if(isFocused){
            accordionData.push({title:'Colors', style, render:()=><ThemeForm theme={theme} handleChange={handleChange} />});
        }

            accordionData.push({title:'More', style});

        return (
            <ScrollView style={{flex:1, marginTop:30}}>  
                {isFocused && <AccordionGroup data={accordionData} />}
            </ScrollView>
        );
    }

export default AppThemeComp;