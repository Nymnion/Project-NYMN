function showConfigModal() {
  const configModal = document.createElement("div");
  configModal.id = "config-modal";
  configModal.style.position = "fixed";
  configModal.style.top = "0";
  configModal.style.left = "0";
  configModal.style.width = "100%";
  configModal.style.height = "100%";
  configModal.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  configModal.style.display = "flex";
  configModal.style.justifyContent = "center";
  configModal.style.alignItems = "center";
  configModal.style.zIndex = "1000";

  const configForm = document.createElement("form");
  configForm.style.backgroundColor = "white";
  configForm.style.padding = "2rem";
  configForm.style.borderRadius = "8px";

  const apiKeyLabel = document.createElement("label");
  apiKeyLabel.textContent = "OpenAI API Key:";
  apiKeyLabel.htmlFor = "api-key";

  const apiKeyInput = document.createElement("input");
  apiKeyInput.id = "api-key";
  apiKeyInput.name = "api-key";
  apiKeyInput.type = "password";
  apiKeyInput.value = localStorage.getItem("openai_api_key") || "";

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.textContent = "Save";

  configForm.appendChild(apiKeyLabel);
  configForm.appendChild(apiKeyInput);
  configForm.appendChild(saveButton);

  configForm.addEventListener("submit", (event) => {
    event.preventDefault();
    localStorage.setItem("openai_api_key", apiKeyInput.value);
    configModal.remove();
  });

  configModal.appendChild(configForm);
  document.body.appendChild(configModal);
}

document.getElementById("api-key").addEventListener("click", showConfigModal);
