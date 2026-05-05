const input = document.getElementById("shortcut-input");
const recordBtn = document.getElementById("record-btn");
const currentDisplay = document.getElementById("current-shortcut");
const status = document.getElementById("status");

let recording = false;

async function loadCurrentShortcut() {
  const commands = await browser.commands.getAll();
  const cmd = commands.find((c) => c.name === "jump-to-noise");
  if (cmd && cmd.shortcut) {
    currentDisplay.textContent = cmd.shortcut;
    input.placeholder = cmd.shortcut;
  }
}

function showStatus(msg, type) {
  status.textContent = msg;
  status.className = "status " + type;
  setTimeout(() => {
    status.textContent = "";
    status.className = "status";
  }, 3000);
}

function startRecording() {
  recording = true;
  input.value = "";
  input.classList.add("recording");
  input.placeholder = "Press keys...";
  recordBtn.textContent = "Stop";
  recordBtn.classList.add("recording");
  input.focus();
}

function stopRecording() {
  recording = false;
  input.classList.remove("recording");
  recordBtn.textContent = "Record";
  recordBtn.classList.remove("recording");
}

recordBtn.addEventListener("click", () => {
  if (recording) {
    stopRecording();
  } else {
    startRecording();
  }
});

input.addEventListener("keydown", async (e) => {
  if (!recording) return;
  e.preventDefault();

  const modifiers = [];
  if (e.ctrlKey) modifiers.push("Ctrl");
  if (e.altKey) modifiers.push("Alt");
  if (e.shiftKey) modifiers.push("Shift");
  if (e.metaKey) modifiers.push("Command");

  const key = e.key;
  const ignoredKeys = ["Control", "Alt", "Shift", "Meta"];
  if (ignoredKeys.includes(key)) {
    input.value = modifiers.join("+") + "+...";
    return;
  }

  if (modifiers.length === 0) {
    input.value = "Need a modifier (Ctrl/Alt/Shift)";
    return;
  }

  const keyName = key.length === 1 ? key.toUpperCase() : key;
  const shortcut = [...modifiers, keyName].join("+");
  input.value = shortcut;

  stopRecording();

  try {
    await browser.commands.update({
      name: "jump-to-noise",
      shortcut: shortcut,
    });
    currentDisplay.textContent = shortcut;
    showStatus("Shortcut updated!", "success");
  } catch (err) {
    showStatus("Invalid shortcut: " + err.message, "error");
  }
});

loadCurrentShortcut();
