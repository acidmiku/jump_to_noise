# Jump to Noise

Firefox extension that jumps to the tab currently playing audio. If multiple tabs are playing, subsequent presses cycle through them.

## Install

Download `jump_to_noise.xpi` from [Releases](https://github.com/acidmiku/jump_to_noise/releases) and open it in Firefox.

## Usage

- Press `Alt+Shift+M` (default) to jump to the playing tab
- Press again to cycle through multiple playing tabs
- Click the extension icon to configure a custom hotkey

## Build

The `.xpi` is just a zip of the source files:

```bash
zip -r jump_to_noise.xpi manifest.json background.js popup/ icons/
```
