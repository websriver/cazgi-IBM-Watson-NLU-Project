const express = require('express');
const dotenv = require('dotenv');
const app = new express();

dotenv.config();

function getNLUInstance(){
    let api_key = process.env.api_key;
    let api_url = process.env.api_url;

    const NaturalLanguageUnderstanding = require('ibm-watson/natural-language-understanding/v1');
    const {IamAuthenticator} = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstanding({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    })
    return naturalLanguageUnderstanding;
}


app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'emotion': {}
        }
    };
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
        console.log('error:', err);
        return res.send(err);
    });    
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
        'url': req.query.url,
        'features': {
            'sentiment': {}
        }
    };
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults.result.sentiment.document, null, 2));
        return res.send(analysisResults.result.sentiment.document);
    })
    .catch(err => {
        console.log('error:', err);
        return res.send(err);
    });
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'emotion': {}
        }
    };
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        return res.send(analysisResults.result.emotion.document.emotion);
    })
    .catch(err => {
        console.log('error:', err);
        return res.send(err);
    });  
});

app.get("/text/sentiment", (req,res) => {
    const analyzeParams = {
        'text': req.query.text,
        'features': {
            'sentiment': {}
        }
    };
    getNLUInstance().analyze(analyzeParams)
    .then(analysisResults => {
        console.log(JSON.stringify(analysisResults, null, 2));
        return res.send(analysisResults.result.sentiment.document);
    })
    .catch(err => {
        console.log('error:', err);
        return res.send(err);
    });
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

