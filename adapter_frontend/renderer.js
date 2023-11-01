// const { ipcRenderer } = require("electron");

const button = document.getElementById("save");
button.addEventListener("click", () => {
  const robotName = document.getElementById("name").value;
  const host = document.getElementById("host").value;
  const username = document.getElementById("username").value;
  const port = document.getElementById("port").value;
  const robot = {
    name: robotName,
    host: host,
    username: username,
    port: port,
  };

  window.electronAPI.saveRobot(robot);
});

// ipcRenderer.on("config-saved", () => {
//   alert("Configuration saved successfully!").then(() => {
//     // Reset form fields
//     document.getElementById("name").value = "";
//     document.getElementById("host").value = "";
//     document.getElementById("username").value = "";
//     document.getElementById("port").value = "";
//   });
// });

// ipcRenderer.on("config-error", () => {
//   alert("Failed to save configuration. Please try again.");
// });
