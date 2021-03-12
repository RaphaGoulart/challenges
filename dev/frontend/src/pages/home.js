import React from 'react';
import { View, ScrollView, Text,  Button} from 'react-native';
import {Header} from './header.js'
import {styles} from '../stylesheets/style'

class Home extends React.Component {

    constructor(props) {
        super(props);
    } 

    render(){

        return(
            <ScrollView>
                <View >
                    <Header navigation={this.props.navigation}/>  
                </View>

                <View style={styles.textContainer}>
                    <Text style={styles.title}> Home </Text>
                </View>

                <View>

                    <View style={styles.buttonContainer}> 
                        <Button style={styles.button} 
                        onPress={() => this.props.navigation.navigate('Cadastro')}
                        color={styles.button.backgroundColor} title="Cadastro de Heróis"></Button>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} 
                        onPress={() => this.props.navigation.navigate('Exibir e editar Heróis')}
                        color={styles.button.backgroundColor} title="Exibir e editar Heróis"></Button>
                    </View>

                    <View style={styles.buttonContainer}>
                        <Button style={styles.button} 
                        onPress={() => this.props.navigation.navigate('Exibir Ameaças')}
                        color={styles.button.backgroundColor} title="Exibir Ameaças"></Button>
                    </View>

                </View>

            </ScrollView>
        )
    }
}

export default Home;

