import AsyncStorage from '@react-native-async-storage/async-storage';

//Budcar os favoritos
//salvas um novo favorito
//Remover um favoritos da lista

export async  function getFavorites(key){
    const favorites = await AsyncStorage.getItem(key)
    return JSON.parse(favorites) || [];
}

export async function saveFavorite(key,newItem){
    let myfavorites = await getFavorites(key);

    let hasItem = myfavorites.some( item => item.id === newItem.id)

    if(hasItem){
        console.log("ESSE ITEM JA ESTA SALVO NA SUA LISTA")
        return;
    }

    myfavorites.push(newItem)

    await AsyncStorage.setItem(key, JSON.stringify(myfavorites))
    console.log('salvo com sucesso')
}

export async function removeItem(id){
    let receipes = await getFavorites("@agrodigital")

    let myFavorites = receipes.filter( item => {
        return (item.id !== id)
    })

    await AsyncStorage.setItem("@agrodigital", JSON.stringify(myFavorites));
    console.log("ITEM DELETADO com SuCESSO")
    return myFavorites;
}

export async function isFavorite(receipe){
     let myReceipes = await getFavorites("@agrodigital")

     const favorite = myReceipes.find( item => item.id === receipe.id)

     if(favorite){
        return true;
     }

     return false;
}
