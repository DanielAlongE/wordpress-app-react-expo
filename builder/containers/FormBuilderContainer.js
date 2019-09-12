import React, {Component} from 'react';
import * as dotProp from './_dotProp';


import {FormWrapper, TextForm, TextareaForm, FormDivider, 
    FormSwitch, FormTitle, FormSection, IconPicker,
     ColorPicker, FormSubmit, FormButton, FormIconButton, FormFlex, 
     FormMultiple, ButtonAdd, ButtonDelete,
     makeRef
    } from '../components/FormComp';

const formRegister = {
    text:{comp:TextForm},
    textarea:{comp:TextareaForm},
    divider:{comp:FormDivider},
    title:{comp:FormTitle},
    switch:{comp:FormSwitch},
    section:{comp:FormSection},
    multiple:{comp:FormMultiple},
    multiple_add:{comp:ButtonAdd},
    multiple_delete:{comp:ButtonDelete},
    flex:{comp:FormFlex},
    icon:{comp:IconPicker},
    color:{comp:ColorPicker},
    button:{comp:FormButton},
    icon_button:{comp:FormIconButton},    
    submit:{comp:FormSubmit}
};

export default class FormBuilderContainer extends Component {
   
    constructor(props){
  
      super(props);
  
      this.state = {
          inputs:{

          },
          errors:[],          
        isSubmitting:false,
        success:false
          
      }
      
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.defaultFormAction = this.defaultFormAction.bind(this);
    this.formCallback = this.formCallback.bind(this);
    this.formDataHelper = this.formDataHelper.bind(this);

    this.addChildMultiForm = this.addChildMultiForm.bind(this);
    this.deleteChildMultiForm = this.deleteChildMultiForm.bind(this);
  
  
    }
  
    
    componentWillMount(){
        this._isMounted = false;
    
    
    }
    
    defaultFormAction(obj){
        console.log("you didn't supply an action", obj)
    }
    
    defaultOnSuccessAction(){
        console.log("Form summited successfully")
    }

    init(){
        //set form submit action
        this.action = this.props.action || this.defaultFormAction;

        //set onSuccess action
        this.onSuccess = this.props.onSuccess || this.defaultOnSuccessAction;

        //get default values if available
        const inputs = this.props.defaultValues || {};
        this.setState({inputs});

        //console.log("FormBuilder - Init", this.props.isFocused)
    }

    
    componentDidMount() {
        this._isMounted = true; 
        
        this.init();
    }

    
    componentWillUnmount() {
        this._isMounted = false;
    
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
      }

    

    renderForm(key, args, state, handleChange, index=0){

        const {isSubmitting, success} = this.state;

        const form = {isSubmitting, success};

        if(formRegister[key]){
            //const random = this.getRandomInt(1000);
            const Comp = formRegister[key].comp;                        
            const k = `${key}-${index}`;

            //console.log('debug', args[key]);
            if(key==='submit'){
                let {label, action} = args;
                const {handleSubmit} = this;

                label = label || 'Submit';
                action = this.action;

                return <Comp key={k} label={label} handleSubmit={handleSubmit} action={action} {...form} />

            }
            else if(key==='multiple_add' || key==='multiple_delete'){

                const {addChildMultiForm, deleteChildMultiForm} = this;

                let action = key==='multiple_add' ? addChildMultiForm : deleteChildMultiForm;


                return <Comp key={k} action={action} {...args} />

            }
            else if((key==='multiple' || key==='section' || key==='flex') && args['data'] && Array.isArray(args['data'])){
                
                let {data, name, ...rest} = args;

                //name = name || k;
                
                let collection = this.buildForm(data, state, handleChange);

                return <Comp key={k} state={state} name={name} {...rest}  {...form}>
                    {collection}
                </Comp>
            }else{
                let {name, ...extra} = args;

                name = name || k;

                //const value = state && state.name ? state.name : '';


                //console.log(name, key);

                return <Comp key={k} {...extra} state={state} name={name} handleChange={handleChange}  {...form} />
            }
        }

        return null;

    }

    buildForm(data, state, handleChange){

        //var formCollection = [];

        //const dataToArray = Object.entries(data);
        
        return data.map((form, index) => {


            const [[key, args]] = Object.entries(form);
                //const [key, args] = form;

            return this.renderForm(key, args, state, handleChange, index);

            });

        //return formCollection;

    }

    addChildMultiForm({name, parent, index}){
        
        const ref = makeRef({name, parent, index});

        console.log("addChild", {ref})

        const inputs = dotProp.set(this.state.inputs, ref, value=>{
            value = Array.isArray(value) ? value : [];
            return [...value, {}]
        });

        this.setState({inputs});
    }

    deleteChildMultiForm(parent, index){
        console.log("deleteChild", {parent, index})
        const inputs = dotProp.delete(this.state.inputs, `${parent}.${index}`);
        this.setState({inputs});
    }

    handleChange({name, value, parent, index, ...rest}){
        const oldInputs = this.state.inputs;

        //const newInput = {[name]: value};
        let inputs;

        //console.log(name, value);
        //if it has index, it means its from a multi form type
        console.log({parent, index, name, value });

        if(parent && Number.isInteger(index)){
            
            inputs = dotProp.set(oldInputs, `${parent}`, val=>{
                val = Array.isArray(val) ? val : [];
                index = index ? index : 0;
                let obj = val[index] ? val[index] : {};

                obj[name] = value;
                val[index] = {...obj};

                return [...val ]
            });

            //console.log(inputs)
            //console.log(`${parent}.${index}.${name}`, value)
        }else{
            inputs = dotProp.set(oldInputs, `${name}`, value);
        }

        this.setState({inputs});

    }


    formCallback(response={}){

        //check for success and call onSuccess if available
        if(response.success){
            this.onSuccess();
        }

        this.setState({...response, isSubmitting:false});
    }

    handleSubmit(){
        const {inputs, errors} = this.state;
        const { clear } = this.props;

        this.setState({isSubmitting:true});

        //console.log('this is what happens onSubmit',this.props);

        if(errors.length > 0){
            console.log("Your form has errors")
        }else{
            //clear form if set
            if(clear){
                this.setState({inputs:{}, errors:[]});
            }

            this.action({inputs, errors}, this.formCallback);
        }

    }

    
    formDataHelper(helper){
        const {isSubmitting, success} = this.state;
        const args = {isSubmitting, success, state};
        return helper(args);
    }


    render() {
        const state = this.props.state || this.state.inputs

        const {isSubmitting, success} = this.state;

        //if helper is available
        const formData = this.props.helper ?  this.props.helper({isSubmitting, success, state}) : (this.props.data || []);

        const handleChange = this.props.handleChange || this.handleChange;

        //console.log('Form builder', formData, state)

        const form = this.buildForm(formData, state, handleChange);

        const {style} = this.props;

        return (
            <FormWrapper style={style}>
                {form}
            </FormWrapper>
        )
    }


}