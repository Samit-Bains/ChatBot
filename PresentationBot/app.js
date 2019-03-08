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
var bot = new builder.UniversalBot(connector, function (session) {
    // session.send("Hi, I am here to help you. Would you like to see how?");
    main.mainOptions(session);
});

myServer.post('/api/messages', connector.listen());


bot.dialog('helpOptions', [
    function (session) {
        builder.Prompts.choice(session, 'Please select an option', CardNames, {
            maxRetries: 3,
            retryPrompt: 'Ooops, what you wrote is not a valid option, please try again'
        });
    },
    function (session, results) {

        // create the card based on selection
        var selectedCardName = results.response.entity;
        var card = createCard(selectedCardName, session);

        // attach the card to the reply message
        var msg = new builder.Message(session).addAttachment(card);
        session.send(msg);
    }
]).triggerAction({ matches: /^(Yes|yes|Ya|ya|y|Y)/i });

const Menu = 'View menu';
const Reservation = 'Book a reservation';
const Hours = 'View hours';
const Empty = 'Order for pick-up/delivery';
const CardNames = [Menu, Reservation, Hours, Empty];

function createCard(selectedCardName, session) {
    switch (selectedCardName) {
        case Menu:
            return menu.viewMenu(session);
        case Reservation:
            return bookReservation(session);
        case ReceiptCardName:
            return createReceiptCard(session);
        default:
            return createHeroCard(session);
    }
}

function bookReservation(session) {
    return new builder.ThumbnailCard(session)
        .title('Book your reservation here!')
        .subtitle('Easy and quick')
        .text('Connect to make a reservation for your special event')
        .images(getReservationImages(session))
        .buttons(getReservationActions(session));
}

var order = 1234;
function createReceiptCard(session) {
    return new builder.ReceiptCard(session)
        .title('John Doe')
        .facts([
            builder.Fact.create(session, order++, 'Order Number'),
            builder.Fact.create(session, 'VISA 5555-****', 'Payment Method'),
        ])
        .items([
            builder.ReceiptItem.create(session, '$ 38.45', 'Data Transfer')
                .quantity(368)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/traffic-manager.png')),
                builder.ReceiptItem.create(session, '$ 45.00', 'App Service')
                .quantity(720)
                .image(builder.CardImage.create(session, 'https://github.com/amido/azure-vector-icons/raw/master/renders/cloud-service.png'))
        ])
        .tax('$ 7.50')
        .total('$ 90.95')
        .buttons([
            builder.CardAction.openUrl(session, 'https://azure.microsoft.com/en-us/pricing/', 'More Information')
                .image('https://raw.githubusercontent.com/amido/azure-vector-icons/master/renders/microsoft-azure.png')
        ]);
}

function getReservationImages(session) {
    return [
        builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\reserve.jpg')
    ];
}

function getReservationActions(session) {
    return [
        builder.CardAction.openUrl(session, 'https://google.ca/', 'Get Started')
    ];
}