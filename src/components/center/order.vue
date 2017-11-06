<template>
    <div class="order">
       <div class="pu_header clearfix">
         <span @click.prevent="goBack"><i class="fa fa-angle-left"></i></span>
         <div class="left">我的订单</div>
       </div>
       <div class="tabWarp">
		   <tab :line-width="2" :custom-bar-width="getBarWidth" v-model="index" bar-active-color="#ffb845">
		      <tab-item @on-item-click="onItemClick">全部</tab-item>
		      <tab-item @on-item-click="onItemClick">待付款</tab-item>
		      <tab-item  @on-item-click="onItemClick">待发货</tab-item>
		      <tab-item  @on-item-click="onItemClick">待收货</tab-item>
		      <tab-item @on-item-click="onItemClick">待评价</tab-item>
		   </tab>
      </div>
      <div class="order_content">
      	  <router-view></router-view>
      </div>
    </div>
</template>

<script type="ecmascript-6">
import { Tab, TabItem } from 'vux';
import api from '@/api';

    export default {
    name: '',
    data(){
      return {
      	index: "",
        getBarWidth: function (index) {
        	if(index == 0){
        		  return 30 + 'px'
        	}else {
        		return 40 + 'px'
        	}
         
        },
      }
    },
    created:function(){
       if(this.$route.query.page){
          this.index = this.$route.query.page;
       }else {
         this.index = 0;
       }
       switch (this.index) {
         case 0:
           this.$router.replace({path:"/order/total"});
           break;
        case 1:
           this.$router.replace({path:"/order/wpay"});
           break;
        case 2:
           this.$router.replace({path:"/order/wsend"});
           break;
        case 3:
           this.$router.replace({path:"/order/wreceived"});
           break;
        case 4:
           this.$router.replace({path:"/order/wcomment"});
           break;
         default:
           break;
       }
      
    },
    methods:{
    	goBack(){
        var storage = window.localStorage;
        var link = storage.getItem("goback"); 
        console.log(link);
    		if(link && link == "home"){
           this.$router.push({path:"/index"});
        }else {
           window.history.go(-1);
        }
    	},
      onItemClick(index){
          if(index == 0){
             this.$router.replace({path:"/order/total"});
          };
          if(index == 1){
             this.$router.replace({path:"/order/wpay"});
          };
          if(index == 2){
            this.$router.replace({path:"/order/wsend"});
          };
          if(index == 3){
            this.$router.replace({path:"/order/wreceived"});
          };
          if(index == 4){
            this.$router.replace({path:"/order/wcomment"});
          };
      }
    },
   components: {
     Tab,
     TabItem,
   
   }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    .tabWarp {
    	 position: fixed;
    	 top: 50/@rem;
    	 left: 0;
    	 right: 0;
    	 z-index: 555; 
    	 border-top:1px solid #fbf9fe; 
    	 padding-right: 8/@rem;
    	 background-color: #fff;
       border-bottom: 1px solid #eee;
    }
    .order_content { 
        padding-top: 100/@rem;
     }
</style>