import React from 'react';
import { View, Text,  TouchableOpacity} from 'react-native';
import {styles} from '../stylesheets/style'

const Item = ({ item, onPress, style }) => (
    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
            <Text style={styles.listItem}>{item.name || item.monsterName}</Text>
        </TouchableOpacity>
    </View>
);

export default Item;