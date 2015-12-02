// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

var open  = require('open');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {


	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	var search = vscode.commands.registerCommand('extension.searchStack', () => {
		// The code you place here will be executed every time your command is executed

		vscode.window.showInputBox({
			prompt: 'What do you want to search for?'
		}).then((result) => {
			open('http://stackoverflow.com/search?q=' + result);
		});
	});
	
	//use Stack Overflow to search selected text
	var s_search = vscode.commands.registerTextEditorCommand('extension.searchSelection', (textEdtior: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
		let selection = {
			start: textEdtior.selections[0].start, 
			end: textEdtior.selections[0].end
		};
		
		
		//Get the whole line of code with the selection
		let lineOfSelectionStart = selection.start.line;
		let charOfSelectionStart = selection.start.character;
		let lineOfSelectionEnd = selection.end.line;
		let charOfSelectionEnd = selection.end.character;
		
		let output = "";
		
		for (var index = lineOfSelectionStart; index <= lineOfSelectionEnd; index++) {
			let line = textEdtior.document.lineAt(index).text;
			
			if (index === lineOfSelectionStart) {
				// Trim from the beginning
				line = line.slice(charOfSelectionStart);
			} else if (index === lineOfSelectionEnd) {
				// Trim from the end
				line = line.slice(0, charOfSelectionEnd);
			}
			
			output += line + "";
			
		}
		
		
		//Use the node module "open" to open a web browser
		
		open('http://stackoverflow.com/search?q='+output);
		
	});

	context.subscriptions.push(search);
}