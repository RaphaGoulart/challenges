import React from 'react';
import { View, ScrollView, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import {Header} from './header.js'
import {styles} from '../stylesheets/style'

class NewUser extends React.Component {

    state = {
        nome: '',
        email: '',
        login: '',
        password: '',

        loading: false
    }

    constructor(props) {
        super(props);
    } 

    handleSubmit = async () => {

        if(this.state.nome == '' || this.state.email == '' || this.state.login == '' || this.state.senha == ''){
            Alert.alert(
                "Campo em branco",
                "Para realizar o cadastro todos os campos devem ser preenchidos!",
                [{ text: "OK"}],
                { cancelable: false }
            )
        }

        else{
            var message  = {
                'name': this.state.nome,
                'email': this.state.email,
                'login': this.state.login,
                'password': this.state.password,
            }

            this.setState({loading: true})
            
            let data = {
                method: 'POST',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message)
            }

            await fetch('http://192.168.1.9:9000/api/users/new', data)
                    .then(response => {
                        this.setState({loading: false})

                        if(response.status==200){
                            Alert.alert(
                                "Enviado",
                                "Cadastro realizada com sucesso!",
                                [{ text: "OK"}],
                                { cancelable: false }
                            )

                            this.props.navigation.navigate('Login')
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
               <View style={styles.header}>
                    <View style={styles.headerContainer}>  
                        <Text style={styles.headerTitle}>iHero</Text>
                        <Text style={styles.headerSubTitle}>Dev Challenge</Text>
                    </View>         
                </View>
        

                <View style={styles.textContainer}>
                    <Text style={styles.title}> Cadastro de Usuário </Text>
                </View>

                <View>

                    <Text> Nome </Text>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={text => this.setState({nome: text})}
                        value={this.state.nome}
                    />

                    
                    <Text> E-mail </Text>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={text => this.setState({email: text})}
                        value={this.state.email}
                    />

                    <Text> Login </Text>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={text => this.setState({login: text})}
                        value={this.state.login}
                    />

                    <Text> Senha </Text>
                    <TextInput
                        style={styles.inputContainer}
                        onChangeText={text => this.setState({password: text})}
                        value={this.state.password}
                    />

                    <Button style={styles.button} 
                    onPress={() => this.handleSubmit()}
                    color={styles.button.backgroundColor} title="Enviar"></Button>

                </View>

            </ScrollView>
        )
    }
}

export default NewUser;

