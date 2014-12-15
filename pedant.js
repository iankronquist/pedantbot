var irc = require('irc');

console.log('My name is: ', process.env.PEDANT_NICK);
console.log('I\'m joining: ', process.env.PEDANT_CHANNEL_LIST);
var correct = console.log; // FIXME
var trigger = /[hH]ow do you spell (\w*)/;
var ignore_list = process.env.PEDANT_IGNORE_LIST.split(',');
var client = new irc.Client(process.env.PEDANT_SERVER, process.env.PEDANT_NICK,
    {
        channels: process.env.PEDANT_CHANNEL_LIST.split(',')
    }
);

client.addListener('message', function (from, to, message) {
    console.log(from, to, message);
    var word_to_check = message.match(trigger);
    correct(word_to_check);
});
