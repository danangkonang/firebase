import {Platform} from 'react-native'
import PushNotification from 'react-native-push-notification'

class LocalNotificationService {
   configure = (onOpenNotification)=>{
      PushNotification.configure({
         onRegister:function(token){
            console.log("token",token)
         },
         onNotification:function(notification){
            console.log(notification)
            if(!notification?.data){
               return
            }
            notification.userInteraction=true
            onOpenNotification(Platform.OS==='ios'?notification.data.item : notification.data)

            if(Platform.OS === 'ios'){
               console.log('ios')
            }
         },
         permissions:{
            alert:true,
            badge:true,
            sound:true
         },
         popInitialNotification:true,
         requestPermissions:true
      })
   }

   unRegister = ()=>{
      PushNotification.unregister()
   }

   showNotification = (id, title, message, data={}, options={})=>{
      PushNotification.localNotification({
         ...this.buildAndroidNitification(id, title, message, data, options),
         // ...this.buildIosNitification(id, title, message, data, options),
         title:title||"",
         message:message||"",
         playSound:options.playSound||false,
         soundName:options.soundName||'default',
         userInteraction:false
      })
   }

   buildAndroidNitification=(id, title, message, data={}, options={})=>{
      return{
         id:id,
         autoCancel:true,
         largeIcon:options.largeIcon||"ic_launcher",
         smallIcon:options.smallIcon||"ic_notification",
         bigText:message||"",
         subText:title||"",
         vibrate:options.vibrate||true,
         vibration:options.vibration||300,
         priority:options.priority||"high",
         importance:options.importance||"high",
         data:data,
      }
   }

   cancelAllLocalNotification=(notification)=>{
      console.log("notification",notification)
      if(Platform.OS==='ios'){

      }else{
         PushNotification.cancelAllLocalNotifications()
      }
   }

   removeDelivedNotificationById=(notificationId)=>{
      PushNotification.cancelLocalNotifications({id:`${notificationId}`})
   }
}

export const localNotificationService = new LocalNotificationService()