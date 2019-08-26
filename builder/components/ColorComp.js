import React from 'react';
import {  View, ScrollView, StyleSheet } from 'react-native';
import { Colors, Text } from 'react-native-paper';
import {default as Box} from '../../layouts/ResponsiveBox';

const ColorComp = () => {

    /**
<FlatList data={data} initialNumToRender={10} numColumns={4}
            contentContainerStyle={{}}
            columnWrapperStyle={{flex:1, flexDirection:'row', backgroundColor:'pink', justifyContent:'space-between'}}
            renderItem={({item})=><CardProducts item={item} navigation={navigation} />}
            keyExtractor={(item,index)=>index.toString()}
            ListEmptyComponent={()=><Empty />} />
     */
    

    const keys = Object.keys(Colors);

    const showColor = keys.map(key => <Box key={key} style={{backgroundColor:Colors[key], pWidth:20, pHeight:10, margin:5}}>
        <Text>{key}</Text>
        </Box>);

    console.log('count', showColor.length);
    
/*    for(key in Colors){
        showColor.push(
            
        );
    }
*/
    //
    return (
        <ScrollView style={{flex:1}}>
            <Box style={{flex:1, flexDirection:'row', flexWrap:'wrap', backgroundColor:'yellow'}}>
                {showColor}
            </Box>
        </ScrollView>
    );
}

export default ColorComp;