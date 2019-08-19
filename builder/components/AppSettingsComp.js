import React from 'react';
import {  View } from 'react-native';
import { Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
import FormBuilder from '../containers/FormBuilderContainer';




const EditAppForm = ({...rest}) => {
    const editAppFormData = [
        {section:{title:'App Details', data:[
            {text:{name:'name', placeholder:'App Name'}},
            {text:{name:'title', placeholder:'App Title'}},
        ]}
        }
    ];

    return (<FormBuilder {...rest} data={editAppFormData} />);
}


const WordpressUrlForm = (props) => {

    //var submit = submiting || verified ?  {} : {submit:{label:'Verify'}}

    //console.log('UrlForm ', props)

    const helper = ({isSubmitting, success, state})=>{

    let url = {name:'url', placeholder:'http://www.your-wordpress-site.com'};

    if(isSubmitting){
        url = {...url, disabled:true};
    }

    if(success){
        url = {...url, mode:'outlined', theme:{color:'green'}};
    }else{
        url.error = true;
    }
    
    //console.log(isSubmitting,success);
    //console.log('url Text', state);

    let wordpressFormData = [
        {section:{title:'WordPress Url', data:[
            {text:url},
            {submit:{label:'Verify'}}
        ]}
        }
    ];


    return wordpressFormData;

    }

    return (<FormBuilder {...props} helper={helper} />);
}


const WordpressAdvancedForm = (props) => {

    const helper = ({isSubmitting, success, state}) => {

        let advancedForm = [
            {section:{title:"Wordpress Settings"}, data:[
                    {text:{style:{width:50}}},
                    {text:{style:{width:50}}},
                    {text:{style:{width:50}}}
                ]
            }
        ]
        
        return advancedForm;
    }


    return (<FormBuilder {...props} helper={helper} />);
}




const AppSettingsComp = ({handleChange, state, action, isFocused}) => {

    //wordpressUrl
    const url = state.url || '';

    const args = {handleChange, state};

    return (<View>
        <EditAppForm {...args} />

        {isFocused && <WordpressUrlForm action={action} defaultValues={{url}} />}

        {state.url && <WordpressAdvancedForm action={action} />}

    </View>);

}

export default AppSettingsComp;