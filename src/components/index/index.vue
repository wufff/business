<template>
  <div>
      <div class="clearfix" id="header">
          <span class="icon-分类二 classfiyIcon" @click.prevent="goClassfiy"></span>
          <span class="icon-购物车 cart"  @click.prevent="goCart"></span>
         
         <div class="inputBox" @click.prevent="goReach">
            <span class="icon-放大镜 icon"></span>
            <span style="color: #ddd" >海量商品从这里搜索</span>
         </div>
      </div>
      <div class="index_content" >
          <div class="banner">
              <!-- <swiper :list="bannerData" loop auto :interval=2000 :aspect-ratio="340/790"  ></swiper> -->
              <swiper  loop auto :interval=3000 height="6.88230277rem">
                  <swiper-item v-for="(item,index) in bannerData" :key="index" >
                      <img :src="item.img">
                  </swiper-item>
              </swiper>
         </div>
         <div class="classfiy clearfix" id="index_classfiy">
             <router-link :to="{path:'/list',query:{cate:item.id}}" v-for="(item,index) in classData" :key="index" v-if="index < 8">
                 <img v-lazy="item.image">
                <p>{{item.name}}</p>
             </router-link>
         </div>
         <div class="goods_active clearfix" v-show="activeData.length > 0">
            <h5>热门活动</h5>
            <div v-for="item in activeData">
               <a href="#">
                 <img v-lazy="item.image">
               </a>
            </div>
            
         </div> 
         <div class="hot_wrap" v-show="activeData.length > 0">
            <hot :params="hotParams"></hot>
         </div>
         </div>
      <foot></foot>
  </div>
</template>

<script type="ecmascript-6">
import foot from '@/components/share/foot';
import { Swiper, SwiperItem } from 'vux';
import api from '@/api';
import hot from  '@/components/share/hotList';
import { Indicator } from 'mint-ui';

    export default {
    name: '',
    data(){
      return {
      	title:"",
        bannerData:[],
        classData:[],
        hotData:[],
        activeData:[],
        hotParams:{
           action:"Home/hotSales",
           storeId:"",
           title:"热销商品"
        }
      }
    },

     beforeCreate:function(){
       var storage = window.localStorage;
       storage.setItem("goback","");
    }, 


    created:function(){
        api.ajaxLaodingN('',
       "Home/index",{}
    ).then(res=>{
        console.log(res);
        this.bannerData = res.data.result.campaigns.map( item => {
                     return {
                               url:"",
                               img:item.image,
                               title: ''
                            }
               });
        this.classData =  res.data.result.categories;
        this.activeData =  res.data.result.adverts;

    }).catch(()=>{
      console.log("失败");
    });
    },

    mounted:function(){ 
      /*修复iOS滚动问题*/
      setTimeout(function(){
      document.body.scrollTop = 0;
    },350);
    },
    /*updated: function () {
     Indicator.close();
    },*/

    methods:{
    	goClassfiy(){
         this.$router.push({path:"/classfiy"});
      },
      goReach(){
        this.$router.push({path:"/search"});
      },
      goCart(){
        this.$router.push({path:"/cart"});
      }
    },

    components: {
      foot,
      Swiper,
      hot,
      SwiperItem
  }

  }
</script>
<style lang="less" scoped>
@rem: 23.45rem;
   #header {
       position: fixed;
       z-index: 560;
       top:0;
       left:0;
       right: 0;
       padding: 5/@rem 0 0/@rem 0;
       width: 100%;
       background-color: #fff;
       border-bottom: 1px solid #ddd; 
       height: 40/@rem;
       .left {
         padding-top: 2/@rem;
         width: 28/@rem;
         text-align: center;
        } 

        span.classfiyIcon {
          font-size: 22/@rem;
          position: absolute;
          left:13/@rem;
          top:9/@rem;
        }

        span.cart {
           font-size: 22/@rem;
          position: absolute;
          right:13/@rem;
          top:9/@rem;
          
        }
      
        .inputBox {
         background-color: #eee;
         padding: 2/@rem 5/@rem 2/@rem 5/@rem;
          position: absolute;
          left:48/@rem;
          top:7/@rem;
         
        

           width: 280/@rem;
          
          border-radius: 5/@rem;
          font-size: 16/@rem;
          span.icon {margin: 0 3/@rem;position: relative;top:1px;}
          #inputbox::placeholder {
            color:#c7c7c7;
          }
          
        
      } 
     
    }
 
  .index_content {
    padding-top: 40/@rem;
    padding-bottom: 58/@rem;

  }
   .banner {
    background-color: #fff;
  }
  .classfiy {
     margin-bottom: 8/@rem;
     background-color: #fff;
     padding: 20/@rem 15/@rem 5/@rem 15/@rem;
  }
  .classfiy > a {
     width: 25%;
     float: left;
     text-align: center;
     font-size: 13/@rem;
     margin-bottom: 15/@rem;
     img {
       width: 30/@rem;
       margin: 0 auto;
       display: block;
       margin-bottom: 10/@rem;
     }
  }

  .hot_wrap {
       
    }
    .goods_active {
       background-color: #fff;
       padding: 10/@rem 8/@rem 14/@rem 8/@rem;
       margin-bottom: 8/@rem;
       h5 {
         font-weight: normal;
         padding-left: 20/@rem;
         padding-bottom: 2/@rem;
         font-size: 16/@rem;
       }
       a {
         display: block;
         padding: 8/@rem 0 0 0;
         height: 170/@rem; 
         img {
           width: 100%;
           height: 100%;
           border-radius:5px; 
         }
       }
    }
    .goods_active  > div {
       width: 100%;
      /* float: left;*/
    }
    
</style>