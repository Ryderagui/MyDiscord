# Revel

[Live Website](https://revel-yz0c.onrender.com/)

## About

Revel is a clone of the chat and groups application, Discord. The app is a full-stack application which recreates the main features of discord. The main functionality includes: user authentication, live-chat messaging, community and channel management, community discovery and memberships. 

A new user can sign up, log in, join already available communities or create their own communitity. Meanwhile, any invites to new servers, creation of new chat channels or new messages are all sent live to the User. 

Techonology Overview:

* Languages: JavaScript, Ruby, CSS, HTML, SQL
* Frontend: React w/ Redux context management 
* Backend: Ruby on Rails
* Database: PostgreSQL
* Hosting: Render

## Technologies

### User Auth

For user authentication, Revel utilizes Ruby on Rails and GEM packages to properly hash passwords for user veriification and authentication. 

### Front End

The frontend is built on the [Node.js](https://nodejs.org/en/about) runtime environment and utilizes [Webpack](https://webpack.js.org/) for module bundling, along with [React](https://react.dev/) and [Redux](https://redux.js.org/). React allows for a seemless one-page application while Redux handles front-end state. 

### Back End
The backend is built using Ruby on Rails which serves up the frontends production html file and allows for routing of API calls. The database is a PostgreSQL database hosted by Render. Additionally, the Ruby on Rails provides ActionCable to handle necessary WebSocket instances and communication. Rails requires a Redis component for the websocket functionality, also hosted on Render. 

## Simultaneous Chat Application (Websocket)
The entire single-page application is designed to seemlessly allow users to interact in real time. Messages can be sent, edited and deleted with immediate feedback to any other users in the same chat channel.
The same functionality extends to creating, editing or deleting text channels within a given community. Lastly, any users invited to a community see the community immediately added to the list of available options.
```javascript
useEffect(()=>{
        const sub = consumer.subscriptions.create({
            channel: "ChatChannel",
            channel_id: parseInt(channelid)
        },{
            received:(payload)=>{
                switch(payload.type){
                    case 'ADD_MESSAGE':
                        return dispatch(messageActions.addMessage(payload.message))
                    case 'REMOVE_MESSAGE':
                        return dispatch(messageActions.removeMessage(payload.message.id))
                }
            }
        })
        return ()=> sub?.unsubscribe();
    },[dispatch,channelid])
```



