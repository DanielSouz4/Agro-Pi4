import { View,Text,StyleSheet} from 'react-native';
 
export  function  Logo() {
 return (
   <View style={Styles.logoArea}>

    <Text style={Styles.logo}>AgroDigital</Text>
    
   </View>

  );
}


const Styles = StyleSheet.create({
  logoArea:{
    backgroundColor: '#4cbe6c',
    alignSelf:'flex-start',
    padding:8,
    paddingLef:20,
    paddingRight:16,
    borderTopRightRadius:8,
    borderBottomLeftRadius:8,
    borderTopLeftRadius:8,
    borderBottomRightRadius:32,
    
    
  },
  logo:{
    fontSize:18,
    fontWeight:'bold',
    color:'#FFF',
    
  }
})