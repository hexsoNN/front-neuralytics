<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Dashboard</h1>   
    <ul class="dashboard-list">
      <span 
        v-for="entity in entities" 
        :key="entity.id">
        <li 
          class="dashboard-item" 
          v-on:click="redirectToEntity(entity.id)">
          <div class="dashboard-item-text">
            <span class="dashboard-item-name">{{ entity.name }}</span>
            <span 
              class="dashboard-item-tts" 
              v-on:click.stop="speakEntities(entity)">Text to speech</span>
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
  name: "Dashboard",
  created() {
    this.getEntities()
  },
  data() {
    return {
      entities: [],
      isLoading: false,
      isError: false 
    }
  },
  methods: { 
    getEntities() {
      this.isLoading = true

      coreApi.glados.getEntities()
        .then((entities) => {
          this.entities = entities
        })
        .catch((error) => {
          console.error(error)
          this.isError = true
        })
        .finally(() => { 
          this.isLoading = false
        })
    },
    redirectToEntity(id) {
      this.$router.push("/entities?id=" + id)
    },
    speakEntities(entity) {
      const speech = new SpeechSynthesisUtterance()
      speech.lang = "en-US"
      speech.voiceURI = "Microsoft Zira Desktop - English (United States)"
      const name = entity.name ? entity.name + "," : ""
      const status = entity.status ? " status: " + entity.status + "," : ""
      const type = entity.type ? " type: " + entity.type + "," : ""
      const value = entity.value ? " value: " + entity.value + "," : ""
      const room = entity.room && entity.room.name ? " room: " + entity.room.name : ""
      const tts = `Hello and, again, welcome to the Aperture Science computer-aided enrichment center. The entity: ${name}${status}${type}${value}${room}`
      speech.text = tts
      speech.volume = 1.0
      speech.rate = 1.0
      window.speechSynthesis.speak(speech)
      setTimeout(() => {}, 3000)
    },
  } 
}

</script>
<style>
.dashboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.dashboard-title {
  font-size: 32px;
  font-weight: bold;
  color: #4b5563;
  margin-bottom: 20px;
}

.dashboard-list {
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  max-width: 500px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.dashboard-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 20px;
  border-bottom: 1px solid #e2e8f0;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.dashboard-item:hover {
  background-color: #f7fafc;
}

.dashboard-item-text {
  display: flex;
  align-items: center;
}

.dashboard-item-name {
  font-size: 16px;
  font-weight: bold;
  color: #4b5563;
}

.dashboard-item-tts {
  display: flex;
  align-items: center;
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #4b5563;
  color: #ffffff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
}

.dashboard-item-tts:hover {
  background-color: #718096;
}

.dashboard-loading {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #4b5563;
}

.dashboard-error {
  margin-top: 20px;
  font-size: 16px;
  font-weight: bold;
  color: #f56565;
}
</style>