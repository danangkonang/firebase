import React,{useEffect} from 'react'
import Content from './Content'
import {fmcService} from './function/FMCservice'
import {localNotificationService} from './function/LocationNotificatioService'
const App =()=>{
    useEffect(()=>{
        fmcService.registerAppWhithFMC()
        fmcService.register(onRegister, onNotification, onOpenNotification)
        localNotificationService.configure(onOpenNotification)
        function onRegister(token){
           console.log("[ini token]",token)
        }
        function onNotification(notify){
           console.log("disini notif nya",notify)
         //   alert("testing")
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
        <Content/>
    )
}
export default App