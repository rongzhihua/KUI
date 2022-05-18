<template>
  <label class="k-switch-label k-switch-animbg">
    <input type="checkbox" :checked="value" :disabled="disabled" /><i class="k-switch"></i>
  </label>
</template>

<script>
import { defineComponent, computed } from "vue";

export default defineComponent({
  name: "KSwitch",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
});
</script>
<style scoped>
label.k-switch-label input {
  position: absolute;
  opacity: 0;
  visibility: hidden;
}
label.k-switch-label input:checked {
  border-color: #64bd63;
  box-shadow: #64bd63 0 0 0 16px inset;
  background-color: #64bd63;
}
label.k-switch-label input:checked:before {
  left: 27px;
}

label.k-switch-label input:disabled + .k-switch {
  background-color: #e8e8e8;
  border: solid 1px #dfdfdf;
  opacity: 0.5
}

label.k-switch-label input:disabled:checked + .k-switch {
  background-color: #e8e8e8;
  box-shadow: #e8e8e8 0 0 0 16px inset;
  border: solid 1px #dfdfdf;
}

label.k-switch-label .k-switch {
  width: 50px;
  height: 25px;
  position: relative;
  border: 1px solid #dfdfdf;
  background-color: #fdfdfd;
  box-shadow: #dfdfdf 0 0 0 0 inset;
  border-radius: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-clip: content-box;
  display: inline-block;
  -webkit-appearance: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  outline: none;
}
label.k-switch-label .k-switch:before {
  content: "";
  width: 23px;
  height: 23px;
  position: absolute;
  top: 1px;
  left: 1px;
  border-radius: 20px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
  border: 1px solid #efefef;
  box-sizing: border-box;
}
label.k-switch-label input:checked + .k-switch {
  border-color: #64bd63;
  box-shadow: #64bd63 0 0 0 16px inset;
  background-color: #64bd63;
}
label.k-switch-label input:checked + .k-switch:before {
  left: 27px;
}
label.k-switch-label.k-switch-anim {
  -webkit-transition: border cubic-bezier(0, 0, 0, 1) 0.4s,
    box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
  transition: border cubic-bezier(0, 0, 0, 1) 0.4s,
    box-shadow cubic-bezier(0, 0, 0, 1) 0.4s;
}
label.k-switch-label.k-switch-anim .k-switch:before {
  -webkit-transition: left 0.3s;
  transition: left 0.3s;
}
label.k-switch-label.k-switch-anim input:checked + .k-switch {
  box-shadow: #64bd63 0 0 0 16px inset;
  background-color: #64bd63;
  -webkit-transition: border ease 0.4s, box-shadow ease 0.4s,
    background-color ease 1.2s;
  transition: border ease 0.4s, box-shadow ease 0.4s, background-color ease 1.2s;
}
label.k-switch-label.k-switch-anim input:checked + .k-switch:before {
  -webkit-transition: left 0.3s;
  transition: left 0.3s;
}
label.k-switch-label.k-switch-animbg {
  -webkit-transition: background-color ease 0.4s;
  transition: background-color ease 0.4s;
}
label.k-switch-label.k-switch-animbg .k-switch:before {
  -webkit-transition: left 0.3s;
  transition: left 0.3s;
}
label.k-switch-label.k-switch-animbg input:checked + .k-switch {
  box-shadow: #dfdfdf 0 0 0 0 inset;
  background-color: #64bd63;
  -webkit-transition: border-color 0.4s, background-color ease 0.4s;
  transition: border-color 0.4s, background-color ease 0.4s;
}
label.k-switch-label.k-switch-animbg input:checked + .k-switch:before {
  -webkit-transition: left 0.3s;
  transition: left 0.3s;
}
</style>
