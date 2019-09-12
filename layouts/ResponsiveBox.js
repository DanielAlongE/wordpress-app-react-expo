import React from 'react';
import { View, Dimensions } from 'react-native';


export const deviceIs = () => {
    var {width, height} = Dimensions.get('window');
    var device;

    if(width <= 520){
        device = "small";
    }
    else if(width <= 1024){
        device = "medium";
    }
    else if(width > 1024){
        device = "large";
    }

    return device;

}

export default class ResBox extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            style:{},
            width:360,
            height:640
        }
    }

    style = {};

    hideBox(){
        var hidden = this.props.hidden ? this.props.hidden : '';
        var device = deviceIs();

        return hidden.indexOf(device) > -1;
    }

    static getScreen(){
        const { width, height } = Dimensions.get('window');

        return { width, height }
    }

    getDimensions(){
        const { width, height } = ResBox.getScreen();//Dimensions.get('window');
        this._setState({width, height});
    }

    resetBox(){

        //var def = this.state.style;
        this.getDimensions();

        //var { style, small, medium, large } = this.props;

        var style = this.props.style ? this.props.style : {};
        var small = this.props.small ? this.props.small : {};
        var medium = this.props.medium ? this.props.medium : {};
        var large = this.props.large ? this.props.large : {};

        var device = deviceIs();

        if(small && device === 'small'){
            //this._setState({style:{...style, ...small}});
            this.style ={...style, ...small};
        }
        else if(medium && device === 'medium'){
            //this._setState({style:{...style, ...medium}});
            this.style = {...style, ...medium};
        }
        else if(large && device === 'large'){
            //this._setState({style:{...style, ...large}});
            this.style = {...style, ...large};
        }else{
            //this._setState({style});
            this.style = {...style};
        }
        
        //console.log({device, def});
    }

    _setState(obj){
        if(this._isMounted){
          this.setState({...obj});
        }
      }
  

    componentWillMount() {
        this._isMounted = false;

        this.resetBox();

        Dimensions.addEventListener('change', ()=>this.resetBox());
        
    }

    componentWillUnmount() {
        this._isMounted = false;
        Dimensions.removeEventListener('change');
    }

    componentDidMount() {
        this._isMounted = true;

        this.resetBox();
    }

    render(){

        //const Comp = this.props.comp ? this.props.comp : View;

        const {children, style:s, small, medium, large, as:Comp=View, ...args} = this.props;

        var { //style, 
            width, height} = this.state;

        var style = {...this.style};

        //var {maxWidth, maxHeight} = this.props;

        //console.log('before', style)
    
        
        if(style.pWidth){
            style.width = width * (style.pWidth/100);
            delete style.pWidth;
        }

        if(style.pHeight){
            style.height = height * (style.pHeight/100);
            delete style.pHeight;
        }

        if(style.pMargin){
            style.margin = width * (style.pMargin/100);
            delete style.pMargin;
        }

        if(style.pMarginRight){
            style.marginRight = width * (style.pMarginRight/100);
            delete style.pMarginRight;
        }

        if(style.pMarginLeft){
            style.marginLeft = width * (style.pMarginLeft/100);
            delete style.pMarginLeft;
        }

        if(style.pPadding){
            style.padding = width * (style.pPadding/100);
            delete style.pPadding;
        }

    
        if(this.hideBox()){
            return <View></View>
        }else if(children){
            return  (
                <Comp {...args} style={style} >
                    {children}
                </Comp>)
        }else{
            //console.log('args', args)       
            return <Comp {...args} style={style} />
        }


    }
    

}