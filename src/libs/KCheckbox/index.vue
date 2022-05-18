<template>
  <label class="k-label" :class="disabledColor">
    <input type="checkbox" class="k-checkbox" :checked="value" :disabled="disabled" />
    <span>{{label}}</span>
  </label>
</template>
<script>
/**
 * Checkbox 复选框
 * @description
 * @property {Boolean} disabled  禁用状态 (默认false)
 * @property {Boolean} value     复选框选中状态 (可选，默认false)
 * @property {String}  label     checkbox 对应的文本
 * @example:
 * // template:
 * <k-checkbox v-model:value="checked1" label="财务部" disabled></k-checkbox> 
 * // js:
 * import { defineComponent, ref } from 'vue'
 * export default defineComponent ({
 *   setup() {
 *      const checked1 = ref(false)
 *      return { checked1 }
 *   }
 * })
 */
import { defineComponent, ref, computed } from "vue";
export default defineComponent({
  name: "KCheckbox",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    label: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const disabledColor = computed(() => {
      if(props.disabled) {
        return 'k-checkbox--disabled'
      }
    })
    return {
      disabledColor
    } 
  }
});
</script>
<style scoped>
.k-label {
  margin-right: 30px;
  cursor: pointer;
}
.k-label span::before {
  position: absolute;
  top: 0;
  left: -24px;
  display: inline-block;
  width: 20px;
  height: 20px;
  content: "";
  border: 1px solid rgb(224, 224, 224);
  border-radius: 3px;
}
.k-label span::after {
  content:'';
  position: absolute;
  top: 3px;
	left: -16px;
  box-sizing: border-box;
  width: 6px;
  height: 12px;
  transform: rotate(45deg);
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  border-top: 0;
  border-left: 0;
}
.k-checkbox {
  display: none;
}
.k-label span {
  display: inline-block;
  position: relative;
  margin-left: 25px;
}

/* 选中状态 */
.k-label .k-checkbox:checked+span::before {
  border-color: #3e97eb;
  background-color: #3e97eb;
  border-radius: 3px;
}
/* 选中状态下 "√" 样式 */
.k-label .k-checkbox:checked+span::after {
  border-color: #fff;
}
/* 禁用状态背景颜色 */
.k-checkbox--disabled {
  cursor: not-allowed;
  color:rgb(224, 224, 224);
}
.k-checkbox--disabled .k-checkbox:checked+span::before {
  border-color: rgb(224, 224, 224);
  background-color: #fff;
  border-radius: 3px;
}
/* 禁用状态下 "√" 样式 */
.k-checkbox--disabled .k-checkbox:checked+span::after {
  border-color: rgb(224, 224, 224);
}
</style>
