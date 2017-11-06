<template>
    <div>
       <div class="pu_header clearfix" >
         <span @click.prevent="goback"><i class="fa fa-angle-left"></i></span>
         <div class="left" >发布评价</div>
		       <div class="right" @click.prevnet="fb" style="color:#ff3100">发布</div>
        </div>
       <div class="c_content">
       	  <ul class="content" v-show="liData">
       	  	 <li class="item">
       	  	 	<ul class="item-ul">
                <li v-for="(item,index) in liData.productList">
                  <div class="head clearfix">
                     <img :src="item.imgUrl">
                     <div class="left starWrap">
                         <span class="icon-星星" v-for="(item,c) in 5" :class="{active:c < liData.productList[index].descProductScore}"
                         @click.prevent="appraise(index,c)"></span>
                      </div>
                     <div class="left text">
                         <span>{{fontText(item.descProductScore)}}</span>
                     </div>
                  </div>
                  <div class="inner">
                     <textarea placeholder="商品还满意吗？说说他的优点和美中不足的地方法吧" class="textarea"
                     v-model="item.message"></textarea>
                  </div>
                  <div class="imgwarp clearfix">
                      <img :src="item" v-for ="(item,x) in item.showImgUrls" @click.prevent="delel(index,x)"> 
                      <div class="add" @click.prevent="onLoadImg(index)" v-show="item.showImgUrls.length<4">
                        <span class="icon-照相"></span><br/>
                         +
                      </div>
                  </div>
                </li>
       	  	 	</ul>
       	  	 	<div class="shop_score">
       	  	 		<h4><span class="icon-商店 icon"></span>{{liData.storeName}}</h4>
       	  	 		<p>服务态度：
                    <span class="icon-星星" v-for="(item,index) in 5" :class="{active:index < liData.sendScore }"
                         @click.prevent="appraiseSen(index)"></span>
                         <span class="text">{{fontText(liData.sendScore)}}</span> 
                </p>
                <p>物流速度：
                     <span class="icon-星星" v-for="(item,index) in 5" :class="{active:index < liData.serviceScore }"
                         @click.prevent="appraiseSer(index)"></span>
                    <span class="text">{{fontText(liData.serviceScore)}}</span>   
                </p>
       	  	 	</div>
       	  	 </li>
       	  </ul>
       </div>
    </div>

</template>

<script type="ecmascript-6">
import api from '@/api';
import wx from '@/awx';
    export default {
    name: '',
    data(){
      return {
      	liData:"",
        star:5
      }
    },
    created:function(){
        var orderInfoId = this.$route.query.orderInfoId;
       /* var storeId = this.$route.query.storeId;
        var goodIds = this.$route.query.goodIds.split("-"); */
        api.ajaxLaoding('',
         "Order/evaluate",{"orderInfoId":orderInfoId}
        ).then(res=>{
          console.log(res);
          var datas = res.data.result;
          this.liData  = datas;
        /* console.log(this.liData);*/
        }).catch(()=>{
          console.log("失败");
        });
    },
     updated: function () {
         var autoTextarea = function (elem, extra, maxHeight) {
        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
        isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
                addEvent = function (type, callback) {
                        elem.addEventListener ?
                                elem.addEventListener(type, callback, false) :
                                elem.attachEvent('on' + type, callback);
                },
                getStyle = elem.currentStyle ? function (name) {
                        var val = elem.currentStyle[name];
 
                        if (name === 'height' && val.search(/px/i) !== 1) {
                                var rect = elem.getBoundingClientRect();
                                return rect.bottom - rect.top -
                                        parseFloat(getStyle('paddingTop')) -
                                        parseFloat(getStyle('paddingBottom')) + 'px';        
                        };
 
                        return val;
                } : function (name) {
                                return getComputedStyle(elem, null)[name];
                },
                minHeight = parseFloat(getStyle('height'));
 
        elem.style.resize = 'none';
 
        var change = function () {
                var scrollTop, height,
                        padding = 0,
                        style = elem.style;
 
                if (elem._length === elem.value.length) return;
                elem._length = elem.value.length;
 
                if (!isFirefox && !isOpera) {
                        padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
                };
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
 
                elem.style.height = minHeight + 'px';
                if (elem.scrollHeight > minHeight) {
                        if (maxHeight && elem.scrollHeight > maxHeight) {
                                height = maxHeight - padding;
                                style.overflowY = 'auto';
                        } else {
                                height = elem.scrollHeight - padding;
                                style.overflowY = 'hidden';
                        };
                        style.height = height + extra + 'px';
                        scrollTop += parseInt(style.height) - elem.currHeight;
                        document.body.scrollTop = scrollTop;
                        document.documentElement.scrollTop = scrollTop;
                        elem.currHeight = parseInt(style.height);
                };
        };
 
        addEvent('propertychange', change);
        addEvent('input', change);
        addEvent('focus', change);
        change();
};
    
    var textareas = document.querySelectorAll(".textarea");
     for (let i = 0 ; i<textareas.length ; i++){
           autoTextarea(textareas[i]);     
     }
           
        },
    mounted:function(){
      
    },


    methods:{
    	goback(){
    		window.history.go(-1);
    	},
    	fb(){
       api.ajaxLaoding('',
         "Order/writeEvaluate",{"productEvaluate":this.liData.productList,"serviceScore":this.liData.serviceScore,"sendScore":this.liData.sendScore,"orderInfoId":this.$route.query.orderInfoId}
        ).then(res=>{
          console.log(res);
         /*if(res.data.result){

         }*/
        this.$router.push({path:"/sucess",query:{"type":"appraise"}});
        }).catch(()=>{
          console.log("失败");
        });
    	},
      /*评价商品*/
      appraise(index,c){
        this.liData.productList[index].descProductScore = c+1;
      },
      /*评价物流*/
      appraiseSen(index){
        this.liData.sendScore = index+1;
      },
      /*评价服务*/
      appraiseSer(index){
        this.liData.serviceScore = index+1; 
        console.log(this.liData.serviceScore);
      },
      fontText(p){
         switch (p) {
           case 1:
             return "非常差"
             break;
          case 2:
             return "差"
             break;
          case 3:
             return "中"
             break;
          case 4:
             return "好"
             break;
          case 5:
             return "非常好"
             break;
           default:
             break;
         }
      },
      onLoadImg(index){
         wx.uploadImg().then(res=>{
          console.log("返回成功");
          if(res.data.result.success == true){
           this.liData.productList[index].showImgUrls.push(res.data.result.filePath);
          }else{
              alert("上失败请检查网路");
          }
        }
       ).catch(()=>{alert("出错");});     
      },
      delel(index,x){
          this.liData.productList[index].showImgUrls.splice(x,1);
      }
    }
  }
