import toolUtil from '@/utils/toolUtil.js'
import config from '@/utils/config.js'
import http from '@/utils/http.js'

export default {
    namespaced: true,
    state:{
        notice:{}
    },
    getters:{

    },
    actions:{
        getSystemNotice({commit}){
            http.get('/systemnotice/detail/1').then(res=>{
                commit('setNotice',res.data.data)
            })
        },
    },
    mutations:{
        setNotice(state,data){
            state.notice = data
        },
    }
}