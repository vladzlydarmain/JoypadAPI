
![Joypad](https://joypadapi.onrender.com/image/logotip.png)

# JoypadAPI

JoypadAPI is a api application for Next js website and mobile app with integration for Steam and Dota 2. It allows users to create chat groups, invite others, and view win rates and ranks of players. Below, I've included details about the project and mentioned developers:

## Other dependencies/info

- **Next** - [Github](https://github.com/vladzlydarmain/JoypadNext)
- **Mobile app** - [Github](https://github.com/vladzlydarmain/JoypadAPI)
- **Database/project structure** - [FigJam](https://www.figma.com/board/HXlA34jbAjDpTqBf6BoeUX/Untitled?node-id=0-1&t=c0rnb1M6bUEFZ10I-1)
- **Figma project** - [Design](https://www.figma.com/design/GyNu2Fr2QDvOzELk8D71Yy/Untitled?node-id=818-114&t=pwG4RJ2PRSEnuZKo-1)
- **Trello** - [Board](https://trello.com/b/KT1P2b6o/dpl-js-dev3)

## Features

- **Chat Groups**: Create and manage chat groups for communication.
- **Steam Integration**: Connect with Steam accounts for seamless communication.
- **Dota 2 Integration**: Access Dota 2 data, including win rates and ranks.
- **User Profiles**: View detailed profiles of users within the app.
- **User/Groups Achievements**: Get achievements and also use them to promote your group in the leader table.

## How this project can help ordinary users and us 

- Other users can check how we created certain systems
- For us it can be usefull in future when applying to other educational institutions or when looking for a job
- Or we can take some tips for improving/creating certain systems

## What did this project teach us?
This project taught us a little better how to organize team work, as well as how to create some of the systems, for example - sending/receiving messages

## Developers

- **Vlad Zlydar**
- [**Serhiy Vahnyuk**](https://github.com/SerhiyVahnyuk/)
- **Roman Babai**
- [**Daniil Makhno**](https://github.com/shrek0228/)

## Technologies
- Figma
- PgAdmin 4
- Trello
- Render
- PostgreSQL
- JavaScript
- CSS
- Next js
- React
- React Native
- Express js
- Sequelize
- socket.io

## Installation (Next js)

1. Clone the repository: `git clone https://github.com/vladzlydarmain/JoypadAPI.git`
2. Go to api folder with command `cd api`
3. Install all dependencies: `npm install`
4. Go to db folder: `cd ../database`
5. Also install all dependencies: `npm install`
6. Before starting you need replace all "https://joypad.onrender.com" to your Next js host (Note: you only need to replace part which was mentioned earlier NOT ALL THE URL!)
7. In file `../database/index.js` replace `process.env.CONNECTPG ` with your connect url to PostgreSQL Database https://github.com/vladzlydarmain/JoypadAPI/blob/0c8d8a24e7785a336863dc01e0e7fe042de4537f/database/index.js#L3-L5
8. In file `../api/routes/user.js` replace `process.env.APIKEY` with your token from SteamAPI https://github.com/vladzlydarmain/JoypadAPI/blob/0c8d8a24e7785a336863dc01e0e7fe042de4537f/api/routes/user.js#L11
9. https://github.com/vladzlydarmain/JoypadAPI/blob/0c8d8a24e7785a336863dc01e0e7fe042de4537f/api/routes/user.js#L16-L20 replace to your needs
10. Run the api from `/api/` folder with command: `node index.js` 
