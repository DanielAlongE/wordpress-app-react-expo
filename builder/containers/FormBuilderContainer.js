import React, {Component} from 'react';
import {Text} from 'react-native';


import {FormWrapper, TextForm, TextareaForm, FormDivider, 
    FormSwitch, FormTitle, FormSection, IconPicker,
     ColorPicker, FormSubmit, FormButton, FormIconButton, FormFlex
    } from '../components/FormComp';

const formRegister = {
    text:{comp:TextForm},
    textarea:{comp:TextareaForm},
    divider:{comp:FormDivider},
    title:{comp:FormTitle},
    switch:{comp:FormSwitch},
    section:{comp:FormSection},
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

        console.log("FormBuilder - Init", this.props.isFocused)
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
            else if(key==='section' || key==='flex' && args['data'] && Array.isArray(args['data'])){
                
                let {data, name, ...rest} = args;

                //name = name || k;
                
                var collection = this.buildForm(data, state, handleChange);

                return <Comp key={k} {...rest}  {...form}>
                    {collection}
                </Comp>
            }
            else{
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

    handleChange({name, value, ...rest}){
        const oldInputs = this.state.inputs;

        const newInput = {[name]: value};

        console.log(name, value);

        this.setState({inputs:{...oldInputs, ...newInput}});
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