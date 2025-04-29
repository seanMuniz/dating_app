import { TouchableOpacity , Text, StyleSheet} from "react-native";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const NextBtn = ({onPress}) => {
    return (
        <TouchableOpacity style={styles.nextBtn} onPress={onPress}>
            <Text style={styles.textBtn}>Next</Text>
            <MaterialIcons name="navigate-next" size={24} color="white" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    nextBtn: {
        flexDirection: "row", 
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%",
        paddingVertical: 12,
        borderRadius: 20,
        marginTop: 20,
        backgroundColor: "#cbb2ff",
        marginBottom: 10,
    },
    textBtn:{
        textAlign: 'center',
        color: 'white'
    }
})

export default NextBtn;