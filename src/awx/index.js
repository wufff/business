 import api from '@/api';
 window.isClick =  false;
 function suc(){alert("分享成功");}
 export default {
      lookImg(src,arry) {
     wx.ready(function(){
          console.log("微信准备好");
          if(!window.isClick){
          window.isClick = true;
           wx.previewImage({
               current:src, 
               urls: arry
           });
           setTimeout(function () {
            window.isClick = false;         
            }, 700);
        }
         });
      },
      
        uploadImg(){
           console.log("进入微信uploadImg");
           return new Promise((resolve, reject) => {  
         wx.ready(function(){
          console.log("微信准备好");  
            var images = new Object();
                wx.chooseImage({
                count: 1,
                sourceType: ['album', 'camera'],
                success: function(res) {
                   console.log("选择图片成功返回");
                   console.log(res);
                    images.localId = res.localIds;
                    var length = images.localId.length;   
                    if (images.localId.length == 0) {
                        alert('请先选择图片');
                        reject();
                        return;
                    }          
                    function upload() {
                        console.log('运行upload')
                        wx.uploadImage({
                            localId: images.localId[0],
                            isShowProgressTips: 1,
                            success: function(res) {
                              console.log(res);
                                api.ajax('',
                                    "WeChat/getImages",{"mediaId":res.serverId}
                                    ).then(res=>{
                                    console.log("本地jaxa返回成功");
                                    resolve(res);
                                  }).catch(error=>{
                                     console.log("失败");
                                     alert("本地取回图片失败");
                                     reject(error);
                                    
                                   })
                            },
                            fail: function (res) {
                               alert("微信上传图片失败");
                               reject(res);
                                alert(JSON.stringify(res));
                            }
                        });
                    }
                    upload();
                }
            });
            })      
        });    
       
    },

    share(url,
      imgurl="http://www.shootplay.com/mobile/content/static/img/start_logo.png",
      fn=suc,
      descContent="玩摄影\r\n交朋友\r\n享生活"
      )
       {
         /*console.log("213");*/
        wx.ready(function(){
         /*  console.log("分享微信准备好");*/
           /* var imgurl = 'http://www.shootplay.com/mobile/content/static/img/start_logo.png';*/
           var shareTitle = '爱生活 爱摄玩';
           /* var descContent ='玩摄影\r\n斗图片\r\n品趣味'*/
           var hash =  window.location.hash;
           var shareUrl = 'http://www.shootplay.com/mobile/home/Authorize?&'+url
           console.log(shareUrl);
       wx.onMenuShareAppMessage({
             title:shareTitle, // 分享标题
             desc:descContent, // 分享描述
             link:shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
             imgUrl:imgurl, // 分享图标
             type: '', // 分享类型,music、video或link，不填默认为link
             dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
             success:fn,
             cancel: function () { 
             alert("分享失败");
             }
             });
      wx.onMenuShareTimeline({
              title:shareTitle,// 分享标题
              link:shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl:imgurl, // 分享图标
              success: function () { 
                  alert("分享成功")
              },
              cancel: function () { 
                  alert("分享失败")
              }
          });
      wx.onMenuShareQQ({
              title:shareTitle,
              desc:descContent,
              link:shareUrl,
              imgUrl:imgurl, 
               success: function () { 
                      alert("分享成功");
                  },
                cancel: function () { 
                      alert("分享失败");
               }
          });

       wx.onMenuShareWeibo({
                  title:shareTitle, // 分享标题
                  desc:descContent, // 分享描述
                  link:shareUrl, // 分享链接
                  imgUrl:imgurl, // 分享图标
                  success: function () { 
                      alert("分享成功");
                  },
                  cancel: function () { 
                      alert("分享失败");
                  }
              });

       wx.onMenuShareQZone({
               title:shareTitle, // 分享标题
                desc:descContent, // 分享描述
                link:shareUrl, // 分享链接
                imgUrl:imgurl, // 分享图标
                success: function () { 
                  alert("分享成功");
                },
                cancel: function () { 
                    alert("分享失败");
                }
            }); 

         });
    }, 
    adress(){
      console.log("进入adress");
      var store = window.localStorage;
      console.log(wx);
      wx.ready(function () {
              console.log("微信进入地理位置准备好")
             /* wx.getLocation({
                  success: function (res) 
                  {      
                        alert('获取地理位置成功');
                        console.log(res.latitude);  //纬度
                        console.log(res.longitude);
                        var geocoder = new qq.maps.Geocoder({
                            complete: function (result) {
                                 console.log(result);
                                 var city = result.detail.addressComponents.city;
                                 var district = result.detail.addressComponents.district; 
                                 var address = city+"-"+district;
                        　　　　 console.log(address);
                                 store.setItem("address",address);
                            }
                      });
                      geocoder.getAddress(new qq.maps.LatLng(res.latitude, res.longitude));
                  },
                  fail: function (res) {
                     console.log('获取地理位置失败');
                      alert("获取地理位置失败,请检查网络并重新载入");
                  },
                  cancel: function (res) {       
                    console.log('用户点击取消');
                    alert('取消地图拍摄');
                  }
              });*/
          });     
  } 
}