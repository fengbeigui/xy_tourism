<template>
  <div class="container">
    <!-- 幻灯片 -->
    <!--     轮播图
    interval：相隔时间
    arrow：是否显示在左右的箭头
    background-size:contain contain 大小百分百的意思-->
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

    <!-- 搜索框 -->
    <div class="banner-content">
      <div class="search-bar">
        <!-- tab栏 -->
        <!--  row通过基础的 24 分栏，迅速简便地创建布局。 -->
        <el-row type="flex" class="search-tab">
          <!--  重复循环的，找一个循环遍历  index值对应没一项-->
          <span v-for="(item,index) in option" 
          :key="index" 
          :class="{active:index === current}"
          @click="handleTabChange(index)">
            <i>{{item.title}}</i>
          </span>
        </el-row>
        <!--  输入框 -->
        <!-- align 属性规定 div 元素中的内容的水平对齐方式。 -->
        <el-row type="flex" aligin="middle" class="search-input" >
          <input 
          v-model="searchValue"
          @keyup.enter="handleSearch"
          :placeholder="option[current].placeholder"  />
          <i class="el-icon-search" @click="handleSearch"></i>
        </el-row>
      </div>
    </div>
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
      ],
      //tab栏的数据结构，重点在于自己会构造出数据结构
      option: [
        { title: "攻略", placeholder: "搜索城市",pageUrl: "/post?city=" },
        { title: "酒店", placeholder: "请输入城市搜索酒店",pageUrl: "/hotel?city=" },
        { title: "机票", placeholder: "请输入出发地",pageUrl: "/air" }
      ],
      //tab栏切换的索引，把变量 current用起来
       current: 0,  //当前选中的值
       searchValue:"", //搜索框的值

    };
  },
  //这个框架已经帮你做了很多这个事情，this.$axios
  //一级做了基准路径，直接加上去后面的测试一下，这里请求看接口文档
  //记住：mounted() ‘maʊntɪd’、在这发起后端请求，拿回数据，配合路由钩子做一些事情 ，生命周期钩子函数,记住 mounted(){}写法啊，少年
  mounted() {
    this.$axios({
      url: "/scenics/banners"
    }).then(res => {
      //钩子函数res=>
      //多打印出来看看
      const { data } = res.data; //这是解构函数，结构出来
      //赋值给banners
      this.banners = data;
    });
  },
//注意，事件函数写在methods里面methods:{}
methods:{
   //起一个事件名，点击tab栏时候触发
   handleTabChange(index){
      //tab栏的索引值
      this.current = index;

      //如果索引值等于2跳转到飞机,针对单个的
      // if(index ==2){
      //    this.$router.push("/air")
      // }
      // 如果切换的机票tab，那么直接跳转到机票首页
      const item = this.option[index];
      //console.log(item,'666');//item打印的是option里面的信息
      
      if(item.name === "机票"){
         //路由跳转
         return this.$router.push(item.pageUrl);
      }

   },

   //点击搜索触发事件
   handleSearch(){
      //this.option[this.current];当前选项了哪一项
      const item = this.option[this.current];
      // 跳转时候给对应的页面url加上搜索内容参数
      //this.$router.push固定跳转路由写法，this.searchValue搜索的值
     // console.log(this.searchValue,'6666'); 打印输入的值 
     //console.log(item.pageUrl); 在哪框，就跳转到哪个pageUrl值         
     this.$router.push(item.pageUrl + this.searchValue)
   }
}
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
  //搜索框
  .banner-content {
    position: absolute; //绝对定位
    left: 50%;
    top: 45%;
    z-index: 9; //看不到，提供一个层级
    width: 1000px;
    margin-left: -500px;
    border-top: 1px transparent solid;

    .search-bar {
      width: 552px;
      margin: 0 auto;
    }

    .search-tab {
      .active {
        i {
          color: #333;
        }
        &::after {
          background: #eee;
        }
      }
      span {
        width: 82px;
        height: 36px;
        display: block;
        position: relative; //相对
        cursor: pointer; //鼠标经过显示小手

        i {
          //字体调试
          position: absolute; //绝对
          z-index: 2;
          display: block;
          width: 100%;
          height: 100%;
          line-height: 30px;
          text-align: center;
          color: #fff;
        }
        &:after {
          position: absolute;
          left: 0;
          top: 0;
          display: block;
          content: ""; //content 属性与 :before 及 :after 伪元素配合使用，来插入生成内容。
          width: 100%;
          height: 100%;
          border: 1px rgba(255, 255, 255, 0.2) solid; //边框透明度
          border-bottom: none;
          //transform	向元素应用 2D 或 3D 转换。
          //perspective-origin	规定 3D 元素的底部位置。
          transform: scale(1.1, 1.3) perspective(0.7em) rotateX(2.2deg);
          transform-origin: bottom left; //呈现的效果，这得多学习的
          background: rgba(0, 0, 0, 0.5);
          border-radius: 1px 2px 0 0;
          box-sizing: border-box; //內减模式，就会把borders和padding全都包含在定义的宽高里面。这就意味着一个带有2px边框的200px的div仍然宽度是200px
        }
      }
    }
  }
  //输入框
  .search-input {
    width: 550px;
    height: 46px;

    background: #fff;
    border-radius: 0 4px 4px 4px;
    border: 1px rgba(255, 255, 255, 0.2) solid;
    border-top: none;
    box-sizing: unset;
    //一个属性定义了unset值，如果该属性是默认继承属性，该值等同于inherit，如果该属性是非继承属性，该值等同于initial

    input {
      flex: 1;
      height: 20px;
      padding: 13px 15px;
      outline: none; //轮廓
      border: 0;
      font-size: 16px;
    }
    .el-icon-search{
       cursor: pointer;
       font-size: 22px;
       padding: 10px 10px;
       font-weight:bold;
    }
  }
}
</style>