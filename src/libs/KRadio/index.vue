<template>
  <div class="k-radioBox">
    <input class="k-radio"  type="radio" :disabled="disabled" :name="value" :id="label"/>
    <label class="k-label" :class="cursorStyle" :for="label"><slot></slot></label>
  </div>
</template>

<script>
/**
 * Radio 单选框
 * @description
 * @property {Boolean} disabled  禁用状态 (默认false)
 * @property {String}  value     单选框 radio 元素 name 属性值。
 * @property {String}  label     radio <label>标签 文本值绑定对应radio元素id,用于选中状态操作。
 * @example <k-radio  v-model:value="radio2" label="eat">吃饭</k-radio> 
 */
import { defineComponent, ref, computed } from "vue";

export default defineComponent({
  name: "KRadio",
  props: {
    value: {
      type: String
    },
    label: {
      type: String
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const cursorStyle = computed(() => {
      if(!props.disabled) return 'k-radio-cursor'
      return 'k-radio--disabled'
    });
    return {
      cursorStyle
    }
  } 
});

</script>

<style scoped>
.k-radioBox {
  display: inline-block;
  margin-right: 8px;
}
.k-radio,
.k-checkbox {         
  position: absolute;
  display: none;
}

.k-radio + label,
.k-checkbox + label {
  position: relative;
  display: block;
  padding-left: 30px;
}
.k-label {
  margin: 12px 4px;
}

/* 伪元素 */
.k-radio + label:before {
  border-radius: 50%;
}

.k-radio + label:before,
.k-checkbox + label:before {
  position: absolute;
  top: 0px;
  left: 0;
  display: inline-block;
  width: 20px;
  height: 20px;
  content: "";
  border: 1px solid #c0c0c0;
}

.k-radio + label:after {
  top: 7px;
  left: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3e97eb;
}

.k-radio + label:after,
.k-checkbox + label:after {
  position: absolute;
  top: -6px;
  display: none;
  content: "";
}

/* 选中时 */
.k-radio:checked + label:before {
  border: 1px solid #3e97eb;
}
.k-radio:checked + label:before,
.k-radio + label:before {
  border-radius: 50%;
}

.k-radio + label:after {                
  top: 7px;
  left: 7px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #3e97eb;
}
.k-radio:checked + label:after,
.k-checkbox:checked + label:after {
  display: block;
}

.k-radio + label:after,
.k-checkbox + label:after {
  position: absolute;
  content: "";
}
/* 禁用状态 */
.k-radio-cursor {
  cursor: pointer;
}
.k-radio--disabled {
  cursor: not-allowed;
  color:rgb(224, 224, 230);
}
</style>
