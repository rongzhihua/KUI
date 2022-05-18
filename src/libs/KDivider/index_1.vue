<template>
  <div role="separator" class="k-divider" :class="[titlePosition, {'k-divider--dashed': dashed}, verticalStyle]" :style="[verticalColor]">
    <div class="k-divider_line" :class="leftLinePosition" :style="colorStyle"></div>
    <div class="k-divider_title" :style="titleStyle" ><slot></slot></div>
    <div class="k-divider_line" :class="rightLinePosition" :style="colorStyle"></div>
  </div>
</template>
<script>
/**
 * Divider 分割线
 * @description
 * @property {Boolean} dashed 	是否使用虚线分割 (默认false)
 * @property {Boolean} vertical 是否垂直分隔 (默认false) ---- *注：当 vertical 属性时，仅 lineColor 属性有效
 * @property {String} lineColor 分割线颜色 
 * @property {String} titleColor 标题文字颜色 
 * @property {'left' | 'right' | 'center'} titlePlacement 标题的位置 
 * @example <k-divider titlePlacement="left" dashed>左</k-divider>
 */
import { defineComponent, computed, useSlots, ref } from "vue";
export default defineComponent({
  name: 'KDivider',
  props: {
    titlePlacement: {
      type: String
    },
    dashed: {
      type: Boolean,
      default: false
    },
    titleColor: {
      type: String
    },
    lineColor: {
      type: String
    },
    vertical: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    // 标题位置： left | center | right
    const titlePosition = computed(() => {
      if(!props.titlePlacement) return '';
      return 'k-divider--title-position-' + props.titlePlacement;
    });

    const leftLinePosition = computed(() => {
      if(!props.titlePlacement || props.titlePlacement === 'center') return 'k-divider_line--center';
      return 'k-divider_line--left';
    })
    const rightLinePosition = computed(() => {
      if(!props.titlePlacement || props.titlePlacement === 'center') return '';
      return 'k-divider_line--right';
    })

     //判断<slot/>是否有传值 
    const slotDefault = !!useSlots().default;
    // 分割线条颜色
    const colorStyle = computed(() => {
      if (props.lineColor) {  
        if (props.dashed) return {'border-color': props.lineColor}  // dashed
        return {'background-color': props.lineColor}                // solid
      } else {
        if (props.dashed) return {'border-color': '#808080'} 
        return {'background-color': 'rgb(224, 224, 230)'} 
      }
    });
    
    // 标题文字颜色
    const titleStyle = computed(() => {
      if(slotDefault == false) {
        return {'display': 'none'}
      } else {
        if(props.titleColor) return {'color': props.titleColor}
      }
    });
    // 分割线方向：是否垂直(vertical)
    const verticalStyle = computed(() => {
      if(!props.vertical) return '';
      return 'k-divider--vertical'
    });
    // 垂直分割线颜色（vertical时生效）
    const verticalColor = computed(() => {
      if (!props.vertical) return '';
      return {'background-color': props.lineColor}
    })
    return {
      titlePosition,
      leftLinePosition,
      rightLinePosition,
      colorStyle,
      titleStyle,
      verticalStyle,
      verticalColor
    }
  },
});
</script>
<style scoped>
.k-divider {
  position: relative;
  box-sizing: border-box;
  font-size: 16px;
  color: rgb(31, 34, 37);
}

.k-divider:not(.k-divider--vertical) {
  margin-top: 24px;
  margin-bottom: 24px;
}

.k-divider:not(.k-divider--vertical):not(.k-divider--no-title) {
  display: flex;
  align-items: center;
}

.k-divider .k-divider_title {
  margin-left: 12px;
  margin-right: 12px;
  white-space: nowrap;
  font-weight: 500;
}


.k-divider.k-divider--title-position-left
  .k-divider_line.k-divider_line--left {
  width: 28px;
}
.k-divider.k-divider--title-position-right
  .k-divider_line.k-divider_line--right {
  width: 28px;
}
.k-divider.k-divider--title-position-center
  .k-divider_line.k-divider_line--center {
  width: calc(50% + 0);
}

.k-divider.k-divider--dashed .k-divider_line {
  height: 0px;
  width: calc(100% - 28px - 14px);
  border-style: dashed;
  border-width: 1px 0 0;
}

.k-divider .k-divider_line {
  border: none;
  background-color: rgb(224, 224, 230);
  height: 1px;
  width: calc(100% - 28px - 48px);
  margin: 0;
}

.k-divider.k-divider--vertical {
  display: inline-block;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  width: 1px;
  background-color: rgb(224, 224, 230);
}

</style>
