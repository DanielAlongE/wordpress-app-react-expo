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
            width:0,
            height:0
        }
    }

    hideBox(){
        var hidden = this.props.hidden ? this.props.hidden : '';
        var device = deviceIs();

        return hidden.indexOf(device) > -1;
    }

    getDimensions(){
        const { width, height } = Dimensions.get('window');
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
            this._setState({style:{...style, ...small}});
        }
        else if(medium && device === 'medium'){
            this._setState({style:{...style, ...medium}});
        }
        else if(large && device === 'large'){
            this._setState({style:{...style, ...large}});
        }else{
            this._setState({style});
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

        var {style, width, height} = this.state;

        //var {maxWidth, maxHeight} = this.props;
        
        if(style.pWidth){
            style.width = width * (style.pWidth/100);
            delete style.pWidth;
        }

        if(style.pHeight){
            style.height = height * (style.pHeight/100);
            delete style.pHeight;
        }

        if(style.pMargin){
            style.margin = height * (style.pMargin/100);
            delete style.pMargin;
        }

        if(style.pPadding){
            style.padding = height * (style.pPadding/100);
            delete style.pPadding;
        }

        return this.hideBox() ? (<View></View>) :(
        <View style={style}>
            {this.props.children}
        </View>)
    }
    

}