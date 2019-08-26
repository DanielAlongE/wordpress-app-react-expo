import React from 'react';
import { View } from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

 class ConfirmDialogControlled extends React.Component {
  state = {
    visible: false,
  };

  _hideDialog = () => this.setState({ visible: false });

  componentDidMount() {
    const {visible} = this.props;

    if(visible){
      this.setState({visible});
    }

  }

  componentDidUpdate(prevProps) {
    const {visible} = this.props;
    if (prevProps.visible !== visible) {
      this.setState({visible});
    }

  }  
  

  doConfrim(){
    const {action} = this.props;

    if(action){
      action();
    }

    this._hideDialog();
  }

  render() {

    const {children, message} = this.props;

    return (
      <Portal>
        <Dialog
          visible={this.state.visible}
          onDismiss={this._hideDialog}>
          <Dialog.Content>
            {message && <Paragraph>{message}</Paragraph>}
            {children && children}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={this._hideDialog}>Cancel</Button>
            <Button onPress={()=>this.doConfrim()}>Ok</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const ConfirmDialog = ({message, visible, children, onDismiss, onConfirm}) =>{

  return (
  <Portal>
    <Dialog
      visible={visible}
      onDismiss={onDismiss}>
      <Dialog.Content>
        {message && <Paragraph>{message}</Paragraph>}
        {children && children}
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={onDismiss}>Cancel</Button>
        <Button onPress={()=>onConfirm()}>Ok</Button>
      </Dialog.Actions>
    </Dialog>
  </Portal>);
}

export default class DialogComp extends React.Component {
  state = {
    visible: false,
  };

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  componentDidMount() {
    const {visible} = this.props;

    if(visible){
      this.setState({visible});
    }

  }

  render() {
    return (
      <View>
        <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Done</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}

export {ConfirmDialog};