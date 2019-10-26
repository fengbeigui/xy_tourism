<template>
  <div class="container">
    <!-- 幻灯片 -->
<!--     轮播图
    interval：相隔时间
    arrow：是否显示在左右的箭头
    background-size:contain contain 大小百分百的意思 -->
    <el-carousel :interval="5000" arrow="always">
       <!-- 循环遍历banners数组 显示404需要添加基准路径$axios.defaults.baseURL 理解item.url吗？打印数据出来看看就知道了-->
      <el-carousel-item v-for="(item,index) in banners" :key="index">
        <div
          class="banner-image"
          :style="`
                background:url(${$axios.defaults.baseURL+item.url}) center center no-repeat;
                background-size:contain contain;
                `"
        ></div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 轮播图数据
      banners: [
      //   {
      //     url: "http://157.122.54.189:9095/assets/images/th03.jfif"
      //   },
      //   {
      //     url: "http://157.122.54.189:9095/assets/images/th04.jfif"
      //   }
      //现在需要动态渲染，可以把临时的静态页面请求删除掉了，然后定位为空数组
      ]
    };
  },
  //这个框架已经帮你做了很多这个事情，this.$axios
  //一级做了基准路径，直接加上去后面的测试一下，这里请求看接口文档
  //记住：mounted() ‘maʊntɪd’、在这发起后端请求，拿回数据，配合路由钩子做一些事情 ，生命周期钩子函数,记住 mounted(){}写法啊，少年
  mounted(){
     this.$axios({
        url:'/scenics/banners',
     }).then(res=>{  //钩子函数res=>
     //多打印出来看看
         const {data} = res.data; //这是解构函数，结构出来
         //赋值给banners
         this.banners = data;
         
     })
  },
};
</script>

<style scoped lang="less">
.container {
  min-width: 1000px;
  margin: 0 auto;
  position: relative;

  /deep/ .el-carousel__container {
    height: 700px;
  }

  .banner-image {
     //轮播图的图片百分百
    width: 100%;
    height: 100%;
  }
}
</style>