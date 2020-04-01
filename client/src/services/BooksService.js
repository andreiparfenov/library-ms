import Api from '@/services/Api'

export default {
  fetchBooks() {
    return Api().get('books')
  },

  addBook(params) {
    return Api().post('books', params)
  },

  fetchCatalogs() {
    return Api().get('catalogs')
  },

  addCatalog(params) {
    return Api().post('catalogs', params)
  }
}