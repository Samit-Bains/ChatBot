var myRestify = require('restify');
var builder = require('botbuilder');

//My own file for storing functions related to the menu
var menu = require('./menu');
var main = require('./main');

//Creating rest server
var myServer = myRestify.createServer();
myServer.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s listening to %s', myServer.name, myServer.url);
});

//Creating chatbot connector
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//Creating Bot Client
var bot = new builder.UniversalBot(connector);

myServer.post('/api/messages', connector.listen());


bot.dialog('/', [
    function (session) {
        main.mainOptions(session);
    },
    
]).triggerAction({ matches: /^(M | m | Main | main | O | o | options | Options)/i });

bot.dialog('mainMenu', [
    function (session) {
        menu.viewMenu(session);
    },
]).triggerAction({ matches: /^(Taking you to the Main Menu)/i });

bot.dialog('lunchMenu', [
    function (session) {
        menu.lunchMenu(session);
    },
]).triggerAction({ matches: /^(Taking you to the Lunch Menu)/i });