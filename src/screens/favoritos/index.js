import React from 'react';
import { View,SafeAreaView,Text,StyleSheet} from 'react-native';

export default function Favoritos() {
 return (
   <SafeAreaView style={styles.container}>
     <Text>favoritos</Text>
   </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'red'
    }
})

