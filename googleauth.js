const { google } = require("googleapis");
const fs = require("fs");
const readline = require("readline");

const SCOPES = ["https://www.googleapis.com/auth/calendar"];
const TOKEN_PATH = "token.json";

// Load client secrets from a file
const credentials = JSON.parse(fs.readFileSync("path/to/client_secret.json"));

// Create an OAuth2 client
const { client_secret, client_id, redirect_uris } = credentials.installed;
const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);

// Check if we have previously stored a token.
fs.readFile(TOKEN_PATH, (err, token) => {
  if (err) {
    return getAccessToken(oAuth2Client);
  }
  oAuth2Client.setCredentials(JSON.parse(token));
  createEvent(oAuth2Client);
});

// Function to get an access token
function getAccessToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });

  console.log("Authorize this app by visiting this URL:", authUrl);

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Enter the code from that page here: ", (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error("Error retrieving access token", err);
      oAuth2Client.setCredentials(token);

      // Store the token to disk for later program executions
      fs.writeFileSync(TOKEN_PATH, JSON.stringify(token));
      createEvent(oAuth2Client);
    });
  });
}

// Function to create a calendar event
function createEvent(auth) {
  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: "Test Event",
    description: "This is a test event created by Node.js.",
    start: {
      dateTime: "2024-01-02T10:00:00",
      timeZone: "Asia/Kolkata",
    },
    end: {
      dateTime: "2024-01-02T12:00:00",
      timeZone: "Asia/Kolkata",
    },
  };

  calendar.events.insert(
    {
      calendarId: "primary", // 'primary' is the calendar ID for the authenticated user
      resource: event,
    },
    (err, res) => {
      if (err) {
        return console.error("Error creating event:", err);
      }
      console.log("Event created:", res.data);
    }
  );
}
