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

    //ECHO BACK MESSAGE OF USER
    //session.send(session.message.text);

    //PLACES DOTS LIKE IT IS TYPING SOMETHING
    // session.sendTyping();
    // setTimeout(function () {
    //     session.send("Hello there...");
    // }, 3000);

    // var msg = session.message.text;
    // if(msg == "Are you a bot?"){
    //     session.send("Yes");
    // }else{
    //     session.send("Samit");
    // }

    //ECHO TEXT AND ACCEPT ATTACHMENTS
    // var msg = session.message;
    // if (msg.attachments && msg.attachments.length > 0) {
    //  // Echo back attachment
    //  var attachment = msg.attachments[0];
    //     session.send({
    //         text: "You sent:",
    //         attachments: [
    //             {
    //                 contentType: attachment.contentType,
    //                 contentUrl: attachment.contentUrl,
    //                 name: attachment.name
    //             }
    //         ]
    //     });
    // } else {
    //     // Echo back users text
    //     session.send("You said: %s", session.message.text);
    // }

});

// DIFFERENT CARD FUNCTIONALITIES
// myBot.dialog('/', [
//     function (session) {
//         myBotBuilder.Prompts.choice(session, 'What card would like to test?', CardNames, {
//             maxRetries: 3,
//             retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
//         });
//     },
//     function (session, results) {

//         // create the card based on selection
//         var selectedCardName = results.response.entity;
//         var card = createCard(selectedCardName, session);

//         // attach the card to the reply message
//         var msg = new myBotBuilder.Message(session).addAttachment(card);
//         session.send(msg);
//     }
// ]);

// const HeroCardName = 'Hero card';
// const ThumbnailCardName = 'Thumbnail card';
// const ReceiptCardName = 'Receipt card';
// const SigninCardName = 'Sign-in card';
// const CardNames = [HeroCardName, ThumbnailCardName, ReceiptCardName, SigninCardName];

// function createCard(selectedCardName, session) {
//     switch (selectedCardName) {
//         case HeroCardName:
//             return createHeroCard(session);
//         case ThumbnailCardName:
//             return createThumbnailCard(session);
//         case ReceiptCardName:
//             return createReceiptCard(session);
//         case SigninCardName:
//             return createSigninCard(session);
//         default:
//             return createHeroCard(session);
//     }
// }

// function createHeroCard(session) {
//     return new myBotBuilder.HeroCard(session)
//         .title('BotFramework Hero Card')
//         .subtitle('Your bots — wherever your users are talking')
//         .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
//         .images(getSampleCardImages(session))
//         .buttons(getSampleCardActions(session));
// }

// function createThumbnailCard(session) {
//     return new myBotBuilder.ThumbnailCard(session)
//         .title('BotFramework Thumbnail Card')
//         .subtitle('Your bots — wherever your users are talking')
//         .text('Build and connect intelligent bots to interact with your users naturally wherever they are, from text/sms to Skype, Slack, Office 365 mail and other popular services.')
//         .images(getSampleCardImages(session))
//         .buttons(getSampleCardActions(session));
// }

// var order = 1234;
// function createReceiptCard(session) {
//     return new myBotBuilder.ReceiptCard(session)
//         .title('John Doe')
//         .facts([
//             myBotBuilder.Fact.create(session, order++, 'Order Number'),
//             myBotBuilder.Fact.create(session, 'VISA 5555-****', 'Payment Method'),
//         ])
//         .items([
//             myBotBuilder.ReceiptItem.create(session, '$ 38.45', 'Data Transfer')
//                 .quantity(368)
//                 .image(myBotBuilder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png')),
//                 myBotBuilder.ReceiptItem.create(session, '$ 45.00', 'App Service')
//                 .quantity(720)
//                 .image(myBotBuilder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png'))
//         ])
//         .tax('$ 7.50')
//         .total('$ 90.95')
//         .buttons([
//             myBotBuilder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/pricing/', 'More Information')
//                 .image('https://raw.githubusercontent.com/amido/azure-vector-icons/master/renders/microsoft-azure.png')
//         ]);
// }

// function createSigninCard(session) {
//     return new myBotBuilder.SigninCard(session)
//         .text('BotFramework Sign-in Card')
//         .button('Sign-in', 'https://login.microsoftonline.com')
// }

// function getSampleCardImages(session) {
//     return [
//         myBotBuilder.CardImage.create(session, 'https://sec.ch9.ms/ch9/7ff5/e07cfef0-aa3b-40bb-9baa-7c9ef8ff7ff5/buildreactionbotframework_960.jpg')
//     ];
// }

// function getSampleCardActions(session) {
//     return [
//         myBotBuilder.CardAction.openUrl(session, 'https://docs.botframework.com/en-us/', 'Get Started')
//     ];
// }