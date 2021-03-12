import React from 'react';
import { View, ScrollView, Text, FlatList, ActivityIndicator, Alert, TextInput, Button } from 'react-native';
import {Header} from './header.js'
import {styles} from '../stylesheets/style'

import Item from '../components/item'


class ListEditHero extends React.Component {

    state = {
        loading: false,
        selected: null,
        editing: false,

        selectID: '',
        selectClass: '',
        selectName: '',
        selectLat: '',
        selectLng: '',

        data: [
            {
              id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
              name: "First Item",
              class: 'A'
            },
            {
              id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
              name: "Second Item",
              class: 'B'
            },
            {
              id: "58694a0f-3da1-471f-bd96-145571e29d72",
              name: "Third Item",
              class: 'C'
            },
        ]
    }

    constructor(props) {
        super(props);
    } 

    getData = async () => {

       
    }

    handleSubmit = async () => {

    }

    renderItem = ({ item }) => {
        const backgroundColor = item.id === this.state.selected ? "#c8c8c8" : "#50508d";
    
        return (
        <Item
            item={item}
            onPress={() => {
                this.state.selected = item.id
                Alert.alert(
                    "Informações",
                    ` Nome: ${item.name} 
                    \n Classe: ${item.class} `,
                    [
                      {
                        text: 'Remover',
                        onPress: () => {
                        }
                      },
                      {
                        text: 'Editar',
                        onPress: () => {
                            this.setState({selected: null})
                            this.setState({selectID: item.id})
                            this.setState({selectClass: item.class})
                            this.setState({selectName: item.name})
                            this.setState({selectLat: item.lat})
                            this.setState({selectLng: item.lng})
                            this.setState({editing: true})
                        },
                      },
                      { text: "OK"}],
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

        if(this.state.editing){
            return(
                <ScrollView>
                    <View >
                        <Header navigation={this.props.navigation}/>  
                    </View>

                    <View style={styles.textContainer}>
                        <Text style={styles.title}> Edição de Herói</Text>
                    </View>

                    <View>

                        <Text> Class </Text>
                        <TextInput
                            style={styles.inputContainer}
                            onChangeText={text => this.setState({selectClass: text})}
                            value={this.state.selectClass}
                        />

                        <Text> Nome </Text>
                        <TextInput
                            style={styles.inputContainer}
                            onChangeText={text => this.setState({selectName: text})}
                            value={this.state.selectName}
                        />

                        
                        <Text> Latitude </Text>
                        <TextInput
                            style={styles.inputContainer}
                            onChangeText={text => this.setState({selectLat: text})}
                            value={this.state.selectLat}
                        />

                        <Text> Longitude </Text>
                        <TextInput
                            style={styles.inputContainer}
                            onChangeText={text => this.setState({selectLng: text})}
                            value={this.state.selectLng}
                        />

                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} 
                            onPress={() => this.handleSubmit()}
                            color={styles.button.backgroundColor} title="Enviar"></Button>
                        </View>

                        <View style={styles.buttonContainer}>
                            <Button style={styles.button} 
                            onPress={() => this.setState({editing: false})}
                            scolor={styles.button.backgroundColor} title="Cancelar"></Button>
                        </View>
                    </View>

                </ScrollView>
            )
        }

        return(
            <View>
                <View  style={{height: 50}}>
                    <Header navigation={this.props.navigation}/>  
                    </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}> Exibir e editar Heróis </Text>
                        </View>
                        <View>
                        <FlatList
                            data={this.state.data}
                            renderItem={(item) => this.renderItem(item)}
                            keyExtractor={(item) => item.id}
                            extraData={this.state.selected}
                        />
                    </View>
                    <View>  
                </View>
            </View>
        )
    }
}

export default ListEditHero;

