# WELCOME TO MY OSU TWITCH BOT !

Before i present you this bot please make sure to read the next few lines: 

1) This is like my first ever code written in nodejs so please do not flame me if it doesn't work as well as it should.
2) I made the source public so you guys can make sure it is not any bitcoin miner or anything bad at all
3) This is still an early version of this program so please, if you guys get any error or any problem just create an issue on github and i am gonna try and resolve it ASAP

## Now for the bot:

It is a simple code mainly based on [`StreamCompanion`](https://github.com/Piotrekol/StreamCompanion), so if you'd like to use it please first install that.

## Commands

1) Displays the current map, and it's author, stars, mods or pretty much anything else.
2) Displays map's pp values
3) Literally the best thing : YOU CAN MODIFY THE COMMANDS TO SHOW EXACTLY HOW YOU WANT IT TO BE ( Isn't that cool? I am gonna tell you below how and where )

## How to use it

1) Modify package.json -- I commented on every thing that is in there so, before modifying, make sure to read the comments :D
2) Add two output patterns inside `StreamCompanion`, one named "np_all" and the other one named "nppp"
3) Add your own command output inside the formating text box and put the `Save Event` to `All`. 

I am gonna leave mine here:

```
File/Command Name : np_all

Formating : Now Playing | !mStars!⭐ | !mapArtistTitle! !mapDiff! | Mods: !mods! | Download: !dl!

```

```
File/Command Name : nppp

Formating : PP Values | 100% : !osu_mSSPP! pp | 99% : !osu_m99PP! pp | 98% : !osu_m98PP! pp | 97% : !osu_m97PP! pp | 96% : !osu_m96PP! pp | 95% : !osu_m95PP! pp |  Download: !dl!

```

4) You are good to go. 

## How to modify the commands

1) Package.json ( You can rename the commands there )
2) StreamCompanion's Output Patterns ( You can modify the output there)
