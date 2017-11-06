<template>
    <div class="wrap">
    <div class="content">
    	<div class="info">
    		<swiper  height="180px" dots-position="center">
            <swiper-item v-for="(item,index) in goodInfo.pics" :key="index"  @click.native="lookImg(index)">
               <img :src="item">
            </swiper-item>
       </swiper>
    	</div>
    <div class="goodInfo" v-show="goodInfo" id="goodInfo">
    	<h4>{{goodInfo.title}}</h4>
    	<p>商品价：<span class="price">￥{{goodInfo.price}}</span > <s class="TagR">￥ {{goodInfo.highestPrice}}</s></p>
    	<p>库存: <span>{{goodInfo.storage}} </span><span class="TagR">销量：{{goodInfo.saleNum}}</span></p>
      <p>邮费: <span class="price">{{goodInfo.postage}}</span></p>
    	<div class="tag">
          <span>{{goodInfo.introduction}}</span>
      </div>
    </div>
    </div>
      <div class="brief" v-show="goodInfo">
         <div class="title">商品简介</div>
         <div class="rightIcon" @click.prevnet="godetail">详细参数<i class="fa fa-angle-right"></i></div>
      <div class="clearfix"></div>
    </div>
     <div class="brief" v-show="goodInfo">
         <div class="title">商品评价 ( {{commtData.totalCount}} )</div>
      <div class="clearfix comment" v-show="commtData.evaList.length > 0" v-if ="commtData.evaList">
         <ul>
            <li v-for="(item,c) in commtData.evaList">
              <div class="head clearfix">
                  <div class="left"><img :src="item.userAvate"></div>
                  <div class="left">
                    <p>{{item.userName}}</p>
                    <p><span class="icon-星星 star" v-for="(item,index) in 5" :class="{active:index < commtData.evaList[c].starNum}"></span></p>
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
          <div class="more">
              <span @click.prevnet="goCommont">查看全部评价</span>
          </div>
      </div>
      <div class="zw" v-if ="commtData.evaList"  v-show="commtData.evaList.length < 1">
         暂无评价~！
      </div>
    </div>    

   
      <div class="goShop" v-show="goodInfo">
        <img :src="goodInfo.storeLOGO">
        <h4>{{goodInfo.storeName}}<br/>
          <!--  <span><i class="fa fa-heart" aria-hidden="true"></i></span>
           <span><i class="fa fa-heart" aria-hidden="true"></i></span>
           <span><i class="fa fa-heart" aria-hidden="true"></i></span>
           <span><i class="fa fa-heart" aria-hidden="true"></i></span> -->
        </h4>
        <div class="right">
           <span  @click.prevent="lookShop">进店看看</span>
        </div>
    </div>
     <div class="shopInfoWarp" v-show="goodInfo">
        <div class="shopInfo">
           <div class="i1">描述相符：<span class="price">{{goodInfo.descScore}}</span></div>
           <div class="i2">服务态度：<span class="price">{{goodInfo.serviceScore}}</span></div>
           <div class="i3">发货速度：<span class="price">{{goodInfo.sendScore}}</span></div>
        </div>
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




    <!--  <popup v-model="show">
        <div class="popupWrapdetail" style="height:auto;">
          <div class="standard">
            <h5>规格</h5>
            <div class="checkeBoxdetail">
                 <checker v-model="selectVule" radio-required default-item-class="secletItem" selected-item-class="secletItemActive">
                    <checker-item :value="item" v-for="(item, index) in selectData" :key="index">{{item.name}}</checker-item>
                </checker>  
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
              <div class="left icon"><i class="fa fa-heart"></i></x-icon></div>
              <div class="left icon"><i class="fa fa-shopping-cart"></i>
                  <div class="incon">{{cartnum}}</div>
              </div>
              <div class="left tolprice"><span class="price">¥ <span>{{price(totPic)}}</span></span></div>
              <div class="right cart" @click.prevent="goBuy">立即购买</div>
        </div>
    </div>
    </popup> -->
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
import { Tab, TabItem } from 'vux';
import { Swiper, SwiperItem} from 'vux';
import { Checker , CheckerItem , Group, XNumber ,XButton } from 'vux';
import { Popup } from 'vux';
import { Icon } from 'vux';
import api from '@/api';
import axios from 'axios';
import { Indicator } from 'mint-ui';
import wx from '@/awx';
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
      goodImg:[],
      goodInfo:"",
      commtData:"",
      show:false,
      show2:false,
       /*选择*/
      num:1,
      cartnum:20,
     /* maxShore:99,*/
      selectData: [],
      selectVule: {},
      thisStand:0,
      radio:false,
      statdisable:true,
      demo1Required:"",
      info:"",
      data6:3.5,
      storeId:""
    }
    },

    created:function(){
      Indicator.open('加载中...');
      var _this = this;
function info(){
        return api.ajax('',
          "Goods/ShowNew",{"goodId":_this.$route.query.id}
        );
    }
function comment(){
      return api.ajax('',
           "Goods/getGoodEvaluateList",{"goodId":_this.$route.query.id,"star":0,"pageIndex":1,"pageSize":2,"usePic":false}
       );
  }

 axios.all([info(),comment()])
    .then(axios.spread(function(info,com){
          console.log(com);
           var c = info.data.result;
            _this.storeId = c.storeId;
            _this.goodInfo = c;
         _this.commtData = com.data.result; 
         _this.goodInfo = info.data.result;
         _this.storeId = info.data.result.storeId;
         Indicator.close(); 
    }));  





  /* api.ajaxLaoding('',
     "",{"goodId":this.$route.query.id}
    ).then(res=>{
      var c = res.data.result;
      this.storeId = c.storeId;
      this.goodInfo = c;
      this.goodImg = c.pics.map( item => {
                     return {
                               url:"",
                               img: item,
                               title: ''
                            }
     });
    }).catch(()=>{
      console.log("失败");
    });*/
    },

    methods:{
      /*返回按钮*/
    	goBack(){
         window.history.go(-1);
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
      /*弹出购物车框*/
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
      /*去Tab评论*/
      goCommont(){
        this.$router.replace({path:"/detailbridge", query: { id: this.$route.query.id,"page":2}});
      },
      /*去Tab详情*/
       godetail(){
         this.$router.replace({path:"/detailbridge", query: { id: this.$route.query.id,"page":1}});
      },
       /*加入购物车*/
      addCart(){
        if(this.selectVule.storage == 0){
           alert("没有库存了");
           return;
        }
        api.ajaxLaoding('',
           "Cart/addCart",{"goodId":this.$route.query.id,"skuId":this.selectVule.id,"num":this.num,"price":this.selectVule.price}
                  ).then(res=>{
                   this.$vux.toast.show({
                       text: '添加成功'
                  })
                   this.goodInfo.cartNum = this.goodInfo.cartNum + this.num;
                  }).catch(()=>{
                    console.log("失败");
             }); 
      },
      
      
    /*选择型号*/
      choiceStand(index){
        this.thisStand = index;
        this.selectVule = this.selectData[index];
      },
      /*去店铺*/
      lookShop(){
         this.$router.push({path:"/shophome",query:{storeId:this.storeId}});
      },
      /*收藏商品*/
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
      
      /*微信放大图片*/
     lookImg(index){
        wx.lookImg(this.goodInfo.pics[index],this.goodInfo.pics);
     },
    lookImgs(c,x){
        wx.lookImg(x,this.commtData.evaList[c].showProductImg)
     }
    },

   computed:{
    /*限制数量点击最大*/
    maxNmb(){
      return this.selectVule.storage;
    },
      /*设置库存*/
     storeNmb(){
      return "库存 "+ this.selectVule.storage;
    },
   /* 计算总价*/
    totPic(){
      return this.selectVule.price * this.num;
    }
   },

    components: {
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
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
    .wrap {
       margin-bottom: 40/@rem;
    }
    .detail_header {
    	position: fixed;
    	left: 0 ;
    	right:  0;
    	background-color: #fff;
    	border-bottom: 1px solid #eee;
    	.tab_header {
         width: 200/@rem;
         margin: 0 auto;
         background-color: #fff;
         }
         span {
         	position: absolute;
         	display: block;
         	height: 40/@rem;
         	width: 40/@rem;
         	padding-top: 4/@rem;
         	font-size: 28/@rem;
         	text-align: center;
         }
    }
    .content {
      background-color: #fff;
      padding-bottom: 5/@rem;
      margin-bottom: 5/@rem;
    }
    .shopInfoWarp {
       width: 100%;
       background-color: #fff;
       padding-bottom: 5/@rem;
    }
    .goodInfo{
    	padding:5/@rem 15/@rem  10/@rem 15/@rem;
    	h4 {
    		    overflow: hidden;
				text-overflow:ellipsis;
				white-space: nowrap;
				margin-bottom: 8/@rem;
        font-weight: normal;
    	}
    	p {
    		margin-bottom: 6/@rem;
    		font-size: 14/@rem;
    	}
    	.tag {
    		font-size: 12/@rem;
    		span {
    			display: inline-block;
    			background-color: red;
    			color: #fff;
    		    padding: 2px 8/@rem;
    		    border-radius: 5px;
    		    margin-right: 10/@rem;
    		}
    	}
      .TagR{
         margin-left: 15/@rem;
      }
    }
   
    .brief {
         font-size: 14/@rem;
    	 background-color: #fff;
    	 padding: 5/@rem 15/@rem 5/@rem 15/@rem;
       margin-bottom: 5/@rem;
       position: relative;
         .rightIcon {
           position: absolute;
           right:15/@rem;
           top:9/@rem;
           font-size: 14/@rem;
           i {margin-left: 10/@rem;}
         }
         .title {
         	 height: 35/@rem;
         	 line-height: 30/@rem;
         	 border-bottom: 1px solid #eee;
         }
    
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
    .goShop {
       background-color: #fff;
       overflow: hidden;
       padding: 15/@rem 15/@rem;;
       img {
        
         padding: 3px;
         width: 50/@rem;
         height: 50/@rem;
         float: left;
         margin-right: 10/@rem;
       }
       
       h4 { 
           float: left;
           font-weight: normal;
           padding-top: 13/@rem;
           padding-left: 11/@rem;
           span {
              color: #ff9712;
           }
       }
       .right {
          padding-top: 15/@rem;
          span {
             padding: 6/@rem 12/@rem  3/@rem 12/@rem;
             border:1px solid #666;
             color: #666;
             font-size: 14/@rem;
          }
       }
    }
    .shopInfo {
       
       background-color: #fff;
       position: relative;
      font-size: 14/@rem;
      margin:  0 15/@rem; 
      padding-bottom: 10/@rem;
       .i2{
         text-align: center;
       }
        .i1{
        position: absolute;
        left: 0;
        width: 40%;
       }
        .i3{
         position: absolute;
         right: 0;
         width: 40%;
         top:0;
         text-align: right;
       }
    }

   
    .comment {

    ul {
        li{ background-color: #fff; padding: 5/@rem 0;/*border-bottom:1px solid #ddd;*/}
    }
    .head {
        border-bottom: 1px solid #eee;
        padding: 7/@rem 0 5/@rem 0; 
        .star {
           color: #eee;
           font-size: 16/@rem;
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
      padding: 10/@rem 0;
      margin-left: 1px;
     img {
       margin: 0 3/@rem;
       width: 79.6/@rem;
       height: 79.6/@rem;
       float: left;
     }
   }
   .more {
     padding:10/@rem 0 15/@rem 0;
      span {
          display: block;
          border:1px solid #525354;
          padding: 3/@rem 6/@rem;
          width: 110/@rem;
          text-align: center;
          color: #525354;
          margin: 0 auto;
      }
   }
  
}
.zw {
     padding: 5/@rem 0;
  }
  .info img {
     display: block;
     height: 100%;
     margin: 0 auto;
  }
</style>