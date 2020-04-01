<template>
  <div class="books">
    <h1>Книги</h1>
    Доступные каталоги:

    <div v-for="catalog in catalogs" :key="catalog.name">
      <p>
        <span><b>{{ catalog.name }}</b></span>
      </p>
    </div>
    <div>
      <b-form @submit="onSubmit">
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Новый каталог">
          <b-form-input id="catalogName" v-model.trim="newCatalog"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Добавить каталог</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
import BooksService from '@/services/BooksService'

export default {
  name: 'Catalogs',
  data () {
    return {
      catalogs: [],
      newCatalog: ''
    }
  },
  mounted () {
    this.getCatalogs();
  },
  methods: {
    async getCatalogs () {
      const response = await BooksService.fetchCatalogs();
      this.catalogs = response.data;
    },
    onSubmit (evt) {
      evt.preventDefault();
      BooksService.addCatalog({name: this.newCatalog})
      .then(() => {
        this.$router.go();
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    }
  }
}
</script>