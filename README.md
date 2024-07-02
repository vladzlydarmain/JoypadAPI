
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
- [**Roman Babai**](https://github.com/BabaiRoman/)
- [**Daniil Makhno**](https://github.com/shrek0228/)

## Technologies
- Figma
- PgAdmin 4
- Trello
- Render
- PostgreSQL
- JavaScript
- Express js
- Sequelize
- socket.io

## Installation (API)

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
11. Create first category of group (how to do it you can see in API Reference) and two achievement categories (1 - send and 2 - delete)


# API Reference

## Authorization(getting token) with steam

```http
  GET /user/auth
```

## Get authorization code

```http
  GET /user/auth/code
```
### Headers:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Token from cookies/db |

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 200
```json
{
    "code":200,
    "authCode": "code"
}
```
Occurs when the operation was successfully completed 
## Change description

```http
  POST /user/description
```
### Headers:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Token from cookies/db|

### Body:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `description`      | `string` | **Required**. Text what you want set description to |

### Responses:

#### "code" 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 400
```json
{
    "code":400,
    "error":"Description required"
}
```
Occurs when the user forgot to enter a description in the body

#### Code 200
```json
{
    "code":200,
    "message":"Updated successfuly"
}
```
Occurs when the operation was successfully completed 

## Get user`s achievements

```http
  GET /user/achievements
```
### Headers:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Token from cookies/db|

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 200
```json
{
    "code": 200,
    "message": [
        {
            "id": 1,
            "name": "Welcome",
            "description": "Send your first message",
            "category": 1,
            "value": 1,
            "createdAt": "2024-06-15T17:46:59.831Z",
            "updatedAt": "2024-06-15T17:46:59.831Z"
        }...
    ]
}
```
Occurs when the operation was successfully completed 

## Add achievement to user

```http
  POST /user/achievements
```
### Headers:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Token from cookies/db|


### Query parameters:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Required**. Id of the achievement |

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 400 

```json
{
    "code":400,
    "message":"Id is required"
}
```
Occurs when the user forgot to enter an id in the query parameters

#### Code 404

```json
{
    "code":404,
    "error":"Achievement wasn`t found"
}
```
Occurs when the user entered wrong id

#### Code 405

```json
{
    "code":405,
    "error":"User already have this achievement"
}
```
Occurs when the user alredy have achievement with this id

#### Code 201

```json
{
    "code":201,
    "message":"Achievement added to user"
}
```
Occurs when the operation was successfully completed 

## Add achievement to user

```http
  GET /user/groups
```
### Headers:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Token from cookies/db|

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 200
```json
{
    "code": 200,
    "groups": [
        {
            "id": 0,
            "name": "Group1",
            "description": "Group description",
            "admin_id": "admin`s SteamId",
            "points": 0,
            "category": 2,
            "code": "Join code",
            "createdAt": "2024-06-21T10:35:29.423Z",
            "updatedAt": "2024-06-21T10:35:29.423Z"
        }...
    ]
}
```
Occurs when the operation was successfully completed

## Get user statistics

```http
  GET /user/stats
```
### Headers:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Token from cookies/db|

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 200
```json
{
    "code": 200,
    "message": {
        "id": 1,
        "steamID": "User steamId",
        "sentMessages": 12,
        "deletedMessages": 16,
        "createdAt": "2024-06-15T18:34:50.269Z",
        "updatedAt": "2024-06-26T20:47:37.500Z"
    }
}
```
Occurs when the operation was successfully completed

## Create new group

```http
  POST /group/
```
### Headers:

| Parameter | Type     | Description                        |
| :-------- | :------- | :----------------------------------|
| `token`   | `string` | **Required**. Token from cookies/db|

### Body:

| Parameter | Type     | Description    |
| :-------- | :------- | :--------------|
| `name`    | `string` | **Required**. Text what you want set name to |
| `description`| `string` | **Required**. Text what you want set description to |
| `category`| `integer` | Id of category (default 1)|

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 400
```json
{
    "code": 400,
    "error": "Name must exist" 
}
```
Occurs when the user forgot to enter name in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Description must exist"
}
```
Occurs when the user forgot to enter description in the body

#### Code 201
```json
{
    "code": 201,
    "message": "Successfuly created group with id of 25",
    "id": 25,
    "owner": "Owner steamId"
}
```
Occurs when the operation was successfully completed

## Mute/unmute user in your group

```http
  POST /group/mute
```
### Headers:

| Parameter | Type     | Description                        |
| :-------- | :------- | :----------------------------------|
| `token`   | `string` | **Required**. Token from cookies/db|

### Body:

| Parameter | Type     | Description    |
| :-------- | :------- | :--------------|
| `groupId`    | `integer` | **Required**. Id of group where you want to mute the user |
| `targetId`| `string` | **Required**. Steam id of the user what you want to mute |

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 400 
```json
{
    "code":400,
    "error":"Group id required"
}
```
Occurs when the user forgot to enter a groupId in the body

#### Code 400
```json
{
    "code":400,
    "error":"Target steam id required"
}
```
Occurs when the user forgot to enter a targetId(steamId) in the body

#### Code 404
```json
{
    "code":404,
    "error":"Target steam id not found in this group or user is not the admin in this group"
}
```
Occurs when the user enter wrong targetId/groupId or the user who called this request is not an admin in this group

#### Code 200
```json
{
    "code": 200,
    "message": "Status changed",
    "status": false
}
```
Occurs when the operation was successfully completed

## Get rating of groups by points

```http
    GET /group/rating
```

### Responses:

#### Code 200

```json
{
    "code": 200,
    "groups": [
        {
            "id": 3,
            "points": 0,
            "name": "Name of the group"
        }...
    ]
}
```
Occurs when the operation was successfully completed

## Get group info by id

```http
    GET /group/${id}
```

| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of group|

### Responses:

#### Code 404

```json
{
    "code": 404,
    "error": "No groups were found"
}
```
Occurs when entered the wrong id of group or group with this id does not exist

#### Code 200

```json
{
    "code": 200,
    "group": {
        "id": 3,
        "name": "Name of the group",
        "description": "Description of the group",
        "admin_id": "Admin`s steam id of the group",
        "points": 0,
        "category": 1,
        "code": "Join code of the group",
        "createdAt": "2024-06-19T19:16:29.464Z",
        "updatedAt": "2024-06-19T19:16:29.464Z"
    }
}
```
Occurs when the operation was successfully completed

## Delete group with id

```http
  DELETE /group/${id}
