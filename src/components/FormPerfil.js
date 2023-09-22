import axios from "axios";
import { useContext, useState } from "react";
import { Button, TextInput, View } from "react-native-web";
import userContext from '../../context';

export default function FormPerfil() {
    const context = useContext(userContext);

    const [pelo, setPelo] = useState();
    const [amigos, setAmigos] = useState();

    async function handle() {
        try {
            const resp = await axios.post("http://localhost:8080/perfil", {username: context.usuario.name, perfil: {colorDePelo: pelo, cantAmigos: amigos}}, {headers: {'Authorization': context.usuario.sessionId}});
            context.setReload(true);
        } catch (err) {
            console.log(err);
            return err;
        }
    }

    return (
        <View>
            <h1>Ingresa los datos de tu perfil!</h1>
            <br/>
            <TextInput placeholder="Tu color de pelo" onChangeText={(pelo) => setPelo(pelo)}/>
            <TextInput placeholder="Cuantos amigos tenes?" onChangeText={(amigos) => setAmigos(amigos)} />
            <Button title="Enviar" onPress={handle}/>
        </View>
    )
}