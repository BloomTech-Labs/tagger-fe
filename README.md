# Tagger - Smarter Email

You can find the project at [Tagger](https://taggerhq.com/).

# Contributors

<h2>Team Lead</h2>
<center>

|[Vlad Mogilevskiy](https://github.com/vladmog)|
|[<img src="" width = "15"/>]|
|[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/vladmog)|
|[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/vladmog/)
</center>

<br>
<h2>Web Team</h2>

|[Luis Flores](https://github.com/lflores0214)|[Mimi Hoang](https://github.com/meowmimi1)|[Nathaniel Mosco](https://github.com/natemosco)|[Raymond Trinh](https://github.com/RaymondTrinh91)|[Andrew Wilson](https://github.com/easyas123l1)
|:---:|:---:|:---:|
|[<img src="" width = "200" />](https://github.com/lflores0214)|[<img src="" width = "200" />](https://github.com/meowmimi1)|[<img src="" width = "200" />](https://github.com/natemosco)|[<img src="" width = "200" />](https://github.com/RaymondTrinh91)|[<img src="" width = "200" />](https://github.com/easyas123l1)|
|[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/lflores0214)|[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/meowmimi1)|[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/natemosco)||[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/RaymondTrinh91)|[<img src="https://github.com/favicon.ico" width="15"> ](https://github.com/easyas123l1)|
|[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/luis-flores-523141194/) |[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/mimi-hoang-b09912189/) |[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/nate-mosco-98888ab4/) ||[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/raymond-trinh-39115412a/) |[<img src="https://static.licdn.com/sc/h/al2o9zrvru7aqj8e1x2rzsrca" width="15"> ](https://www.linkedin.com/in/andrew-wilson-055b55174/) |

<br>
## Project Overview

There is a TON of useful information inside email history that is almost entirely inaccessible. Finding contacts based on conversation topics is very inefficient in email inboxes and leads to a lot of wasted time trying to locate a contact, and sometimes to no avail.

Introducing, [Tagger](https://taggerhq.com/)!

[Trello Board](https://trello.com/b/39GG7MwY/tagger-smarter-email)

[Product Canvas](https://www.notion.so/Tagger-Smarter-Email-01673a2ed9e54cb8834b959ad39f7de2)

## Features:

- Read, Send, Reply, Move to Trash.

- Emails auto-tag and sort themselves relevant folders (using Machine Learning algos)

- User's keyword search will generate & search using suggested search terms (via Natural Language Processing)

- "Contacts" dashboard organizes your emails by contact, for a user experience similar to your smartphone

- Relationship strength is shown for each contact in a user's inbox, so they know if somebody is a recent contact, close friend, complete stranger, or somewhere in between.

- Users can filter messages in their inbox by the # of messages received or sent from that contact.

- Responsive Viewport (with Bootstrap and CSS3 flexbox styling)

### Tech Stack

- [x] React

- [x] Gmail API

- [x] Redux

- [x] React Router

- [x] Axios

- [x] React-script test (for testing purposes)

- [x] React Animated CSS

- [x] Perfect Scrollbar

- [x] SASS

- [x] Bootstrap

### Based on /elongineer's React Gmail Client - **Instructions below**

| _https://github.com/elongineer/react-gmail-client_

A simple Gmail client made with [Create-React-App](https://github.com/facebook/create-react-app) + [React-Redux](https://github.com/reduxjs/react-redux), using [Gmail's public Javascript API](https://developers.google.com/gmail/api/). It also uses [React Router](https://github.com/ReactTraining/react-router) to add some routing features.

It is meant to be a simple demo of utilizing live data from a RESTful API by using React development tools. It can be useful as a starting point for anyone wanting to fork it and extend it for their own ideas of a custom JavaScript Gmail client; or simply as a reference on using client-side Javascript to consume Gmail data. It is a non-ejected [Create-React-App v2](https://github.com/facebook/create-react-app) app; convenient as you can [customize](https://facebook.github.io/create-react-app/docs/available-scripts#npm-run-eject) project configs if you need to.

**How does it work?**  
The account sign-in and authentication process is **totally managed by Gmail's secure protocols**. The workflow is as follows:

- First-time users will see a landing page with a button to sign in to
  Gmail.
- Once successfully signed-in, Gmail will display a screen asking the
  user for permission to use the account in the application.
- After permission is granted, the application will load all account data and display the Inbox folder.

**IMPORTANT:** The application does **NOT** store or persist any account or user data in any way at all. It simply fetches data from Gmail's API and displays it in the browser.

**Requirements:**

- All Gmail API requests require an **_API Key_** and an **_OAuth 2.0 Client ID_**. You can follow [these instructions](https://developers.google.com/fit/android/get-api-key) to obtain those credentials. Then, store those two values in the **_[.env](https://facebook.github.io/create-react-app/docs/adding-custom-environment-variables)_** file located in the root folder by replacing `<YOUR_API_KEY>` and `<YOUR_CLIENT_ID>` respectively.

---

LICENSE: [MIT License](https://opensource.org/licenses/MIT)