</script>

<style lang="less" scoped>
@rem: 23.45rem;
    .c_content {
       padding-top:49/@rem;
    }
    .content {
        .item {
            margin-bottom: 8/@rem;
            padding-bottom: 8/@rem;
           .item-ul {
             border-bottom: 1px solid #eee;
             li {
               border-bottom: 1px solid #eee;
             }
           }
           background-color: #fff;
          .head {
            padding: 6/@rem 15/@rem 5/@rem 15/@rem; 
            border-bottom: 1px solid #ddd;
            img {
               float: left;
               width: 35/@rem;
               height: 35/@rem;
            }
            .starWrap {
              padding-top: 6/@rem;
              font-size: 22/@rem;
              padding-left: 30/@rem;
              color: #eee;
              span {
                 margin-left: 5/@rem;
              }
              span.active {
                color: #f10909;
              }
              span.text {
                 color: #999;
              }

            }
            .text {
                 padding-left: 33/@rem;
                 font-size: 14/@rem;
                 padding-top: 7/@rem;
              }
         }
         .inner {
             padding: 6/@rem 15/@rem 5/@rem 15/@rem; 
             textarea {
               border:none;
               width: 100%;
               min-height: 79/@rem;
               color: #999;
               font-size: 14/@rem;
             }
         }

         .imgwarp {
              padding:0  11.5/@rem  10/@rem 11.5/@rem;
             img {
               margin: 0 4/@rem;
               width: 79.6/@rem;
               height: 79.6/@rem;
               float: left;
             }
             div.add {
               margin: 0 4/@rem;
               width: 65.6/@rem;
               height: 65.6/@rem;
               float: left;
               border: 1px dashed #ddd;
               font-size: 25/@rem;
               text-align: center;
               line-height: 12/@rem;
               padding-top: 10/@rem;
               font-weight: normal;
               color: #ddd;
             }
            }
          .shop_score {
             h4 {
                padding:5/@rem 15/@rem;
                font-weight: normal;
                font-size: 15/@rem;
                margin: 5/@rem 0;
                }
                span {
                   font-size: 20/@rem;
                   vertical-align: text-bottom;
                   margin-right: 5/@rem;
                   color: #eee;
                  }
                span.text {
                  color: #999;
                  font-size: 14/@rem;
                  margin-left: 10/@rem;
                  position: relative;
                  bottom: 1px;
                }
                span.icon {
                   color: #999;
                }
                span.active {
                  color: #f10909;
                 }      
             p {
                font-size: 14/@rem;
                padding-left: 15/@rem;
                margin-bottom: 10/@rem;
             }
          }  
        }

    }
</style>