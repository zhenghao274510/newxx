// const  QQMapWX=require('../../utils/jsdk/qqmap-wx-jssdk')
// import QQMapWX from '../../utils/jsdk/qqmap-wx-jssdk'



let getCurrentCityName=function(){

    wx.getLocation({
      type: 'wgs84',
      success(res) {
        console.log(res)
        wx.setStorageSync("point", JSON.stringify(res));

        const latitude = res.latitude
        const longitude = res.longitude
        const speed = res.speed
        const accuracy = res.accuracy

      //   var qqmapsdk = new QQMapWX({
      //     key: "JYKBZ-NJNCU-GVDVC-B3RUD-AA5EH-3PFYT"
      //   });
      //   qqmapsdk.reverseGeocoder({
      //     location:{
      //       latitude: latitude,
      //     longitude: longitude
      //     },
      //     success(res){
      //       console.log(res)
      //     }
      //   })
      }
    })



}

export default getCurrentCityName
