<template>
    <div style="width: 100%;height:100%;background:#fff;" v-show="liData">
       <div class="head">
           <div class="title" v-if="type == 'pay'">确定取消此订单？</div>
            <div class="title" v-if="type == 'receive'">您确定收到商品了？</div>
            <ul  class="orderList">
             <li v-for = "item in liData">
               <p>订单编号：</p>
               <p>{{item.orderPsn}}</p>
               <p>支付金额：{{item.surPlusMoney}} 元</p>
             </li>
           </ul>
           <div class="btWrap clearfix">
              <span class="left" @click="cencel" v-if="type == 'pay'">确定取消</span>
              <span class="right" @click="pay" v-if="type == 'pay'">继续支付</span>
              <span class="sureBt" @click="receive" v-if="type == 'receive'">确定收货</span>
           </div>
          
              <span class="failBt" @click="goback">返回订单</span>
          
       </div>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
    export default {
    name: '',
    data(){
      return {
      	 liData:"",
         type:""
      }
    },
    created:function(){
        this.type = this.$route.query.type;
        api.ajaxLaoding('',
       "Order/payResult",{"orderId":this.$route.query.orderId}
              ).then(res=>{
                this.liData = res.data.result;
              }).catch(()=>{
                console.log("失败");
              });
    },
    methods:{
    	goOder(){
        this.$router.push({path:"/order/total"});
        var storage = window.localStorage;
        storage.setItem("goback","home"); 
      },
      goback(){
        this.$router.replace({path:"/order",query:{page:this.$route.query.page}});
      },
      cencel(){
            api.ajaxLaoding('',
       "Order/cancelOrder",{"orderId":this.$route.query.orderId}
    ).then(res=>{
           console.log(res);
          if(res.data.result){
              this.$vux.toast.show({
              type:"text",
              text:'取消成功', 
              time:500
              })
             this.$router.replace({path:"/order",query:{page:this.$route.query.page}});
          }else{
             this.$vux.toast.show({
              type:"text",
              text:'取消失败请检查网路', 
              time:500
              })
          }
    }).catch(()=>{
      console.log("失败");
    });
      },

      pay(){
         api.ajaxLaoding('',
      "WXPay/authorize",{"outtradeno":this.$route.query.orderId,"returnUrl":'http://www.wayperfect.com/authorize/authorize/#/paySucess?order='+ this.$route.query.orderId}
    ).then(res=>{
      var url = res.data.result;
      window.location = url;
      console.log(res);
    }).catch(()=>{
      console.log("失败");
    });
      },

     receive(){
        api.ajaxLaoding('',
       "Order/receiveOrder",{"orderId":this.$route.query.orderId}
          ).then(res=>{
             if(res.data.result){
              this.$vux.toast.show({
              type:"text",
              text:'确认成功', 
              time:500
              })
              if(this.type == "pay"){
               this.$router.replace({path:"/order",query:{page:this.$route.query.page}});
              }else {
                this.$router.replace({path:"/order",query:{page:this.$route.query.page+1}});
              }
          }else{
             this.$vux.toast.show({
              type:"text",
              text:'确认失败请检查网路', 
              time:500
              })
            }
          }).catch(()=>{
            console.log("失败");
          });
     }

       
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
      .head {
         background: orange;
        /* height: 240/@rem;*/
        padding-bottom: 40/@rem;
        position: relative;
          .failBt {
             border:1px solid yellow; 
             padding: 8/@rem 15/@rem;
             color: yellow; 
             border-radius: 5/@rem;
             font-size: 14/@rem;
             font-size: 16/@rem;
            display: block;
            text-align: center;
            width: 100/@rem;
            position: absolute;
            right: 15/@rem;
            top:15/@rem;
     }
     .title {
     
       color: #fff;
       font-size: 18/@rem;
       padding: 20/@rem 0 10/@rem 20/@rem;
     }
     .img {
       color: #fff;
       font-size: 40/@rem;
       text-align: center;
       margin-bottom: 25/@rem;
     }
     .btWrap {
       width: 230/@rem;
       margin: 0 auto;
       span {
          border:1px solid yellow; 
          padding: 8/@rem 15/@rem;
          color: yellow; 
          border-radius: 5/@rem;
          font-size: 14/@rem;
          font-size: 16/@rem;
       }
      span.sureBt {
         margin: 0 auto;
         display: block;
         width: 97/@rem;
      }
      }
     }
     .safePoint {
        padding: 8/@rem;
        color: #fff;
     }
     .orderList {
        color: #fff;
        padding-left: 90/@rem;
        margin-bottom: 20/@rem;
        li {
           margin-bottom: 10/@rem;
        }
     }
     .playBox {
        color: #fff;
        padding-left: 90/@rem;
        margin-bottom: 50/@rem;
     }
</style>