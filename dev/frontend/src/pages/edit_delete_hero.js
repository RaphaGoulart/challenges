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

        await fetch('http://192.168.1.9:9000/api/heroes/list', data)
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

    handleSubmit = async () => {
        
        var message  = {
            'name': this.state.selectName,
            'class': this.state.selectClass,
            'location': [{
                'lat': this.state.selectLat,
                'lng': this.state.selectLng
            }]
        }

        this.setState({loading: true})
        
        let data = {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        }          
        await fetch(`http://192.168.1.9:9000/api/heroes/edit/${this.state.selectID}`, data)
                .then((response) => {
                    this.setState({loading: false})

                    if(response.status==200){
                        Alert.alert(
                            "Enviado",
                            "Edição realizada com sucesso!",
                            [{ text: "OK",
                            onPress: () => {
                                this.getData()

                            }}],
                            { cancelable: false }
                        )

                    }
                    else{
                        Alert.alert(
                            "Erro",
                            "Não foi possivel realizar essa operação. Tente novamente mais tarde",
                            [{ text: "OK"}],
                            { cancelable: false }
                        )
                    }

                    return response.json()
                })
                .then(responseData => {
                    this.setState({ 
                        selectID: responseData._id,
                        selectClass: responseData.class,
                        selectName: responseData.name,
                        selectLat: responseData.location.coordinates[0].toString(),
                        selectLng: responseData.location.coordinates[1].toString(),
                    })
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

    remove = async (id) => {
        this.setState({loading: true})
        
        let data = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }          
        await fetch(`http://192.168.1.9:9000/api/heroes/delete/${id}`, data)
                .then((response) => {
                    this.setState({loading: false})

                    if(response.status==200){
                        Alert.alert(
                            "Enviado",
                            "Herói removido com sucesso!",
                            [{ text: "OK", 
                            onPress: () => {
                                this.getData()
                            }}],
                            { cancelable: false }
                        )

                    }
                    else{
                        Alert.alert(
                            "Erro",
                            "Não foi possivel realizar essa operação. Tente novamente mais tarde",
                            [{ text: "OK"}],
                            { cancelable: false }
                        )
                    }
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

    componentDidMount() {
        this.getData();

        this.focusListener = this.props.navigation.addListener('focus', () => { 
                                    this.getData()
                                }
                            );
    }

    renderItem = ({ item }) => {
        const backgroundColor = item._id === this.state.selected ? "#c8c8c8" : "#50508d";
    
        return (
        <Item
            item={item}
            onPress={() => {
                this.state.selected = item._id
                Alert.alert(
                    "Informações",
                    ` Nome: ${item.name} 
                    \n Classe: ${item.class} 
                    \n Posição: ${item.location.coordinates}
                    \n Alocado: ${item.allocated}`,
                    [
                      {
                        text: 'Remover',
                        onPress: () => {
                            console.log(item._id)
                            this.remove(item._id)
                        }
                      },
                      {
                        text: 'Editar',
                        onPress: () => {
                            this.setState({ selected: null,
                                            selectID: item._id,
                                            selectClass: item.class,
                                            selectName: item.name,
                                            selectLat: item.location.coordinates[0].toString(),
                                            selectLng: item.location.coordinates[1].toString(),
                                            editing: true
                            })
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
                            keyExtractor={(item) => item._id}
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

