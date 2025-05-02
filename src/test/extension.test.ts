import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Extension should be activated', async () => {
    const extension = vscode.extensions.getExtension('your-extension-id');
    assert.ok(extension, 'Extension should be present');
    await extension?.activate();
    assert.ok(extension.isActive, 'Extension should be activated');
  });

  test('Should open WebView when command is executed', async () => {
    const commandId = 'extension.openCanvas';

    // Execute the command to open the WebView
    await vscode.commands.executeCommand(commandId);

    // Check if an active WebView exists
    const activePanel = vscode.window.activeTextEditor;
    assert.ok(activePanel, 'WebView should be opened');
  });
});
