# Minecraft AFK Bot (Premium Account) 1.21.4

This bot is designed to automate specific tasks and interact with players on a Minecraft server. It uses the `mineflayer` library along with the `mineflayer-pathfinder` plugin for pathfinding and movement functionalities.

## Setup Instructions

### Requirements
- **Node.js** (Ensure the latest version is installed)
- **Minecraft server** (with IP and port accessible)
- **Microsoft account** (for Minecraft authentication)
- Required Libraries:
  - `mineflayer`
  - `mineflayer-pathfinder`

### Commands

The bot supports the following commands (prefixed with "Bibu" in-game):

    $bot <time>: Set the AFK timer (e.g., $bot 1h, $bot 30m).

    $stop: Pause the AFK timer.

    $resume: Resume the AFK timer if paused.

    $checktime: Display the remaining time on the AFK timer.

    $break: Interrupt the AFK timer and switch to spectator mode.

    $addtime <time>: Add time to the AFK timer (e.g., $addtime 1h, $addtime 30m).

    $tp: Teleport the bot to the specified user.

    $hit: Make the bot attack the nearest entity.

    $help: Show all available commands.

### Installation
1. Clone this repository or download the script.
2. Open the script file and configure the following options in the createBot() function:
    ```
        host: Replace with the IP or hostname of your server (e.g., mc35.gamehosting.it).

        port: Replace with the server's port (e.g., 5394).

        username: Replace with your email address for Minecraft (Microsoft accounts).

        auth: Specify microsoft for Microsoft authentication.
    ```
    Adjust additional settings as needed, such as version, debug, viewDistance, and hideErrors.

How to Run

1. **Initialize a Node.js Project**  
   If not already done, initialize a Node.js project in your desired directory:
   ```bash
   npm init -y
   ```

2. **Install Dependencies**  
   If not already done, initialize a Node.js project in your desired directory:
   ```bash
   npm install mineflayer@^4.5.0 mineflayer-pathfinder@^2.0.0
   ```

2. **Run The Bot**  
   If everything is set up correctly, the bot will generate a link for authentication the first time you run it. Follow the link to log into your Microsoft account and grant the necessary permissions. After successful authentication, the bot will join the Minecraft server.:
   ```bash
   node script.js
   ```

Now your bot is ready to handle AFK tasks and more! If you encounter any issues, refer to the troubleshooting section. 
