<template>
    <div class="order"
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
       <ul class="content">
           <li class="list_li" v-for="(item,index) in liData">
             <div class="title clearfix">
                <h5 class="left"  v-if="item.orderState =='30'">待付款</h5>
                <h5 class="left" v-if="item.orderState =='90'">待发货</h5>
                <h5 class="left" v-if="item.orderState =='110'">待收货</h5>
                <h5 class="left" v-if="item.orderState =='140'">待评价</h5>
                 <h5 class="left" v-if="item.orderState =='200'">已取消</h5>
                <a class="right price" v-if="item.orderState =='30'">买家未付款</a>
                <a class="right price" v-if="item.orderState =='90'">买家已付款，卖家未发货</a>
                <a class="right price" v-if="item.orderState =='110'">卖家已经发货</a>
                <a class="right price" v-if="item.orderState =='140'">交易完成</a>
                <a class="right price" v-if="item.orderState =='200'">交易关闭</a>
             </div>
             <h5 class="storeName" @click.prevent="goShop(item.storeId)"><span class="icon-商店 store"></span> {{item.storeName}}</h5>
             <ul class="goods_ul">
               <li class="clearfix" v-for="item in item.detail4AppList" @click.prevent="goDetail(item.goodId)">
                  <div class="imgbox" :style="{backgroundImage: 'url('+item.picUrl+')'}"></div>
                  <div class="info">
                      <h5>{{item.title}}</h5>
                      <p>规格：<span>{{item.specification}}</span></p>
                      <div>价格：<span class="price">￥ {{item.price}}</span></div>
                      <span class="num">× {{item.count}}</span>
                  </div>
               </li>
             </ul>
             <div class="totbox clearfix">
                 <div class="left">
                     邮费: <span class="price">包邮</span>
                 </div>
                <div class="right">
                   共 <span class="price">{{item.totalCount}}</span> 件商品，实际付金额 <span class="price">￥{{item.totalPrice}}</span>
                </div>
             </div>
              <div class="btbox clearfix" v-if="item.orderState =='30'">
                 <div class="left"></div>
                <div class="right">
                     <span class="bt" @click.prevent="cancelList(item.orderId)">取消订单</span>
                     <span class="bt paybt comBt" @click.prevent="pay(item.ordersn)">付款</span>
                </div>
             </div>
              <div class="btbox clearfix" v-if="item.orderState =='90'">
                 <div class="left"></div>
                <div class="right">
                     <span class="bt" @click.prevent="Txsent(item.ordersn)">提醒卖家发货</span>
                </div>
             </div>
              <div class="btbox clearfix" v-if="item.orderState =='110'">
                 <div class="left"></div>
                <div class="right">
                    <span class="bt" @click.prevent="looklogistics(item.ordersn)">查看物流</span>
                     <span class="bt paybt comBt" @click.prevent="receive(item.ordersn)">确认收货</span>
                </div>
             </div>
             <div class="btbox clearfix" v-if="item.orderState =='140'">
                 <div class="left"></div>
                <div class="right">
                     <span class="bt" @click.prevent="looklogistics(item.ordersn)">查看物流</span>
                     <span class="bt paybt comBt" @click.prevent="appraise(index)">评价</span>
                </div>
             </div>
          </li>
       </ul>
       <div class="spinnerWap" v-show="!isBottom" v-if="liData.length>0">
                    <spinner type="spiral" size="20px"></spinner><span class="jz">努力加载中...</span>
        </div>
    </div>
</template>

<script type="ecmascript-6">
import api from '@/api';
import { Spinner } from 'vux';
    export default {
    name: '',
    data(){
      return {
        liData:[],
        scroll:false,
        isBottom:false,
        liData:[],
        loading:false,
        page:1
      }
    },
    created:function(){
     api.ajaxLaoding('',
       "Order/orderList",{"orderState":0,"pageIndex":this.page,"pageSize":4}
    ).then(res=>{
         console.log(res);
        var data = res.data.result.cartList;
        this.liData = data;
        this.scroll = true;
        this.page++;
        if(!res.data.result.hasNext){
              this.isBottom = true;
              this.scroll = false ;
         }
    }).catch(()=>{
      console.log("失败");
    });
    },
    methods:{
      fomatPostage(p){
          if(p == 0) {
            return "包邮";
          }else {
            return p
          }
       },
       goDetail(id){
          this.$router.push({path:"/detail",query:{id:id}});
       },
       goShop(id){
          this.$router.push({path:"/shophome",query:{storeId:id}});
       },
       loadMore(){
          if(this.scroll == false){
           return;
        }
        console.log("进入更多");
        this.loading = true; 
         api.ajax('',
        "Order/orderList",{"orderState":0,"pageIndex":this.page,"pageSize":4}
          ).then(res=>{
            console.log(res);
        var data = res.data.result.cartList;
        this.liData.push(...data);
        this.page++;
        this.loading = false;
        if(!res.data.result.hasNext){
              this.isBottom = true;
              this.scroll = false ;
         }
         }).catch(()=>{
          console.log("失败");
        });
      },
     /*评价*/
      appraise(i){
         var order = this.liData[i].orderId;
        /* var str = this.liData[i].detail4AppList.map(item =>{ return item.itemId}).join("-");
         var storeId = this.liData[i].storeId;*/
         this.$router.push({path:"/fbcomment",query:{"orderInfoId":order}});
      },
     /* 取消订单*/
       cancelList(id){
          this.$router.replace({path:"/orderSucess",query:{orderId:id,page:0,type:"pay"}});
      },
      /*查看物流*/  
      looklogistics(ordersn){
         this.$router.push({path:"/logistics",query:{orderId:ordersn}});
       },
      /*支付*/  
      pay(order){
         api.ajaxLaoding('',
      "WXPay/authorize",{"outtradeno":order,"returnUrl":'http://www.wayperfect.com/authorize/authorize/#/paySucess?order='+ order}
          ).then(res=>{
            var url = res.data.result;
            window.location = url;
            console.log(res);
          }).catch(()=>{
            console.log("失败");
          });
     },
    /*提现发货*/
      Txsent(p){
          api.ajaxLaoding('',
       "Order/sendorder",{"orderId":p}
          ).then(res=>{
          console.log(res);
          if(res.data.result){
              this.$vux.toast.show({
              type:"text",
              text:'提醒成功', 
              time:1000
              })
          }else{
             this.$vux.toast.show({
              type:"text",
              text:'提醒失败请检查网路', 
              time:500
              })
            }
          }).catch(()=>{
            console.log("失败");
          });
       },
       /*确认收货*/
      receive(id){
         this.$router.replace({path:"/orderSucess",query:{orderId:id,page:0,type:"receive"}});
          
      }
       
     },
     components: {
        Spinner
      }
  
  }
</script>
<style lang="less" src="../../../static/style/order.less" scoped></style>
<style lang="less" scoped>
@rem: 23.45rem;
  .spinnerWap {
    margin: 0 auto;
    text-align:  center;
    background-color: #eee;
    padding: 0 3/@rem;
    color: #fff;
    height: 35/@rem;
    padding-top: 7/@rem;
    .jz{
      margin-left: 10/@rem;
      color: #999;
    }
 }
</style>