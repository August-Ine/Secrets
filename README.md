# Secrets
This is a web application that allows users to anonymously share their secrets with others. The app is built using Node.js modules and MongoDB.

## Authentication
This app provides different authentication styles for users to log in:
- Email and Password Authentication
- Google Authentication.<br>

You can see how each authentication style was implemented by checking the commit history.

## Getting started
To get started, clone the repository and install the required dependencies using npm:
1. 'git clone https://github.com/August269/Secrets.git'
2. 'cd Secrets'
3. 'npm install'.<br>

Then, create a .env file in the root directory of the project and add the following variables:
- SECRET: <your_secret>
- CLIENT_ID: <your_client_id>
- CLIENT_SECRET:<your_client_secret><br>

Replace <your_secret> with a long hard to guess string for encryption, your_client_id and your_client_secret with your own Google OAuth 2.0 client ID and client secret.

## Running the app
To run the app, use the following command:'node app.js'.<br>

Then, open your web browser and go to 'http://localhost:3000' to view the app.

## Contributing
Contributions are welcome! If you find a bug or have a feature request, please open an issue on GitHub. If you would like to contribute code, please fork the repository and create a pull request.
