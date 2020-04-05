import Api from '@/services/Api'

export default {
  fetchBooks() {
    return Api().get('books')
  },

  fetchOneBook(id) {
    return Api().get(`books/${id}`)
  },

  addBook(params) {
    return Api().post('books', params)
  },

  fetchCatalogs() {
    return Api().get('catalogs')
  },

  addCatalog(params) {
    return Api().post('catalogs', params)
  },

  borrowBooks(params) {
    return Api().post('/borrow', params)
  }
}