<template>
    <div class="shop">
        <div class="searchWarp clearfix">
             <div class="left" @click.prevent="goBack">
               <i class="fa fa-angle-left"></i>
              </div>
             <div class="right ss" @click.prevent="sreach">搜索</div>
             <div class="inputBox3 right">
                 <span class="icon-放大镜 icon"></span>
                 <input type="text" name="adf" placeholder="店内搜索" id="inputbox" v-model="msg">
                 <icon type="cancel" style="color:#999;" v-show="msg" class="dele" @click.native="dele"></icon>
            </div>
      </div>
      <div class="content" v-show="bannerData">
           <div class="goShop"  v-show="bannerData">
              <img :src="bannerData.logo" @click.prevent="showShopInfo">
              <h4 @click.prevent="showShopInfo">
                 {{bannerData.name}}
                 <!-- <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                 <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                 <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                 <span><i class="fa fa-heart" aria-hidden="true"></i></span> -->
              </h4>
             
              <div class="right collect" @click.prevent="have" v-show="!bannerData.hasCollect" v-text="sc">  
                        
              </div>
              <div class="right collect yes" @click.prevent="nohave" v-show="bannerData.hasCollect">  
                         已<br/>
                         收藏
              </div>
               <div class="right all" @click.prevent="golist">
                  全部商品<br/>{{bannerData.productCount}}
              </div>
          </div>
         <!--  <div class="banner">
              <swiper :list="bannerData" :aspect-ratio="250/500" ></swiper>
         </div> -->
         <div class="banner">
            <x-img :src="bannerData.banner" error-class="ximg-error" ></x-img>
         </div>
         <div class="sellHot">
              <hot :params="hotParams"></hot>
         </div>
      </div>

      
            <popup v-model="showPopup" position="right" width="100%">
              <div class="position-horizontal-demo">
                <div class="wrap">
                    <div class="introduce" @click="closeThis">
                          <h4>店铺名称：</h4>
                          <p>{{shopData.name}}</p>
                     </div>
                    <div class="introduce">
                          <h4>店铺公告：</h4>
                          <p>{{shopData.announcement}}</p>
                     </div>
                     <div class="introduce">
                          <h4>店铺介绍：</h4>
                          <p>{{shopData.desc}}</p>
                     </div>
                     <div class="introduce">
                          <h4>店铺评分：</h4>
                          <p>描述相符：<span class="price">{{shopData.descriptionPoint}}</span></p>
                          <p>服务态度：<span class="price">{{shopData.servicePoint}}</span></p>
                          <p>发货速度：<span class="price">{{shopData.deliveryPoint}}</span></p>
                     </div>
                    <!--  <div class="introduce">
                          <h4>店铺最近成交量：</h4>
                          <p>15225笔</p>
                     </div> -->
                     <div class="close"  @click="closeThis">
                         <icon type="clear" ></icon>
                     </div>
                </div>
              </div>
           </popup>
     
    </div>
</template>

<script type="ecmascript-6">
import { Swiper } from 'vux';
import api from '@/api';
import hot from  '@/components/share/hotList';
import { Icon } from 'vux'
import { XImg } from 'vux';
import { TransferDom, Popup } from 'vux';
const swiperData = [{
  url: '/list',
  img: 'https://static.vux.li/demo/1.jpg',
  title: '1'
}, {
  url: '/list',
  img: 'https://static.vux.li/demo/2.jpg',
  title: '2'
}, {
  url: '/list',
  img: 'https://static.vux.li/demo/5.jpg',
  title: '3',
  fallbackImg: 'https://static.vux.li/demo/3.jpg'
}]

