var builder = require('botbuilder');

module.exports = {
    viewMenu: function(session) {
        var msg = new builder.Message(session);
        msg.attachments([
            new builder.HeroCard(session)
                .title("Our Menus")
                .subtitle("We have a wide range of menu items for lunch and dinner")
                .text("Top rated fancy selection!")
                .images([builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\food2.jfif')])
                .buttons([
                    builder.CardAction.imBack(session, "Taking you to the lunch menu", "Lunch Menu"),
                    builder.CardAction.imBack(session, "Taking you to the dinner menu", "Dinner Menu"),
                    builder.CardAction.imBack(session, "Taking you to the pub menu", "Pub Menu")
                ])
        ]);
        session.send(msg).endDialog();
    },

    lunchMenu: function lunchMenu(session){
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.HeroCard(session)
                .title("Appetizers")
                .images([builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\appetizers.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Showing Appetizers", "Show Appetizers")
                ]),
                new builder.HeroCard(session)
                .title("Salads")
                .images([builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\salad.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Showing Salads", "Show Salads")
                ]),
                new builder.HeroCard(session)
                .title("Steaks")
                .images([builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\steak.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Showing Steaks", "Show Steaks")
                ])
        ]);
        session.send(msg).endDialog();
    }

};