<template>
    <div>
       <div class="head">
          <i class="fa fa-angle-left" @click.prevent="goback"></i>
       	  <img src="../../assets/alipay2.png">
       	  <div class="name">
       	  	 13100688807
       	  </div>
       	  <div class="jionTime">
       	  	  加入时间 2017/10/29 19:14:12
       	  </div>
       	  <div class="recommend">
       	     推荐人：某某某 ID：152258
          </div>
       </div>
       <div class="itemWarp clearfix">
       	  <div>
       	  	  <p>0</p>
       	  	  <div>累计佣金</div>
       	  </div>
       	   <div>
       	  	  <p>0</p>
       	  	  <div>累计佣金</div>
       	  </div>
       	   <div>
       	  	  <p>0</p>
       	  	  <div>累计佣金</div>
       	  </div>
       </div>
       <div class="nine clearfix">
       	   <div>
       	     <img src="../../assets/alipay2.png">
       	     <p class="title">分销订单</p>
       	    <p><span class="price">0</span> 单</p>
       	   </div>
       	   <div>
       	     <img src="../../assets/alipay2.png">
       	     <p class="title">分销佣金</p>
       	    <p><span class="price">0.00</span> 元</p>
       	   </div>
       	   <div>
       	     <img src="../../assets/alipay2.png">
       	     <p class="title">分销排行</p>
       	    <p>看谁买的多</p>
       	   </div>
       	   <div>
       	     <img src="../../assets/alipay2.png">
       	     <p class="title">我的团队</p>
       	     <p><span class="price">0</span> 单</p>
       	   </div>
       	   <div>
       	     <img src="../../assets/alipay2.png">
       	     <p class="title">我的佣金</p>
       	     <p><span class="price">0.00</span> 元</p>
       	   </div>
       	   <div>
       	     <img src="../../assets/alipay2.png">
       	     <p class="title">推广邀请码</p>
       	    <p>点击生成邀请码</p>
       	   </div>
       	     <div>
       	     <img src="../../assets/alipay2.png">
       	     <p class="title">团队佣金</p>
       	    <p><span class="price">0.00</span> 元</p>
       	   </div>
       	   <div>
       	     <img src="../../assets/alipay2.png">
       	     <p class="title">本月个人业绩</p>
       	    <p><span class="price">0.00</span> 元</p>
       	   </div>
       	    <div>
       	     <img src="../../assets/alipay2.png">
       	     <p class="title">本月团队业绩</p>
       	    <p><span class="price">0.00</span> 元</p>
       	   </div>
       </div>
    </div>
</template>

<script type="ecmascript-6">
    export default {
    name: '',
    data(){
      return {
      	title:"" 
      }
    },
    created:function(){
      
    },
    methods:{
    	goback(){
    		 window.history.go(-1);
    	}
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    .head {
    	 height: 205/@rem;
    	 background-color: #a4c3f8;
    	 padding-top: 25/@rem;
    	 position: relative;
    	 i {
    	 	font-size: 28/@rem;
    	 	position: absolute;
    	 	left: 18/@rem;
    	 	top:12/@rem;
    	 }
    	 img{
    	 	width: 55/@rem;
    	 	height: 55/@rem;
    	 	border-radius: 50%;
    	 	margin: 0 auto;
    	 	display: block;
    	 	margin-bottom: 10/@rem;
    	 }
    	 .name {  
    	 	      text-align: center; 
    	 	      width: 200/@rem;
                  overflow: hidden;
                  text-overflow:ellipsis;
                  white-space: nowrap;
                  text-align: center;
                  margin: 0 auto;
                  color: #545352;
                  margin-bottom: 10/@rem;
    	 	    }
        .jionTime{
                  text-align: center; 
                 background-color: rgba(0, 0, 0, 0.2);
                 width: 190/@rem;
                  text-align: center;
                  margin: 0 auto;
                  color: #545352;
                  font-size: 12/@rem;
                  height: 25/@rem;
                  line-height:  25/@rem;
                  color: #fff;
                  border-radius: 4/@rem;
                  margin-bottom: 10/@rem;
        }
       .recommend {
       	  text-align: center;
       	   color: #545352;
       	   font-size: 13/@rem;

       }
    }
     .itemWarp {
     	  background-color: #fff;
     	  text-align: center;
     	  padding: 13/@rem 0;
     	  margin-bottom: 8/@rem;
     	  > div {
     	  	 width: 33.333%;
     	  	 float: left;
     	  	 p { 
                color: #ff5400;
                font-size: 20/@rem;
                margin-bottom: 5/@rem;
     	  	  }
     	  }
     }
     .nine {
         background-color: #fff;
         img {
         	 width: 53/@rem;
         	 height: 53/@rem;
         	 display: block;
         	 margin: 0 auto;
         	 border-radius: 50%;
         	 margin-bottom: 10/@rem;
         }
     	 > div {
             float: left;
             width: 33.333%;
             text-align: center;
             padding: 12/@rem 0;
             border-right:1px solid #f4f4f4; 
             border-bottom: 1px solid #f4f4f4; 
             p { 
                font-size: 14/@rem;
             }
             .title {
             	 color: #545352;
             	  font-size: 16/@rem;
             }
     	 }
     }
     .nine > div:nth-of-type(3n+3){
     	 border-right:none;
     } 
</style>