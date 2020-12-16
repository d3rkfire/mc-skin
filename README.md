# mc-skin
A simple Minecraft HD skin and cape server to be used with OfflineSkins mod.

Run with: Node.js  
Require Formidable: npm install formidable

## How to use
You need to:
1. Install OfflineSkins mod: https://www.curseforge.com/minecraft/mc-mods/offlineskins
2. Open %appdata%/.minecraft/config/offlineskins.cfg (If you don't see the config file, you need to run Minecraft with the mod loaded once first for it to be generated)
3. Set the value of the following two variables:
 - "useCustomServer": true
 - "hostCustomServer" to the skin server. Eg: "hostCustomServer": "http://127.0.0.1"
4. Host the server and forward port if needed
