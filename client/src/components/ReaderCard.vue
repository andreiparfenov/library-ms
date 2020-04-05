<template>
  <b-row class="card justify-content-md-center">
    <b-col cols="8">
      <h1>Читательский билет</h1>
      <h2>Информация</h2>
      <p><b>Имя:</b> {{reader.name}}</p>
      <p><b>Дата рождения:</b> {{reader.birthdate}}</p>
      <p><b>Адрес:</b> {{reader.address}}</p>
      <p><b>Телефон:</b> {{reader.phone}}</p>

      <h2>Записи</h2>

      <h2>Операции</h2>

      <h3>Выдача</h3>
      <b-form>
        <p>Дата выдачи: {{currentDate}}</p>
        <p>Книги:</p>
        <b-button type="button" variant="success" @click="showModal = true">Отмена</b-button>
      </b-form>
      <h3>Возврат</h3>
    </b-col>

    <transition name="modal" v-if="showModal" @close="showModal = false">
        <div class="modal-mask">
          <div class="modal-wrapper">
            <div class="modal-container">
              <div class="modal-body">
                <slot name="body">
                  default body
                </slot>
              </div>

              <div class="modal-footer">
                <slot name="footer">
                  default footer
                  <button class="modal-default-button" @click="showModal = false">
                    OK
                  </button>
                </slot>
              </div>
            </div>
          </div>
        </div>
      </transition>

  </b-row>
</template>

<script>
import ReadersService from "@/services/ReadersService"

export default {
  name: 'ReaderCard',
  props: ['id'],
  data() {
    return {
      reader: [],
      newBorrow: {},
      showModal: false
    }
  },
  computed: {
    currentDate: () => {
      let today = new Date();
      let dd = String(today.getDate()).padStart(2, '0');
      let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
      let yyyy = today.getFullYear();

      return dd + '.' + mm + '.' + yyyy;
    }
  },
  mounted() {
    this.getReaderInfo();
  },
  methods: {
    async getReaderInfo() {
      const response = await ReadersService.fetchOneReader(this.id);
      console.log(response.data);
      this.reader = response.data;
    }
  }
}
</script>

<style scoped>
.card {
  width: 100%;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>