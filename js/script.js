const selectTag = document.querySelectorAll('#select'),
fromTextInput = document.querySelector('.from-text-input'),
toTextInput = document.querySelector('.to-text-input'),
translateBtn = document.querySelector('button');

let fromCopyBtn = document.querySelector('.from-copy'),
toCopyBtn = document.querySelector('.to-copy');


selectTag.forEach(function(tag, id) {
    // console.log(tag);
    for (const country_code in countries) {
        // console.log(countries[country_code]);
        let selected;
        if (id === 0 && country_code === "en-GB") {
            selected = "selected";
        } else if (id === 1 && country_code === "fr-FR") {
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        tag.insertAdjacentHTML('beforeend', option);
    }
});

fromTextInput.addEventListener('keyup', function() {
    toTextInput.value = "";
})

translateBtn.addEventListener('click', function() {
    let text = fromTextInput.value;
    toTextInput.value = "Translating...";
    let translateFrom = selectTag[0].value,
    translateTo = selectTag[1].value;
    translateFn(text, translateFrom, translateTo);

});

const translateFn = async function(text, translateFrom, translateTo) {
    const response = await fetch(`https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`);
    const data = await response.json();
    toTextInput.value = data.responseData.translatedText;
}


// Clear text fields on reload

function init() {
    document.querySelector(".from-text-input").value = "";
    document.querySelector(".to-text-input").value = "";
}

window.onload = init;


// Copy from-text

fromCopyBtn.addEventListener('click', function() {
    navigator.clipboard
    .writeText(fromTextInput.value)
    .then(
        success => console.log('Text has been copied successfully'),
        err => console.log('There has been an error copying the text')
    );
});

// Copy to-text

toCopyBtn.addEventListener('click', function() {
    navigator.clipboard
    .writeText(toTextInput.value)
    .then(
        success => console.log('Text has been copied successfully'),
        err => console.log('There has been an error copying the text')
    );
});


// Paste from-text

// document.addEventListener('DOMContentLoaded', function(){
//     let pasteBtn = document.querySelector('.fa-clipboard');
//     pasteBtn.addEventListener('click', function() {
//         navigator.clipboard
//         .readText()
//         .then(
//             clipText => fromTextInput.innerText = clipText,
//             err => console.log(err)
//         );
//     })
    
// });


// Enable text-to-speech

let fromSpeech = new SpeechSynthesisUtterance();

fromSpeech.lang = selectTag[0].value;

document.querySelector(".from-voice").addEventListener("click", () => {
    // Set the text property with the value of the textarea
    fromSpeech.text = document.querySelector(".from-text-input").value;
  
    // Start Speaking
    window.speechSynthesis.speak(fromSpeech);
});



let toSpeech = new SpeechSynthesisUtterance();

toSpeech.lang = selectTag[1].value;


document.querySelector(".to-voice").addEventListener("click", () => {
    // Set the text property with the value of the textarea
    toSpeech.text = document.querySelector(".to-text-input").value;
  
    // Start Speaking
    window.speechSynthesis.speak(toSpeech);
});




