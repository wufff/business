<template>
    <div>
      <div class="setWrap clearfix" v-show="usrData">
         <i class="fa fa-cog rihgt" @click="setting"></i>
      </div>
      <div class="manImg clearfix"  @click="goMyEdite" v-show="usrData">
          <img :src="usrData.avater">
          <div class="tel">{{usrData.nickname}}</div>
          <i class="fa fa-angle-right"></i>
      </div>
      <div class="collect clearfix" v-show="usrData">
         <div @click.prevent="goFav">
            收藏<br/>
            <span>{{usrData.collection_goodCount}}</span>
         </div>
          <div @click.prevent="goShop">
            店铺<br/>
             <span>{{usrData.collection_storeCount}}</span>
         </div>
         <div @click.prevent="goFootmark">
            足迹<br/>
             <span>{{usrData.history_goodCount}}</span>
         </div>
      </div>
      <div class="order" v-show="usrData">
         <div class="head clearfix">
             <h4 class="left">我的订单</h4>
            <!--  <router-link :to="{path:'/order',query:{page:0}}" class="right">查看全部 
             <i class="fa fa-angle-right" style="margin-left:5px;"></i>
            </router-link> -->
         </div>
         <div class="orderbox clearfix">
            <div @click.prevent="goDorder('/order/wpay',0)">
                <span class="icon-全部"></span>
                <p>全部</p>
            </div>
            <div @click.prevent="goDorder('/order/wpay',1)">
                <span class="icon-待付款"></span>
                <p>待付款</p>
                <div class="ft" v-if="usrData.pendingPaymentCount > 0">{{usrData.pendingPaymentCount}}</div>
            </div>
            <div @click.prevent="goDorder('/order/wsend',2)">
                <span class="icon-待发货"></span>
                <p>待发货</p>
                <div class="ft" v-if="usrData.pendingShipmentCount > 0">{{usrData.pendingShipmentCount}}</div>
            </div>
            <div @click.prevent="goDorder('/order/wreceived',3)">
                 <span class="icon-待收货"></span>
                 <p>待收货</p>
                  <div class="ft" v-if="usrData.receivedCount > 0">{{usrData.receivedCount}}</div>
            </div>
            <div @click.prevent="goDorder('/order/wcomment',4)">
                 <span class="icon-待评价"></span>
                 <p>待评价</p>
                 <div class="ft" v-if="usrData.pendingEvaluationCount > 0">{{usrData.pendingEvaluationCount}}</div>
            </div>
         </div>
      </div>
      <div class="toolsWarp clearfix" v-show="usrData">
         <div @click.prevent="goAddress">
             <span class="icon-地址 address"></span>
              我的地址
         </div>
         <div @click.prevent="goHepl">
             <span class="icon-about"></span>
             关于我们
         </div>
         <!--  <div @click.prevent="goSell">
             <span class="icon-about"></span>
             我的分销
         </div> -->
         
      </div>
     <foot></foot>
    </div>
</template>

<script type="ecmascript-6">
import foot from '@/components/share/foot';
import {Badge} from 'vux';
import api from '@/api';
    export default {
    name: 'center',
    data(){
      return {
      	title:"",
        usrData:""
      }
    },
    created:function(){
      api.ajaxLaoding('',
         "CustomerCenter/getCustomerInfo",{}
        ).then(res=>{
          console.log(res);
          this.usrData = res.data.result.model;
          
        }).catch(()=>{
          console.log("失败");
        });
    },
    methods:{
    	setting(){
        this.$router.push({path:"/myEdite"});
      },
      goDorder(path,index){
        this.$router.push({path:"/order",query:{page:index}});
      },
      goAddress(){
         this.$router.push({path:"/address"});
      },
      goHepl(){
         this.$router.push({path:"/about"});
      },
      goMyEdite(){
         this.$router.push({path:"/myEdite"});
      },
      goFav(){
        this.$router.push({path:"/favourite"});
      },
       goShop(){
        this.$router.push({path:"/myShop"});
      },
      goFootmark(){
         this.$router.push({path:"/footmark"});
      },
      goSell(){
         this.$router.push({path:"/mySell"});
      }
    },
     components: {
      foot,
      Badge
  }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    .setWrap{

        background-color: orange;
        padding-top: 15/@rem;
        padding-right: 15/@rem;
        padding-bottom: 20/@rem;
        i{font-size: 24/@rem;float: right;color: #fff;}
    }
    .manImg {
        padding-top: 25/@rem;
        background-color:orange;
        padding-left:30/@rem;
        padding-bottom: 50/@rem;
        color: #fff;
        position: relative;
        i{  
          color: #fff;
          position: absolute;
          font-size: 20/@rem;
          right:25/@rem;
          top:50/@rem;
        }
       img {
        float: left;
        width: 60/@rem;
        height: 60/@rem;
        border-radius: 50%;
       
       }
      .tel {
          float: left;
          margin-left: 15/@rem;
          padding-top: 17/@rem;
      }
    }
    .collect {
       padding: 14/@rem 40/@rem 12/@rem 40/@rem;
       background-color: #fff;
       margin-bottom: 8/@rem;
        color:#838282;
    } 
    .collect > div {
       width: 33.33%;
       float: left;
       text-align: center;
       font-size: 16/@rem;

    }
    .order {
       background-color: #fff;
       
       .head{
        border-bottom: 1px solid #eee;
        padding: 10/@rem 15/@rem;
        .left{
          font-weight: normal;
       }
       .right{
        font-size: 13/@rem;
        padding-top: 3/@rem;
        i { font-size: 20/@rem;position: relative; top:2px;}
       }
       }
       .orderbox{ 
        padding-right: 10/@rem;margin-bottom:8/@rem; 
         color:#656565;
      } 
       .orderbox > div {
         color:#545352;
         float: left;
         width: 20%;
         text-align: center;
         padding-top: 12/@rem;
         height: 65/@rem;
         background-color: #fff;
         font-size: 13/@rem;
         position: relative;
         span{
           font-size: 22/@rem;
         }
        div.ft {
           position: absolute;
           right: 3px;
            top:4px;
           line-height: 20/@rem;
           background-color: red;
           color: #fff;
           z-index: 100;
           border-radius:100%;
          text-align: center;
          min-width: 20/@rem;
          height: 20/@rem;
           padding: 0 /@rem;
         }
       }
    }
    .toolsWarp > div{
       color:#656565;
       width: 50%;
       float: left;
       border-right:2/@rem solid #f7f6f9;
       text-align: center;
       height: 45/@rem;
       font-size: 15/@rem;
       padding-top: 12/@rem;
       background-color: #fff;
       margin-bottom: 2/@rem;
       span {
         font-size: 19/@rem;
         margin-right: 4/@rem;
         vertical-align: text-bottom;
          color:#545352;
       }
    }
    .toolsWarp > div:nth-of-type(2n+2){
       border-right: none;
    }
    .toolsWarp {
     
    }
</style>