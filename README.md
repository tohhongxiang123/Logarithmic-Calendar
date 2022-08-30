# Logarithmic Calendar

# Setup

Clone the github repository, then install the dependencies

```bash
git clone https://github.com/tohhongxiang123/Logarithmic-Calendar
npm install
```

Copy `.env.example` into `.env`, and then fill up the required environment variables

```bash
cp .env.example .env
```

- `GOOGLE_ID`: Google OAuth2 client ID
- `GOOGLE_SECRET`: Google OAuth2 client secret
- `NEXTAUTH_SECRET`: Secret string used to encrypt JWTs provided by NextAuth

To fill up `GOOGLE_ID` and `GOOGLE_SECRET`, you will need to access your google project's OAuth2 Client. If you do not have one, you may follow the instructions [here](https://support.google.com/cloud/answer/6158849?hl=en). For running locally, the following information is required:
- Application type: Web application
- Authorised Javascript Origins: `http://localhost:3000` and `http://localhost` 
- Authorised Redirect URIs: `http://localhost:3000/api/auth/callback/google`

From the OAuth2 Client, copy and paste the following into `.env`: 
- `GOOGLE_ID`: Client ID
- `GOOGLE_SECRET`: Client secret

You might also need to enable the [Calendar API](https://developers.google.com/calendar/api) from Google Cloud Platform
- Go to [Google Cloud Platform](https://console.cloud.google.com), and select your project (or create one)
- Go to "APIs and Services" > "Enable APIs and Services", and then search for "Google Calendar API"
- Enable the Google Calendar API 

After filling in the `.env` file, run the application

```bash
npm run dev
```

# Resources

- http://downloads.clearcove.ca/NonLinearTime.png
- https://news.ycombinator.com/item?id=1248496
- https://abstractfactory.blogspot.com/2011/01/logarithmic-calendar-i-want.html
- [Calendar API reference](https://developers.google.com/calendar/api/v3/reference)
- [NextAuth rotate access tokens](https://github.com/ndom91/newtelco-tab/blob/3f4153c7aa94c7f6cfeeb3778be3cdb1ec6ee243/src/pages/api/auth/%5B...nextauth%5D.ts#L32)