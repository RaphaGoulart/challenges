import { StyleSheet, Dimensions} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var styles = StyleSheet.create({
   buttonContainer: {
       margin: 5,
       justifyContent: 'space-between'
   },
   button: {
       	color: '#8b0000',
       	margin: 5,
       	backgroundColor: '#8b0000',
   },
   subtitle: {
       fontWeight: "bold",
       marginBottom: 5
   },
   subtitleCenter: {
        fontWeight: "bold",
        marginBottom: 5, 
        textAlign: "center"
    },
   title: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
    },
   titleContainer: {
        margin: 10
   },
   textContainer: {
         margin: 15
   },
   inputContainer: {
        borderBottomColor: 'gray', 
        borderBottomWidth: 1,
        height: 50, 
        margin: 10
    },
    drawerIcon: {
        paddingTop: 6, 
        marginLeft: 5
    },
    header:{
        paddingTop: 5,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#cecece',
        width: windowWidth
    },
    headerTitle: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white'
    },
    headerSubTitle: {
        fontSize: 15,
        textAlign: 'center',
        color: 'white'
    },
    headerContainer: {
        justifyContent: 'center', 
        alignItems: 'center', 
        marginRight: 5,
        width: windowWidth - 20
    },
    listItem: {
        fontSize: 18,
        textAlign: "center",
        color: 'white'
    },
    itemContainer: {
        margin: 5,
        justifyContent: 'space-between',
        color: 'white'
    }
});

export {styles};