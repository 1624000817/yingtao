var start=1;


   
$(".tabs_bj span").on("click",function(){
  var index=$(this).index();
  var myobj=$(this).parent().siblings(".times").children(".times_box").eq(index);

  $(".tabs_bj").each(function(){
    $(this).children().eq(index).addClass("active").siblings("span").removeClass("active");
     $(this).siblings(".times").children(".times_box").eq(index).addClass("active").siblings(".times_box").removeClass("active");

    });

   var mystart=myobj.children(".date_box").attr("data-start")
  var myend=myobj.children(".date_box").attr("data-end");
      console.log(mystart,myend)

 fun1(values[index])  //雷达图
})

//雷达图
   
var myChart = echarts.init(document.getElementById('first')); 
var values=[[120,0, 130,180,0],[90, 115, 120,40,110],[120, 78, 100,54,96]];
fun1(values[start])

function fun1(value){

var max=200;
      var option1 = {
          title: {
              text: '',
              subtext:"",
               x: 'center',
               itemGap: 5,   // 主副标题纵向间隔，单位px，默认为10
              textStyle: {
                  color: '#fff' ,
                  fontSize:22         // 主标题文字颜色
              },
              subtextStyle: {
                  color: 'rgba(255,255,255,0.3)',         // 副标题文字颜色
                  fontSize:10,
              }
          },
          tooltip: {//提示框
          	// trigger: 'axis',
             // formatter: "完成率：{c}%"
          },
          legend: {
              y: '0', 
              left:"center",
              itemWidth:0,
             data: [""],
            selectedMode : 'single',
              textStyle: {
                  color: '#977b4f'          // 图例文字颜色
              },
              itemGap: 40,  
          },
          
          calculable : false,
          radar: [{
              nameGap : 5, // 图中工艺等字距离图的距离
              center:['50%','60%'], // 图的位置
              name: {
              	show: true, // 是否显示工艺等文字
                  formatter: null, // 工艺等文字的显示形式
                  textStyle: {
                      color: '#fff',
                      fontSize:10,
                      margin:[-20,20]
                 }
              },
             	indicator: [
                  {
                      text: '投放目标',
                      max: max,
                       axisLabel: {
                          show: false,
                          textStyle: {
                              fontSize: 10,
                               color: '#fff'
                           }
                          }
                      }, 
          				{text: '成交目标',max: max},
          				{text: '进店目标',max: max},
                  {text: '有效客资目标',max: max},
          				{text: '客资目标',max: max},
      				
      				],
            	splitArea : {
                  show : true,   
                  areaStyle : {
                  	color: ["rgba(58,56,45,.2)",'rgba(87,84,77,.2)']  // 图表背景网格的颜色
                  }
              },
              splitLine : {
                  show : true,
                  lineStyle : {
                      width : 1,
                      color : '#443f35' // 图表背景网格线的颜色
                  }
                              
              },
      	    axisLine: {  // 坐标轴线
      	        show: true,        // 默认显示，属性show控制显示与否
                lineStyle : {
                      width :1,
                      color : '#443f35' // 图表背景网格线的颜色
                  }
      	        },
      	    axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
      	        show: false,
      	        textStyle: {      
      	        color: '#247bd7' // 坐标轴刻度文字的样式
      	        }
      	    }
          
          }],
          
          series: [{
              name: '',
              type: 'radar',
              symbol: "emptyCircle",
              symbolBorderWidth: "6",
      //      symbol: "none", // 去掉图表中各个图区域的边框线拐点
              itemStyle: {//图形样式，可设置图表内图形的默认样式和强调样式（悬浮时样式）：
      				normal: {
      					color : "#885b04", // 图表中各个图区域的边框线拐点颜色

                          lineStyle: {
                             color:"#895b04" // 图表中各个图区域的边框线颜色
                          },
      					areaStyle: {
      					   type: 'default',
                              color: "rgba(0,0,0,0)"
      					}
      				},

      			},

            data: [
                  {
          			 value:value, 
                  itemStyle: {
                           normal: {
                                  color:"#885b04",
                                   label: {
                                     show: true,
                                     textStyle:{
                                          color:"#fff",
                                     },
                                       formatter:function(params) {
                                        return (params.value)+"%";
                                    },

                             },
                            areaStyle: {
                                   type: 'default',
                                   opacity: 0.1, // 图表中各个图区域的透明度
                                   color: "rgba(0,0,0,0)" // 图表中各个图区域的颜色
                               }
                           }
                      },
          			name: '' 
      			}, 
              ]
          }]
      };

      myChart.setOption(option1, true); 

       window.addEventListener("resize",function() {  
              myChart.resize();  
          });  
       
}
     

    // 沙漏
     
