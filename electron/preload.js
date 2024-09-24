contextBridge.exposeInMainWorld("api", {
  fetchRequests: () => ipcRenderer.invoke("fetch-requests"),
  createRequests: (userData) => ipcRenderer.invoke("create-requests", userData),
  updateRequest: (name, data) =>
    ipcRenderer.invoke("update-request", { name, data }), // Adicionado para atualização
});
