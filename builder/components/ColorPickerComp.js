import React from 'react';
import {ScrollView, View, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors, Button, IconButton, Text, Avatar, Searchbar} from 'react-native-paper';


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

        const RoundComp = ({color, size=25, onPress=()=>console.log('pressed me'), ...rest}) => (
        <TouchableOpacity onPress={onPress}>
            <View style={{width:size, height:size, backgroundColor:color}}>
                {/*<Avatar.Text label='' size={size} theme={{colors:{primary:color}}} />*/}
            </View>
        </TouchableOpacity>
)


        //<IconButton onPress={()=>onChange(item[1])} style={{margin:2, backgroundColor:item[1]}} icon="menu" />
        //
        //


        return(
            <ScrollView style={{flex:1}}>

            <Searchbar
                    placeholder="Search"
                    onChangeText={search => { this.setState({ search }); }}
                    value={search}
                />



            {hasData &&
            <FlatList data={data} initialNumToRender={14}
             numColumns={14}
             contentContainerStyle={styles.container}
            columnWrapperStyle={styles.contentWrapper}
            renderItem={({item, index})=><RoundComp onPress={()=>onChange(item[1])} color={item[1]} />}
            keyExtractor={(item,index)=>index.toString()}
            ListEmptyComponent={()=><Empty />} />}
            
            {!hasData &&
            <Text>Nothing was found matching your input</Text>
            }
            </ScrollView>
        )
    }
}

    const styles = StyleSheet.create({
        container: {flex:1, flexDirection:'column', alignContent:"flex-start", flexWrap:"wrap", justifyContent:"flex-start"},
        contentWrapper: {flex:1, flexDirection:'row', alignContent:'center', justifyContent:'space-around'}
        });