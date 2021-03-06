import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';
import {deletarRepositoriosDoUsuario, salvarRepositoriosDoUsuario} from '../../servicos/requisicoes/repositorios';

export default function InfoRepositorio({ route, navigation }) {
    const [nome, setNome] = useState(route.params.item.name);
    const [data, setData] = useState(route.params.item.data);

    async function salvarRepo(){
        const resul = await salvarRepositoriosDoUsuario(
            route.params.item.postId,
            nome, 
            data,
            route.params.item.id
        );
        if(resul === 'sucesso'){
            Alert.alert('Repositorio atualizado');
            navigation.goBack();
        }
        else{
            Alert.alert('ERROR ao atualizar');
        }
    }

    async function deletarRepo(){
        const resul = await deletarRepositoriosDoUsuario(
            route.params.item.id
        );
        if(resul === 'sucesso'){
            Alert.alert('Repositorio deletado');
            navigation.goBack();
        }
        else{
            Alert.alert('ERROR ao deletar');
        }
    }


    return (
        <View style={estilos.container}>
            <TextInput
                placeholder="Nome do repositório"
                autoCapitalize="none"
                style={estilos.entrada}
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                placeholder="Data de criação"
                autoCapitalize="none"
                style={estilos.entrada}
                value={data}
                onChangeText={setData}
            />
            <TouchableOpacity 
                style={estilos.botao} 
                onPress={salvarRepo}
            >
                <Text style={estilos.textoBotao}>
                    Salvar
                </Text>
            </TouchableOpacity>
            <TouchableOpacity 
                onPress={deletarRepo}
                style={[estilos.botao, {backgroundColor: '#DD2B2B', marginTop: 10}]} 
            >
                <Text style={estilos.textoBotao}>
                    Deletar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
