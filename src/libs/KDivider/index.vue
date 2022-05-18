<template>
  <div role="separator" class="k-divider" :class="[titlePosition, verticalStyle]" :style="[colorStyle,lineStyle, textColorStyle, bgColorStyle]">
    <slot></slot>
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
 * @property {'default' | 'left' | 'right' | 'center'} titlePlacement 标题的位置 (默认'default': 无标题)
 * @example <k-divider titlePlacement="left" dashed>左</k-divider>
 */
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "KDivider",
  props: {
    dashed: {
      type: Boolean,
      default: false
    },
    lineColor: {
      type: String
    },
    titleColor: {
      type: String
    },
    vertical: {
      type: Boolean,  
      default: false
    },
    titlePlacement: {
      type: String
    }
  },
  setup(props, context) {
    // <!--{borderColor:lineColor, color:titleColor} -->
    // 分割线条颜色
    const colorStyle = computed(() => {
      if(!props.lineColor) return '';
      return {'border-color': props.lineColor}
    });
    // 分割线类型：是否为虚线(dashed)
    const lineStyle = computed(() => {
      if(!props.dashed) return {'border-style': 'solid'}
      return {'border-style': 'dashed'}
    });
    // 垂直分割线颜色（vertical时生效）
    const bgColorStyle = computed(() => {
      if(!props.vertical) return '';
      return {'background-color': props.lineColor}
    });
    // 分割线方向：是否垂直(vertical)
    const verticalStyle = computed(() => {
      if(!props.vertical) return '';
      return 'k-divider--vertical'
    });
    // 标题文字颜色
    const textColorStyle = computed(() => {
      if(!props.titleColor) return '';
      return {'color': props.titleColor}
    })
    // 标题位置
    const titlePosition = computed(() => {
      if(!props.titlePlacement) return 'k-divider--content-default'
      return 'k-divider--content-' + props.titlePlacement
    });
    return {
      colorStyle,
      titlePosition,
      lineStyle,
      verticalStyle,
      bgColorStyle,
      textColorStyle
    }
  },
});
</script>
<style scoped>
.k-divider {
  margin: 16px 0;
  font-size: 14px;
  line-height: 24px;
  border-color: rgb(224, 224, 230);
  border-style: solid;
  border-width: 0;
}
.k-divider--dashed {
  border-style: dashed;
}
.k-divider--content-left::before, .k-divider--content-right::after {
  max-width: 10%;
}
.k-divider--content-left::after, .k-divider--content-right::before {
  max-width: 80%;
}

.k-divider--content-center::before, .k-divider--content-center::after {
  max-width: 45%;
}

.k-divider--content-center::before,
.k-divider--content-left::before,
.k-divider--content-right::before {
  margin-right: 16px;
}

.k-divider:not(.k-divider--content-default)::after,
.k-divider::before {
  content: "";
  display: inline-block;
  width: 100%;
  box-sizing: border-box;
  height: 0px;
  border-color: inherit;
  border-style: inherit;
  vertical-align: middle;
  border-width: 0.5px 0 0;
}
.k-divider--content-center::after,
.k-divider--content-left::after,
.k-divider--content-right::after {
  margin-left: 16px;
  content: "";
  vertical-align: middle;
}
.k-divider.k-divider--vertical {
  display: inline-block;
  height: 1em;
  margin: 0 8px;
  vertical-align: middle;
  width: 1px;
  border: none !important;
}
</style>