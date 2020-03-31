import Api from '@/services/Api'

export default {
  fetchBooks() {
    return Api().get('books')
  }
}