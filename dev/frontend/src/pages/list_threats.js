import React from 'react';
import { View, ScrollView, Text, FlatList, ActivityIndicator, Alert } from 'react-native';
import {Header} from './header.js'
import {styles} from '../stylesheets/style'
import Item from '../components/item'

class ListThreats extends React.Component {

    state = {
        loading: false,
        selected: null,

        data: []
    }

    constructor(props) {
        super(props);
    } 

    getData = async () => {

        let data = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }   

        await fetch('http://192.168.1.9:9000/api/threats/list', data)
        .then((response) => response.json())
        .then((responseData) => {

            this.setState({loading: false})
            this.setState({data: responseData})

        }) 
        .catch((err) => {
            this.setState({loading: false})
            Alert.alert(
                "Erro",
                "Não foi possivel realizar essa operação. Tente novamente mais tarde",
                [{ text: "OK"}],
                { cancelable: false }
            )
        })
    }

    renderItem = ({ item }) => {
        const backgroundColor = item._id === this.state.selected ? "#c8c8c8" : "#8d0000";
    
        return (
        <Item
            item={item}
            onPress={() => {
                this.state.selected = item._id
                Alert.alert(
                    "Informações",
                    ` Nome: ${item.monsterName}
                    \n Rank: ${item.dangerLevel}
                    \n Heroi: ${item.hero} 
                    \n Posição: ${item.location.coordinates}`,
                    [{ text: "OK"}],
                    { cancelable: false }
                  );
              
            }}
            style={{ backgroundColor }}
        />
        );
    };

    componentDidMount() {
        this.getData();

        this.focusListener = this.props.navigation.addListener('focus', () => { 
                                    this.getData()
                                }
                            );
    }

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
                            keyExtractor={(item) => item._id}
                            extraData={this.state.selected}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

export default ListThreats;

