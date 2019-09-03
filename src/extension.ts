// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as selection from './selection';
import open  = require('open');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let search = vscode.commands.registerCommand('extension.searchStack', () => {
		// The code you place here will be executed every time your command is executed

		vscode.window.showInputBox({
			prompt: 'What do you want to search for?'
		}).then((result) => {
			if(result){
				open('http://stackoverflow.com/search?q=' + result);
			}
		});
	});
	
	//use Stack Overflow to search selected text
	let s_search = vscode.commands.registerTextEditorCommand('extension.searchSelection', (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		let thisSelection = {
			start: textEditor.selections[0].start, 
			end: textEditor.selections[0].end
		};
		
		//Use the node module "open" to open a web browser
		let output = selection.getStringFromSelection(thisSelection, textEditor.document);
		if(output && output.trim.length > 0){
			open('http://stackoverflow.com/search?q='+output);
		}
	});

	context.subscriptions.push(search);
}