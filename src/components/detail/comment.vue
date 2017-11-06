<template>
    <div class="comment">
       <div class="header clearfix" v-show="headData.allCount > 0 " v-if = "headData.allCount">
           <div class="left">
                <h4>好评率</h4>
                <span class="price">{{headData.totalGoodRate}}%</span>
           </div>
           <div class="right">
               <span :class="{active:thisTab == 0}" @click.prevent="thisList(0)">全部 ({{headData.allCount}})</span>
               <span :class="{active:thisTab == 10}" @click.prevent="thisList(10)">好评 ({{headData.goodCount}})</span>
               <span :class="{active:thisTab == 20}" @click.prevent="thisList(20)">中评 ({{headData.mediueCount}})</span>
               <span :class="{active:thisTab == 30}" @click.prevent="thisList(30)" class="negative">差评 ({{headData.badCount}})</span>
               <span :class="{active:thisTab == 40}" @click.prevent="thisList(40)">有图 ({{headData.usePicCount}})</span>
           </div>
       </div>
       <div class="content" 
          v-infinite-scroll="loadMore"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <ul>
            <li v-for="(item,c) in liData">
              <div class="head clearfix">
                  <div class="left"><img :src="item.userAvate"></div>
                  <div class="left">
                    <p>{{item.userName}}</p>
                    <p><span class="icon-星星 star" v-for="(item,index) in 5" :class="{active:index < liData[c].starNum}"></span></p>
                  </div>
         
                 <div class="right">
                     {{item.addTime}}
                 </div>
              </div>
              <div class="text">
                  <p>{{item.message}}</p>
              </div>
              <div class="imgwarp clearfix">
                 <img :src="item" v-for="(item,x) in item.showProductImg" @click.prevent="lookImgs(c,item)">
              </div>
            </li>
          </ul>
           <div class="spinnerWap" v-show="!isBottom" v-if="liData.length>0">
                    <spinner type="spiral" size="20px"></spinner><span class="jz">努力加载中...</span>
          </div>
       </div>
       <div v-show="headData.allCount == 0 " class="commentTs">
          <div class="img"><i class="fa fa-comment-o" aria-hidden="true"></i></div>
          <div class="title">还没有人发表评价</div>
       </div>
         <div class="detailFoot">
               <div class="left iconActive" v-show="goodInfo.hasCollect">
                    <div><span class="icon-星星"></span></div>
                    <div class="text">收藏</div> 
              </div>
              <div class="left " v-show="!goodInfo.hasCollect" @click.prevent="Collect">
                   <div><span class="icon-星星"></span></div>
                   <div class="text">收藏</div>
              </div>
              <div class="left icon">
                <router-link to = "/cart" >
                  <div><span class="icon-购物车" ></span></div>
                  <div class="text cartText">购物车</div>
                </router-link>
                 <div class="incon ft" v-if="goodInfo.cartNum > 0">{{goodInfo.cartNum}}</div>
              </div> 
             <div class="left icon" @click.prevent="lookShop">
                  <div><span class="icon-商店"></span></div>
                  <div class="text">店铺</div>
              </div> 
              <div class="right cart accountAtn" @click.prevent="popCart">加入购物车</div>
    </div>
    <popup v-model="show2">
        <div class="popupWrapdetail" style="height:auto;">
          <div class="standard">
            <h5>规格</h5>
            <div class="checkeBox">      
                    <ul class="clearfix">
                      <li v-for="(item, index) in selectData" class="secletItem" :class="{secletItemActive:index == thisStand}" @click.prevent="choiceStand(index)">{{item.name}}</li>
                    </ul>   
           </div>    
        </div>
        <div class="numWrap clearfix">
           <h5 class="left">数量</h5>
           <p class="right">
            <group>
               <x-number :title="storeNmb" v-model="num" :min="1" :max="maxNmb"></x-number>
            </group>
          </p>
        </div>
        <div class="shoping clearfix">
              <div class="left icon">
                  <router-link to = "/cart">
                    <span class="icon-购物车"></span>
                    <div class="incon ft" v-if="goodInfo.cartNum > 0">{{goodInfo.cartNum}}</div>
                  </router-link>
              </div>
              <div class="left tolprice"><span class="price">¥ <span>{{price(totPic)}}</span></span></div>
              <div class="right cart accountAtn" @click.prevent="addCart" v-show="selectVule.storage > 0">加入购物车</div>
              <div class="right cart nohave" v-show="selectVule.storage < 1">无库存</div>
        </div>
    </div>
    </popup>
