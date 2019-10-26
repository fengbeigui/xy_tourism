<template>
  <div style="padding:50px">
    <div class="btns">
      <span v-for="(item,index) in list " :key="index" @click="handleClick(index)"
      >
          {{item }}</span>
    </div>
    <div v-if="current ===0">
      <p>11111111111111111111111</p>
      <p>11111111这是新闻页面11111111111</p>
      <p>11111111111111111111111</p>
      <p>11111111111111111111111</p>
    </div>
    <div v-if="current ===1">
      <p>22222222222222222</p>
      <p>22222这是娱乐页面222222222</p>
      <p>22222222222222222</p>
    </div>
    <div v-if="current ===2">
      <p>333333333</p>
      <p>3333这是体育页面3333</p>
      <p>333333333</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //一个框架的学习可以通过tab栏来总结，该例子最重要的核心就是当前的下标的变量
      current: 0,
      //循环遍历定义一个空的数组
      list: ["新闻", "娱乐", "体育"]
    };
  },
  methods: {
    //点击改变current
    //传入遍历的参数index（0 1 2）
    handleClick(index) {
        //获取到的index值赋值
      this.current = index;
    }
  }
};
</script>

<style scoped lang="less">
.btns{
    //给span标签样式
    span{
        //小手
        cursor: pointer;
        border: 1px #ddd solid;
    }
    .active{
        color: red;
        border-color: red;
    }
}
</style>