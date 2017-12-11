<template>
    <div class="order"
     v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
       <ul class="content">
           <li class="list_li" v-for="item in liData">
             <div class="title clearfix">
                <h5 class="left">待收货</h5>
                <a class="right price">卖家已经发货</a>
             </div>
             <h5 class="storeName"  @click.prevent="goShop(item.storeId)"><span class="icon-商店 store"></span> {{item.storeName}}</h5>
           <ul class="goods_ul">
               <li class="clearfix" v-for="item in item.detail4AppList" @click.prevent="goDetail(item.goodId)">
                  <div class="imgbox">
                    <img v-lazy="item.picUrl">
                  </div>
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
              <div class="btbox clearfix">
                 <div class="left"></div>
                <div class="right">
                    <span class="bt" @click.prevent="looklogistics(item.ordersn)">查看物流</span>
                     <span class="bt paybt comBt" @click.prevent="receive(item.ordersn)">确认收货</span>
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
       "Order/orderList",{"orderState":110,"pageIndex":this.page,"pageSize":4}
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
          if(this.scroll == false){
           return;
        }
        console.log("进入更多");
        this.loading = true; 
         api.ajax('',
        "Order/orderList",{"orderState":110,"pageIndex":this.page,"pageSize":4}
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
       looklogistics(ordersn){
         this.$router.push({path:"/logistics",query:{orderId:ordersn}});
       },

       receive(id){
         this.$router.replace({path:"/orderSucess",query:{orderId:id,page:3,type:"receive"}});
          
      }
       
    },
    components: {
      Spinner
    }
  }
</script>
<style lang="less" src="../../../static/style/order.less" scoped></style>
