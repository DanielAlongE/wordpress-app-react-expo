import React from 'react';
import {  View } from 'react-native';
import { Text, Avatar, Button, Card, Title, IconButton, TextInput, Divider, Switch, RadioButton, Checkbox, List, Surface } from 'react-native-paper';
import MyModal from './ModalComp';
import IconPickerComp from './IconPickerComp';
import ColorPickerComp from './ColorPickerComp';
import * as dotProp from '../containers/_dotProp';

export const makeRef = ({parent, index, name}) =>{
    var ref = [];

    if(parent){
        //ref = `${parent}.${name}`;
        ref.push(parent)
    }
    
    if(Number.isInteger(index)){
        //ref = `${parent}.${index}.${name}`;
        ref.push(index)
    }

    if(name){
        ref.push(name)        
    }

    return ref.join('.');
}

const getInput = (state={}, {name, parent, index, def=''}) => {
    //const {inputs} = this.state;

    var ref = makeRef({parent, index, name});

    const value = dotProp.get(state, ref, def);
    console.log(`getInput ${name}:`, ref, value);

    return value;
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

export const ButtonAdd = ({label, name, parent, index, action, style={}, ...args}) => {

    if(name && action){
        args.onPress = ()=>action({name, parent, index});
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
    
    const hasParent = parent ? true :false;

    //if index exists it means it is nested in another FormMultiple

    var getter = {};

    if(hasParent){
        //getter.parent = parent;
        getter.name = name;
        getter.index = index;
        
        parent = makeRef({parent, name, index });

        console.log("hasParent state", state)

    }else{
        getter.name = name;
        getter.index = index;
        
        parent = makeRef({ name });
    }


    
    
/*
    let multiState = dotProp.get(state, parent, [{}]);
*/
    let multiState = getInput(state, {name, def:[{}]});

    //state && state[parent] ? state[parent] : [{}];

    console.log("Multiple", {...getter}  )
    
    if(children){
        children = multiState.map((obj, index)=>{
                return React.Children.map(children, child =>{
                    if(hasParent){
                        //console.log("child", child.props)
                        //console.log("state", obj)
                    }

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

    const { name, parent, index } = props;

    let value = state && state[name] ? state[name] : '';
    //let value = getInput(state, {name, parent, index, def:''});

    console.log(`TextForm -> ${name}`, value);

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
