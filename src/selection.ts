export function getStringFromSelection(selection, document) {
	//Get the whole line of code with the selection
	let lineOfSelectionStart = selection.start.line;
	let charOfSelectionStart = selection.start.character;
	let lineOfSelectionEnd = selection.end.line;
	let charOfSelectionEnd = selection.end.character;
	
	let output = "";
	
	for (var index = lineOfSelectionStart; index <= lineOfSelectionEnd; index++) {
		let line = document.lineAt(index).text;
		
		if (index === lineOfSelectionStart) {
			// Trim from the beginning
			line = line.slice(charOfSelectionStart);
		} else if (index === lineOfSelectionEnd) {
			// Trim from the end
			line = line.slice(0, charOfSelectionEnd);
		}
		
		output += line + " ";
	}
	
	return output;
}