```

| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of group|

### Headers:

| Parameter | Type     | Description                        |
| :-------- | :------- | :----------------------------------|
| `token`   | `string` | **Required**. Token from cookies/db|

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 404
```json
{
    "code": 404,
    "error": "No groups with that steam id were found"
}
```
Occurs when the user entered an incorrect id or the user is not an admin in this group.

#### Code 200
```json
{  
    "code": 200,
    "message": "Group was successfully deleted"
}
```
Occurs when the operation was successfully completed

## Add achievement to user

```http
  POST /group/user
```
### Headers:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `token`      | `string` | **Required**. Token from cookies/db|


### Query parameters:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `code`      | `string` | **Required**. Join code of the group |

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 400 
```json
{
    "code":400,
    "message":"Code is required"
}
```
Occurs when the user forgot to enter join code in the query parameters

#### Code 404
```json
{
    "code":404,
    "error":"Group wasn`t found"
}
```
Occurs when the user entered wrong join code

#### Code 405
```json
{
    "code":405,
    "error":"User already exist in this group"
}
```
Occurs when the user entered wrong join code or user already exist in group with this join code 

#### Code 200
```json
{
    "code":200,
    "message":"User successfuly joined this group"
}
```
Occurs when the operation was successfully completed

## Leave/delete(if you are an admin) group with id

```http
  DELETE /group/user/${id}
