import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { View, StyleSheet, TextInput, Button } from "react-native-web";
import userContext from "../../context";
import FormPerfil from "./FormPerfil";

function Home() {
    const navigation = useNavigation();

    const context = useContext(userContext);

    const [shouldPost, setShouldPost] = useState();

    useEffect(() => {
        const callerFunc = async () => {
            const resp = await axios.get(`http://localhost:8080/perfil/${context.usuario.name}`, {headers: {'Authorization': context.usuario.sessionId}});
            context.setPerfil(resp.data);
            setShouldPost(!(typeof resp.data === "object"));
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
                    <h1>Bienvenido {context.usuario.name}</h1>
                    <h2>Color de pelo: {context.perfil.colorDePelo}</h2>
                    <h2>Cantidad de amigos: {context.perfil.cantAmigos}</h2>
                    <Button  title="Update" onPress={() => {setShouldPost(true); navigation.navigate("FormUpdatePerfil")}}/>
                </View>
            }
        </View>
    );
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