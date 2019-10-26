<template>
  <div class="container">
    <!-- 主要内容 -->
    <el-row type="flex" justify="center" align="middle" class="main">
      <div class="form-wrapper">
        <!-- 表单头部tab -->
        <el-row type="flex" justify="center" class="tabs">
          <span
            :class="{active: currentTab === index}"
            v-for="(item, index) in [`登录`, `注册`]"
            :key="index"
            @click="handleChangeTab(index)"
          >{{item}}</span>
        </el-row>

        <!-- 登录功能组件 v-if隐藏显示的功能 0位显示-->
        <LoginForm v-if="currentTab == 0"/>

        <!-- 注册功能组件 -->
        <!-- <RegisterForm v-if="currentTab == 1"/> -->
      </div>
    </el-row>
  </div>
</template>

<script>
//导入登录组件
import LoginForm from "@/components/user/LoginForm";

export default {
  //注册组件
  components: {
    LoginForm
  },
  data() {
    return {
      //定义当前高亮，默认为0 第一个
      currentTab: 0
    };
  },
  methods: {
    handleChangeTab(index) {
      //点击事件获取索引值
      this.currentTab = index;
    }
  }
};
</script>

<style scoped lang="less">
.container {
  background: url(http://157.122.54.189:9095/assets/images/th03.jfif) center 0;
  height: 700px;
  min-width: 1000px;

  .main {
    width: 1000px;
    height: 100%;
    margin: 0 auto;
    position: relative;

    .form-wrapper {
      width: 400px;
      margin: 0 auto;
      background: #fff;
      //阴影
      box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);
      //溢出隐藏
      overflow: hidden;

      .tabs {
        span {
          //行转块，将元素显示为块级元素
          display: block;
          width: 50%;
          height: 50px;
          box-sizing: border-box;
          border-top: 2px #eee solid;
          background: #eee;
          line-height: 48px;
          text-align: center;
          cursor: pointer;
          color: #666;

          &.active {
            color: orange;
            //上边框颜色设置
            border-top-color: orange;
            background: #fff;
            font-weight: bold;
          }
        }
      }
    }
  }
}
</style>