```
| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of group|

### Headers:

| Parameter | Type     | Description                        |
| :-------- | :------- | :----------------------------------|
| `token`   | `string` | **Required**. Token from cookies/db|

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 404
```json
{
    "code": 404,
    "error": "No groups with that steam id were found"
}
```
Occurs when the user entered a wrong id or the user is not an admin in this group.

#### Code 405
```json
{
    "code":405,
    "error":"User hasn`t joined this group yet"
}
```
Occurs when the user entered a wrong id or user hasn`t joined this group yet

#### Code 200
```json
{
    "code":200,
    "message":"User successfully left/deleted(for admins of group) this group"
}
```
Occurs when the operation was successfully completed

## Get avatars of users in group with id

```http
  GET /group/users/avatar/${id}
```
| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of group|

### Responses:

#### Code 404
```json
{
    "code": 404,
    "error": "No groups were found"
}
```
Occurs when the user entered a wrong id

#### Code 200
```json
{
    "code": 200,
    "avatars": {
        "user steam id":"Steam link to user`s avatar",
        ...
    }
}
```
Occurs when the operation was successfully completed

## Get user`s info(without private info) in the group with id

```http
  GET /group/users/${id}
```
| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of group|

### Responses:

#### Code 404
```json
{
    "code": 404,
    "error": "No groups were found"
}
```
Occurs when the user entered a wrong id

#### Code 200
```json
{
    "code": 200,
    "users": [
        {
            "steamID": "steam id",
            "avatar": "steam link to avatar",
            "name": "user`s name",
            "description": "user`s description",
            "createdAt": "2024-06-19T17:47:51.883Z",
            "updatedAt": "2024-06-19T17:49:40.691Z",
            "mute": false
        }...
    ]
}
```
Occurs when the operation was successfully completed

## Create new group category
```http
  POST /group/category
```

### Body:

| Parameter | Type     | Description    |
| :-------- | :------- | :--------------|
| `name`    | `string` | **Required**. name for this category |

### Responses:

#### Code 400
```json
{
    "code": 400,
    "error": "Name is required"
}
```

#### Code 200
```json
{
    "code": 201,
    "message": "Category was created with id of 3",
    "id": 3
}
```
Occurs when the operation was successfully completed

## Get all group categories
```http
  GET /group/category/all
```

### Responses:

#### Code 200
```json
{
    "code": 200,
    "message": [
        {
            "id": 1,
            "name": "Category name",
            "createdAt": "2024-06-15T19:06:52.853Z",
            "updatedAt": "2024-06-15T19:06:52.853Z"
        }...
    ]
}
```
Occurs when the operation was successfully completed

## Get stats of group with id
```http
  GET /group/stats/${id}
```
| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of group|

### Responses:

#### Code 404
```json
{
    "code": 404,
    "error": "No groups were found"
}
```
Occurs when the user entered the wrong id

#### Code 200
```json
{
    "code": 200,
    "message": {
        "id": 3,
        "groupID": 3,
        "sentMessages": 25,
        "deletedMessages": 0,
        "createdAt": "2024-06-19T19:16:29.527Z",
        "updatedAt": "2024-07-01T11:38:59.804Z"
    }
}
```
Occurs when the operation was successfully completed

## Get all messages from group with id

```http
  GET /messages/group/${id}
```
| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of group|

### Headers:

| Parameter | Type     | Description                        |
| :-------- | :------- | :----------------------------------|
| `token`   | `string` | **Required**. Token from cookies/db|

### Responses:

#### Code 400
```json
{
    "status":400,
    "message":"Token not found"
}
```
Occurs when the user forgot to enter a token in the headers

#### Code 404
```json
{
    "status":404,
    "message":"User not found"
}
```
Occurs when the user entered wrong token

#### Code 403
```json
{
    "code":403,
    "error":"User hasn`t joined this group yet"
}
```
Occurs when the user entered the wrong id or user hasn`t joined this group yet

#### Code 200
```json
{
    "code": 200,
    "messages": [
        {
            "id": 118,
            "value": "Value of this message",
            "steamid": "Steam id of the user who sent this message",
            "name": "Name of the user who sent this message",
            "groupid": 5,
            "createdAt": "2024-06-26T20:47:37.503Z",
            "updatedAt": "2024-06-26T20:47:37.503Z"
        }...
    ]
}
```
Occurs when the operation was successfully completed