export default {
    name: '',
    data(){
      return {
      	index:0,
        bannerData:"",
        bannerImg:"",
        msg:"",
        hotParams:{
           action:"Home/hotSales",
           storeId:"",
           title:"热销商品"
        },
        shopData:{},
        sc:"",
        showPopup:false,
      }
    },
    created:function(){
      this.hotParams.storeId = this.$route.query.storeId;
      api.ajaxLaoding('',
      "Store/index",{"storeId":this.$route.query.storeId}
    ).then(res=>{
      var data = res.data.result;
       this.sc = "收藏";
       this.bannerData = data;
       this.shopData = data;
       
    }).catch(()=>{
      console.log("失败");
    })
    },

    mounted() {
         
      },

    methods:{
    	goBack(){
    		 window.history.go(-1);
    	},

      golist(){
        this.$router.push({path:"/searchList",query:{storeId:this.$route.query.storeId,"storeName":this.bannerData.name}});
      },

      showShopInfo(){
        this.showPopup = true;
      },
      closeThis(){
        this.showPopup = false;
      },
     

      have(){
        api.ajaxLaoding('',
          "Store/collectionStore",{"storeId":this.$route.query.storeId}
        ).then(res=>{
         /* console.log(res);*/
          if(res.data.result.Message == "关注成功！"){
               this.bannerData.hasCollect = true;
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
        }).catch(()=>{
          console.log("失败");
        })
      },

      nohave(){
        api.ajaxLaoding('',
          "Store/cancelCollectionStore",{"storeId":this.$route.query.storeId}
        ).then(res=>{
         /* console.log(res);*/
          this.bannerData.hasCollect = false;
          if(res.data.result.Message == "取消关注成功！"){
               this.bannerData.hasCollect = false;
               this.$vux.toast.show({
                text: '取消收藏成功',
                type:"text",
                time:1000
           });
          }else {
            this.$vux.toast.show({
                text: '取消收藏失败请检查网路',
                type:"text",
                time:1000
           });
          }
        }).catch(()=>{
          console.log("失败");
        })
      },

      dele(){
        this.msg = "";
      },
      sreach(){
         this.$router.push({path:"/searchList",query:{storeId:this.$route.query.storeId,"storeName":this.bannerData.name,"word":this.msg}});
      }
    },
   
   components: {
     Swiper,
     hot,
     Icon,
     XImg,
     Popup
  }
  }
</script>
<style lang="less" src="../../../static/style/search.less" scoped></style>
<style lang="less" scoped>

@rem: 23.45rem;
     .shop {
       width: 100%;
       height: 100%;
     /*  position: relative;
       overflow-x: hidden;*/
     }
     .popus {
       width: 100%;
       height: 100%;
       background-color: green;
       position: absolute;
       left: 100%;
       right: 0;
       top: 0;
       z-index: 900;
       transition: all 0.3s ease 0s;
     }
       .content {
       padding-top: 47/@rem;
       width: 100%;
       overflow: hidden;
       padding-bottom: 10/@rem;
     }
 
    .goShop {
       background-color: #fff;
       overflow: hidden;
       padding: 19/@rem 0 0 16/@rem;
       border-bottom: 1px solid #eee;
       height: 88/@rem;
       img {
         width: 50/@rem;
         height: 50/@rem;
         float: left;
         margin-right: 10/@rem;
       }
       
       h4 { 
           float: left;
           font-weight: normal;
           padding-top: 5/@rem;
           width: 110/@rem;
           height: 45/@rem;
           overflow: hidden;
           line-height: 20/@rem;
           span {
              color: #ff9712;
           }
       }

   
       .right {
         width: 105/@rem;
         text-align: center;
         height: 55/@rem;
         color: #838282;
        
       }
         .all {
            
             border-right:  1px solid #eee;
             padding-top: 7/@rem;
          }
          .collect {
            padding-top: 12/@rem;
            width: 75/@rem;
            
          }
           .collect.yes {
             padding-top: 8/@rem;
            width: 75/@rem;
            line-height: 19/@rem
          }
    }
    /*.banner {
       width: 100%;
       margin-bottom:5/@rem;
       background-color: #fff;
    }*/
    .banner {
       height: 160/@rem;
       width: 100%;
       margin-bottom: 8/@rem;
       img {
         width: 100%;
         height: 100%;
       }
    }
    
    /*.sellHot {
       background-color: #fff;
    }*/
     .introduce {
      .title {
         display: inline-block;
      }
       background-color: #fff;
       padding: 10/@rem 15/@rem;
       border-bottom: 1px solid #eee;
       h4 {
         font-weight: normal;
         margin-bottom: 5/@rem ;
       }
       p {
        font-size: 14/@rem ;
        text-indent: 2em;
       }
       span {
          font-size: 14/@rem ;
       }
    }
    .wrap {
      width: 100%;
      height: 100%;
      background-color: #fff;
      position: relative;
    }
    .close {
         height:80/@rem;
         line-height: 80/@rem;
         text-align: center;
         i {
           font-size: 20/@rem ;
            color: green;
         }
    }
</style>