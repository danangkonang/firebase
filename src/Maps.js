import React from 'react'
import { 
   View,
} from 'react-native'
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
const App =(props)=>{
   return(
      <View style={{flex:1}}>
         <MapView
            provider={PROVIDER_GOOGLE}
            style={{position:'absolute',top:0,left:0,right:0,bottom:0,}}
            region={{
               latitude: props.latitude,
               longitude: props.longitude,
               latitudeDelta: 0.015,
               longitudeDelta: 0.0121,
            }}>
            <Marker
               draggable
               coordinate={{
               latitude: props.latitude,
               longitude: props.longitude,
               }}
               onDragEnd={(e) => alert(JSON.stringify(e.nativeEvent.coordinate))}
               title={'Kos'}
               description={'koskosan murah'}/>
         </MapView>
      </View>
   )
}
export default App