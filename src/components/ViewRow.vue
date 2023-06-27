<template>
  <span>
    <label class="form-label">{{ title }}:
    </label>
    <label class="form-label">{{ data }}
    </label>
  </span>
</template>
  
<script>

export default {
  name: 'ViewRow',
  props: {
    title: String,
    data: String
  }
}
</script>
  
<style>
header {
  text-align: center;
  background: #FFF7EC;
  border-bottom: 20px solid #0d6efd;
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  z-index: +99;
  height: auto;
  box-shadow: 0 4px 5px 2px rgb(0 0 0 / 22%);
}
</style>
  