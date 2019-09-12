import React from 'react';
import {  View, ScrollView, StyleSheet } from 'react-native';
import { Appbar, Dialog, Modal, FAB, Portal, Text, Button, Card, Title,  TextInput, Divider, Switch, RadioButton, Checkbox, List, IconButton } from 'react-native-paper';
//import FormBuilder from '../containers/FormBuilderContainer';
import {default as Box} from '../../layouts/ResponsiveBox';

const theme = {
  colors: {
    primary:'#3498db',
  }
}

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


export const PlainModal = ({children, visible, onDismiss, ...rest}) => {
  
  if(children){
    children = React.Children.map(children, child =>{
      return React.cloneElement(child, { onDismiss, ...rest })}
    );       
  }
   
  
  return (
    <Portal>

      <Modal visible={visible} onDismiss={onDismiss}>
        <View>
            {children}
        </View>
      </Modal>
    </Portal>);
}

export const SimpleModal = ({title, subtitle, children, visible, onDismiss}) => (
    <Portal>
      

      <Modal visible={visible} onDismiss={onDismiss}>

      <View>
          <Box style={{pWidth:100, pHeight:100, backgroundColor:'#ddd'}}>
            <Appbar.Header theme={theme}>
              <Appbar.BackAction
                onPress={onDismiss} 
              />
              <Appbar.Content
                title={title}
                subtitle={subtitle || ''}
              />
              {/*<Appbar.Action icon="search" onPress={()=>console.log("search")} />
              <Appbar.Action icon="more-vert" onPress={()=>console.log("more")}  />*/}
            </Appbar.Header>
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

/**
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
 */
  
    render() {
      const { visible } = this.state;

      const {action:Comp, children, title, subtitle, ...rest} = this.props;
      const onDismiss = this._hideModal.bind(this);

     const childrenWithProps = React.Children.map(children, child =>
      React.cloneElement(child, { hide: onDismiss, how:'are you' })
    );
     
     return (
       <View>
         {Comp && <Comp show={this._showModal.bind(this)} {...rest} />}
          <Portal>
            
            <Modal visible={visible} onDismiss={onDismiss}>
      
            <View>
                <Box style={{pWidth:100, pHeight:100, backgroundColor:'#ddd'}}>
                  <Appbar.Header theme={theme}>
                    <Appbar.BackAction
                      onPress={onDismiss} 
                    />
                    <Appbar.Content
                      title={title}
                      subtitle={subtitle || ''}
                    />
                    {/*<Appbar.Action icon="search" onPress={()=>console.log("search")} />
                    <Appbar.Action icon="more-vert" onPress={()=>console.log("more")}  />*/}
                  </Appbar.Header>
                  <ScrollView style={{flex:1}}>
                    {children && childrenWithProps}
                  </ScrollView>         
                </Box>
            </View>
      
              </Modal>
          </Portal>         
       </View>
);
    }
  }


export default MyModal;