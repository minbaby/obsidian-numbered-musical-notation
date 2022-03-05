import { App, ButtonComponent, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';
import {parse, Score} from 'musje'

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	isPlaying = false;
	score: Score

	async onload() {
		await this.loadSettings();

		this.registerMarkdownCodeBlockProcessor("fuck", (source, el, ctx) => {

			console.log(source, el, ctx);
			try {
				this.score = parse(source);
			} catch (e ) {
				console.log(e);
				this.score = new Score({});
			}
			
			const optToolBar = el.createEl("div");
			optToolBar.createEl("button", {text: "play"}).addEventListener("click", (ev) => {
				if (this.isPlaying) {
					console.log("playing")
				} else {
					this.isPlaying = true;
					this.score.play()
				}
			})
			optToolBar.createEl("button", {text: "pause"}).addEventListener("click", (ev) => {
				if (!this.isPlaying) {
					console.log("not playing")
				} else {
					this.isPlaying = false;
					this.score.pause()
				}
			})
			optToolBar.createEl("button", {text: "stop"}).addEventListener("click", (ev) => {
				if (!this.isPlaying) {
					console.log("not playing")
				} else {
					this.isPlaying = false;
					this.score.stop()
				}
			})

			el.appendChild(this.score.render());

			

		}, 0);

		this.registerEvent(
			this.app.workspace.on("file-open", () => {
				if (this.isPlaying && this.score != null) {
					this.score.stop()
				}
			})
		);

		this.registerEvent(
			this.app.workspace.on("codemirror", () => {
				if (this.isPlaying && this.score != null) {
					this.score.stop()
				}

				console.log(666)
			})
		);
		
	}

	onunload() {
		if (this.isPlaying && this.score != null) {
			this.score.stop()
		}
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}



