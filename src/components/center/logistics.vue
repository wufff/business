<template>
    <div>
      <div class="pu_header clearfix" >
         <span @click="goBack"><i class="fa fa-angle-left"></i></span>
         <div class="left">查看物流</div>
      </div>
       <div class="pu_content"> 
         <div class="content" v-show="liData.length > 0">
           <ul>
              <li v-for="(item,index) in liData">
               <span class="span1"></span>
               <div class="inner" :class="{active:index == 0}">
                  <p>{{item.time}}</p>
                  <p v-show="liData.length > 1">{{item.context}}</p>
               </div>
               <span class="span2" v-show="index < liData.length - 1"></span>
            </li>
           </ul>
         </div>
         <div class="content"  v-show="liData.length < 1" v-if="liData">
            暂无物流信息
         </div>
       </div>
    </div>
</template>

<script type="ecmascript-6">
import { Flow, FlowState, FlowLine } from 'vux';
import api from '@/api';

    export default {
    name: '',
    data(){
      return {
      	liData:""
      }
    },
    created:function(){
       api.ajaxLaoding('',
       "Order/express",{"orderId":this.$route.query.orderId}
    ).then(res=>{
       console.log(res);
       var data = res.data.result.data;
       this.liData = data;
       console.log(this.liData);
    }).catch(()=>{
      console.log("失败");
    });
    },

    methods:{
    	goBack(){
         window.history.go(-1);
      },
      formart(a,b){
          return "a"+" "+"b";
      }
    },

    components: {
    Flow,
    FlowState,
    FlowLine
  }

  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    .pu_content {
       position: relative;
        padding-bottom: 30/@rem;
    }
    .content {
       position: absolute;
       left: 0/@rem;
       padding-bottom: 50/@rem;
       ul {
         padding-left: 30/@rem;
         padding-top: 30/@rem;
         
         li {
           position: relative;
           .active{
              color: orange;
           }
           .inner {
             position: absolute;
             left: 20px;
             top:-3px;
             p { 
               width: 300/@rem;
               font-size: 13px;
              }
           }
         }
       }
    }
    .span1 {
       display: block;
       width: 11px;
       height: 11px;
       border-radius: 50%;
       background-color: orange;
    }
    .span2 {
       display: block;
       width: 3px;
       height: 60px;
       background-color: orange;
       margin-left: 4px;
    }
</style>