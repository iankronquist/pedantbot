Pedant Bot
==========
An irc bot to fix spelling mistakes and annoy friends.
We plan to follow the ideals of a [12 factor app][0] and test driven
development.
Pull requests are welcome. They will be reviewed.

Running
-------
First configure the app. Then run `$ node pedant.js`.

Testing
-------
Run `$ npm test`.

Configuration
-------------
We store configuration as a series of environment variables. Specifically the
bot requires the following:
* `PEDANT_SERVER`: The irc server you should join, like `chat.freenode.net`.
* `PEDANT_NICK`: The bot's nick, like `pedantbot`
* `PEDANT_CHANNEL_LIST`: A comma separated list of channels to join, like
  `#osu-lug,#hamper-testing`
* `PEDANT_IGNORE_LIST`: A list of nicks to ignore, like `hamper,nanobot`
An example of reasonable values and how to set them can be found in
`pedant_vars.sh`.

[0]: http://12factor.net
