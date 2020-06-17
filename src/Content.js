import React,{useEffect,useState} from 'react'
import { 
   View,
   Text,
   TouchableOpacity,
} from 'react-native'
import Geolocation from '@react-native-community/geolocation'
import Maps from './Maps'

const App =()=>{
    const [state,setState]=useState({
        timestamp:null,
        longitude:0,
        latitude:0,
        height:100,
        show:true,
    })
    useEffect(()=>{
        getLocation()
    },[])

    const getLocation = ()=>{
        Geolocation.getCurrentPosition(position=>{
            setState({...state,
                longitude:position.coords.longitude,
                latitude:position.coords.latitude,
                timestamp:position.coords.timestamp
            })
        })
    }

    return(
        <View style={{flex:1,backgroundColor:'#DDD'}}>
            <View style={{flex:1}}>
                <Maps 
                longitude={state.longitude} 
                latitude={state.latitude}/>
            </View>
            <View style={{backgroundColor:'rgba(0,0,0,.8)'}}>
                <TouchableOpacity 
                onPress={()=>setState({...state,show:!state.show})}
                style={{alignItems:'center',paddingVertical:5}}>
                    <Text style={{color:'#fff'}}>{state.show?"Hidden":"Show"}</Text>
                </TouchableOpacity>
            </View>
            {
                state.show&&
                <View style={{flex:1,backgroundColor:'rgba(0,0,0,.7)'}}>
                    <View style={{flex:1,padding:10}}>
                        <Text style={{color:'#fff'}}>latitude : {state.latitude}</Text>
                        <Text style={{color:'#fff'}}>longitude : {state.longitude}</Text>
                    </View>
                    <View 
                    style={{paddingVertical:20}}>
                        <TouchableOpacity 
                        onPress={getLocation}
                        style={{backgroundColor:'rgba(0,0,0,.4)',marginHorizontal:20,paddingVertical:10,borderRadius:5,alignItems:'center'}}>
                        <Text style={{color:'#FFF'}}>Refres</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
    )
}
export default App
