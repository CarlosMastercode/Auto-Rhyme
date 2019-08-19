/*The MIT License (MIT)

Copyright (c) 2011-2018 Twitter, Inc.
Copyright (c) 2011-2018 The Bootstrap Authors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.*/

// API INFO
const url = 'https://api.datamuse.com/words?';
const Param = 'rel_rhy=';//perfect rhyme

// LINK TO HTML
const input = document.querySelector('#input');
const submit = document.querySelector('#submit'); 
const responseField = document.querySelector('#responseField');

function getWords(event) {  
	event.preventDefault();
	while(responseField.firstChild){
		responseField.removeChild(responseField.firstChild)
	}
	getPerfectRhyme()
	
	responseField.innerHTML = `
	<p>${rhyme[1]}...${rhyme[2]}...${rhyme[3]},</p>`;
}

// AJAX function for getting PERFECT RHYME from Datamuse.com...async so you can run more than one at a time...
const getPerfectRhyme = async() => {
	const rhymeIn = input.value;
	const endpoint = `${url}${Param}${rhymeIn}`;
	try {
		const response = await fetch(endpoint);
		if (response.ok) {
			const jsonResponse = await response.json();
			renderResponse(jsonResponse);
		}
	}
	catch(error) {console.log("Error");}
};

submit.addEventListener('click', getWords);

// RETURN ARRAY FUNCTIONS *******************

// TAKES IN: GETPERFECTRHYME()
const renderResponse = (respo) => {
  
  // In case res comes back as a blank array
  if(!respo.length){
    let wordList = [];
	wordList.push('ERROR', 'ERROR', 'ERROR', 'ERROR', 'ERROR', 'ERROR');
	rhyme = wordList;
	return
  }
  // Creates an empty array to contain the HTML strings
  let wordList = [];
  // Loops through the response from array length up to 10:
  for(let i = 0; i < Math.min(respo.length, 10); i++){
    // CREATE LIST OF WORDS:{
		wordList.push(`${respo[i].word}`);
	}
  rhyme = wordList.sort(function(c, d){return 0.5 - Math.random()});
  return
}




