var builder = require('botbuilder');

module.exports = {
    viewMenu: function(session) {
        var msg = new builder.Message(session);
        msg.attachmentLayout(builder.AttachmentLayout.carousel)
        msg.attachments([
            new builder.ThumbnailCard(session)
                .title("Full Menu")
                .subtitle("With vegetarian and non-vegetarian options")
                .text("We have a wide selection!")
                .images([builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\drink.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Taking you to the full menu", "View")
                ]),
            new builder.ThumbnailCard(session)
                .title("Vegetarian")
                .subtitle("With only vegetarian options")
                .text("We have vegan and gluten free options!")
                .images([builder.CardImage.create(session, 'C:\\Users\\Samit\\Documents\\GitHub\\ChatBot\\PresentationBot\\images\\food.jpg')])
                .buttons([
                    builder.CardAction.imBack(session, "Taking you to the vegetarian menu", "View")
                ])
        ]);
        session.send(msg).endDialog();
    }
};