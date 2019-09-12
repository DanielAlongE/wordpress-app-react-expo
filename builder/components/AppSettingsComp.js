import React from 'react';
import {  View, ScrollView } from 'react-native';
import { Colors, Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
import FormBuilder from '../containers/FormBuilderContainer';
import Accordion from './AccordionGroupComp';
import * as dotProp from '../containers/_dotProp';



const EditAppForm = ({...rest}) => {
    const editAppFormData = [
//        {section:{title:'App Details', data:[
            {text:{name:'name', placeholder:'App Name'}},
            {text:{name:'title', placeholder:'App Title'}},
//        ]}        }
    ];

    return (<FormBuilder {...rest} data={editAppFormData} />);
}


const WordpressUrlForm = (props) => {

    //var submit = submiting || verified ?  {} : {submit:{label:'Verify'}}

    //console.log('UrlForm ', props)

    const helper = ({isSubmitting, success, state})=>{

    let url = {name:'url', placeholder:'http://www.your-wordpress-site.com'};
    let submit = {submit:{label:'Verify'}}

    if(isSubmitting){
        url = {...url, disabled:true};
    }

    if(success){
        url = {...url, mode:'outlined', theme:{color:'green'}};
        submit = {button:{label:'Verified', icon:'check-circle', mode:'outlined'}};
    
    }else{
        //url.error = true;
    }
    
    //console.log(isSubmitting,success);
    //console.log('url Text', state);

    let wordpressFormData = [
//        {section:{title:'WordPress Url', data:[
            {text:url},
            {...submit}
//        ]}        }
    ];


    return wordpressFormData;

    }

    return (<FormBuilder {...props} helper={helper} />);
}


const WordpressAdvancedForm = (props) => {

    const defaultValues = {
        group:[{
            attr:"color",
            value:"blue",
            roles:[
                {role:'Sample 1'},
                {role:'Sample 2'}
            ]
        }]
    };

    console.log("WordAdvance", "group.0.roles", dotProp.get(defaultValues, "group.0.roles"));

    const helper = ({isSubmitting, success, state}) => {

        let advancedForm = [
            {multiple:{name:'group', data:[
                    {flex:{data:[
                        {text:{name:'attr', style:{flex:2, margin:2}}},
                        {text:{name:'value', style:{flex:2, margin:2}}},
                        {multiple_delete:{flex:1}}
                    ]}},

                    {multiple:{name:'roles', data:[
                        {flex:{data:[
                            {text:{name:'role', style:{flex:4, margin:2}}},
                            {multiple_delete:{flex:1}}                              
                        ]}},
                      
                        ]}
                    },
                    {multiple_add:{name:'roles', label:'Add Role', style:{flex:1, margin:2}}},
                ]}
            },
            {multiple_add:{name:'group', style:{flex:1, margin:2}}},

            
            

            {submit:{}},
            {flex:{style:{height:30, flex:0}, data:[
                {text:{style:{flex:2, height:30,}}},
                {button:{style:{flex:1, margin:2}}}
            ]}
            },
            {flex:{style:{flexDirection:'column', height:200}, data:[
                {flex:{style:{flex:0, backgroundColor:'indigo', justifyContent:'space-around'}, data:[
                    {button:{style:{width:100}}},
                    {button:{style:{width:100}}}
                ]}
                },
                {flex:{style:{flex:0, backgroundColor:'pink', justifyContent:'space-between'}, data:[
                    {button:{style:{width:100}}},
                    {button:{style:{width:100}}}
                ]}
                },
                {flex:{style:{flex:0, backgroundColor:'yellow'}, data:[
                    {button:{style:{width:100}}}
                ]}
                }
            ]}}
        ];
        
        return advancedForm;
    }


    return (<FormBuilder {...props} helper={helper} defaultValues={defaultValues} />);
}




const AppSettingsComp = ({handleChange, state, action, isFocused}) => {

    //wordpressUrl
    const url = state.url || '';

    const args = {handleChange, state};

    const style = {backgroundColor:Colors.purple100, margin:5};

    var accordionData = [
        {title:'App Name', style, render:()=><EditAppForm {...args} />},
    ];

    if(isFocused){
        accordionData.push({title:'WordPress Site Url', style, render:()=><WordpressUrlForm action={action} defaultValues={{url}} />});
    }

    if(state.url){
        accordionData.push({title:'WordPress Advanced', style,  render:()=><WordpressAdvancedForm />});  
    }

    return (
    <ScrollView style={{flex:1, marginTop:20}}>
        <Accordion data={accordionData} />        
    </ScrollView>
    );

}

export default AppSettingsComp;