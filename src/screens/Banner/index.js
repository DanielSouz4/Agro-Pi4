import React from "react";
import { Dimensions, Alert} from 'react-native';


  var {height, width } = Dimensions.get('window');

import {SliderBox} from 'react-native-image-slider-box';

export default function Banners (){


    const images = [
        'https://img.freepik.com/fotos-gratis/homem-cuidando-de-seu-close-up-de-fazenda_23-2148580028.jpg?w=740&t=st=1682512287~exp=1682512887~hmac=8e27bf775ea9826c27ea3a87b6f65e72226e00417c481259e6c5da995512d311',
        'https://img.freepik.com/fotos-gratis/agricultura-inteligente-iot-com-fundo-de-arvore-de-plantio-a-mao_53876-124626.jpg?w=900&t=st=1682511683~exp=1682512283~hmac=fc154b58595a35e704ee02c518d9adbbeecb4e0b38465aee0a53c24fb55f35c5',
        'https://img.freepik.com/fotos-gratis/agricultor-agronomo-senior-trabalhador-no-campo-de-soja-verificando-as-colheitas-antes-da-colheita_342744-1260.jpg?w=740&t=st=1682512409~exp=1682513009~hmac=c6ebafc08c31aa0df456e7c30b1337bbeee4d59f41fea89ecaac9ec891fc5136',
        'https://img.freepik.com/fotos-gratis/vista-inferior-legumes-e-frutas-abobrinha-pimentao-marmelo-tomate-cereja-cumcuat-repolho-limao-romas-alface-kiwi_140725-102911.jpg?w=740&t=st=1682512476~exp=1682513076~hmac=afa5b54b45d831795c9c81ae50a4d4cc3558389982ad3af3daeb3d24b824f541'

    ]
    return(
        // <View>
        //     <Text>Banner aqui! :)</Text>
        // </View>

        
        <SliderBox images={images} 
        dotColor='#32CD32' 
        inactiveDotColor='white' 
        dotStyle={{ height: 10, width: 10, borderRadius: 50}} 
        imageLoadingColor='green' 
        autoplay={true} 
        circleLoop={true}
        onCurrentImagePressed={() => {Alert.alert('Banner', 'Clicou!!!')}}
        sliderBoxHeight={200}
        paginationBoxVerticalPadding={20}
        resizeMethod={'resize'}
        resizeMode={'cover'}
        activeOpacity={0.9}

        paginationBoxStyle={{
            position: "absolute",
            bottom: 0,
            padding: 0,
            alignItems: "center",
            alignSelf: "center",
            justifyContent: "center",
            paddingVertical: 10
          }}

          ImageComponentStyle={{borderRadius: 15, width: '96%', marginTop: 5}}
        
        />
    
    );
}
  