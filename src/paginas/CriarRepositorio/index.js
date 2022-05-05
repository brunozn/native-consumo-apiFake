import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';
import estilos from './estilos';

import { criarRepositoriosDoUsuario } from '../../servicos/requisicoes/repositorios';

export default function CriarRepositorio({ route, navigation }) {
    const [nome, setNome] = useState('');
    const [data, setData] = useState('');

    async function criarRepo(){
        const resul = await criarRepositoriosDoUsuario(
            route.params.id,
            nome, 
            data,
        );
        if(resul === 'sucesso'){
            Alert.alert('Repositorio criado');
            navigation.goBack();
        }
        else{
            Alert.alert('ERROR ao criar');
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
            <TouchableOpacity style={estilos.botao}
            onPress={criarRepo}
            >
                <Text style={estilos.textoBotao}>
                    Criar
                </Text>
            </TouchableOpacity>
        </View>
    );
}
