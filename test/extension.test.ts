// 
// Note: This example test is leveraging the Mocha test framework.
// Please refer to their documentation on https://mochajs.org/ for help.
//

// The module 'assert' provides assertion methods from node
import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as selection from '../src/selection';

// Defines a Mocha test suite to group tests of similar kind together
describe("Extension Tests", () => {

	// Defines a Mocha unit test
	test("Selection gets text from a selection", () => {
		// Example"
		// Sele
		// ction 1
		var documentMock = {
			lineAt: function (line: number) {
				if (line === 0) {
					return {
						text: "Sele"
					}
				} else {
					return {
						text: "ction 1"	
					}
				}
			}
		}
		
		var thisSelection = {
			start: {
				line: 0,
				character: 0
			}, 
			end: {
				line: 1,
				character: 5
			}};
		
		let myString = selection.getStringFromSelection(thisSelection, documentMock);
		
		assert.equal(myString.toString(), "Sele ction ");
	});
});