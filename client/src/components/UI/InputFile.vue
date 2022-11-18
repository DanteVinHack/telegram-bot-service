<template>
<input 
  class="form-control" 
  type="file"
  @change='getFile'
>
</template>

<script>
export default {
  name: 'InputFile',
  props: {
    msg: {
      typeof: String,
      require: true
    }
  },
  methods: {
    getFile(e) {
      const [ file ] = e.target.files;
      const reader = new FileReader();

      if (file.type.includes('image')) {

        reader.readAsText(file);
        
        reader.onload = async () => {
          try {
            const { result } = reader;

            this.$emit('get-file', result)
            
          } catch (error) {
            console.log(error.message)
          }
        }
        
        reader.onerror = () => {
          console.log('Возникла ошибка при прочении файла')
        }
        
      } else {
        console.log('Этот файл не является картинкой')
      }
    },
  }
}
</script>