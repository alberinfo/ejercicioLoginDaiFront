import axios from "axios";
import { useContext, useEffect } from "react";
import { View, StyleSheet } from "react-native-web";
import userContext from "../../context";

function Home() {
    const context = useContext(userContext);

    const [pelo, setPelo] = useContext();
    const [amigos, setAmigos] = useContext();

    useEffect(() => {
        const callerFunc = async () => {
            const resp = await axios.get(`http://localhost:8080/perfil/${context.usuario.name}`, {headers: {'Authorization': context.usuario.sessionId}});
            context.setPerfil(resp.data);
            console.log("RespData", resp.data);
        }

        callerFunc();
    }, []);

    async function handle() {
        try {
            const resp = await axios.post("http://localhost:8080/perfil", {
                
            })
        }
    }

    let shouldPost = !(typeof context.perfil === "object")

    return (
        <View style={styles.container}>
            {
                shouldPost ?
                <View>
                    <h1>Ingresa los datos de tu perfil!</h1>
                    <br/>
                    <TextInput placeholder="Tu color de pelo" onChangeText={(pelo) => setPelo(pelo)}/>
                    <TextInput placeholder="Cuantos amigos tenes?" onChangeText={(amigos) => setAmigos(amigos)} />
                    <Button title="Enviar" onPress={handle}/>
                </View>
                :
                <View>
                    <h2>Color de pelo: {context.perfil.colorDePelo}</h2>
                    <h2>Cantidad de amigos: {context.perfil.cantAmigos}</h2>
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