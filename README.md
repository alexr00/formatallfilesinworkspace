# formatallfilesinworkspace README

## Features

A silly little extension provides the **Format All Files in Workspace** command, which opens each of the files in your workspace and formats them using whatever extensions you already have installed for formatting. It is recommended that you set the included file extensions and excluded folder settings before running, as the defaults may not be appropriate for your setup. **Warning**: Formatting all your files may be slow.

testing a change

another change!

## Extension Settings

* `formatAll.includeFileExtensions`: Only files with file extensions in this list will be opened and formatted. Defaults to `[".ts", ".json"]`.
* `formatAll.excludeFolders`: These folders will be skipped when looking for files to format. Defaults to `["node_modules", "out", ".vscode-test", "media"]`

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 0.0.1

Initial release of Format All Files in Workspace
