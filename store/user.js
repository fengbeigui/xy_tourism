// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {},
    },
})
//存放的方法，同步修改state的方法
export const mutations = {
    // 保存用户信息到state
    //保存用户信息到state
    //mutations下的值必须是一个函数，函数中会有一个固定的参数state;第二个参数数用户调用方法的时候传进来的
    //非常类似于$emit
    setUserInfo(state, data) {
        state.userInfo = data;
    },

};

//存放的是异步修改state的方法
export const actions = {
    // // 登录
    // login({ commit }, data) {
    //     return this.$axios({
    //         url: "/accounts/login",
    //         method: "POST",
    //         data: data
    //     }).then(res => {
    //         const data = res.data;
    //         // 保存到state
    //         commit("setUserInfo", data);
    //         return data;
    //     })
    // }

    //封装登录的方法
    //store是固定必须要有的参数，执行当前的store ==组件内的this.$store
    async login(store, data) {
        var res = await this.$axios({
            url: '/accounts/login',
            method: 'post',
            data
        })
        if (res.status === 200) {
            store.commit("setUserInfo", res.data);
        }
        return res;
    },
    //发送手机验证码，tel是传入的手机号码
    async sendCaptcha(store, tel) {
        const res = await this.$axios({
            url: "/captchas",
            method: "post",
            data: {
                tel //手机号码
            }
        });
        //注意这里需要返回，不然点击验证的时候会显示data 没有定义
        return res;
    }
};