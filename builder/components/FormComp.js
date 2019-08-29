import React from 'react';
import {  View } from 'react-native';
import { Text, Avatar, Button, Card, Title, IconButton, TextInput, Divider, Switch, RadioButton, Checkbox, List, Surface } from 'react-native-paper';
import MyModal from './ModalComp';
import IconPickerComp from './IconPickerComp';
import ColorPickerComp from './ColorPickerComp';

const defaultHandleChange = (props)=>{
    console.log("You have not included a handleChange function", props);
}

export const FormWrapper = ({children}) => <View>{children}</View>


const Field = ({children}) => <View style={{marginLeft:5, marginRight:5}}>{children}</View>


export const FormSection = ({title,children}) => (
    <List.Accordion title={title || 'More'}>
            <Field>
                {children}
            </Field>        
    </List.Accordion>
);

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

export const IconPicker = ({handleChange, state, ...props}) =>{
    
    const name  = props.name || "";

    let value = state && state[name] ? state[name] : '';

    return (
        <MyModal value={value} action={({show, value})=>{
            console.log("Value prop", value)
            return (
            <Field>
                <View style={{flexDirection:'row', flex:1}}>
                    {value !=="" && <IconButton icon={value} />}
                    <Button onPress={()=>show()} >Choose Icon</Button>                
                </View>
            </Field>
            );
        }}>
            <IconPickerComp handleChange={handleChange} {...props} />
        </MyModal>
    )

}

export const ColorPicker = ({handleChange, state, ...props}) =>{
    
    const name  = props.name || "";

    let value = state && state[name] ? state[name] : '#fff';
    let label = props.label || "Choose Color";

    return (
        <MyModal value={value} action={({show, value})=>{

            let extra = value !=="" ? {backgroundColor: value} : {};
            
            return (
            <Field>
                
                <List.Item onPress={()=>show()}
                title={label} style={{backgroundColor:'#eee'}}
                left={()=><IconButton color={value} size={30} icon="brightness-1" />} />
                {/*<Button mode="outlined" style={{...extra}} onPress={()=>show()} >{label}</Button>*/}                 
            </Field>
            );
        }}>
            <ColorPickerComp handleChange={handleChange} {...props} />
        </MyModal>
    )

}
