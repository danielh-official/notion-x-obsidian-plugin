import Plugin from "../main"
import {PluginManifest} from "obsidian"
import GetNotionPageCommand from "../src/Commands/GetNotionPageCommand";

const manifest: PluginManifest = require('manifest.json');

const getNotionPageCommand = new GetNotionPageCommand(app, new Plugin(app, manifest));

describe('handle', function () {
	describe('if no url entered, show please enter a url notice', function () {
		getNotionPageCommand.handle();
	})
});
