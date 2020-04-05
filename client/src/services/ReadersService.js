import Api from '@/services/Api'

export default {
  fetchReaders() {
    return Api().get('readers')
  },

  addReader(params) {
    return Api().post('readers', params)
  },

  fetchOneReader(id) {
    return Api().get(`readers/${id}`)
  }
}