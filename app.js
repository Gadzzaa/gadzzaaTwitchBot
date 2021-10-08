const tmi = require("tmi.js");
const requireJSON = require('json-easy-strip');
const settings = requireJSON('./settings.json');
var fs = require('fs');
var exec = require('child_process').execFile;


const twitchclient = new tmi.client(
    {
        options: {debug: settings.debug},
        connection: {
            secure: true,
            reconnect: settings.autoReconnect,
        },
        identity: {
            username: settings.twitchUser,
            password: settings.twitchAuth,
        },
        channels: ["gadzzaa"]
    }
)

function execute(fileName, params, path) {
    let promise = new Promise((resolve, reject) => {
        exec(fileName, params, { cwd: path }, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });

    });
    return promise;
}

twitchclient.connect();

twitchclient.on("connected",(address,port) => {
    execute('osu!StreamCompanion.exe',[],settings.StreamCompanion_Path)
    console.log("Starting StreamCompanion and NP Bot...")
    setTimeout(function(){
            if(settings.debug)
            {
                console.log("NP bot has started on port: " + port);
            }else
            {
                console.log("NP bot has started");
            }
        },5000);
});



twitchclient.on('message',(channel, context, message, self) => {
    let username = context["display-name"];
    if (message.toLowerCase() === settings.Prefix + settings.Now_Playing_Command){
        filename = settings.StreamCompanion_Path + '\\Files\\np_all.txt'
        fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        twitchclient.say(channel,"/me " + data)
     });
    }
    if (message.toLowerCase() === settings.Prefix + settings.Now_Playing_PP_Command){
        filename = settings.StreamCompanion_Path + '\\Files\\nppp.txt'
        fs.readFile(filename, 'utf8', function(err, data) {
        if (err) throw err;
        twitchclient.say(channel,"/me " + data)
     });
    }
})