import React, {useState} from 'react';
import {View, Text} from 'react-native';
import { Searchbar, Button, IconButton, Avatar, List, Card } from 'react-native-paper';
import {default as Box} from '../../layouts/ResponsiveBox';
import componentRegister, {componentSchema} from '../containers/_componentRegister';
import AccordionGroup from './AccordionGroupComp';


const wrapperStyle = { margin:2, padding:2, borderWidth: 0.5, borderColor: 'green'}

//<View style={{width:25, height:25, margin:5, backgroundColor:'yellow', position:"relative", top:-25}}></View>
//ref={ref => this.makeStoreRef(ref)}

export const EditorButton = ({icon='add-circle-outline', onPress}) => <IconButton icon={icon} onPress={onPress} />


export const EditorWrapper = ({children, style=wrapperStyle, ...rest}) => (
                                                                    <View style={style}>
                                                                        {children}
                                                                    </View>)

    const getGroups = (blocks)=> {
        
        let groupCollection = [];

        //console.log({blocks});

        /**/
        blocks.forEach( obj => {

            let {group="Others"} = obj;

            if(!groupCollection.includes(group)){
                groupCollection.push(group)
            }
        });
        
        return groupCollection;
    }

    const getGroupObjects = (data) => {

        let groupObject = {};

        let groups = getGroups(data);

        groups.forEach(group => {

            let grouped = data.filter(o=> o.group === group);

            if(grouped.length > 0){
                groupObject[group] = grouped;                
            }

        });

        //get ungrouped data

        let ungrouped = data.filter(o=> !!o.group === false);
        if(ungrouped.length > 0){
            groupObject["Others"] = ungrouped;                
        }


        return groupObject;

    }

    const SingleBlock = ({name, icon}) => {

        icon = icon || componentSchema.icon;

        let {width} = Box.getScreen();

        width = width / 3.5;

//<View style={{width:100, height:100, margin:2, padding:5, backgroundColor:'yellow', alignContent:'center', justifyContent:'center'}}></View>
        return  <Card style={{margin:2, width}}>
                    <Card.Content>
                        <List.Icon style={{alignSelf:'center'}} icon={icon} />
                        <Text style={{textAlign:'center'}}>{name}</Text>                               
                    </Card.Content>            
                </Card>
        
    }

    const AllBlocks = ({data}) => {

        let blocks = data.map((block, index) => {
            let {name} = block;
            
            return (<SingleBlock key={`block-${index}`} name={name} />);
        })
//, backgroundColor:'#fff'
        return (
        <View>
            <Box style={{pWidth:100, flexDirection:'row', alignContent:'flex-start', justifyContent:'flex-start'}}>
                {blocks}                
            </Box>
        </View>);
    }

    const BlockAccordion = ({data}) => {
        const style = {backgroundColor:"#ddd",  marginTop:5};

        const accordionData = [];
        //


        const groupObjects = getGroupObjects(data);

        const groupArray = Object.entries(groupObjects);
        
        //console.log({groupObjects})
/**/
        groupArray.forEach(group => {
            const [title, blocks] = group;
        
            accordionData.push({title, style, render:()=><AllBlocks data={blocks} />});
        })

        

        //accordionData.push({title:'More', style});

        return (<AccordionGroup data={accordionData} />)
    }

    export const ContentBlock = ({onDismiss}) => {

        const [search, setSearch] = useState("");

        const components = Object.values(componentRegister);

        var data;

        if(search !== ""){

            data = components.filter(comp => {
                let {name="", description=""} = comp;

                let n = name.toLowerCase();
                let s = search.toLowerCase();
                let d = description.toLocaleLowerCase();

                //console.log(search, name);

                return n.includes(s) || d.includes(s);
            });

        }else{
            data = components;
        }

        return (
            <Box style={{pWidth:100, pHeight:100, paddingTop:30 }}>
                <Searchbar placeholder="Search"
                        onChangeText={query => { setSearch( query ); }}
                        value={search}
                    />
                <BlockAccordion data={data} />
            </Box>
        )
    }



    const ComponentBuilderComp = ({children}) => {


        return null;
    }