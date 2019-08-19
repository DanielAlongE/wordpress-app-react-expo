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

const SimpleModal = ({title, children, visible, onDismiss}) => (
    <Portal>

      <Modal visible={visible} onDismiss={onDismiss}>
      <View>
          <Box style={{marginTop:30,pWidth:100, pHeight:100}}>
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

        console.log("MyModal", {old:this.props.open, new:nextProps.open});
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

class FabGroup extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
      open: false,
    };
  
    render() {

        const {fab} = this.props;

      return (
        <View>
            <Portal>
             <FAB.Group
               open={this.state.open}
               icon={this.state.open ? 'today' : 'add'}
               actions={[
                 { icon: 'add', onPress: () => console.log('Pressed add') },
                 { icon: 'star', label: 'Star', onPress: () => console.log('Pressed star')},
                 { icon: 'email', label: 'Email', onPress: () => console.log('Pressed email') },
                 { icon: 'wifi', label: 'Remind', onPress: () => console.log('Pressed notifications') },
               ]}
               onStateChange={({ open }) => this.setState({ open })}
               onPress={() => {
                 if (this.state.open) {
                   // do something if the speed dial is open
                 }
               }}
               {...fab}
             />
            </Portal>
        </View>
      );
    }
  }

const FabMenu = ({onPress}) => (
<View style={styles.fab}>
    <FAB
        small
        icon="add"
        onPress={() => {console.log('Pressed'); onPress()}}
    />    
</View>

);

const MenuList = ({items}) => {

    const showList = items.map((menu, index)=>{

        return <List.Item key={`menu-${index}`} title={menu.name} />
    })

    return (
    <View style={{marginLeft:10}}>
        {showList}
    </View>)
}


const MenuTab = ({data}) => {

    const menus= Object.entries(data);

    //console.log(menus);

    const showMenu = menus.map((menu, index)=>{

        const [title, items] = menu;

        return (
        <List.Accordion key={`list-${index}`} title={title.replace('_', ' ')}>
            <MenuList items={items} />
        </List.Accordion>
      )
    })

    return (
        <View>
            {showMenu}
        </View>
    )
}

const AddFromCategories = ({categories, addMenuItem}) => {

    const showList = categories.map((item, i)=>{

        const menu = {type:'wp_posts', name:item.name, id:item.id}

        return <Button key={`btn-${i}`} mode="outlined" onPress={()=>addMenuItem(menu)}>
            {item.name}
        </Button>
    })

    return <View style={{backgroundColor:'green'}}>
        {showList}
    </View>

}

const AppMenusComp = ({handleChange, state, toggleModal, visible, addMenuItem, categories}) => {

    const menus = state.menus || {}

    //wordpressUrl
    const url = state.url || '';

    const args = {handleChange, state};

    return (
        <View style={{flex:1, marginTop:30}}>
            <ScrollView style={{flex:1}}>

                <MenuTab data={menus} />

                <Button onPress={()=>addMenuItem({name:'Old menu'})}>Add Menu Item</Button>

                <SimpleModal title="Add Menu Items" visible={visible} onDismiss={toggleModal}>
                    <AddFromCategories addMenuItem={addMenuItem} categories={categories} />
                </SimpleModal>                
            
            </ScrollView>
            <FabMenu onPress={toggleModal} />
        </View>
        );

}

const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
  })

export default AppMenusComp;