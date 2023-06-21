import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';


const SobreScreen = () => {
  const [selectedCreator, setSelectedCreator] = useState(null);

  const handleCreatorPress = (id) => {
    setSelectedCreator(id === selectedCreator ? null : id);
  };

  const creators = [
    {
      id: 1,
      name: 'Aneilson Rocha',
      description: 'Responsável pelo front-end e documentação do projeto.',
      image: 'https://img.freepik.com/vetores-gratis/ilustracao-de-gradiente-lo-fi_23-2149375749.jpg?w=740&t=st=1687216991~exp=1687217591~hmac=6586902ae5e8372b5d732bfc2f14e32cd993a6c5d6f8b9c7ebf184b82c93b128',
    },
    {
      id: 2,
      name: 'Daniel Souza Ferreira',
      description: 'Responsável pelo back-end.',
      image: 'https://img.freepik.com/vetores-gratis/ilustracao-de-gradiente-lo-fi_23-2149375749.jpg?w=740&t=st=1687216991~exp=1687217591~hmac=6586902ae5e8372b5d732bfc2f14e32cd993a6c5d6f8b9c7ebf184b82c93b128',
    },
    {
      id: 3,
      name: 'Ismael Souze Ferreira',
      description: 'Responsável pel front-end e prototipação.',
      image: 'https://img.freepik.com/vetores-gratis/ilustracao-de-gradiente-lo-fi_23-2149375749.jpg?w=740&t=st=1687216991~exp=1687217591~hmac=6586902ae5e8372b5d732bfc2f14e32cd993a6c5d6f8b9c7ebf184b82c93b128',
    },
  ];

  return (

    
    <View style={styles.container}>
      <View style={{backgroundColor: "#4cbe6c", width: 210, height: 40, borderBottomRightRadius: 30, alignItems: 'center', justifyContent: 'center'}}>
      <Text style={{textAlign: 'center', color: '#fff', fontSize: 18}} >Agro - Mercado Digital</Text>
      </View>
        <Text style={{padding: 20, fontWeight: '600', fontSize: 14}}>
            {'    '}Agro Mercado digital é uma plataforma que tem como objetivo aproximar o pequeno agricultor do
            consumidor final, atuando como uma vitrine, 
            onde o pequeno agricultor pode anunciar seus produtos cultivados, 
            e assim serem comprados diretamente pelo o cliente final.
        </Text>

        <Text style={{padding: 20, fontSize: 14, fontWeight: '800'}}>
            Aplicativo desenvolvido por: 
        </Text>

      {creators.map((creator) => (
        <TouchableOpacity
          key={creator.id}
          style={styles.profileContainer}
          onPress={() => handleCreatorPress(creator.id)}
        >
          <Image source={{ uri: creator.image }} style={styles.profileImage} />
          {selectedCreator === creator.id && (
            <View style={{backgroundColor: '#4cbe6c', borderTopRightRadius: 16, borderBottomRightRadius: 16}}>
              <Text style={styles.profileText}>{creator.name}</Text>
              <Text style={styles.profileDescription}>
                {creator.description}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',

  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flexDirection: 'row',
    marginVertical: 20
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 75,
    marginBottom: 0,
    borderWidth: 3,
    borderColor: '#4cbe6c'
  },
  profileText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginBottom: 0,
    marginHorizontal: 10,
    fontWeight: 'bold'
  },
  profileDescription: {
    fontSize: 11,
    textAlign: 'center',
    marginHorizontal: 10,
    paddingleft: 40,
    fontWeight: '600',
    paddingBottom: 3
    
  },
});

export default SobreScreen;
