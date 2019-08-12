import React from 'react';
import {  View } from 'react-native';
import { Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, Surface } from 'react-native-paper';


const defaultHandleChange = (props)=>{
    console.log("You have not included a handleChange function", props);
}

export const FormWrapper = ({children}) => <View>{children}</View>

export const FormSection = ({title,children}) => (
    <List.Accordion title={title || 'More'}>
            <Field>
                {children}
            </Field>        
    </List.Accordion>
);

const Field = ({children}) => <View style={{marginLeft:5, marginRight:5}}>{children}</View>

export const TextForm = ({handleChange, state, ...props}) => {

    handleChange = handleChange || defaultHandleChange;

    const { name } = props;

    let value = state && state[name] ? state[name] : '';

    return (
        <Field>
                <TextInput mode='flat' onChangeText={value => handleChange({value,...props})} {...props} value={value} />
        </Field>
        );
}

export const TextareaForm = ({handleChange, ...props}) => <TextForm handleChange={handleChange} {...props} multiline />

export const FormDivider = ()=> <Field><Divider /></Field>

export const FormTitle = ({value}) => <Title>{value}</Title>

export const FormSwitch = ({handleChange, state, ...props}) => {

    handleChange = handleChange || defaultHandleChange;

    const { name } = props;

    let value = state && state[name] ? state[name] : false;

    return (<Switch {...props} onValueChange={() => handleChange({...props, value:!value}) } value={value} />);
}

export const FormSubmit = ({handleSubmit, label, success, isSubmitting, ...args}) => {

    return (<Button loading={isSubmitting} onPress={isSubmitting ? ()=>console.log('isSubmitting') :()=>handleSubmit()} {...args} >{label}</Button>)
}
