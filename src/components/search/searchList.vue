<template>
    <div class="searchList">
       <div class="searchtitle clearfix">
         <div class="left goBack" @click.prevent="goBack">
           <i class="fa fa-angle-left"></i>
        </div>
         <div class="left">{{title}}</div>
         <div class="right color" id="storeName" >{{storeName}}</div>
      </div>
        <div class="content">
           <list action="Search/SearchResultList" :thisProps="listProps"></list>
        </div>
    </div>
   
</template>

<script type="ecmascript-6">
import list from '@/components/share/listShare';
    export default {
    name: 'searchList',
    data(){
      return {
      	title:"",
        storeName:"",
         listProps :{
              abfixClass:false
          }
      }
    },
    created:function(){
      if(this.$route.query.word){
        this.title = this.$route.query.word;
      }else {
         this.title = "全部商品";
      }
       if(this.$route.query.storeName){
        this.storeName = this.$route.query.storeName;
      }else {
         this.storeName = "";
      }
    },
    methods:{
    	goBack(){
    		window.history.go(-1);
    	}
    },
    components: {
     list
  }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;

.content {
    padding-top: 44/@rem;
}
#storeName {
   padding-right: 15/@rem;
}
.searchtitle {
   height: 43/@rem;
   position: fixed;
   left:0;
   right: 0;
   top:0;
   z-index: 490;
   border-bottom: 1px solid #eee;
   background-color: #fff;
   .left, .right {
    height: 100%;
    line-height: 42/@rem;
   }

   .goBack {
      width: 40/@rem;
      font-size: 24/@rem;
      text-align: center;
   }
}
</style>