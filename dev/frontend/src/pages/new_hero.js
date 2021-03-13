import React from 'react';
import { View, ScrollView, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import { Icon } from 'react-native-elements';
import {Header} from './header.js'
import {styles} from '../stylesheets/style'

class NewHero extends React.Component {

    state = {
        name: '',
        class: '',
        lat: '',
        lng: '',

        loading: false
    }

    constructor(props) {
        super(props);
    } 

    handleSubmit = async () => {

        if(this.state.name == '' || this.state.class == '' || this.state.lat == '' || this.state.lng == ''){
            Alert.alert(
                "Campo em branco",
                "Para realizar o cadastro todos os campos devem ser preenchidos!",
                [{ text: "OK"}],
                { cancelable: false }
            )
        }

        else{
            var message  = {
                'name': this.state.name,
                'class': this.state.class,
                'location':[{
                    'lat': this.state.lat,
                    'lng': this.state.lng
                }]
            }

            this.setState({loading: true})
            
            let data = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            }   
            await fetch('http://192.168.1.9:9000/api/heroes/new', data)
                    .then(response => {

                        this.setState({loading: false})

                        if(response.status==200){
                            
                            this.setState({name: '', class: '', lat: '', lng: ''})

                            Alert.alert(
                                "Enviado",
                                "Cadastro realizada com sucesso!",
                                [{ text: "OK"}],
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
    }

    render(){

        if(this.state.loading){
            return(
                <ScrollView>
                    <View>
                        <Header navigation={this.props.navigation}/>  
                    </View>
                    <View style={{marginTop: 200}}>
                        <ActivityIndicator size="large" color="#8d0000" />
                    </View>
                </ScrollView>
            )
        }

        return(
            <ScrollView>
                <View >
                    <Header navigation={this.props.navigation}/>  
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}> Cadastro de Heróis </Text>
                </View>

                <View>

                    <Text> Class </Text>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={text => this.setState({class: text})}
                        value={this.state.class}
                    />

                    <Text> Nome </Text>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={text => this.setState({name: text})}
                        value={this.state.name}
                    />

                    
                    <Text> Latitude </Text>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={text => this.setState({lat: text})}
                        value={this.state.lat}
                    />

                    <Text> Longitude </Text>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={text => this.setState({lng: text})}
                        value={this.state.lng}
                    />

                    <Button style={styles.button} 
                    onPress={() => this.handleSubmit()}
                    color={styles.button.backgroundColor} title="Enviar"></Button>

                </View>

            </ScrollView>
        )
    }
}

export default NewHero;