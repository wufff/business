<template>
    <div style="width:100%; height:100%;">
      <div class="pu_header clearfix" >
         <span @click.prevent="goBack"><i class="fa fa-angle-left"></i></span>
         <div class="left" @click.prevent="test">关于我们</div>
     </div>
        <div class="content">
           <div class="inner">
		       	   <img src="http://www.wayperfect.com/content/layouts/img/logo.png" class="logo">
		       	   <p class="disc">唯品电商由武汉唯品信息科技有限公司于2017年创建。
		              通过丰富的电子商务管理服务经验和先进的互联网技术为用户提供精选商品。</p>
		            <p class="copy">
						
						武汉唯品信息科技有限公司<br/>
						Copyright 2017-2019 
		            </p> 
           </div> 
       </div>

      </div>

  
</template>

<script type="ecmascript-6">
import wx from '@/awx';
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
    	goBack(){
    		window.history.go(-1);
    	},
    	test(){
         /*  var storage = window.localStorage;
           storage.setItem("token","");  
           storage.setItem("redirct","");*/
         this.$router.push({path:"/test"});
    	}
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
   .content {
   	 
   	 padding-top: 53/@rem;
   	 height: 100%;
   }
    .logo{
       width: 200/@rem;
       display: block;
       margin: 20/@rem auto 0 auto;
       margin-bottom: 40/@rem;
    }
    .inner {
    	 background-color: #fff;
    	 padding-top: 20/@rem;
    	 height: 100%;
    }
    .disc {
    	margin-bottom: 60/@rem;
    	padding: 0  40/@rem;
    	line-height: 25/@rem;
    	color: #545352;
        text-indent: 2em;
    }
    .copy {
    	 text-align: center;
    	 font-size: 13/@rem;
    	 line-height: 25/@rem;
    }
</style>