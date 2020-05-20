// This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
// Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
// session persistence, api calls, and more.
const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'Hola, dime tu numero de d.n.i. incluyendo los ceros';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const DniIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'dniIntent';
    },
    handle(handlerInput) {
        
        var num1 = handlerInput.requestEnvelope.request.intent.slots.numA.value;
        var num2 = handlerInput.requestEnvelope.request.intent.slots.numB.value;
        var num3 = handlerInput.requestEnvelope.request.intent.slots.numC.value;
        var num4 = handlerInput.requestEnvelope.request.intent.slots.numD.value;
        var num5 = handlerInput.requestEnvelope.request.intent.slots.numE.value;
        var num6 = handlerInput.requestEnvelope.request.intent.slots.numF.value;
        var num7 = handlerInput.requestEnvelope.request.intent.slots.numG.value;
        var num8 = handlerInput.requestEnvelope.request.intent.slots.numH.value;

        const letraDni= ['T','R','W','A','G','M','Y','F','P','D','X','B','N','J','Z','S','Q','V','H','L','C','K','E'];

        var dni= num1+num2+ num3+num4+num5+num6+num7+num8;
        
        var position=parseInt(dni)%23;
        
        const speakOutput = 'La letra de tu d.n.i. es '+ letraDni[position];

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(getRandomItem(PREGUNTAS))
            .getResponse();
    }
};
const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent' 
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.YesIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Si me dices un numero de d.n.i. incluyendo todos los ceros, te diré cual es su letra';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.NoIntent'
            || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = 'Adiós';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse();
    }
};


// Generic error handling to capture any syntax or routing errors. If you receive an error
// stating the request handler chain is not found, you have not implemented a handler for
// the intent being invoked or included it in the skill builder below.
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`~~~~ Error handled: ${error.stack}`);
        const speakOutput = `Perdón, no te he entendido, vuelve a repetirme tu número de d.n.i. incluyendo los ceros`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

function getRandomItem(array) { 
    return array[Math.floor(Math.random()*array.length)]
}
const PREGUNTAS = [ // <-- Diferentes frases para preguntarte si quieres otra más, para hacerlo un poco más ameno
  'Dime tu letra de d.n.i. incluyendo los ceros',
  'Puedo decirte tu letra de d.n.i. si me dices el número, recuerda añadir los ceros',
  'Averiguaré la letra de tu d.n.i. si me dices el número con los ceros previos'
];

// The SkillBuilder acts as the entry point for your skill, routing all request and response
// payloads to the handlers above. Make sure any new handlers or interceptors you've
// defined are included below. The order matters - they're processed top to bottom.
exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        DniIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler,
    )
    .addErrorHandlers(
        ErrorHandler,
    )
    .lambda();
