<template>
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <!--  输入框输入信息需要 v-model="" -->
      <el-input placeholder="用户名/手机" v-model="form.username"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据ref="form"
      form: {
        username: "",
        password: ""
      },
      // 表单规则:rules="rules" 看官网文档，上面需添加prop="username"
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    // 提交登录
    handleLoginSubmit() {
      //输入的信息将打印出来
      //console.log(this.form);
      //检查是否拿到了正确的需要验证的form
      this.$refs.form.validate(async valid => {
        //valid是表单验证的结果
        //console.log(valid);//会返回true或者false

        //if(valid) 为true,请求登录接口
        if (valid) {
          //提交登录接口
          //await的使用，必须在前面加上async
          var res = await this.$axios({
              url:'/accounts/login',
              //post请求使用method:
              method:"post",
              //data储存有用户名和密码等信息
               data:this.form
          })
          //console.log(res,'666');//打印200请求成功或者400失败
          if(res.status === 200){
              //还会跳出登录成功效果，这是插件的原因，简单化了许多
              this.$message.success("登录成功");
              //先不跳转到首页
              //this.$router.push('/');
          }
          
        }
      });
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  //right 把文本排列到右边
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
