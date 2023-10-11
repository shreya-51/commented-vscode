const vscode = require('vscode');
const { exec } = require('child_process');
const path = require('path');
require('dotenv').config({path: path.join(__dirname, ".env")});

const PYTHON_PATH = process.env.PYTHON_PATH;

function getCurrentOpenFile() {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
        const document = editor.document;
        const filePath = document.fileName;
        return filePath;
    } else {
        console.log('No active editor!');
        return null;
    }
}

function getEntireText() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No editor is active, cannot find text.');
        return;
    }
    const entireText = editor.document.getText();
	return entireText;
}

function getHighlightedText() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No editor is active, cannot find highlighted text.');
        return;
    }
    const selection = editor.selection;
    const highlightedText = editor.document.getText(selection);
    const startLineNumber = selection.start.line + 1;
    return {
        text: highlightedText,
        line: startLineNumber
    };
}

function insertTextAtLine(lineNumber, text) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        vscode.window.showInformationMessage('No editor is active.');
        return;
    }
    const adjustedLineNumber = lineNumber - 1;
    const lineBelow = editor.document.lineAt(adjustedLineNumber);
    const indentationMatch = lineBelow.text.match(/^\s*/);
    const indentation = indentationMatch ? indentationMatch[0] : '';
    const position = new vscode.Position(adjustedLineNumber, 0);
    const textEdit = vscode.TextEdit.insert(position, indentation + text);
    const workspaceEdit = new vscode.WorkspaceEdit();
    workspaceEdit.set(editor.document.uri, [textEdit]);
    vscode.workspace.applyEdit(workspaceEdit);
}

async function processFile(filePath)
{
	let highlighted_text = getHighlightedText();
	let entire_text = getEntireText();
	let line = highlighted_text.line;

    let python_script_path = path.join(__dirname, "process.py");
	
	try
	{
		exec(`${PYTHON_PATH} ${python_script_path} "${highlighted_text.text}" "${entire_text}"`, (error, stdout, stderr) => 
		{
			if (error)
			{
				console.error(`Error: ${error.message}`)
				return;
			}

			if (stderr)
			{
				console.error(`Stderr: ${stderr}`);
				return
			}

			const processedContent = stdout;
			insertTextAtLine(line, processedContent)
		});
	}

	catch (error)
	{
		console.error(error);
		vscode.window.showErrorMessage('Failed to process the file.');
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	let disposable = vscode.commands.registerCommand('commented.comment', async function () {
		const filePath = getCurrentOpenFile();
		let fileUri = vscode.Uri.file(filePath);
		processFile(fileUri);
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
