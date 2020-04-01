<template>
  <b-row class="justify-content-md-center">
    <b-col cols="6">
      <h2>Добавление книги</h2>
      <div v-if="errors && errors.length">
        <div v-for="error of errors" :key="error">
          <b-alert show>{{error.message}}</b-alert>
        </div>
      </div>
      <b-form @submit="onSubmit">
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="ISBN-код">
          <b-form-input id="isbn" v-model.trim="bookData.isbn"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Название">
          <b-form-input id="title" v-model.trim="bookData.title"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Автор">
          <b-form-input id="author" v-model.trim="bookData.author"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Издатель">
          <b-form-input id="publisher" v-model.trim="bookData.publisher"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Цена">
          <b-form-input id="price" v-model.trim="bookData.price"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Дата выпуска">
          <b-form-input id="publishYear" v-model.trim="bookData.publishYear"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Способ получения">
          <b-form-select
                  v-model="bookData.gotBy"
                  :options="getOptions"
                  required
          ></b-form-select>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Каталог">
          <b-form-select
                  v-model="bookData.catalog"
                  :options="catalogNames"
                  required
          ></b-form-select>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Статус">
          <b-form-select
                  v-model="bookData.status"
                  :options="statuses"
                  required
          ></b-form-select>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Дата получения">
          <b-form-datepicker v-model="bookData.gotDate" class="mb-2"></b-form-datepicker>
        </b-form-group>
        <b-button type="submit" variant="primary">Добавить книгу</b-button>
        <b-button type="button" variant="success" @click="$router.go(-1)">Отмена</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import BooksService from '@/services/BooksService'

export default {
  name: 'BookForm',
  data () {
    return {
      bookData: {},
      errors: [],
      getOptions: ["Купленная", "Полученная в дар"],
      catalogs: [],
      catalogNames: [],
      statuses: ["Доступна"]
    }
  },
  mounted () {
    this.getCatalogs();
  },
  methods: {
    async getCatalogs () {
      const response = await BooksService.fetchCatalogs();
      this.catalogs = response.data;
      this.catalogNames = this.catalogs.map((cat) => {
        return cat.name
      });
    },
    onSubmit (evt) {
      evt.preventDefault();
      let catalog = this.catalogs.filter(cat => cat.name = this.bookData.catalog);
      this.bookData.catalog = catalog[0]._id;
      BooksService.addBook(this.bookData)
      .then(() => {
        this.$router.push({
          name: 'Books'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    }
  }
}
</script>