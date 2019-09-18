import React, {Component} from 'react';
import { View, Text } from 'react-native';
import * as dotProp from './_dotProp';
import ComponentBuilderComp, {ContentBlock, EditorWrapper, EditorButton as Button} from '../components/ComponentBuilderComp';
import { PlainModal } from '../components/ModalComp';


import register from './_componentRegister';


export default class ComponentBuilderContainer extends Component {
   
    constructor(props){
  
      super(props);
  
      this.state = {
        target:'',
        visible: false,
      }

    this.refStore = [];
      
    
    //this.handleSubmit = this.handleSubmit.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.makeStoreRef = this.makeStoreRef.bind(this);
  
  
    }
  
    
    componentWillMount(){
        this._isMounted = false;
    
    
    }
    


    init(){

        //console.log("FormBuilder - Init", this.props.isFocused)
    }

    
    componentDidMount() {
        this._isMounted = true; 
        
       // this.init();
    }

    
    componentWillUnmount() {
        this._isMounted = false;
    
    }

    showModal(){

    }


    makeRef({parent, index, key}){
        //reference
        var ref = []

        //check for parent
        if(parent){
            ref.push(parent)
        }

        //add index to ref
        if(Number.isInteger(index)){
            ref.push(index);            
        }


        if(key){
            ref.push(key);
        }

        return ref.join('.');
    }

    openModal(target=""){

        this.setState({visible:true, target});

    }

    closeModal(){
        this.setState({visible:false});
    }

    getAddButton(obj={}){

        const { target="" } = obj;

        const onPress = ()=>{
            this.openModal(target);
            console.log("you clicked me:", target)
        }

        return {iconButton:{icon:'add-circle-outline', onPress}, ...obj}
    }

    makeStoreRef(ref){
        let index = this.refStore.length;

        this.refStore[index] = ref;

        console.log(index, typeof ref)

        return this.refStore[index];
    }
    

    renderComp({key, props={}, parent, index=0}){

        const ref = this.makeRef({parent, index, key});

        const isEditor = this.props.isEditor || false;

        var RenderedComp = null;
        var renderedControl = [];
        


        if(key && register[key]){

            let Comp;
            let defaultProps = register[key].props || {};

            //spread default props into props
            props = {...defaultProps, ...props};

            if(isEditor && register[key].editorRender){
                Comp = register[key].editorRender
            }
            else if(register[key].render){
                Comp = register[key].render
            }else{
                return null;
            }


            if(isEditor){
                //push edit button
                renderedControl.push(<Button icon="edit" />)
                //console.log("CompBuilder", {isEditor, renderedControl});                
            }

            //spread default props into props

            const {children, ...restProps} = props;

            //console.log("got this far ", ref);

            if(children && Array.isArray(children)){

                const childCount = children.length;

                const {receiveChildren=true, maxChildren=10} = register[key];

                const showAdd = childCount < maxChildren;


                if(receiveChildren){
                    const showChildren = this.buildPage(children, `${ref}.children`);

                    //push add button
                    if(isEditor && showAdd){
                        renderedControl.push(<Button />)
                    }
                    
                                       
                    RenderedComp = ()=> (<Comp {...restProps} >
                                            {showChildren}
                                        </Comp>);
                }

            }else{

                    RenderedComp = ()=> <Comp {...restProps} />

            }



        }

        return isEditor ? <EditorWrapper>
                            <RenderedComp />
                            {renderedControl}
                        </EditorWrapper> 
                        : <RenderedComp />;  
    }

    buildPage(data=[], parent){

        return data.map((obj, index) => {

            const [[key, props]] = Object.entries(obj);

            return this.renderComp({key, props, parent, index});

            });

    }



    handleChange({name, value, parent, index, ...rest}){
        const oldInputs = this.state.inputs;

        //const newInput = {[name]: value};
        let inputs;

        //console.log(name, value);
        //if it has index, it means its from a multi form type
        //console.log({parent, index, name, value });

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

            //this.action({inputs, errors}, this.formCallback);
        }

    }


    render() {

        const data = this.props.data || [];

        const isEditor = this.props.isEditor || false;


        //append AddButton if isEditor
        if(isEditor){
            //data.push(this.getAddButton({target:"page"}))
        }

        //let getObj = dotProp.get(data,"1.view.children.5.view.children.4.text");

        //data = dotProp.set(data,"1.view.children.5.view.children.4.text", {text:'This is the last one'});

        //console.log({getObj})

        const page = this.buildPage(data);

        const Boo = ({onDismiss, state}) => {

            //console.log("Boo", props)
            const {target} = state;

            return (<View style={{backgroundColor:'violet', width:200, height:200}} >
                        {target && <Text>{target}</Text>}
                    </View>);
        }
//<Boo />

/*
        console.log("storeRef", this.refStore.length);



        setTimeout(()=>{
            this.refStore.forEach(o => {
                if(o){
                    o.measureInWindow((x, y, width, height) => {
                        console.log({x, y, width, height});
                    });                    
                }
            });
            console.log(this.refStore[0])
        },5000);
*/


        return (
            
            <View>
                
                
                {page}

                <PlainModal visible={this.state.visible} onDismiss={this.closeModal} state={this.state} >
                    
                    <ContentBlock />
                    
                </PlainModal>
            </View>
        )
    }


}