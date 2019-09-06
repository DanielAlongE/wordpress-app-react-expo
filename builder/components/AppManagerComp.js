import React from 'react';
import {  View, ScrollView } from 'react-native';
import { Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
import FormBuilder from '../containers/FormBuilderContainer';
//import NavigationService from '../../navigation/NavigationService.js';
import { DefaultTheme } from 'react-native-paper';

const createAppFormData = [
    {section:{title:"Create New App", data:[
        {text:{name:'name', placeholder:'App Name'}},
        {text:{name:'title', placeholder:'App Title'}},
        {submit:{label:'Create', mode:'contained'}},
        ]}
    },

];


const CreateAppForm = ({action, ...rest}) => {
    console.log('createAppForm', rest);
    return (<FormBuilder action={action} data={createAppFormData} {...rest} />)}


const ChooseApp = ({apps, enterApp, enterSettings}) =>{

    const showApps = apps.map((app, index)=>{

        const theme = app.theme || DefaultTheme;

        const colors = {text:theme.colors.background};

        const style = {backgroundColor:theme.colors.accent, color:theme.colors.primary,  marginTop:5};

        return (<List.Item theme={theme} key={`app-${index}`} style={style} onPress={()=>enterApp(index)}
            title={app.name} description={app.title}
            right={() => <IconButton onPress={()=>enterSettings(index)} icon='settings' />}
         />);
    });

    if(apps.length === 0){
        return null;
    }

    return (
    <List.Section>
        <List.Subheader>Choose an App</List.Subheader>
        {showApps}
     </List.Section>);
}

const AppManagerComp = ({apps, action, enterApp, enterSettings}) => {


    return (
    <ScrollView style={{flex:1, marginTop:20}}>

        <ChooseApp apps={apps} enterApp={enterApp} enterSettings={enterSettings} />

        <CreateAppForm action={action} clear={true} />
        
    </ScrollView>);
}

export default AppManagerComp;