## Send message to group (socket.io)

```js
    socket.emit("send",args)
```
After this you must do
```js
    socket.on(`message:${id}`,(args)=>{...})
```
For updating on client side

Example:
https://github.com/vladzlydarmain/JoypadNext/blob/605cfff11fe2ae0a5cfbd92a6b7de8760a261ac6/pages/chat.js#L106-L112

| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of group|

### Arguments:

| Parameter | Type     | Description                        |
| :-------- | :------- | :----------------------------------|
| `token`   | `string` | **Required**. Token from cookies/db|
| `group`   | `integer`| **Required**. Id of the group      |
| `message` | `string` | **Required**. Text what you want to send|

Response (args) what take ```socket.on(`message:${id}`,(args)=>{...})```:

```json
{
    "id":10,	
    "value":"Text of this message",
    "steamid":"User`s steamid",
    "name":"User`s name",
    "groupid":4,
    "createdAt":"2024-06-19 22:03:21.899+00",
    "updatedAt":"2024-06-19 22:03:21.899+00",
    "avatar":"Steam link to user`s avatar"
}
```

## Delete message to group (socket.io)

```js
    socket.emit("delete",args)
```
After this you must do
```js
    socket.on(`delete:${id}`,(args)=>{...})
```
For updating on client side

Example:
https://github.com/vladzlydarmain/JoypadNext/blob/605cfff11fe2ae0a5cfbd92a6b7de8760a261ac6/pages/chat.js#L113-L117

| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of group|

### Arguments:

| Parameter | Type     | Description                        |
| :-------- | :------- | :----------------------------------|
| `token`   | `string` | **Required**. Token from cookies/db|
| `groupId`   | `integer`| **Required**. Id of the group    |
| `id` | `string` | **Required**.Id of message what you need to delete|

``` socket.on(`delete:${id}`,(args)=>{...}) ``` takes all args what you send on ``` socket.emit("delete",args) ```

## Create new achievements category
```http
  POST /achievements/category
```

### Body:

| Parameter | Type     | Description    |
| :-------- | :------- | :--------------|
| `name`    | `string` | **Required**. name for this category |

### Responses:

#### Code 400
```json
{
    "code": 400,
    "error": "Name is required"
}
```
Occurs when the user forgot to enter a name in the body


#### Code 201
```json
{
    "code": 201,
    "message": 3 - id of category
}
```
Occurs when the operation was successfully completed

## Create new user`s achievement
```http
  POST /achievements/user
```

### Body:

| Parameter | Type     | Description    |
| :-------- | :------- | :--------------|
| `name`    | `string` | **Required**. name for this achievement |
| `description`| `string` | **Required**. description for this achievement |
| `category`    | `integer` | **Required**. Category for this achievement |
| `value`    | `integer` | **Required**. Value with which this achievement is achieved |

### Responses:

#### Code 400
```json
{
    "code": 400,
    "error": "Name is required"
}
```
Occurs when the user forgot to enter a name in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Description is required"
}
```
Occurs when the user forgot to enter a description in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Category is required"
}
```
Occurs when the user forgot to enter a category in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Value is required"
}
```
Occurs when the user forgot to enter a value in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Value must have a number value"
}
```
Occurs when the user enetered other data type to value field in the body

#### Code 404
```json
{
    "code": 404,
    "error": "Category wasn't found"
}
```
Occurs when the user enetered wrong category id

#### Code 201
```json
{
    "code": 201,
    "message": "User Achievement was created with id of 6",
    "achievement": {
        "id": 6,
        "name": "...",
        "description": "descripton",
        "category": 1,
        "value": 1000000000,
        "updatedAt": "2024-07-02T11:22:25.207Z",
        "createdAt": "2024-07-02T11:22:25.207Z"
    }
}
```
Occurs when the operation was successfully completed

## Get all user achievements
```http
  GET /achievements/user
```

