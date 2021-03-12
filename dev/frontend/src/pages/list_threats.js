import React from 'react';
import { View, ScrollView, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import {Header} from './header.js'
import {styles} from '../stylesheets/style'
import Item from '../components/item'

class ListThreats extends React.Component {

    state = {
        loading: false,
        selected: null,

        data: [
            {
              id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
              monsterName: "First Item",
              hero: "numero 1",
              dangerLevel: 'Dragon'
            },
            {
              id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
              monsterName: "Second Item",
              hero: "numero 2",
              dangerLevel: 'God'
            },
            {
              id: "58694a0f-3da1-471f-bd96-145571e29d72",
              monsterName: "Third Item",
              hero: "numero 3",
              dangerLevel: 'Wolf'
            },
          ]
    }

    constructor(props) {
        super(props);
    } 

    getData = async () => {

       
    }

    renderItem = ({ item }) => {
        const backgroundColor = item.id === this.state.selected ? "#c8c8c8" : "#8d0000";
    
        return (
        <Item
            item={item}
            onPress={() => {
                this.state.selected = item.id
                Alert.alert(
                    "Informações",
                    ` Nome: ${item.monsterName}
                    \n Rank: ${item.dangerLevel}
                    \n Heroi: ${item.hero} `,
                    [{ text: "OK"}],
                    { cancelable: false }
                  );
              
            }}
            style={{ backgroundColor }}
        />
        );
    };


    render(){      

        if(this.state.loading){
            return(
                <ScrollView>
                    <View style={{marginTop: 200}}>
                        <ActivityIndicator size="large" color="#8d0000" />
                    </View>
                </ScrollView>
            )
        }

        return(
            <View>
                <View style={{height: 50}}>
                    <Header navigation={this.props.navigation}/>  
                </View>
                <View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title}> Exibir Ameaças </Text>
                    </View>
                    <View>
                        <FlatList
                            data={this.state.data}
                            renderItem={(item) => this.renderItem(item)}
                            keyExtractor={(item) => item.id}
                            extraData={this.state.selected}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default ListThreats;

