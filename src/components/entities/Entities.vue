<template>
  <div class="flex flex-col gap-5">
    <h1 class="dashboard-title">Entity detail</h1>   
    <form @submit.prevent="submitForm">
      <div class="flex flex-col gap-2">
        <label for="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          v-model="updatedEntity.name" 
          required>
      </div>
      <div class="flex flex-col gap-2">
        <label for="type">Type:</label>
        <select 
          id="type" 
          v-model="updatedEntity.type" 
          required>
          <option value="">-- Choose a type --</option>
          <option value="sensor">Sensor</option>
          <option value="light">Light</option>
          <option value="switch">Switch</option>
          <option value="multimedia">Multimedia</option>
          <option value="air_conditioner">Air conditioner</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label for="status">Status:</label>
        <select 
          id="status" 
          v-model="updatedEntity.status" 
          required>
          <option value="on">On</option>
          <option value="off">Off</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      <div class="flex flex-col gap-2">
        <label for="value">Value:</label>
        <input 
          type="text" 
          id="value" 
          v-model="updatedEntity.value">         
      </div>
      <div class="flex flex-col gap-2">
        <label for="created_at">Created_at:</label>
        <input 
          type="datetime-local" 
          id="created_at" 
          v-model="updatedEntity.created_at"
          required>
      </div>
      <div class="flex flex-col gap-2">
        <label for="room">Room:</label>
        <input 
          type="text" 
          id="room" 
          v-model="updatedEntity.room">
      </div>
      <br>
      <button 
        class="dashboard-item-tts" 
        type="submit">Save</button>
    </form>
    <button 
      class="dashboard-item-tts" 
      @click="deleteEntity(entity.id)">Delete</button>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"

export default {
  name: "Entities",
  created() {
    const id = this.$route.query.id
    this.getEntity(id)
  },
  data() {
    return {
      entity: {},
      rooms: [],
      updatedEntity: {},
      isLoading: false,
      isError: false 
    }
  },
  methods: { 
    getEntity(id) {
      this.isLoading = true

      coreApi.glados.getEntity(id)
        .then((entity) => {
          this.entity = entity[0]
          this.updatedEntity = {
            id: id,
            name: entity[0].name,
            type: entity[0].type,
            status: entity[0].status,
            value: entity[0].value,
            created_at: new Date(entity[0].created_at).toISOString().substr(0,16),
            room: entity[0].room
          }
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    submitForm(){
      this.isLoading = true

      coreApi.glados.updateEntity(this.$route.query.id, this.updatedEntity)
        .then((entity) => {
          this.entity = entity[0]
          this.updatedEntity = {}
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    deleteEntity(id){
      this.isLoading = true

      coreApi.glados.deleteEntity(id)
        .then((entity) => {
          this.entity = entity[0]
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    getRooms() {
      coreApi.glados.getRooms()
        .then((rooms) => {
          this.rooms = rooms
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
    }
  } 
}
</script>
