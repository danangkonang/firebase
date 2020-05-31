import React,{useEffect} from 'react'
import { 
   View,
   Text,
} from 'react-native'
import {fmcService} from './function/FMCservice'
import {localNotificationService} from './function/LocationNotificatioService'
const App =()=>{
   useEffect(()=>{
      fmcService.registerAppWhithFMC()
      fmcService.register(onRegister, onNotification, onOpenNotification)
      localNotificationService.configure(onOpenNotification)
      function onRegister(token){
         console.log(token)
      }
      function onNotification(notify){
         console.log(notify)
         const options = {
            soundName : 'default',
            playSound : true
         }
         localNotificationService.showNotification(
            0,
            notify.title,
            notify.body,
            notify,
            options
         )
      }

      function onOpenNotification(notify){
         console.log(notify)
         alert(notify.body)
      }

      return ()=>{
         console.log("unregister")
         fmcService.unRegister()
         localNotificationService.unRegister()
      }
   },[])
   return(
      <View style={{flex:1,backgroundColor:'tomato'}}>
         <Text>Class app </Text>
      </View>
   )
}
export default App