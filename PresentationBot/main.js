var builder = require('botbuilder');
var menu = require('./menu');

module.exports = {
    mainOptions: function(session) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .title("Welcome to Fancy Restaurant")
                .subtitle("Fancy's reputation is legendary, its steak and wine selection equally so")
                .text("5 star rating")
                .images([builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\fancy-restaurants.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Taking you to the Main Menu", "Show Main Menu")
                ]),
                new builder.HeroCard(session)
                .title("Hours and Directions")
                .text("Mon-Fri 11:45AM - 10:30PM\nSat 5pm - 10:30PM\nSun 5PM-9:30PM")
                .images([builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\fancy.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Showing you our location", "Place order")
                ]),
                new builder.HeroCard(session)
                .title("Reserve a Table")
                .subtitle("We have the fanciest rooms and tables for any occasion")
                .text("Tell us a date and time")
                .images([builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\fancy2.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Showing directions", "Insert Date Picker Here")
                ])
        ]);
        session.send(msg).endDialog();
    }
};