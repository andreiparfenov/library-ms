<template>
  <b-row class="readers justify-content-md-center">
    <b-col cols="8">
      <h1>Читатели</h1>
      
      <b-table stripe hover :items="readers">
      </b-table>

      <h2>Добавить читателя</h2>
      <b-form @submit="onSubmit">
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="ФИО читателя">
          <b-form-input id="isbn" v-model.trim="newReader.name"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Адрес">
          <b-form-input id="title" v-model.trim="newReader.address"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Телефон">
          <b-form-input id="author" v-model.trim="newReader.phone"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Дата рождения">
          <b-form-datepicker v-model="newReader.birthdate" class="mb-2"></b-form-datepicker>
        </b-form-group>
         <b-button type="submit" variant="primary">Добавить нового читателя</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import ReadersService from '@/services/ReadersService'

export default {
  name: 'Readers',
  data() {
    return {
      readers: [],
      newReader: {}
    }
  },
  mounted() {
    this.getReaders();
  },
  methods: {
    async getReaders () {
      const response = await ReadersService.fetchReaders();
      this.readers = response.data;
    },
    onSubmit(evt) {
      evt.preventDefault();
      ReadersService.addReader(this.newReader)
      .then(() => {
        this.$router.go();
      })
      .catch(e => {
        console.log(e)
      })
    }
  }
}
</script>