var mythrid = echarts.init(document.getElementById("third"));
var value3=[
    [100,80,60,40,20],
    [100,75,50,25,10],
    [100,70,40,30,30]
]
fun3(start)
function fun3(start){


var option = {
    title: {
        text: '',
        subtext: ''
    },
    tooltip: {
        trigger: 'item',
        formatter: "{b} : {c}%"
    },
    toolbox: {
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    min:0,
    legend: {
        data: ['','','','','']
    },
    color:['#c2a26e', '#997e53','#564c3a','#363128'],
    series: [
        {
            type: 'funnel',
            left: '10%',
            width: '80%',
            label: {
              position: 'left',
                normal: {
                   position: 'center',
                    formatter: '{b}{c}'
                },
                emphasis: {
                    position:'inside',
                    formatter: '{b}: {c}'
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                   shadowColor : '#000', //默认透明
                    shadowBlur: 10,
                    borderWidth:0,
                    opacity: 1
                }
            },
            data: [
              {
                value:  value3[start][0],
                 name: '总客资',
                  itemStyle:{
                         normal:{
                             label:{
                                textStyle:{
                                     color:'#6c5b3f'
                                }
                                
                             }
                            
                         }
                        
                     }
               },
                {
                  value:  value3[start][1],
                   name: '有效客资',
                   itemStyle:{
                         normal:{
                             label:{
                                textStyle:{
                                     color:'#4d412e'
                                }
                                
                             }
                            
                         }
                        
                     }
                 },
                {
                  value:  value3[start][2],
                   name: '进店数',
                     itemStyle:{
                         normal:{
                             label:{
                                textStyle:{
                                     color:'#a28350'
                                }
                                
                             }
                            
                         }
                        
                     }
                 },
                {
                  value:  value3[start][3], 
                  name: '成交数',
                   itemStyle:{
                         normal:{
                             label:{
                               formatter: '{b}\n{c}',
                                textStyle:{
                                     color:'#a28350'
                                }
                                
                             }
                            
                         }
                        
                     }
                },
                
            ]
        },
        
    ]
};
mythrid.setOption(option);

 $(window).resize(function(){
       mythrid.setOption(option);
  });
    
}








var myfive = echarts.init(document.getElementById("five"));
var value5=[240, 340, 140, 40];
fun5(value5)
function fun5(value5){
var option5 = {
    color: ['#997c4d'],
     tooltip : {
        trigger: 'axis',
        axisPointer : {          
            type : 'line'   
        }
    },
     grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
     xAxis : [
        {
            type : 'category',
            data : ['相册', '微请帖', '幸福预告片', '微海报'],
            axisTick: {
                alignWithLabel: true,
                show: false
            },
            axisLine:{
                lineStyle:{
                     color:'#a08253',
                 }
            } ,
        }
    ],
    yAxis : [
        {
            type : 'value',
            axisLine:{
                lineStyle:{
                     color:'#a08253',
                 }
            },
            axisTick: {
                show: false
            },
            splitLine:{
                lineStyle:{            
                   width:0,
             },
            },  
        }
    ],
    series: [{
        type:'bar',
        barWidth: '40%',
        data:value5,
        itemStyle:{
           normal:{
            color: new echarts.graphic.LinearGradient(
                            0, 0, 1, 0,
                            [
                                {offset: 0, color: '#553e1b'},
                                {offset: 0.3, color: '#896e43'},
                                {offset: 0.5, color: '#a08253'},
                                {offset: 0.7, color: '#896e43'},
                                {offset: 1, color: '#553e1b'},

                            ]
                        ),
             barBorderRadius:[5, 5, 0, 0],
           }
        }
    }]
};
myfive.setOption(option5);

 $(window).resize(function(){
       myfive.setOption(option5);
  });
}

    
// var colorArr = ['#553e1b', '#896e43', '#a08253', '#896e43', '#553e1b'];
// var chart = new Highcharts.Chart({
//     chart: {
//         renderTo: 'six',
//         type: 'column',
//         options3d: {
//             enabled: true,
//             alpha: 5,
//             beta: 0,
//             depth: 50,
//             viewDistance: 0
//         },
//         backgroundColor: 'transparent',
//     },
//      xAxis: {
//         plotLines:[{
//             width:0
//         }]
//     },
//     yAxis: {
//         plotLines:[{
//             width:0
//         }]
//     },
//     credits: {
//         enabled: false
//     },
//     exporting:{
//         buttons: {
//             contextButton: {
//                 enabled: false        
//             }
//         }
//     }, 
//     title: {
//         text: null
//     },
//     xAxis:{
//         categories:['相册','微请帖','幸福预告片','微海报']
//     },
//     subtitle: {
//         text: null
//     },
//     plotOptions: {
//         column: {
//             depth: 0
//         }
//     },
//     series: [{
//         name:null,
//         data: [240, 340, 140, 40]
//     }]
// },function (chart) {
//     SetEveryOnePointColor(chart);
// }
//                                 );
// function SetEveryOnePointColor(chart) {
//     var pointsList = chart.series[0].points;
//     for (var i = 0; i < pointsList.length; i++) {
//         chart.series[0].points[i].update({
//             color: {
//                 linearGradient: { x1: 0, y1: 0, x2: 1, y2: 0 }, //横向渐变效果 如果将x2和y2值交换将会变成纵向渐变效果
//                 stops: [
//                     [0, '#553e1b'],
//                     [0.3, '#896e43'],
//                     [0.5, '#a08253'],
//                     [0.7, '#896e43'],
//                     [1, '#553e1b']
//                 ] 
//             }
//         });
//     }
// }