// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "jumpincasing" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('jumpincasing.helloWorld', () => {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from JumpInCasing!');

		const editor = vscode.window.activeTextEditor;
		if(!editor) {
			return;
		}

		const line = editor.document.lineAt(editor.selection.start.line);

		const currentLineCharacterIndex = editor.selection.start.character;
		const nextLineCharacterIndex = getNextUpperCaseCharacterIndex(line.text, currentLineCharacterIndex);
		if(nextLineCharacterIndex === -1) {
			return;
		}
		
		const position = new vscode.Position(line.lineNumber, nextLineCharacterIndex);
		editor.selection = new vscode.Selection(position, position);
	});

	context.subscriptions.push(disposable);
}

function getNextUpperCaseCharacterIndex(text: string, currentIndex: number) {
	for(let i=currentIndex+1;i<text.length;i++) {
		const character = text.charAt(i);
		if(isUpperCase(character)) {
			return i;
		}
	}

	return -1;
}

function isUpperCase(text: string) {
	if(!text) {
		return false;
	}

	return text === text.toUpperCase();
}

// this method is called when your extension is deactivated
export function deactivate() {}
