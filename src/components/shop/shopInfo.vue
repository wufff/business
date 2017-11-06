<template>
    <div class="wrap">
      <div class="introduce" @click="closeThis">
            <h4>店铺名称：</h4>
            <p>{{shopData.name}}</p>
       </div>
      <div class="introduce">
            <h4>店铺公告：</h4>
            <p>{{shopData.announcement}}</p>
       </div>
       <div class="introduce">
            <h4>店铺介绍：</h4>
            <p>{{shopData.desc}}</p>
       </div>
       <div class="introduce">
            <h4>店铺评分：</h4>
            <p>描述相符：<span class="price">{{shopData.descriptionPoint}}</span></p>
            <p>服务态度：<span class="price">{{shopData.servicePoint}}</span></p>
            <p>发货速度：<span class="price">{{shopData.deliveryPoint}}</span></p>
       </div>
      <!--  <div class="introduce">
            <h4>店铺最近成交量：</h4>
            <p>15225笔</p>
       </div> -->
       <div class="close"  @click="closeThis">
       	   <icon type="clear" ></icon>
       </div>
    </div>

</template>

<script type="ecmascript-6">
import { Icon } from 'vux';
import { Divider } from 'vux';

    export default {
    name: '',
    props:['shopData'],
    data(){
      return {
      	title:"" 
      }
    },
    created:function(){
      
    },
    methods:{
    	closeThis(){
    	  this.$emit("recvie"); 
    	}
    },

     components: {
        Icon
  }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
     .introduce {
     	.title {
     		 display: inline-block;
     	}
       background-color: #fff;
       padding: 10/@rem 15/@rem;
       border-bottom: 1px solid #eee;
       h4 {
         font-weight: normal;
         margin-bottom: 5/@rem ;
       }
       p {
        font-size: 14/@rem ;
        text-indent: 2em;
       }
       span {
       	  font-size: 14/@rem ;
       }
    }
    .wrap {
    	width: 100%;
    	height: 100%;
    	background-color: #fff;
    	position: relative;
    }
    .close {
         position: absolute;
         right: 47%;
         bottom: 10%;
         
         i {
         	 font-size: 20/@rem ;
         	  color: green;
         }
    }
</style>