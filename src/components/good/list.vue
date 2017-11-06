<template>
    <div style="with:100%;height:100%;position:relative">
       <div class="searchWarp clearfix">
         <div class="left" @click.prevent="goBack">
           <i class="fa fa-angle-left"></i>
          </div>
         <div class="inputBox2 right" @click.prevent="goSearch">
            <span class="icon-放大镜 icon"></span>
            <span>海量商品从这里搜索</span>
         </div>
      </div>
      <div class="content">
        <list action="Search/SearchResultList" :thisProps="listProps"></list>
      </div>
      
  </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
import { Tab, TabItem , Checker , CheckerItem , Group, XNumber ,XButton } from 'vux'
import {Spinner} from 'vux'
import list from '@/components/share/listShare';
    export default {
    name: 'goodlist',
    data(){
      return {
          listProps :{
              abfixClass:false
          }
      }
    },
    created:function(){
       
    },

     
    methods:{
      goSearch(){
        this.$router.push({path:"/search"});
      },
     goBack(){
      window.history.go(-1);
     } 
    
    },

   components: {
     list
  }

  }
</script>
<style lang="less" src="../../../static/style/search.less" scoped></style>
<style lang="less" src="../../../static/style/popup.less" scoped></style>
<style lang="less" scoped>
@rem: 23.45rem;
.content {
  padding-top: 44/@rem;
}
</style>