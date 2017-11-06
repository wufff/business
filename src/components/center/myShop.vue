<template>
    <div>
       <div class="pu_header clearfix" >
         <span @click.prevent="goBack"><i class="fa fa-angle-left"></i></span>
         <div class="left">收藏的店铺</div>
       </div>
       <div class="pu_content">
       	  <ul>
       	  	<li class="goShop" v-for="item in lidata">
           	  	 <router-link :to ="{ path: '/shophome',query:{ storeId: item.id }}">
        			        <img :src="item.logo">
        			        <h4>
        			           {{item.name}}<br/>
        			           <!-- <span><i class="fa fa-heart" aria-hidden="true"></i></span>
        			           <span><i class="fa fa-heart" aria-hidden="true"></i></span>
        			           <span><i class="fa fa-heart" aria-hidden="true"></i></span>
        			           <span><i class="fa fa-heart" aria-hidden="true"></i></span> -->
        			        </h4>
        			        <div class="right">
        			           <span >去逛逛<i class="fa fa-angle-right"></i></span>
        			        </div>
			           </router-link>     
       	  	</li>
       	  </ul>
       </div>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
    export default {
    name: '',
    data(){
      return {
      	title:"",
        lidata:""
      }
    },

    created:function(){
        api.ajaxLaoding('',
       "Store/collectionStoreList",{}
    ).then(res=>{
        var data = res.data.result;
        this.lidata = data;
    }).catch(()=>{
      console.log("失败");
    });
    },

    methods:{
    	goBack(){
    	  window.history.go(-1);
    	}
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
     .goShop {
           margin-bottom: 8/@rem;
       a {width: 100%;
       	  height: 100%; 
           background-color: #fff;
           overflow: hidden;
           padding: 8/@rem 10/@rem;
       	}
       img {
        /* border:1px solid #999;
         padding: 3px;*/
         width: 50/@rem;
         height: 50/@rem;
         float: left;
         margin-right: 10/@rem;
       }
       
       h4 { 
           float: left;
           font-weight: normal;
           padding-top: 5/@rem;
           span {
              color: #ff9712;
           }
       }
       .right {
          padding-top: 15/@rem;
          font-size: 13/@rem;
          i {
          	font-size: 16/@rem;
          	margin-left: 10/@rem;
          	vertical-align: text-top;
          }
       }
    }
</style>