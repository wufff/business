<template>
    <div class="detailWap">
       <div v-html="data" class="detailContent">
           
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
import { Popup } from 'vux';
import axios from 'axios';
import { Group, XNumber } from 'vux';
    export default {
    name: '',
    data(){
      return {
      	data:"",
        goodInfo:"",
        show2:false,
        goodInfo:"",
        selectData: [],
        selectVule: {},
        num:1,
        thisStand:0,
      }
    },

     created:function(){
      var _this = this;
  /* 底部信息  */ 
  function info(){
        return api.ajax('',
          "Goods/ShowNew",{"goodId":_this.$route.query.id}
        );
      }
 /*详情内容*/
function description(){
        return api.ajax('',
          "Goods/ShowDescription",{"goodId":_this.$route.query.id}
        );
      }
axios.all([info(),description()])
    .then(axios.spread(function(info,descr){
          console.log(info);
          console.log(descr);
          _this.goodInfo = info.data.result;
         _this.storeId = info.data.result.storeId;
          var html = descr.data.result;
          _this.data = html;
           

    })); 


    /*    api.ajaxLaoding('',
         "Goods/ShowDescription",{"goodId":this.$route.query.id}
        ).then(res=>{
           console.log(res);
           var html = res.data.result;
            this.data = html;
        }).catch(()=>{
          console.log("失败");
        });
    */


    },

     updated: function (){
          var imgs = document.querySelectorAll("img");
            for (let i = 0 ; i<imgs.length ; i++){
                imgs[i].style.width = '100%';
           }
       },

    methods:{
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
    popCart(){
          api.ajaxLaoding('',
           "Goods/SkuInfo",{"goodId":this.$route.query.id}
          ).then(res=>{
                console.log(res);
                var data = res.data.result;              
                this.selectData = data;
                this.selectVule = this.selectData[0];
                this.show2 = true;
             });
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
      /*去店铺*/
       lookShop(){
         this.$router.push({path:"/shophome",query:{storeId:this.storeId}});
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
       Popup,
       Group
    }
  }
</script>
<style lang="less" src="../../../static/style/popup.less" scoped></style>
<style lang="less" scoped>
@rem: 23.45rem;
    .detailContent {
       padding-bottom: 50/@rem;
    }
    .detailWap img {
       width: 100%;
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