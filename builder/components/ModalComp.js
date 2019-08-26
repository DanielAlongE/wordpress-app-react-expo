import React from 'react';
import {  View, ScrollView, StyleSheet } from 'react-native';
import { Dialog, Modal, FAB, Portal, Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
//import FormBuilder from '../containers/FormBuilderContainer';
import {default as Box} from '../../layouts/ResponsiveBox';

class MyDialog extends React.Component {
    state = {
      visible: false,
    };
  
    _showModal = () => this.setState({ visible: true });
    _hideModal = () => this.setState({ visible: false });

  
    render() {
      const { visible } = this.state;

      return (

<Dialog visible={visible} onDismiss={_hideModal}>
<Dialog.Title>Alert</Dialog.Title>
    <Dialog.Content>
        <Text>This is a scrollable area</Text>        
    </Dialog.Content>

<Dialog.Actions>
    <Button onPress={() => console.log("Cancel")}>Cancel</Button>
    <Button onPress={() => console.log("Ok")}>Ok</Button>
</Dialog.Actions>
</Dialog>
);
}
}

// backgroundColor:'yellow'

export const SimpleModal = ({title, children, visible, onDismiss}) => (
    <Portal>
      

      <Modal visible={visible} onDismiss={onDismiss}>
      <View>
          <Box style={{marginTop:30,pWidth:100, backgroundColor:'yellow', pHeight:100}}>
            <View style={{flexDirection:'row', height:50, backgroundColor:'#eee', borderColor:'#ddd', borderWidth:1}}>
              <View  style={{flex:1, alignSelf:'flex-start', borderRightColor:'#ddd', borderRightWidth:1, justifyContent:'center'}}>
                <IconButton icon="close" onPress={onDismiss} />                
              </View>
                {title && <Text style={{flex:7, paddingTop:15, paddingBottom:5, justifyContent:'center'}}>{title}</Text>}
            </View>
            <ScrollView style={{flex:1}}>
              {children}
            </ScrollView>
                        
          </Box>
      </View>

        </Modal>
    </Portal>);

class MyModal extends React.Component {
    state = {
      visible: false,
    };
  
    _showModal = () => this.setState({ visible: true });
    _hideModal = () => this.setState({ visible: false });

    componentDidMount() {

        const visible = this.props.open || this.state.visible;

        this.setState({visible});
    }

    componentWillReceiveProps(nextProps) {

        const {visible} = this.state;

        if(!!nextProps.open){
            this.setState({visible:!visible});
        }

        //console.log("MyModal", {old:this.props.open, new:nextProps.open});
    }
  
    render() {
      const { visible } = this.state;

      const {action:Comp, children} = this.props;

      return (
        <View>
           <Portal>
             <Modal visible={visible} onDismiss={this._hideModal}>
               {children}
             </Modal>
             {Comp && <Comp that={this} />}
           </Portal>
        </View>
      );
    }
  }


export default MyModal;