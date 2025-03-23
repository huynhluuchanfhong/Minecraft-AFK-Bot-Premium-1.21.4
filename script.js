const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');
const { GoalFollow } = goals;

let afkInterval;
let afkTimeRemaining = 0;
let isPaused = false;

createBot();

function createBot() {
  const bot = mineflayer.createBot({
    host: 'ipserver', // Replace with your server's IP or hostname
    port: 8080,                  // Replace with your server's port if different
    username: "microsoftEmail", // Use your email for Microsoft accounts
    auth: 'microsoft',           // Specify 'microsoft' for Microsoft accounts
    version: false,              // Ensure this matches your Minecraft version
    debug: true,                 // Enable debug logs
    viewDistance: 'far',         // Ensure the bot gets complete packets
    hideErrors: false            // Show all error messages
  });

  bot.loadPlugin(pathfinder);

  bot.once('login', () => {
    console.log('Bot has logged in.');
  });

  bot.once('error', (err) => {
    console.error('Error:', err);
    if (err.message.includes('Must authenticate')) {
      console.log('Please use the following link to authenticate:');
      console.log(`https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=${bot.options.clientId}&response_type=code&redirect_uri=https://login.live.com/oauth20_desktop.srf&scope=XboxLive.signin%20offline_access&state=${bot.options.state}&prompt=consent`);
    }
  });

  bot.once('end', () => {
    console.log('Bot has disconnected from the server. Reconnecting...');
    setTimeout(createBot, 5000); // Wait 5 seconds before reconnecting
  });

  bot.on('spawn', () => {
    console.log('Bot has joined the game.');
  });

  bot.on('messagestr', (message, messagePosition, jsonMsg, username, verified) => {
    if (username === bot.username) return;

      console.log(message);

      const command = message.split(' ');

      username = command[1].slice(0, -1);

      if (command[2] === '$bot') {
        let time;

        if (command[3].endsWith('a')) {
          time = parseInt(command[3].slice(0, -2));
        } else {
          time = parseInt(command[3].slice(0, -1));
        }

        if (command[3].includes('h')) {
          time *= 3600; // convert hours to seconds
        } else if (command[3].includes('m')) {
          time *= 60; // convert minutes to seconds
        }

        bot.chat(`Time: ${formatTime(time)}`);

        afkTimeRemaining = time;
        bot.chat('/gamemode survival');

        afkInterval = setInterval(() => {
          if (!isPaused) {
            afkTimeRemaining -= 1;
            if (afkTimeRemaining <= 0) {
              clearInterval(afkInterval);
              bot.chat('/gamemode spectator');
            }
          }
        }, 1000); // update every second
      } else if (command[2] === '$stop') {
        isPaused = true;
        bot.chat('Timer stopped.');
      } else if (command[2] === '$resume') {
        if (afkTimeRemaining > 0 && isPaused) {
          isPaused = false;
          bot.chat(`Back AFK for: ${formatTime(afkTimeRemaining)}`);
          bot.chat('/gamemode survival');
        } else {
          bot.chat('No timer has been set.');
        }
      } else if (command[2] === '$checktime') {
        bot.chat(`Time remain: ${formatTime(afkTimeRemaining)}`);
      } else if (command[2] === '$break') {
        clearInterval(afkInterval);
        afkTimeRemaining = 0;
        bot.chat('/gamemode spectator');
        bot.chat('Timer stopped.');
      } else if (command[2] === '$addtime') {
        let additionalTime;

        if (command[3].endsWith('a')) {
          additionalTime = parseInt(command[3].slice(0, -2));
        } else {
          additionalTime = parseInt(command[3].slice(0, -1));
        }

        if (command[3].includes('h')) {
          additionalTime *= 3600; // convert hours to seconds
        } else if (command[3].includes('m')) {
          additionalTime *= 60; // convert minutes to seconds
        }

        afkTimeRemaining += additionalTime;
        bot.chat(`Time added: ${formatTime(additionalTime)}`);
        bot.chat(`Time remain: ${formatTime(afkTimeRemaining)}`);
      } else if (command[2] === '$tp') {
        bot.chat(`/tp ${username}`);
        bot.chat(`Tp to: ${username}`);
      } else if (command[2] === '$hit') {
        bot.attack(bot.nearestEntity());
        bot.chat('Hit!');
      } else if (command[2] === '$help') {
        bot.chat(`Available commands:
          $bot <time> (e.g., $bot 1h, $bot 30m): Sets the AFK timer for the specified duration.
          $stop: Stops the AFK timer.
          $resume: Resumes the AFK timer if paused.
          $checktime: Displays the remaining time on the AFK timer.
          $break: Stops the AFK timer and switches to spectator mode.
          $addtime <time> (e.g., $addtime 1h, $addtime 30m): Adds time to the AFK timer.
          $tp: Teleports the bot to the user.
          $hit: Performs a left-click attack.`);
      }

  });

  bot.on('error', (err) => console.log(`Error: ${err}`));
  bot.on('end', () => console.log('Bot has disconnected from the server.'));
}

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  return `${h}h ${m}m ${s}s`;
}
