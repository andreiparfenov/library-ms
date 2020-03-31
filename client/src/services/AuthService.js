import Api from '@/services/Api'

export default {
  login(params) {
    return Api().post('auth/login', params);
  },

  register(params) {
    return Api().post('auth/register', params);
  }
}