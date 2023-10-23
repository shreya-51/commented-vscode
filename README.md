# commented-vscode

A VS Code extension to automatically add comments to code.

## Usage:
 - Highlight a section of code
 - Use "cmd+K" or "ctrl+k" to add a one-line comment that describes the highlighted code

## MVP Demo:
<video width="160" height="120" controls>
  <source src="https://github.com/shreya-51/commented-vscode/assets/48033781/d64a04d7-89c1-4760-993e-e511f108231d" type="video/mp4">
Your browser does not support the video tag.
</video>

https://github.com/shreya-51/commented-vscode/assets/48033781/d64a04d7-89c1-4760-993e-e511f108231d

## Setup:
1. Navigate to source code: <br> <br>
   For MacOS:
   > ~/.vscode/extensions/shreyaw.commented-0.0.1 
   
   For Windows:
   > C:\Users\<YourUsername>\.vscode\extensions\shreyaw.commented-0.0.1
3. Update .env variables using script.py:
   > python3 script.py "PYTHON_PATH=<your python path>" "OPENAI_API_KEY=<your openai api key>"
4. Refresh VSCode

## Known Limitations:
 - Problems generating comment in longer files

## Currently working on:
 - Robust comment-generation for all files of all lengths
 - Full codebase context when generating comments
 - Command to generate comments for entire files, directories, or codebases

