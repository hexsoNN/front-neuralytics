import coreApiClient from "@/providers/core-api/CoreApi"

export default {
  getEntities() {
    return coreApiClient.sendRequest("get", "/entities", {})
  },
  getRooms() {
    return coreApiClient.sendRequest("get", "/rooms", {})
  },
  getEntity(id) {
    return coreApiClient.sendRequest("get", `/entities?id=${id}`, {})
  },
  updateEntity(id, data) {
    return coreApiClient.sendRequest("post", `/entities?id=${id}`, data)
  },
  deleteEntity(id) {
    return coreApiClient.sendRequest("get", `/delete_entities?id=${id}`, {})
  },
  newEntity(data) {
    return coreApiClient.sendRequest("post", "/new_entity", data)
  }
}
