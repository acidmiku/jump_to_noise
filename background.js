let lastIndex = -1;

browser.commands.onCommand.addListener(async (command) => {
  if (command !== "jump-to-noise") return;

  const audibleTabs = await browser.tabs.query({ audible: true });

  if (audibleTabs.length === 0) return;

  lastIndex = (lastIndex + 1) % audibleTabs.length;
  const target = audibleTabs[lastIndex];

  await browser.tabs.update(target.id, { active: true });
  await browser.windows.update(target.windowId, { focused: true });
});

browser.tabs.onUpdated.addListener((tabId, changeInfo) => {
  if (changeInfo.audible === false) {
    lastIndex = -1;
  }
});

browser.tabs.onRemoved.addListener(() => {
  lastIndex = -1;
});
