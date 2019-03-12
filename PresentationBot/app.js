var myRestify = require('restify');
var builder = require('botbuilder');
//map
var locationDialog = require('botbuilder-location');

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
//map
bot.library(locationDialog.createLibrary("ApYBfO2AsrtGG77_B9WuqKVtfqL2gRUc5nf58BESUbwj03H-3XeTTfAMBI7Edorw"));

myServer.post('/api/messages', connector.listen());


bot.dialog('/', [
    function (session) {
        main.mainOptions(session);
    },
]).triggerAction({ matches: /^(M | m | Main | main | O | o | options | Options | hello | hi)/i });

function getFormattedAddressFromPlace(place, separator) {
    var addressParts = [place.streetAddress, place.locality, place.region, place.postalCode, place.country];
    return addressParts.filter(i => i).join(separator);
}

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

bot.dialog('showMap', [
    function (session) {
        var options = {
            prompt: "Where should I ship your order?",
            useNativeControl: true,
            reverseGeocode: true,
			skipFavorites: false,
			skipConfirmationAsk: true,
            requiredFields:
                locationDialog.LocationRequiredFields.streetAddress |
                locationDialog.LocationRequiredFields.locality |
                locationDialog.LocationRequiredFields.region |
                locationDialog.LocationRequiredFields.postalCode |
                locationDialog.LocationRequiredFields.country
        };

        locationDialog.getLocation(session, options);
    },
    function (session, results) {
        if (results.response) {
            var place = results.response;
			var formattedAddress = 
            session.send("Thanks, I will ship to " + getFormattedAddressFromPlace(place, ", "));
        }
    }
]).triggerAction({ matches: /^(Showing you our location)/i })