import * as vscode from 'vscode';
import * as path from 'path';

let includeExtensions: string[] = [];
let excludeFolders: string[] = [];
let unableToFormat: string[] = [];

export function activate(context: vscode.ExtensionContext) {
	const config = vscode.workspace.getConfiguration('formatAll');
	includeExtensions = config.get('includeFileExtensions', []);
	excludeFolders = config.get('excludeFolders', []);

	let disposable = vscode.commands.registerCommand('formatallfilesinworkspace.formatAll', async () => {
		const folders = vscode.workspace.workspaceFolders;
		if (!folders) {
			return;
		}
		for (const folder of folders) {
			await formatAll(folder.uri);
		}
		vscode.window.showInformationMessage('Finished formatting all.');
	});

	context.subscriptions.push(disposable);
}

async function formatAll(uri: vscode.Uri): Promise<any> {
	const stat: vscode.FileStat = await vscode.workspace.fs.stat(uri);
	if (((stat.type & vscode.FileType.Directory) === vscode.FileType.Directory) && !excludeFolders.includes(path.basename(uri.fsPath))) {
		const files = await vscode.workspace.fs.readDirectory(uri);
		for (const file of files) {
			await formatAll(vscode.Uri.joinPath(uri, file[0]));
		}
	} else if (((stat.type & vscode.FileType.File) === vscode.FileType.File) && includeExtensions.includes(path.extname(uri.fsPath))) {
		try {
			await vscode.window.showTextDocument(uri);
			await vscode.commands.executeCommand('editor.action.formatDocument');
		} catch (e) {
			unableToFormat.push(uri.fsPath);
		}
	}
}
