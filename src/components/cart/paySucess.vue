<template>
    <div>
        <div style="width: 100%;height:100%;background:#fff;" v-show="liData">
       <div class="head">
           <p class="safePoint">安全提醒：唯品电商不会以任何形式索取你的银行卡信息或要求银行转账，谨防假冒客服电话诈骗</p>
           <div class="title" v-show="status">付款成功~！</div>
           <div class="title" v-show="!status">付款失败~！</div>
           <div class="img">
              <i class="fa fa-check" aria-hidden="true" v-show="status"></i>
              <i class="fa fa-frown-o" aria-hidden="true" v-show="!status"></i>
           </div>
           <ul  class="orderList">
             <li v-for = "item in liData">
               <p>订单编号：</p>
               <p>{{item.orderPsn}}</p>
               <p>应付金额：{{item.surPlusMoney}} 元</p>
             </li>
           </ul>
           <div class="playBox">
             <p>应付合计：{{price(tot(liData))}} 元</p>
             <p v-show="status">实际支付：{{price(tot(liData))}} 元</p>
             <p v-show="!status">实际支付：0 元</p>
           </div>
           <div class="btWrap clearfix">
              <span class="left" @click.prevent="goOder"  v-show="status">查看订单</span>
              <span class="right" @click.prevent="goHome"  v-show="status">继续逛逛</span>
              <span class="failBt" @click.prevent="goWpay" v-show="!status">确定</span>
           </div>
       </div>
      </div>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
    export default {
    name: '',
    data(){
      return {
      	status:"",
        liData:""
      }
    },
    created:function(){
         api.ajaxLaoding('',
       "Order/payResult",{"orderId":this.$route.query.order}
              ).then(res=>{
                  console.log(res);
                this.status = res.data.result[0].isOrderPay;
                this.liData = res.data.result;
              }).catch(()=>{
                console.log("失败");
              });
    },
    methods:{
      /* 价格格式*/
       price(value){
           var value=Math.round(parseFloat(value)*100)/100;
           var xsd=value.toString().split(".");
           if(xsd.length==1){
           value=value.toString()+".00";
           return value;
           }
           if(xsd.length>1){
           if(xsd[1].length<2){
            value=value.toString()+"0";
           }
           return value;
           }
       },
      /*计算总价*/
      tot(array){
        var totprice = 0 ;
        for(var i = 0;i<array.length;i++){
           totprice += Number(array[i].surPlusMoney);
        }
        return totprice;
      },
     /* 查看订单*/
    	 goOder(){
        this.$router.push({path:"/order/total"});
        var storage = window.localStorage;
        storage.setItem("goback","home"); 
      },
     /* 返回主页*/
      goHome(){
        this.$router.push({path:"/index"});
      },
    
      /*支付失败的确定按钮*/
       goWpay(){
         this.$router.push({path:"/order/wpay",query:{page:1}});
          var storage = window.localStorage;
         storage.setItem("goback","home"); 
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
     }
     .title {
       text-align: center;
       color: #fff;
       font-size: 22/@rem;
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
       span.failBt {
            margin: 0 auto;
            display: block;
            text-align: center;
            width: 100/@rem;
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