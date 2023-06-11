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
    borderTopRightRadius:13,
    borderBottomLeftRadius:3,
    borderTopLeftRadius:35,
    borderBottomRightRadius:35,
    

    
    
  },
  logo:{
    fontSize:18,
    fontWeight:'bold',
    color:'#FFF',
    
  }
})