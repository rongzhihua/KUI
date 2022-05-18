<template>
  <div v-if="type==='textarea'" :class="['k-input-container','k-textarea-container']">
    <textarea class="k-textarea--input" rows="4" :readonly="readonly" :placeholder="placeholderRef" :disabled="disabled"></textarea>
  </div>
  <form v-else class="k-input-container" :style="{'align-items': 'center'}" :class="[flexStyle, {'k-input-container--disabled': disabled}]" >
    <input class="k-input" :class="{'k-input--disabled': disabled}"  autocomplete="off"
      :type="type" 
      :placeholder="placeholderRef" 
      :maxlength="maxlengthRef"
      :minlength="minlengthRef" 
      :value="valueRef"
      :disabled="disabled" 
      :readonly="readonly"/>
    <!-- 前缀 -->
    <div class="k-icon--fix" v-if="isSlot">
      <slot name="prefix"></slot>
    </div>
    <!-- 后缀 -->
    <div class="k-icon--fix" v-else>
      <slot name="suffix"></slot>
    </div>
  </form>
</template>
<script>
/**
 * Input 输入框
 * @description
 * @property {Boolean} disabled     是否禁用 (默认false)
 * @property {String}  value        文本输入的值
 * @property {'text' | 'password' | 'number' | 'textarea'}  type  输入框类型 (默认'text')
 * @property {Boolean} readonly     是否只读 (默认false)
 * @property {String}  placeholder  文本输入的占位符
 * @property {Number}  maxlength    最大输入长度
 * @property {Number}  minlength    最小输入长度
 * @example <k-input v-model:value="value" type="text" :maxlength="8" :minlength="5" disabled /> 
 */
import { defineComponent, ref, computed, useSlots } from 'vue'
export default defineComponent({
  name: 'KInput',
  props: {
    value: {
      type: String
    },
    readonly: {
      type: Boolean 
    },
    type: {
      type: String,
      default: 'text',
      validator: val => ['text', 'number', 'password', 'textarea'].includes(val)
    },
    placeholder: {
      type: String
    },
    maxlength: {
      type: Number
    },
    minlength: {
      type: Number
    },
    disabled: {
      type: Boolean
    }
    
  },
  setup(props, context) {
    // 判断前缀有内容
    const slotPrefix = !!useSlots().prefix;   // flex-start
    const slotSuffix = !!useSlots().suffix;
    // 根据slot是否有值，设置flex布局样式
    const flexStyle = computed(() => {
      if(slotPrefix) return 'k-slot--left';
      return 'k-slot--right'
    });
    // 是前缀还是后缀
    const isSlot = computed(() => {
      return !!useSlots().prefix ? true : false;
    });
    const placeholderRef = computed(() => {
      if(!props.placeholder) return '';
      return props.placeholder;
    });
    const maxlengthRef = computed(() => {
      if(!props.maxlength) return '';
      return props.maxlength;
    });
    const minlengthRef = computed(() => {
      if(!props.maxlength) return '';
      return props.maxlength;
    });
    const valueRef = computed(() => {
      if(!props.value) return '';
      return props.value;
    });
    return {
      status: ref(true),
      placeholderRef,
      maxlengthRef,
      minlengthRef,
      valueRef,
      flexStyle,
      isSlot
    };
  }
})
</script>
<style scoped>
.k-input-container {
  display: flex;
  margin-bottom: 8px;
  border: 1px solid rgb(224, 224, 224);
  border-radius:3px;
  padding: 0 8px;
}
.k-input {
  outline: none;
  flex: 1;
  height: 34px;
  padding: 0 5px;
  border: none;
  font-size: 14px;
}
.k-input::placeholder {
  color: rgb(194, 194, 194);
}
.k-input-container:hover {
  border-color: #36ad6a;
}

.k-input-container:focus-within {
  border-color: #36ad6a;
  box-shadow: 0 0 0 2px rgba(24, 160, 88, 0.2);
  transition:
  box-shadow .3s cubic-bezier(0.4, 0, 0.2, 1),
  border-color .3s cubic-bezier(0.4, 0, 0.2, 1); 
}
.k-slot--left {                   
  justify-content: flex-start;
  flex-flow:row-reverse;
}
.k-slot--right {
  justify-content: space-between;
}
/* 禁用状态 */
.k-input.k-input--disabled {
  cursor: not-allowed;
  background-color: rgb(250, 250, 252);
}
.k-input-container--disabled:hover {
  border-color: rgb(224, 224, 224);
} 
/* 图标 */
.k-icon--fix {
  width: 24px;
  height: 24px;
}
/* textarea */
.k-textarea-container {
  min-height: 68px;
  padding: 0 12px;
  resize: vertical;
  overflow: hidden;
}
.k-textarea--input {
  width: 100%;
  display:block;
  border-color: rgb(194, 194, 194);
  border:none;
  padding-top: 4px;
  outline: none;
  resize: none; 
}
</style>
