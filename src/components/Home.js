import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native-web";
import userContext from "../../context";
import FormPerfil from "./FormPerfil";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import firebaseApp from "../../firebaseConfig";

const database = getFirestore(firebaseApp);

function Home() {
    const navigation = useNavigation();

    const context = useContext(userContext);

    const [shouldPost, setShouldPost] = useState(true);

    useEffect(() => {
        const callerFunc = async () => {
            try {
                const resp = await getDoc(doc(database, "perfil", context.usuario.uid));
                
                context.setPerfil({...resp.data()});

                if(resp.data().username.length === 0) {
                    setShouldPost(true)
                } else {
                    setShouldPost(false);
                }
            } catch (e) {
                return;
            }
        }

        callerFunc();
    }, [context.reloadPage]);

    return (
        <View style={styles.container}>
            {
                shouldPost ?
                <FormPerfil></FormPerfil>
                :
                <View>
                    <h1>Bienvenido {context.perfil.username}</h1>
                    <h2>Color de pelo: {context.perfil.colorDePelo}</h2>
                    <h2>Cantidad de amigos: {context.perfil.cantAmigos}</h2>
                    <Button title="Update" onPress={() => {setShouldPost(true); navigation.navigate("FormPerfil")}}/>
                </View>
            }
        </View>
    );
    return (<>lmao</>);
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }
})

export default Home;