</div>
</template>

<script type="ecmascript-6">
import api from '@/api';
import axios from 'axios';
import { Indicator } from 'mint-ui';
import { Spinner } from 'vux';
import { Popup } from 'vux';
import { Icon } from 'vux';
import { Checker , CheckerItem , Group, XNumber ,XButton } from 'vux';
import wx from '@/awx';
    export default {
    name: 'comment',
    data(){
      return {
      	title:"",
        thisTab:0,
        headData:"",
        liData:"",
        scroll:false,
        isBottom:false,
        loading:false,
        page:1,
        star:0,
        goodInfo:"",
        show2:false,
        selectData: [],
        selectVule: {},
         num:1,
         cartnum:20,
         thisStand:0,
      }
    },
    created:function(){
      Indicator.open('加载中...');
      var _this = this;
function head(){
        return api.ajax('',
          "Goods/getGoodEvaluateCount",{"goodId":_this.$route.query.id}
        );
    }
function list(){
      return api.ajax('',
          "Goods/getGoodEvaluateList",{"goodId":_this.$route.query.id,"sort":_this.star,"pageIndex":_this.page,"pageSize":5}
       );
  }
function info(){
        return api.ajax('',
          "Goods/ShowNew",{"goodId":_this.$route.query.id}
        );
    }

  axios.all([head(),list(),info()])
    .then(axios.spread(function(head,list,info){

      _this.headData = head.data.result;
      _this.goodInfo = info.data.result;
      _this.storeId = info.data.result.storeId;
       Indicator.close();
       _this.liData = list.data.result.evaList;
      console.log(_this.liData);
       _this.scroll = true;
        _this.page++;
        if(!list.data.result.hasNext){
              _this.isBottom = true;
              _this.scroll = false ;
         }

    }));  
    },


    methods:{
    	thisList(p){
        this.thisTab = p;
        this.page = 1;
        this.star = p;
    api.ajaxLaoding('',
        "Goods/getGoodEvaluateList",{"goodId":this.$route.query.id,"sort":this.star,"pageIndex":this.page,"pageSize":5}
          ).then(res=>{
            console.log(res);
          var data = res.data.result.evaList;
          this.liData = data;
          this.page ++;
          this.loading = false;
        if(!res.data.result.hasNext){
              this.isBottom = true;
              this.scroll = false ;
         }
         }).catch(()=>{
          console.log("失败");
        });
      },


      loadMore(){
        if(this.scroll == false){
           return;
        }
        console.log("loadMore");
          this.loading = true; 
         api.ajax('',
        "Goods/getGoodEvaluateList",{"goodId":this.$route.query.id,"sort":this.star,"pageIndex":this.page,"pageSize":5}
          ).then(res=>{
            console.log(res);
          var data = res.data.result.evaList;
          this.liData.push(...data);
          this.page ++;
          this.loading = false;
        if(!res.data.result.hasNext){
              this.isBottom = true;
              this.scroll = false ;
         }
         }).catch(()=>{
          console.log("失败");
        });
      },

      /*去店铺*/
      lookShop(){
         this.$router.push({path:"/shophome",query:{storeId:this.storeId}});
      },

      Collect(){
         api.ajaxLaoding('',
           "Goods/collectionGoods",{"goodId":this.$route.query.id}
          ).then(res=>{
                console.log(res);
                if(res.data.result.Message == "关注成功！"){
                this.goodInfo.hasCollect = true;
                this.$vux.toast.show({
                          text: '收藏成功',
                          type:"text",
                          time:1000
                     });
                }else {
                      this.$vux.toast.show({
                          text: '收藏失败请检查网路',
                          type:"text",
                          time:1000
                     });
                    }
             });
      },
     popCart(){
         api.ajaxLaoding('',
           "Goods/SkuInfo",{"goodId":this.$route.query.id}
          ).then(res=>{
                console.log(res)
                var data = res.data.result;              
                this.selectData = data;
                this.selectVule = this.selectData[0];
                this.show2 = true;
             });
     },
      /*价格转换*/
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

       addCart(){
        if(this.selectVule.storage == 0){
           alert("没有库存了");
           return;
        }
        api.ajaxLaoding('',
           "Cart/addCart",{"goodId":this.$route.query.id,"skuId":this.selectVule.id,"num":this.num,"price":this.selectVule.price}
                  ).then(res=>{
                    console.log(res);
                   this.$vux.toast.show({
                       text: '添加成功'
                  })
                   this.goodInfo.cartNum = this.goodInfo.cartNum + this.num;
                  }).catch(()=>{
                    console.log("失败");
             }); 
      },
      lookImgs(c,x){
         wx.lookImg(x,this.liData[c].showProductImg)
      }

    },

     computed:{
    maxNmb(){
      return this.selectVule.storage;
    },
     storeNmb(){
      return "库存 "+ this.selectVule.storage;
    },
   /* 总价*/
    totPic(){
      return this.selectVule.price * this.num;
    }
   },

    components: {
    Spinner,
    Checker,
    CheckerItem,
    XNumber,
    Popup,
    Group,
    Icon
  }
  }
