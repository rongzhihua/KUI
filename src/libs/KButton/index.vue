<template>
  <button class="k-button" :class="[{'k-button-default':isDefault}, btnSize, disableStatus]" type="button" :style="[colorStyle, textColorStyle]">
    <span class="k-button-text">Default</span>
  </button>
</template>
<script>
/**
 * Button 按钮
 * @description
 * @property {Boolean} circle 按钮是否为圆形 (默认false)
 * @property {String} color 按钮颜色
 * @property {Boolean} disabled 按钮是否禁用 (默认false)
 * @property {Boolean} ghost 按钮是否透明 (默认false)
 * @property {Boolean} round 按钮是否显示圆角 (默认false)
 * @property {'small' | 'normal' | 'large'} size 按钮的尺寸 (默认'normal')
 * @property {String} textColor 按钮文字颜色
 * @property {'default' | 'primary' | 'success' | 'warning' | 'error'} status 按钮类型 (默认'default')
 * @example <k-button color="#f00" :round="true" text-color="#ff0" size="small" />
 */
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "KButton",
  props: {
    circle: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    ghost: {
      type: Boolean,
      default: false,
    },
    round: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
    },
    textColor: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  setup(props, context) {
    const btnSize = computed(() => {
      if (!props.size) return 'k-button--normal'
      switch (props.size) {
          case 'small':
          return 'k-button--small'
          break;
          case 'normal':
          return 'k-button--normal'
          break;
          case 'large':
          return 'k-button--large'
          break;
        }
    });
    let isDefault = ref(true);
    let _color = ref("");
    const statusColor = computed(() => {
      if (props.color) {
        return props.color;
      }
      switch (props.status) {
        case "success":
          _color = ref("#13ce66");
          break;
        case "primary":
          _color = ref("#2080f0");
          break;
        case "warning":
          _color = ref("#f0a020");
          break;
        case "error":
          _color = ref("#d03050");
          break;
      }
      return _color.value;
    });
    // 背景色
    const colorStyle = computed(() => {
      if (props.ghost) {
        // 是否透明边框色设置
        if(statusColor.value) {
          return { color: statusColor.value, backgroundColor: 'transparent', border: `1px solid ${statusColor.value}`, borderRadius:radius.value};
        } else {
          return { backgroundColor: 'transparent', border: '1px solid rgb(224, 224, 230)', borderRadius:radius.value };
        }
      } else {
        if (statusColor.value) {
          return { color: textColorStyle.value, backgroundColor: statusColor.value, border: 'none', borderRadius:radius.value }
        } else {
          return { border: '1px solid rgb(224, 224, 230)', borderRadius:radius.value}
        }
      }
    });
    // 圆角设置
    const radius = computed(() => {
      if(props.circle) {
        return '50%'
      }
      return  props.round ? (34 + 'px') : '3px';
    });
    // 按钮文字颜色
    const textColorStyle = computed(() => {
      if(props.textColor) {
        return {color: props.textColor}
      }
      return '#fff'
    });
    // 禁用状态设置
    const disableStatus = computed(() => {
      if(!props.disabled) {
        return ''
      } else {
        isDefault.value = false;   // disabled为true时，移除默认样式，解除默认hover效果
        return 'k-button--disabled'
      }
    })
    return {
      disableStatus,
      isDefault,
      btnSize,
      statusColor,
      colorStyle,
      textColorStyle,
    };
    
  },
});
</script>
<style scoped>
.k-button {
  font-size: 14px;
  border-radius: 3px;
  background-color: transparent;
  white-space: nowrap;
  outline: none;
  display: inline-flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  text-align: center;
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    background-color 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1),
    border-color 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.k-button-default {
  color: rgb(51, 54, 57);
  border: 1px solid rgb(224, 224, 230);
}
.k-button-default:hover {
  color: #36ad6a;
  border-color: #36ad6a !important;
}
/* disable */
.k-button.k-button--disabled {
  cursor: not-allowed;
  opacity: 0.5;
  background-color: transparent;
  color: rgb(51, 54, 57);
}
/* normal */
.k-button--normal {
  height: 34px;
  line-height: 34px;
  padding: 0 14px;
}
/* small */
.k-button--small {
  height: 28px;
  line-height: 28px;
  padding: 0 10px;
}
/* large */
.k-button--large {
  height: 40px;
  line-height: 40px;
  padding: 0 18px;
}
</style>