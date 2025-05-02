import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// Function to save drawing data
async function saveDrawingData(drawingData: any) {
    const projectDirectoryPath = 'D:\\Projects\\min6';
    const drawingFilePath = path.join(projectDirectoryPath, 'drawing.json');

    if (!fs.existsSync(projectDirectoryPath)) {
        try {
            fs.mkdirSync(projectDirectoryPath, { recursive: true });
            vscode.window.showInformationMessage(`Created directory: ${projectDirectoryPath}`);
        } catch (error) {
            vscode.window.showErrorMessage(`Failed to create directory: ${error instanceof Error ? error.message : 'Unknown error'}`);
            return;
        }
    }

    try {
        fs.writeFileSync(drawingFilePath, JSON.stringify(drawingData, null, 2));
        vscode.window.showInformationMessage(`Drawing saved to ${drawingFilePath}`);
    } catch (error) {
        vscode.window.showErrorMessage(`Failed to save drawing: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
}

// Function to activate the extension
export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('DragNative', () => {
        const panel = vscode.window.createWebviewPanel(
            'canvasWebview',
            'Canvas Drawing',
            vscode.ViewColumn.One,
            { enableScripts: true }
        );

        // Get the React app's index.html path
        const reactAppPath = vscode.Uri.file(
            path.join(context.extensionPath, 'dist', 'index.html')
        );
        
        // Convert to a webview URI
        const reactAppUri = panel.webview.asWebviewUri(reactAppPath);

        // Load the React app in an iframe
        panel.webview.html = getWebviewContent(reactAppUri);

        // Listen for messages from the WebView
        panel.webview.onDidReceiveMessage(
            message => {
                if (message.command === 'saveDrawing') {
                    saveDrawingData(message.data);
                }
            },
            undefined,
            context.subscriptions
        );
    });

    context.subscriptions.push(disposable);
}

// Function to generate the WebView content
function getWebviewContent(reactAppUri: vscode.Uri): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>React WebView</title>
        <style>
            body { margin: 0; overflow: hidden; }
            iframe { width: 100vw; height: 100vh; border: none; }
        </style>
    </head>
    <body>
        <iframe src="${reactAppUri}"></iframe>
    </body>
    </html>
    `;
}

// Function to deactivate the extension
export function deactivate() {}
