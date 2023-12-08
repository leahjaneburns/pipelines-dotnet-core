
RAI = "https://prod-15.centralus.logic.azure.com/workflows/b538c5926a7247a9a142273225f258b6/triggers/manual/paths/invoke/rest/v2/assets/{id}?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cbfOb0W4suwjGM6UkU__G9blrSO1DC50BBwtygUkoGI";


RIAURI0 = "https://prod-15.centralus.logic.azure.com/workflows/b538c5926a7247a9a142273225f258b6/triggers/manual/paths/invoke/rest/v2/assets/";
RIAURI1 = "?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=cbfOb0W4suwjGM6UkU__G9blrSO1DC50BBwtygUkoGI";


function translateText() {
    const subscriptionKey = '977f6b4e77a24eca968b24f8d3ae09cc';
    const endpoint = 'https://api.cognitive.microsofttranslator.com/';

    const textToTranslate = document.getElementById('textToTranslate').value;
    const targetLanguage = document.getElementById('targetLanguage').value;

    const apiUrl = `${endpoint}/translate?api-version=3.0&to=${targetLanguage}`;

    const body = [{ 'text': textToTranslate }];

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-Key': subscriptionKey,
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Region': 'westus'
        },
        body: JSON.stringify(body)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        return response.json();
    })
    .then(translation => {
        const translatedText = translation[0].translations[0].text;
        document.getElementById('translatedText').innerText = `Translated text: ${translatedText}`;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('translatedText').innerText = 'Translation failed.';
    });
}


