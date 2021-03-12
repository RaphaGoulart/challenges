import React from 'react';
import { Text,  View} from 'react-native';
import { Icon } from 'react-native-elements';

import {styles} from '../stylesheets/style'


export class Header extends React.Component{

    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={styles.header}>
                
                <Icon
                    name="bars"
                    type='font-awesome'
                    color='white'
                    size={25}
                    containerStyle={styles.drawerIcon}
                    onPress={() => {
                        this.props.navigation.toggleDrawer()
                    }}
                />

                <View style={styles.headerContainer}>  
                    <Text style={styles.headerTitle}>iHero</Text>
                    <Text style={styles.headerSubTitle}>Dev Challenge</Text>
                </View>
            </View>
        )

    }
}
