<template>
  <b-row class="justify-content-md-center">
    <b-col cols="6">
      <h2>Пройдите регистрацию</h2>
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
                  label="Фамилия">
          <b-form-input id="lastname" v-model.trim="register.lastname"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Имя">
          <b-form-input id="firstname" v-model.trim="register.firstname"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Отчество">
          <b-form-input id="thirdname" v-model.trim="register.thirdname"></b-form-input>
        </b-form-group>
        <b-form-group
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Логин для входа">
          <b-form-input id="username" v-model.trim="register.username"></b-form-input>
        </b-form-group>
        <b-form-group id="fieldsetHorizontal"
                  horizontal
                  :label-cols="4"
                  breakpoint="md"
                  label="Пароль">
          <b-form-input type="password" id="password" v-model.trim="register.password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="primary">Регистрация</b-button>
        <b-button type="button" variant="success" @click="$router.go(-1)">Отмена</b-button>
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import AuthService from '@/services/AuthService'

export default {
  name: 'Register',
  data () {
    return {
      register: {},
      errors: []
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      AuthService.register(this.register)
      .then(() => {
        alert("Успешная регистрация")
        this.$router.push({
          name: 'Login'
        })
      })
      .catch(e => {
        console.log(e)
        this.errors.push(e)
      })
    },
  }
}
</script>