import React from 'react';
import {  View } from 'react-native';
import { Text, Avatar, Button, Card, Title, IconButton, TextInput, Divider, Switch, RadioButton, Checkbox, List, Surface } from 'react-native-paper';
import MyModal from './ModalComp';
import IconPickerComp from './IconPickerComp';
import ColorPickerComp from './ColorPickerComp';
import * as dotProp from '../containers/_dotProp';

const getInput = (state={}, {name, parent, index, def=''}) => {
    //const {inputs} = this.state;

    var ref = [];

    if(parent && Number.isInteger(index)){
        //ref = `${parent}.${index}.${name}`;
        ref.push(parent)
        ref.push(index)
    }else if(parent){
        //ref = `${parent}.${name}`;
        ref.push(parent)
    }

    if(name){
        ref.push(name)        
    }


    return dotProp.get(state, ref, def);
}

const defaultHandleChange = (props)=>{
    console.log("You have not included a handleChange function", props);
}

export const FormWrapper = ({children, ...rest}) => <View {...rest}>{children}</View>


const Field = ({children}) => <View style={{marginLeft:5, marginRight:5, marginTop:5}}>{children}</View>

export const FormFlex = ({children, style={}, ...rest}) => {

    let { parent, index, state } = rest;

    //let multiState = dotProp.get(state, parent, [{}]);

    //console.log("Flex", parent, index )
    if( parent && Number.isInteger(index) ){
        //let multiState = state && state[parent] ? state[parent] : [{}];
        //children = children.map((obj, i)=>{});
        children = React.Children.map(children, child =>{
                    //console.log("multi child", child)
                    return React.cloneElement(child, { state, parent, index })}
                );        
                                
    }

    return (<View style={{flex:1, flexDirection:"row", alignContent:'center', justifyContent:'center', margin:5, ...style}} {...rest}>
        {children}
    </View>);
}


export const FormSection = ({title,children}) => (
    <List.Accordion title={title || 'More'}>
            <Field>
                {children}
            </Field>        
    </List.Accordion>
);

export const ButtonAdd = ({label, parent, index, action, style={}, ...args}) => {

    if(parent && action){
        args.onPress = ()=>action({parent, index});
    }

    console.log("ButtonAdd index: ", index)

    return (<View style={style}>
        {label 
        ? <Button mode="contained" {...args} >{label}</Button> 
        :
        <IconButton color="green" icon="add-circle" {...args} />
    }
        </View>)
}

export const ButtonDelete = ({label, parent, index, action, style={}, ...args}) => {

    if(parent && action && Number.isInteger(index)){
        args.onPress = ()=>action(parent, index);
    }

    return (<View style={style}>
        {label 
        ? <Button mode="contained" {...args} >{label}</Button> 
        :
        <IconButton color="red" icon="do-not-disturb-on" {...args} />
    }
        </View>)
}

export const FormMultiple = ({name="group", parent, index, state, children}) => {
    


    //if index exists it means it is nested in another FormMultiple

    if(parent && Number.isInteger(index)){
        parent = `${parent}.${index}.${name}`;
    }
    else if(parent){
        parent = `${parent}.${name}`; 
    }
    else{
        parent = name;        
    }
    
/*
    let multiState = dotProp.get(state, parent, [{}]);
*/
    let multiState = getInput(state, {parent, index, def:[{}]});

    //state && state[parent] ? state[parent] : [{}];

    console.log("Multiple", name, parent, index, {multiState})
    
    if(children){
        children = multiState.map((obj, index)=>{
                return React.Children.map(children, child =>{
                    console.log("multi child", child.props.parent)
                    return React.cloneElement(child, { state:obj, parent, index })}
                );        
        })        
    }


    return (
            <Field>
                {children}
            </Field>);
}


export const TextForm = ({handleChange, style={}, state, ...props}) => {

    handleChange = handleChange || defaultHandleChange;

    const { name } = props;

    let value = state && state[name] ? state[name] : '';

    console.log("TextForm", state)

    return (
        <View style={style}>
            <TextInput mode='flat' onChangeText={value => handleChange({value,...props})} {...props} value={value} />
        </View>
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


export const FormButton = ({label="Button", style={}, ...args}) => {

    return (<View style={style}><Button mode="contained" {...args} >{label}</Button></View>)
}

export const FormIconButton = ({style={}, ...args}) => {

    return (<View style={style}><IconButton icon="check-circle" {...args} /></View>)
}

export const FormSubmit = ({handleSubmit, label, success, isSubmitting, ...args}) => {

    return (<Button loading={isSubmitting} onPress={isSubmitting ? ()=>console.log('isSubmitting') :()=>handleSubmit()} {...args} >{label}</Button>)
}

export const IconPicker = ({handleChange, state, ...props}) =>{
    
    const name  = props.name || "";

    let value = state && state[name] ? state[name] : 'add';
    let label = props.label || "Choose Icon";
    return (
        <MyModal value={value} label={label} action={({show, value, label})=>{
            //console.log("Value prop", value)
            return (
            <Field>
                <List.Item onPress={()=>show()}
                title={label} style={{backgroundColor:'#eee'}} description={value}
                left={()=><IconButton size={30} icon={value} />} />
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
        <MyModal value={value} label={label} action={({show, value, label})=>{

            //let extra = value !=="" ? {backgroundColor: value} : {};
            
            return (
            <Field>
                
                <List.Item onPress={()=>show()}
                title={label} style={{backgroundColor:'#eee'}} description={value}
                left={()=><IconButton color={value} size={30} icon="brightness-1" />} />
                {/*<Button mode="outlined" style={{...extra}} onPress={()=>show()} >{label}</Button>*/}                 
            </Field>
            );
        }}>
            <ColorPickerComp handleChange={handleChange} {...props} />
        </MyModal>
    )

}
