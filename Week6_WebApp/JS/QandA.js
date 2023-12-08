// Sample JavaScript code to interact with QnA Maker
const subscriptionKey = '4c1c3249464b4cd58ed8b9b5481829ec';
const endpoint = 'https://b00775627-mediasharing-qanda.cognitiveservices.azure.com/';

// Function to call Q&A Maker service
function queryQnAMaker(question) {

  
    var subscriptionKey = '4c1c3249464b4cd58ed8b9b5481829ec';
    var endpoint = 'https://b00775627-mediasharing-qanda.cognitiveservices.azure.com/';//
    var url = endpoint + 'language/:query-knowledgebases?projectName=MediaSharing&api-version=2021-10-01&deploymentName=production';

    var body ={
        'Question': question
    }


    fetch(url, {
        method: 'POST',
        headers: {
            'Ocp-Apim-Subscription-key':subscriptionKey,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(data => {
        // Handle the response - data contains the answer and other info
        console.log('Answer:', data.answers[0].answer);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Example usage
const userQuestion = 'Can I automatically login without a login?';
queryQnAMaker(userQuestion);

