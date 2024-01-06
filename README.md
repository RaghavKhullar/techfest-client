
# Task-Wiz Client
## Description
This application was developed as a response and won first runner up prize to the challenge posed by Atlassian during Techfest-IIT Bombay, with the specific aim of serving as a solution for an  [Intelligent Task Management System](https://drive.google.com/file/d/1RW_cPSUbyFY0FucIorAVHiqb9zeMbcfi/view?usp=sharing). 

Admins can create projects, which will have tasks. Once admin enters task description, the AI model will generate subtasks which are relevant for that task and assign it to the users which match the subtask's domain on the basis of the current workload on the person and his current stress and burnout score. Admins can further also create and delete more subtasks of his choice if he wants to. He can also view a generated textual view of the user which gives a textual summary of all the work the user has done and his performance. Apart from other goals mentioned in the problem statement, we also added email generation, text summarizer, improved writing extensions and a chatbot which gives answer to any query related to the employees in the database.

Users can view all the projects and projects assigned to him, upload and view necessary documents, change the status of the project and view his analytics dashboard. Filtering and sorting tasks on the basis of task status, deadline, start date, priority is also implemented.

### ToDo:
As this was done in a short span of 10 days, there is a scope of improvement:
1. UI is very basic as I didn't have any design at that particular time.
2. Instead of email generation we can add a feature of sending generated email directly from app if the user wishes to.
3. Task hierarchy can be made better instead of Project/Task/Subtask.
4. Make the in-app calendar better and integrate google calendar
## Installation and Setup
Click here for server [repo](https://github.com/RaghavKhullar/techfest-server)
Clone the repository to your local device and

1. Install the required node modules:

```bash
yarn install
```

2.

```bash
cp config.example.ts config.ts
```

and make any necessary changes.

3. Start the Vite Development Server in developer mode:

```bash
yarn dev
```

The server should be running at your 127.0.0.1 port 3000 (or the port specified in `config.ts`).

3. Install githooks by running

```bash
yarn prepare
```
## Config file
We are using Google Oauth in this app for authentication. Same client will be used for authenticating admins and users.
1. Before starting the frontend make sure that you have created a client for google oauth and filled necessary creds.
2. Redirect URL for admin will be BACKEND_URL/admin/callback and for user will be BACKEND_URL/user/callback


## Resources

[React](https://reactjs.org/) \
[Mantine UI](https://mantine.dev/) \
[Tailwind-CSS](https://tailwindcss.com/)