### Responses:

#### Code 404
```json
{
    "code": 404,
    "message": "Achievements weren't found"
}
```
Occurs when any user achievement wasn`t found

#### Code 200
```json
{
    "code": 200,
    "achievement":[
        {
            "id": 6,
            "name": "...",
            "description": "descripton",
            "category": 1,
            "value": 1000000000,
            "updatedAt": "2024-07-02T11:22:25.207Z",
            "createdAt": "2024-07-02T11:22:25.207Z"
        }...
    ]
}
```
Occurs when the operation was successfully completed

## Get user achievement with id
```http
  GET /achievements/user/${id}
```
| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of an achievement|

### Responses:

#### Code 404
```json
{
    "code": 404,
    "message": "Achievement wasn't found"
}
```
Occurs when user entered wrong id or achievement with this id doesn`t exist

#### Code 200
```json
{
    "code": 200,
    "achievement":{
        "id": 6,
        "name": "...",
        "description": "descripton",
        "category": 1,
        "value": 1000000000,
        "updatedAt": "2024-07-02T11:22:25.207Z",
        "createdAt": "2024-07-02T11:22:25.207Z"
    }
}
```
Occurs when the operation was successfully completed

## Create new group`s achievement
```http
  POST /achievements/group
```

### Body:

| Parameter | Type     | Description    |
| :-------- | :------- | :--------------|
| `name`    | `string` | **Required**. name for this achievement |
| `description`| `string` | **Required**. description for this achievement |
| `category`    | `integer` | **Required**. Category for this achievement |
| `value`    | `integer` | **Required**. Value with which this achievement is achieved |
| `cost`    | `integer` | **Required**. Count of points what will give to the group when it achieves that achievement|

### Responses:

#### Code 400
```json
{
    "code": 400,
    "error": "Name is required"
}
```
Occurs when the user forgot to enter a name in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Description is required"
}
```
Occurs when the user forgot to enter a description in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Category is required"
}
```
Occurs when the user forgot to enter a category in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Value is required"
}
```
Occurs when the user forgot to enter a value in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Value must have a number value"
}
```
Occurs when the user enetered other data type to value field in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Cost is required"
}
```
Occurs when the user forgot to enter a cost in the body

#### Code 400
```json
{
    "code": 400,
    "error": "Cost must have a number value"
}
```
Occurs when the user enetered other data type to cost field in the body

#### Code 404
```json
{
    "code": 404,
    "error": "Category wasn't found"
}
```
Occurs when the user enetered wrong category id

#### Code 201
```json
{
    "code": 201,
    "message": "Group Achievement was successfully created with id of 7"
}
```
Occurs when the operation was successfully completed

## Get all group achievements
```http
  GET /achievements/group
```

### Responses:

#### Code 404
```json
{
    "code": 404,
    "message": "Achievements weren't found"
}
```
Occurs when any user achievement wasn`t found

#### Code 200
```json
{
    "code": 200,
    "message":[
        {
            "id": 6,
            "name": "...",
            "description": "descripton",
            "category": 1,
            "value": 1000000000,
            "updatedAt": "2024-07-02T11:22:25.207Z",
            "createdAt": "2024-07-02T11:22:25.207Z"
        }...
    ]
}
```
Occurs when the operation was successfully completed

## Get group achievement with id
```http
  GET /achievements/group/${id}
```
| Parameter | Type     | Description            |
| :-------- | :------- | :----------------------|
| `id`   | `integer` | **Required**. id of an achievement|

### Responses:

#### Code 404
```json
{
    "code": 404,
    "message": "Achievement wasn't found"
}
```
Occurs when user entered wrong id or achievement with this id doesn`t exist

#### Code 200
```json
{
    "code": 200,
    "message":{
        "id": 6,
        "name": "...",
        "description": "descripton",
        "category": 1,
        "value": 1000000000,
        "updatedAt": "2024-07-02T11:22:25.207Z",
        "createdAt": "2024-07-02T11:22:25.207Z"
    }
}
```
Occurs when the operation was successfully completed
