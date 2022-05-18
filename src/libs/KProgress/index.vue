<template>
    <div class="progress-content" :class="'progress--'+ptype">
      <!-- 线形进度条 -->
      <div class="progress-bar" v-if="ptype==='line'" :style="{height: strokeHeight + 'px'}">
        <div class="progress-bar-inner" :style="barStyle">
          <div v-if="textInside" class="progress-text" :style="{fontSize: progressTextSize + 'px'}">{{percentage}}%</div>
        </div>
      </div>
      <!-- 环形进度条 采用SVG实现 -->
      <div class="progress_circle" :style="{width:cwidth+'px',height:cwidth+'px'}" v-else>
          <svg viewBox="0 0 100 100" :style="{width:cwidth,height:cwidth}">
              <!-- 背景圆形 -->
              <path fill="none" :stroke-width="relativeStrokeHeight" stroke="#e5e9f2" :d="trackPath"  />
              <!-- 进度圆形 -->
              <path fill="none" :stroke-width="relativeStrokeHeight" :stroke="statusColor" :style="circlePathStyle" stroke-linecap="round" :d="trackPath"  />
          </svg>
      </div>
      <div v-if="!textInside" :class="isNative" :style="{fontSize:progressTextSize+'px', color:textColor}">
          <template v-if="!status"> {{percentage}}% </template>
      </div>
    </div>
</template>
<script>
/**
 * Progress 线型进度条
 * @description  展示操作或任务的当前进度，比如上传文件，是一个线形的进度条。
 * @property {String} ptype 进度条形状：线形(line),环形(circle) (默认line)
 * @property {Number} percentage 进度条百分比值，为数值类型，0-100 (默认0)
 * @property {Number} strokeHeight 进度条高度，为数值类型 (默认10)
 * @property {String} status 进度条状态：成功状态(success)，异常状态(failure)，正常状态
 * @property {Boolean} textInside 文字是否内显 (默认false)
 * @property {Boolean} textColor 内显文字颜色 
 * @property {String} color 进度条颜色 (默认 #20a0ff)
 * @example <k-progress ptype="line" :percentage="62" status="success" :strokeHeight="20"/>
 */
import { defineComponent, ref, computed } from 'vue'
export default defineComponent ({
    name: 'KProgress',
    props: {
        percentage: {
          type: Number,
          default: 0,
          required: true,
          valiator(value) {
            return value >= 0 && value <= 100
         }
        },
        status: {
          type: String,
        },
        ptype: {
          type: String,
          default: 'line',
          validator:val=>['circle','line'].includes(val)
        },
        color: {
          type: String,
        },
        textInside: {
          type: Boolean,
          default: false
        },
        strokeHeight: {
          type: Number,
          default: 10,
        },
        cwidth: {
          type: Number,
          default: 126
        }
   },
   setup(props, context) {
     let _color = ref('');
     const statusColor = computed(() => {
         if (props.color) {
             return props.color;
         }
         switch(props.status) {
             case 'success':
             _color = ref('#13ce66');
             break;
             case 'failure':
            _color = ref('#ff4949');
            break;
            default:
            _color = ref('#20a0ff');
            break;
         }
         return _color.value
     });
     const barStyle = computed(() => {
        return { width: props.percentage + '%', backgroundColor: statusColor.value }
     });
     const progressTextSize = computed(() => {
       return 8 + props.strokeHeight * 0.4;
     });
     const relativeStrokeHeight = computed(() => {
       return props.strokeHeight*100 / props.cwidth;
     });
     const isNative= computed(()=>{
       return window.native?'progress-text-native':'progress-text'
     });
     const radius = computed(() => {
       return 50 - relativeStrokeHeight.value/2;
     })
     const trackPath = computed(() => {
       let ret = 'M 50 50 m 0 -'+ radius.value+' a '+radius.value+' '+radius.value+' 0 1 1 0 '+radius.value*2+' a '+radius.value+' '+radius.value+' 0 1 1 0 -'+radius.value*2;
       // console.log(radius.value);
       return  ret;
     });
     const perimeter = computed(() => {
       return 2*Math.PI*radius.value;
     });
     const circlePathStyle = computed(() => {
       return {
         strokeDasharray:''+perimeter.value+'px,'+perimeter.value+'px',
         strokeDashoffset:(1-props.percentage/100)*perimeter.value+'px',
       }
     });
     const textColor = computed(() => {
       return statusColor.value
     })
     return {
        radius,
        statusColor,
        barStyle,
        progressTextSize,
        relativeStrokeHeight,
        trackPath,
        perimeter,
        circlePathStyle,
        textColor,
        isNative
     }
   }
})
</script>

<style scoped>
.progress-content {
    display: flex;
    position: relative;
}
.progress-bar {
    flex: 1;
    position: relative;
    overflow: hidden;
    height: 10px;
    border-radius: 5px;
    background-color: rgba(235, 235, 235, 1);
    transition: background-color .3s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-bar-inner {
   display:flex;
   justify-content: flex-end;
   align-items: center;
   box-sizing: border-box;
   padding-right: 5px;
   position: relative;
   border-radius: 5px;
   height: 100%;
   transition: background-color .3s cubic-bezier(0.4, 0, 0.2, 1), max-width .2s cubic-bezier(0.4, 0, 0.2, 1);
}
.progress-text {
  color: #fff;
}
/* 环形进度条 */
.progress--circle{
  display: inline-block;
  position: relative;
}

.progress--circle .progress-text{
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%,-50%);
}

.progress--circle .progress-text-native{
  position:absolute;
  top:30%;
  left:25%;
  transform: translate(50%,50%);
}

</style>
