<template>
    <div class="shop">
      <div class="pu_header clearfix" >
         <span @click.prevent="goback"><i class="fa fa-angle-left"></i></span>
         <div class="left" >全部商品</div>
           <div class="right" @click.prevnet="fb" style="color:#ff3100">发布</div>
      </div>
      <div class="content">
			    <div class="goShop" v-show="bannerData">
             <img :src="'http://www.wayperfect.com/'+bannerData.logo" @click.prevent="showShopInfo">
              <h4 @click.prevent="showShopInfo">
                 {{bannerData.name}}<br/>
                 <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                 <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                 <span><i class="fa fa-heart" aria-hidden="true"></i></span>
                 <span><i class="fa fa-heart" aria-hidden="true"></i></span>
              </h4>
             
              <div class="right collect" @click.prevent="have" v-show="!bannerData.hasCollect" v-text="sc">  
                        
              </div>
              <div class="right collect yes" @click.prevent="nohave" v-show="bannerData.hasCollect">  
                         已<br/>
                         收藏
              </div>
               <div class="right all" @click.prevent="gohome">
                       店铺首页
              </div>
          </div>
			    <!-- <div class="tabbox">
					   <tab  v-model="index">
					      <tab-item @on-item-click="onItemClick">店铺首页</tab-item>
					      <tab-item @on-item-click="onItemClick">全部商品</tab-item>
					   </tab>
			      </div> -->
			    <div class="tablist" v-show="bannerData">
			    	<list action="Search/SearchResultList" :thisProps="listProps"></list>
			    </div>
			 
      </div>
      <div class="popus">
        <shopInfo v-on:recvie="closeThis" :shopData = "shopInfodata"></shopInfo>
     </div>
    </div>
</template>

<script type="ecmascript-6">
import { Tab, TabItem } from 'vux'
import list from '@/components/share/listShare';
import shopInfo from '@/components/shop/shopInfo';
import api from '@/api';
    export default {
    name: '',
    data(){
      return {
      	index:0,
      	scroll:"",
      	listProps :{
              tabfixClass:true,
          },
        shopInfodata:{},
        bannerData:"",
        sc:""
      }
    },
    created:function(){
        this.listProps.storeId = this.$route.query.storeId;
        api.ajaxLaoding('',
      "Store/index",{"storeId":this.$route.query.storeId}
    ).then(res=>{
       var data = res.data.result;
       this.sc = "收藏";
       console.log(data);
       this.bannerData = data;
       this.shopInfodata = data;
    }).catch(()=>{
      console.log("失败");
    })

    },
    mounted() {
         window.addEventListener('scroll', this.changscroll)
    },

    methods:{
    	goBack(){
    		 window.history.go(-1);
    	},
    	gohome(){
    		      this.$router.replace({path:"/shophome",query:{storeId:this.$route.query.storeId}});
    	},
      changscroll(){
          var top = document.body.scrollTop;
          var html = document.querySelector("html");
          var fontSize = html.style.fontSize;
          var font = parseInt(fontSize);
          var num =  88/23.45 * font -2;
         if(top >= num) {
           this.listProps.tabfixClass =false;
         }else {
         	this.listProps.tabfixClass =true;
         }
      },
      showShopInfo(){
        var d = document.querySelector(".popus");
        var s = document.querySelector(".shop");
        s.style.overflowY = "hidden";
        d.style.left = "0"; 
      },
      goSearch(){
         this.$router.push({path:"/search"});
      },
      closeThis(){
         var d = document.querySelector(".popus");
        var s = document.querySelector(".shop");
        s.style.overflowY = "visible";
        d.style.left = "100%"; 
      },
        have(){
        api.ajaxLaoding('',
          "Store/collectionStore",{"storeId":this.$route.query.storeId}
        ).then(res=>{
          console.log(res);
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
          console.log(res);
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
      }
    },

   components: {
     list,
     Tab, 
     TabItem,
     shopInfo
  }
  }
</script>
<style lang="less" src="../../../static/style/search.less" scoped></style>
<style lang="less" scoped>

@rem: 23.45rem;
     .content {
     	 padding-top: 50/@rem;
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
    .goShop {
       background-color: #fff;
       overflow: hidden;
       padding: 19/@rem 0 0 16/@rem;
       border-bottom: 1px solid #eee;
       height: 88/@rem;
       img {
         border:1px solid #999;
         padding: 3px;
         width: 50/@rem;
         height: 50/@rem;
         float: left;
         margin-right: 10/@rem;
       }
       
       h4 { 
           float: left;
           font-weight: normal;
           padding-top: 5/@rem;
           span {
              color: #ff9712;
           }
       }

   
      
       .right {
         width: 105/@rem;
         text-align: center;
         height: 55/@rem;
         color: #545352;
        
       }
         .all {
            
             border-right:  1px solid #eee;
             padding-top: 12/@rem;
          }
          .collect {
            padding-top: 12/@rem;
            width: 75/@rem;
            
          }
          .collect.yes {
            padding-top: 10/@rem;
            width: 75/@rem;
            line-height: 16/@rem
          }
    }
</style>