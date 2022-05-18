
<template>
  <h4>开关</h4>
  <k-switch v-model:value="checked" />
  <k-switch v-model:value="checked" :disabled="disabled" />
  <h4>线性进度条</h4>
  <k-progress :percentage="90" :textInside="true" />
  <h4>环形进度条</h4>
  <k-progress :percentage="40" ptype="circle" />
  <h4>按钮</h4>
  <k-button round ghost color="red" status="success">Enable</k-button>
  <k-button round ghost color="red" status="success" disabled>Default</k-button>
  <h4>分割线</h4>
  <k-divider titleColor="green" lineColor="orange" dashed></k-divider>
  <k-divider titleColor="green" lineColor="red" titlePlacement="left">左</k-divider>
  <k-divider titleColor="red" lineColor="blue" dashed titlePlacement="center">中</k-divider>
  <k-divider titleColor="green" titlePlacement="right">右</k-divider>
  <p>总觉得<k-divider vertical lineColor="blue" />想说点 <k-divider vertical lineColor="orange" />啥……</p>
  <h4>单选框</h4>
  <div>
    <k-radio v-model:value="radio1" label="man">男</k-radio> 
    <k-radio v-model:value="radio1" label="woman">女</k-radio>
  </div>
  <div>
    <k-radio v-model:value="radio2" label="eat">吃饭</k-radio> 
    <k-radio v-model:value="radio2" disabled label="sleep">睡觉</k-radio>
  </div>
  <h4>复选框</h4>
  <div>
    <k-checkbox v-model:value="checked1" label="总经办"></k-checkbox>
    <k-checkbox v-model:value="checked2" label="财务部" ></k-checkbox>
  </div>
  <hr>
  <h4>输入框</h4>
  <k-input value="value123" type="text" :maxlength="8" :minlength="5"/>
  <k-input v-model:value="value" type="text" :maxlength="8" :minlength="5" disabled />
  <k-input type="textarea" placeholder="想说点什么……" />  
  <k-input placeholder="搜索">
    <template #suffix>
      <k-icon>
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
		      <path
			      d="M10 2.5a7.5 7.5 0 0 1 5.964 12.048l4.743 4.745a1 1 0 0 1-1.32 1.497l-.094-.083l-4.745-4.743A7.5 7.5 0 1 1 10 2.5zm0 2a5.5 5.5 0 1 0 0 11a5.5 5.5 0 0 0 0-11z"
			      fill="rgb(194, 194, 194)"></path>
        </svg>
      </k-icon>
    </template>
  </k-input>   
  <h4>图标</h4>
  <k-icon>
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24" height="24">
      <path
        d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8s8 3.58 8 8s-3.58 8-8 8z"
        fill="red"></path>
      <path d="M12.5 7H11v6l5.25 3.15l.75-1.23l-4.5-2.67z" fill="#F0F"></path>
    </svg>
  </k-icon>
  
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  setup() {
    // 复选框
    const checked1 = ref(false)
    const checked2 = ref(true)
    return {
      // 开关
      checked: ref(true),
      disabled: ref(true),
      // 单选框
      radio1: ref('sex'),
      radio2: ref('interesting'),
      // 复选框
      checked1,
      checked2,
      // 输入框
      value: ref("input value")
    }
  }

})
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
