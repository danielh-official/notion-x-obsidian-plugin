// noinspection JSUnusedGlobalSymbols

const basePath = (app.vault.adapter as any).basePath

import * as dotenv from 'dotenv'
dotenv.config({
	path: `${basePath}/.obsidian/plugins/notion-x-obsidian-plugin/.env`,
	debug: false
})

import Plugin from "./src/Plugin";
export default Plugin;
