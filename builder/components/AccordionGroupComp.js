import * as React from 'react';
import {View, Text} from 'react-native';
import { List } from 'react-native-paper';

class AccordionGroupComp extends React.PureComponent {
  state = {
    expanded: -1
  }

  open = this.handleOpen.bind(this);

  handleOpen(active){
    const {expanded} = this.state;

    active = expanded === active ? -1 : active;

    this.setState({
      expanded:active
    });
}

componentWillMount() {
  const {active} = this.props;

  if(active){
    handleOpen(active);
  }
}


    generateAccordion(data=[]){
        //const data = items;

        const result = data.map((item, index) => {

            const {render:Comp=()=>null, ...rest} = item;
            const {expanded} = this.state;
            const active = expanded === index;
            const {open} = this;

            return (
            <List.Accordion key={`item-${index}`} expanded={active}
            onPress={()=>this.handleOpen(index)} {...rest} >
                {active && <Comp handleOpen={open} />}
            </List.Accordion>
            );
        })

    return result;
    }

  render() {

    const data = this.props.data || [];

    const style = this.props.style || {};

    const accordion = this.generateAccordion(data);

    return (
      <View style={style}>
        {accordion}
      </View>
    );
  }
}

export default AccordionGroupComp;