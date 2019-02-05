var myRestify = require('restify');
var myBotBuilder = require('botbuilder');

//Creating rest server
var myServer = myRestify.createServer();
myServer.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s listening to %s', myServer.name, myServer.url);
});

//Creating chatbot connector
var connector = new myBotBuilder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

//Creating Bot Client
var myBot = new myBotBuilder.UniversalBot(connector);
myServer.post('/api/messages', connector.listen());

//Creating output message in dialog
myBot.dialog('/', function(session){

    // session.send(session.message.text);
    var msg = session.message.text;
    if(msg == "Are you a bot?"){
        session.send("Yes");
    }else{
        session.send("Samit");
    }
});