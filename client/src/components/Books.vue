<template>
  <b-row class="books justify-content-md-center">
    <b-col cols="8">
      <h1>Книги</h1>
      <b-table stripe hover :items="books" :fields="fields">
        <template v-slot:head(isbn)>
          <div class="text-nowrap">Номер</div>
        </template>
        <template v-slot:head(title)>
          <div class="text-nowrap">Название</div>
        </template>
        <template v-slot:head(author)>
          <div class="text-nowrap">Автор(ы)</div>
        </template>
        <template v-slot:head(publisher)>
          <div class="text-nowrap">Издатель</div>
        </template>
        <template v-slot:head(status)>
          <div class="text-nowrap">Статус</div>
        </template>
        <template v-slot:head(more)>
          <div class="text-nowrap">Подробнее</div>
        </template>
        <template v-slot:cell(more)="{ item }">
          <b-button size="sm" class="mr-2" @click="openBookInfo(item._id)">
            Подробнее
          </b-button>
        </template>
      </b-table>
    </b-col>
  </b-row>
</template>

<script>
import BooksService from '@/services/BooksService'

export default {
  name: 'Books',
  data () {
    return {
      books: [],
      fields: ['isbn', 'title', 'author', 'publisher', 'status', 'more']
    }
  },
  mounted () {
    this.getBooks();
  },
  methods: {
    async getBooks () {
      const response = await BooksService.fetchBooks();
      this.books = response.data;
    },
    openBookInfo(id) {
      this.$router.push({path: `/books/${id}`});
    }
  }
}
</script>

<style scoped>

.books {
  width: 100%;
}

</style>