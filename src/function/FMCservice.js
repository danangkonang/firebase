import {Platform} from 'react-native'
import messaging from '@react-native-firebase/messaging'

class FMCservice {
   register = (onRegister, onNotification, onOpenNotification)=>{
      this.checkPermision(onRegister)
      this.ceateNotificationListener(onRegister, onNotification, onOpenNotification)
   }

   registerAppWhithFMC=async()=>{
      if(Platform.OS==="ios"){
         await messaging().registerDeviceForRemoteMessages()
         await messaging().setAutoInitEnabled(true)
      }
   }

   checkPermision=(onRegister)=>{
      messaging().hasPermission()
      .then(enable=>{
         if(enable){
            this.geToken(onRegister)
         }else{
            this.requestPermission(onRegister)
         }
      }).catch(errorr=>{
         console.log("[FMCservice] permission rejected",errorr)
      })
   }

   geToken=(onRegister)=>{
      messaging().getToken()
      .then(fmcToken=>{
         if(fmcToken){
            onRegister(fmcToken)
         }else{
            console.log("[FMCtoken] user tidak memiliki token")
         }
      }).catch(error=>{
         console.log("[FMCtoken] getToken error",error)
      })
   }

   requestPermission=(onRegister)=>{
      messaging().requestPermission()
      .then(()=>{
         this.getToken(onRegister)
      }).catch(error=>{
         console.log("permision error",error)
      })
   }

   deleteToken=()=>{
      console.log("delete token")
      messaging().deleteToken()
      .catch(error=>{
         console.log("[] delete token error",error)
      })
   }

   ceateNotificationListener=(onRegister, onNotification, onOpenNotification)=>{
      // when app run on bacground
      messaging()
      .getInitialNotification()
      .then(remoteMessage=>{
         console.log("[] initial notification open")
         if(remoteMessage){
            const notification = remoteMessage.notification
            onOpenNotification(notification)
         }
      })

      // foreground
      this.messageListener = messaging().onMessage(async remoteMessage=>{
         console.log("[fmc remote message]",remoteMessage)
         if(remoteMessage){
            let notification = null
            notification = remoteMessage.notification
            onNotification(notification)
         }
      })

      messaging().onTokenRefresh(fmcToken=>{
         console.log("token refres",fmcToken)
         onRegister(fmcToken)
      })
   }

   unRegister=()=>{
      this.messageListener()
   }

}

export const fmcService = new FMCservice()