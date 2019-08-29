import React from 'react';
import {ScrollView, View, FlatList} from 'react-native';
import {Colors, Button, IconButton, Text, Searchbar} from 'react-native-paper';


export default class ColorPickerComp extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            selected: '',
            search: ''
        }        
    }



    filteredData(){

        const {search} = this.state;
        const colorList = Object.entries(Colors);

        //console.log(Object.entries(Colors));

        if(search===""){
            return colorList;
        }else{
            const filtered =  colorList.filter(item => item[0].indexOf(search.toLowerCase()) !== -1);

            return filtered || [];
        }

    }

    onChange(value){

        const {hide, handleChange, ...rest} = this.props;

        this.setState({selected:value});

        console.log({value});

        if(handleChange){
            handleChange({...rest, value});
        }

        if(hide){
            hide();
        }
        
        
    }

    render(){

        const {hide} = this.props;
        const {search, selected} = this.state;
        const onChange = this.onChange.bind(this);

        const data = this.filteredData() || [];

        const hasData = data.length > 0;

        //console.log(hasData, typeof data)

        return(
            <ScrollView style={{flex:1}}>

            <Searchbar
                    placeholder="Search"
                    onChangeText={search => { this.setState({ search }); }}
                    value={search}
                />

            {hasData &&
            <FlatList data={data} initialNumToRender={10} numColumns={10}
            contentContainerStyle={{}}
            columnWrapperStyle={{flex:1, height:50, flexDirection:'row', backgroundColor:'pink', alignContent:'center', justifyContent:'space-around'}}
            renderItem={({item, index})=><IconButton onPress={()=>onChange(item[1])} style={{margin:2, backgroundColor:item[1]}} icon="menu" />}
            keyExtractor={(item,index)=>index.toString()}
            ListEmptyComponent={()=><Empty />} />}
            
            {!hasData &&
            <Text>Nothing was found matching your input</Text>
            }

                <Button onPress={()=>hide()} mode="outlined">This is just the beginning</Button>
            </ScrollView>
        )
    }
}