</script>

<style lang="less" src="../../../static/style/popup.less" scoped></style>
<style lang="less" scoped>

@rem: 23.45rem;
    .header {
        background-color: #fff;
        margin-bottom: 5/@rem;
        padding: 10/@rem 0 8/@rem 0; 
        position: fixed;
        top:45/@rem;
        background-color: #fff;
        left:0;
        right: 0;
        border-bottom: 1px solid #fbf9fe;
        border-top: 3px solid #fbf9fe;
       .left {
         text-align:  center;
         width: 130/@rem;
         padding-left: 12/@rem;
         h4 {
           font-weight: normal;
         }
         .price {
          font-size: 22/@rem;
         }
       } 
       .right {
          width: 230/@rem;
          span {
            display: inline-block;
            border-radius: 6/@rem;
            padding: 3/@rem 5/@rem;
            font-size: 12/@rem;
            margin-bottom: 5/@rem;
            margin-right: 5/@rem;
            background-color: #ffdfde;

          }
          span.negative {
              background-color: #eee;
              color: #fff;
          }
          span.active {
             background-color: red;
             color: #fff;
          }
       }
    }
.content {
    ul {
      padding-top:  75/@rem;
      padding-bottom: 50/@rem;
      li{margin-bottom: 5/@rem; background-color: #fff; padding: 5/@rem 0}
    }
    .head {
        border-bottom: 1px solid #eee;
        padding: 7/@rem 0 5/@rem 0; 
        
        .star {
           color: #eee;
           font-size: 17/@rem;
        }
        .star.active {
           color: #ff0000;
        }
       .left {
         color: #666;
         
         font-size: 14/@rem;
         img{ 
             height: 40/@rem;
             width: 40/@rem;
             border-radius: 50%;
             margin-left: 15/@rem;
             margin-right: 10/@rem;
         }
       }
       .right {
         padding-right: 15/@rem;
         font-size: 13/@rem;
         padding-top: 15/@rem;
       }
    }
   .text {
      padding: 10/@rem 15/@rem;
      p {
         text-indent: 1em;
         font-size: 14/@rem;
      }
   } 
   .imgwarp {
      padding: 10/@rem 11.5/@rem;
     img {
       margin: 0 4/@rem;
       width: 79.6/@rem;
       height: 79.6/@rem;
       float: left;
     }
   }
}
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
 .commentTs {
    text-align: center;
    i { font-size: 45/@rem;margin-bottom: 30/@rem;color: #ddd;}
 }
 .detailFoot {
       height: 50/@rem;
      
       background-color: #fff;
       border-top: 1px solid #eee;
       left: 0;
       right: 0;
       bottom: 0;
       position: fixed;
       .left a {
          color: #545352;
       }
       .left{
         font-size: 22/@rem;
         width: 50/@rem;
         text-align: center;
         position: relative;
         height: 100%;
         padding-top: 5/@rem;
         
         color: #545352;
         .text {font-size: 12/@rem;
               position: absolute;
               border-bottom: 0;
               left: 12/@rem;
               bottom:3/@rem;

         }
         .text.cartText {
              left: 8/@rem;
         }
          .incon{
             position: absolute;
             right: 0/@rem;
             top:3/@rem;;
             line-height: 22/@rem;
             background-color: red;
             color: #fff;
             z-index: 999;
             border-radius:100%;
             text-align: center;
             min-width: 20/@rem;
             height: 20/@rem;
             padding: 0 3/@rem;
             font-size: 13/@rem;
            }
       }
       .left.iconActive{
          color: red;
       }
         .cart {
          background-color: red;
          color: #fff;
          padding: 0 15/@rem;
          float: right;
          font-size: 14/@rem;
          line-height:  52/@rem;
          
         }
         .buy{
          background-color: #ffb900;
          color: #fff;
          padding: 0 15/@rem;
          float: right;
          font-size: 18/@rem;
          line-height:  52/@rem;
         }
       
    }
</style>