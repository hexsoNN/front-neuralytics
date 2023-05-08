<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Rooms</h1>   
    <ul class="dashboard-list">
      <span 
        v-for="rooms in rooms" 
        :key="rooms.id">
        <li class="dashboard-item">
          <div class="dashboard-item-text">
            <span class="dashboard-item-name">{{ rooms.name }}</span>
          </div>
        </li>
      </span>
    </ul>

    <div 
      v-if="isLoading" 
      class="dashboard-loading">Chargement en cours...</div>
    <div 
      v-if="isError" 
      class="dashboard-error">Erreur lors du chargement des entités.</div>
  </div>

</template>

<script>
import coreApi from "@/providers/core-api"

export default {
  name: "Rooms",
  created() {
    this.getRooms()
  },
  data() {
    return {
      rooms: [],
      isLoading: false,
      isError: false 
    }
  },
  methods: { 
    getRooms() {
      this.isLoading = true

      coreApi.glados.getRooms()
        .then((rooms) => {
          this.rooms = rooms
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