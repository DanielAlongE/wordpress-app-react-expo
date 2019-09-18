import React from 'react';
import { Text, IconButton, Button } from 'react-native-paper';
import { View } from 'react-native';
import FormBuilder from '../containers/FormBuilderContainer';

const IconButtonComp = ({icon, ...rest}) => <IconButton icon={icon} {...rest} />

const TextComp = ({text}) => <Text>{text}</Text>

const TextForm = ({defaultValue={}, action}) =>{
    let data = [
        {flex:{data:[
            {text:{name:'text'}},
        ]}},
        {flex:{data:[
            {submit:{label:'Update', width:100}}
        ]}}
    ];

    return <FormBuilder action={action} defaultValue={defaultValue} data={data} />
}

const ViewComp = ({children, ...rest}) => <View {...rest}>{children}</View>

export const componentSchema = {
    name: 'No name',
    icon: 'add',
    description: 'The description goes here!',
    props:{},
    render: View,
    editorForm: View,
    receiveChildren: false,
    group:'Others'
}

const componentRegister = {

    text:{
        name: 'Text',
        description: 'Your basic text Component',
        props:{text:'Enter a text here'},
        render: TextComp,
        editorForm: TextForm,
        receiveChildren: false,
        group:'Native'
    },

    view:{
        name: 'View',
        description: 'Your basic view Component',
        props:{children:[]},
        render: ViewComp,
        editorForm: TextForm,
        receiveChildren: true,
        group:'Native'
    },

    iconButton:{
        name: 'Icon Button',
        description: 'Your react-native-pater Icon Button Component',
        props:{icon:'add'},
        render: IconButtonComp,
        editorForm: TextForm,
        receiveChildren: false,
        group:'Native Paper'
    },

    button:{
        name: 'Icon Button',
        description: 'Your react-native-pater Icon Button Component',
        props:{icon:'add'},
        render: IconButtonComp,
        editorForm: TextForm,
        receiveChildren: false,
        group:'Native Paper'
    }
}

export default componentRegister;