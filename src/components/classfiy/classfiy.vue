<template>
    <div class="classfiy">
      <div class="searchWarp">
         <div class="inputBox1" @click.prevent="goSearch">
            <span class="icon-放大镜 icon"></span>
            <span>海量商品从这里搜索</span>
         </div>
      </div>
      <div class="content">
         <category></category>
      </div>
      <foot></foot>
    </div>
</template>

<script type="ecmascript-6">

import foot from '@/components/share/foot';
import category from '@/components/classfiy/category';
    export default {
    name: 'classfiy',
    data(){
      return {
        /*-------------分类--------------*/
        classDate:["手机相机","大家电","食品酒水","电脑办公","厨卫电器","居家生活","食品酒水"],
        tabNow:0
       
      }
    },
    created:function(){
      
    },

    methods:{
    	goSearch(){
         this.$router.push({path:"/search"});
      },
      goTab(index){
        this.tabNow = index;
      }
    },
     components: {
      foot,
      category
   }
  }
</script>
<style lang="less" src="../../../static/style/search.less" scoped></style>
<style lang="less" scoped>
@rem: 23.45rem;
    .classfiy {
       width: 100%;
       height: 100%;
    }
  
  .content{
    padding-top: 44/@rem;
    height: 100%;
    overflow: atuo;
  }
  
</style>