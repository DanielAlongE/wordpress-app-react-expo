import React from 'react';
import {ScrollView, View, FlatList} from 'react-native';
import {Button, IconButton, Text, Searchbar} from 'react-native-paper';
import iconList from '../containers/_iconList';


export default class IconPickerComp extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            selected: '',
            search: ''
        }        
    }

    filteredData(){

        const {search} = this.state;

        if(search===""){
            return iconList;
        }else{
            const filtered =  iconList.filter(item => item.indexOf(search.toLowerCase()) !== -1);

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
            renderItem={({item, index})=><IconButton size={30} onPress={()=>onChange(item)} style={{margin:2, backgroundColor:'#ddd'}} icon={item} />}
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