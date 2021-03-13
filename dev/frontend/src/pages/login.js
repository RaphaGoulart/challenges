import React from 'react';
import { View, ScrollView, Text, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import {styles} from '../stylesheets/style'

class Login extends React.Component {

    state = {
        login: '',
        password: '',

        loading: false
    }

    constructor(props) {
        super(props);
    } 

    handleSubmit = async () => {

        if(this.state.login == '' || this.state.senha == ''){
            Alert.alert(
                "Campo em branco",
                "É necessário preencher todos os campos",
                [{ text: "OK"}],
                { cancelable: false }
            )
        }

        else{
            var message  = {
                'login': this.state.login,
                'password': this.state.password,
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
            
            await fetch('http://192.168.1.9:9000/api/auth/login', data)
                    .then((response) => response.json())
                    .then((responseData) => {
                        this.setState({loading: false})
                        
                        if(responseData.auth){
                            this.props.navigation.navigate('Drawer', {screen: 'Home'})
                        }
                        else{
                            Alert.alert(
                                "Erro",
                                "Usuário ou senha incorretos!",
                                [{ text: "OK"}],
                                { cancelable: false }
                            )
                        }

                    }) 
                    .catch((err) => {
                        console.log(err)
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
                    <Text style={styles.title}> Login </Text>
                </View>

                <View>

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

                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} 
                            onPress={() => this.handleSubmit()}
                            color={styles.button.backgroundColor} title="Enviar">
                        </Button>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} 
                            onPress={() =>  this.props.navigation.navigate('NewUser')}
                            color={styles.button.backgroundColor} title="Cadastre-se">    
                        </Button>
                    </View>
                </View>

            </ScrollView>
        )
    }
}

export default Login;

