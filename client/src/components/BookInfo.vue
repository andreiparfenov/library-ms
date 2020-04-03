<template>
  <div>
    <b-row class="justify-content-md-center">
    <b-col cols="6">
      <h2>Информация о книге</h2>
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
          <b-form-input id="isbn" v-model.trim="book.isbn"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Название">
          <b-form-input id="title" v-model.trim="book.title"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Автор">
          <b-form-input id="author" v-model.trim="book.author"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Издатель">
          <b-form-input id="publisher" v-model.trim="book.publisher"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Цена">
          <b-form-input id="price" v-model.trim="book.price"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Дата выпуска">
          <b-form-input id="publishYear" v-model.trim="book.publishYear"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Способ получения">
          <b-form-select
                  v-model="book.gotBy"
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
                  v-model="book.catalog"
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
                  v-model="book.status"
                  :options="statuses"
                  required
          ></b-form-select>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Дата получения">
          <p>{{this.book.gotDate}}</p>
        </b-form-group>
        <b-button type="submit" variant="primary">Изменить данные</b-button>
        <b-button type="button" variant="success" @click="$router.go(-1)">Вернуться</b-button>
      </b-form>
    </b-col>
  </b-row>
  </div>
</template>

<script>
import BooksService from '@/services/BooksService'

export default {
  name: 'BookInfo',
  props: ['id'],
  data () {
    return {
      book: {},
      errors: [],
      getOptions: ["Купленная", "Полученная в дар"],
      catalogs: [],
      catalogNames: [],
      statuses: ["Доступна"]
    }
  },
  mounted () {
    this.getOneBook();
    this.getCatalogs();
  },
  methods: {
    async getOneBook () {
      const response = await BooksService.fetchOneBook(this.id);
      response.data.catalog = response.data.catalog.name;
      this.book = response.data;
    },
    async getCatalogs () {
      const response = await BooksService.fetchCatalogs();
      this.catalogs = response.data;
      this.catalogNames = this.catalogs.map((cat) => {
        return cat.name
      });
    },
    onSubmit (evt) {
      evt.preventDefault();
    }
  }
}
</script>

