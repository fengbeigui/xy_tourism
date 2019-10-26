//导入插件，此功能是把数据保存到本地，再出刷新时登录的信息还存在
import createPersistedState from 'vuex-persistedstate'

export default ({store})=>{
    window.onNuxtReady(()=>{
        createPersistedState({
            key:"store",//读取本地存储的数据到store
        })(store)
    })
}