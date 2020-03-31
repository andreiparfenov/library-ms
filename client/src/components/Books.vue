<template>
  <div class="books">
    <h1>Книги</h1>
    Доступные книги:

    <div v-for="book in books" :key="book.title">
      <p>
        <span><b>{{ book.title }}</b></span>
      </p>
    </div>
  </div>
</template>

<script>
import BooksService from '@/services/BooksService'
export default {
  name: 'Books',
  data () {
    return {
      books: []
    }
  },
  mounted () {
    this.getBooks();
  },
  methods: {
    async getBooks () {
      const response = await BooksService.fetchBooks();
      this.books = response.data;
    }
  }
}
</script>