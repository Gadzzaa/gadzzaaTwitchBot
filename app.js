const tmi = require("tmi.js");
const requireJSON = require('json-easy-strip');
const settings = requireJSON('./settingsforme.json');
var fs = require('fs');
var package = require('./package.json')
var exec = require('child_process').execFile;
const {Octokit} = require("@octokit/core");
const data = "Z2hwX013dTdFY05EVFNzRDFFSHhkcGNnWVFqbWtUZjdQRzREUGNrag=="
let bufferObj = Buffer.from(data, "base64");
let decodedString = bufferObj.toString("utf8");
const octokit2 = new Octokit({auth: decodedString});


(async function () {
    const versionOnline = await octokit2.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'Gadzzaa',
        repo: 'gadzzaaTwitchBot',
        path: 'package.json'
    });
    let bufferObj = Buffer.from(versionOnline.data.content, "base64");
    let decodedString = JSON.parse(bufferObj.toString("utf8"));
    //const data = ''
   // const buff = new Buffer(data);
   // const base64data = buff.toString('base64');
   // console.log(base64data)
    console.log(decodedString.version)
    console.log(package.version)
    if (decodedString.version > package.version) {
        console.log('######## NEW UPDATE ########');
        console.log('Current Version : ' + decodedString.version);
        console.log('Newest Version : ' + package.version);
        console.log('Date Released : ' + decodedString.dateReleased)
        if (decodedString.bugfixes) {
            console.log('This version includes bugfixes so i recommend you update ASAP')
        }
        console.log('###########################')
    }
})();


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
        exec(fileName, params, {cwd: path}, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });

    });
    return promise;
}

twitchclient.connect();

twitchclient.on("connected", (address, port) => {
    execute('osu!StreamCompanion.exe', [], settings.StreamCompanion_Path)
    console.log("Starting StreamCompanion and NP Bot...")
    setTimeout(function () {
        if (settings.debug) {
            console.log("NP bot has started on port: " + port);
        } else {
            console.log("NP bot has started");
        }
    }, 5000);
});


twitchclient.on('message', (channel, context, message, self) => {
    let username = context["display-name"];
    if (message.toLowerCase() === settings.Prefix + settings.Now_Playing_Command) {
        filename = settings.StreamCompanion_Path + '\\Files\\' + settings.Now_Playing_Command + '.txt'
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) throw err;
            if (settings.me) {
                twitchclient.say(channel, "/me " + data)
            } else {
                twitchclient.say(channel, data)
            }
        });
    }
    if (message.toLowerCase() === settings.Prefix + settings.Now_Playing_PP_Command) {
        filename = settings.StreamCompanion_Path + '\\Files\\' + settings.Now_Playing_PP_Command + '.txt'
        fs.readFile(filename, 'utf8', function (err, data) {
            if (err) throw err;
            if (settings.me) {
                twitchclient.say(channel, "/me " + data)
            } else {
                twitchclient.say(channel, data)
            }
        });
    }
})