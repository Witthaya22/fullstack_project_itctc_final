<script setup lang="ts">
import TinyMCE from '@tinymce/tinymce-vue'
</script>

<template>
  <div>
    <TinyMCE v-model="content" type="text" api-key="kfisukzopih4yysenwmtul7fkprd4k97lebd12a3c1v9s88q"
      :init="{
        height: 500,
        menubar: false,
        toolbar: 'undo redo | formatselect | ' +
          'bold italic backcolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
      }"
    />
  </div>
</template>

