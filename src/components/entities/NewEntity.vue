<template>
  <div class="flex flex-col gap-5">
    <h1 class="dashboard-title">New Entity</h1>   
    <form @submit.prevent="submitForm">
      <div class="flex flex-col gap-2">
        <label for="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          v-model="newEntity.name" 
          required>
      </div>
      <div class="flex flex-col gap-2">
        <label for="type">Type:</label>
        <select 
          id="type" 
          v-model="newEntity.type" 
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
          v-model="newEntity.status" 
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
          v-model="newEntity.value">
      </div>
      <div class="flex flex-col gap-2">
        <label for="created_at">Created_at:</label>
        <input 
          type="datetime-local" 
          id="created_at" 
          v-model="newEntity.created_at"
          required>
      </div>
      <div class="flex flex-col gap-2">
        <label for="room">Room:</label>
        <select v-model="newEntity.room_id">
          <option 
            :value="null" 
            disabled>Select a room</option>
          <option 
            v-for="room in rooms" 
            :key="room.id" 
            :value="room.id">{{ room.name }}</option>
        </select>
      </div>
      <br>
      <button 
        class="dashboard-item-tts"
        type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import coreApi from "@/providers/core-api"

export default {
  name: "newentity",
  created() {
    this.getRooms()
  },
  data() {
    return {
      newEntity: {},
      rooms: [],
      isLoading: false,
      isError: false 
    }
  },
  methods: { 
    getRooms() {
      coreApi.glados.getRooms()
        .then((rooms) => {
          this.rooms = rooms
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
    },
    submitForm(){
      this.isLoading = true
      coreApi.glados.newEntity(this.newEntity)
        .then((entity) => {
          console.log("Entity created:", entity)
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  } 
}
</script>
