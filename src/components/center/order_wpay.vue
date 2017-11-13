<template>
    <div class="order"
     v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
       <ul class="content">
          <li class="list_li" v-for="(item,index) in liData">
             <div class="title clearfix">
                <h5 class="left">待付款</h5>
                <a class="right price">买家未付款</a>
             </div>
             <h5 class="storeName"  @click.prevent="goShop(item.storeId)"><span class="icon-商店 store"></span> {{item.storeName}}</h5>
             <ul class="goods_ul">
               <li class="clearfix" v-for="item in item.detail4AppList"  @click.prevent="goDetail(item.goodId)">
                  <div class="imgbox">
                     <img v-lazy="item.picUrl">
                  </div>
                  <div class="info">
                      <h5>{{item.title}}</h5>
                      <p>规格：<span>{{item.specification}}</span><span style="margin-left:10px">快递:<span>{{fomatPostage(item.postage)}}</span></span></p>
                      <div>价格：<span class="price">￥ {{item.price}}</span></div>
                      <span class="num">× {{item.count}}</span>
                  </div>
               </li>
             </ul>

             <div class="totbox clearfix">
                 <div class="left">
                     邮费: <span class="price">{{fomatPostage(item.totalPostage)}}</span>
                 </div>
                <div class="right">
                   共 <span class="price">{{item.totalCount}}</span> 件商品，实际付金额 <span class="price">￥{{item.totalPrice}}</span>
                </div>
             </div>
              <div class="btbox clearfix">
                 <div class="left">
                
                 </div>
                <div class="right">
                     <span class="bt" @click.prevent="cancelList(item.ordersn)">取消订单</span>
                     <span class="bt paybt comBt" @click.prevent="pay(item.ordersn)">付款</span>
                </div>
             </div>
          </li>
          <li v-text="kts" v-if="liData.length < 1" class="wuding"></li>
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
        page:1,
        kts:""
      }
    },
    created:function(){
      api.ajaxLaoding('',
       "Order/orderList",{"orderState":30,"pageIndex":this.page,"pageSize":4}
    ).then(res=>{
         var data = res.data.result.cartList;
        this.liData = data;
        this.kts = "暂无此类订单~！";
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
      goDetail(id){
          this.$router.push({path:"/detail",query:{id:id}});
       },
       goShop(id){
          this.$router.push({path:"/shophome",query:{storeId:id}});
       },
       loadMore(){
         console.log(this.scroll);
          if(this.scroll == false){
           return;
        }
        console.log("进入更多");
        this.loading = true; 
         api.ajax('',
        "Order/orderList",{"orderState":0,"pageIndex":this.page,"pageSize":4}
          ).then(res=>{
        
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

    	fomatPostage(p){
          if(p == 0) {
            return "包邮";
          }else {
            return p
          }
      },
      cancelList(id){
         this.$router.replace({path:"/orderSucess",query:{orderId:id,page:1,type:"pay"}});
      /*    api.ajaxLaoding('',
       "Order/cancelOrder",{"orderId":id}
    ).then(res=>{
          if(res.data.result){
              this.$vux.toast.show({
              type:"text",
              text:'取消成功', 
              time:500
              })
            this.liData.splice(index,1);
          }else{
             this.$vux.toast.show({
              type:"text",
              text:'取消失败请检查网路', 
              time:500
              })
          }
    }).catch(()=>{
      console.log("失败");
    });*/
      },

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
      }
    },

    components: {
      Spinner
    }
  }
</script>
<style lang="less" src="../../../static/style/order.less" scoped></style>
