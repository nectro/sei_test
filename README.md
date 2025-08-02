# InstaCall Voice API

A professional Node.js voice agent application built with Twilio TwiML for automated customer support calls.

## 🚀 Features

- **TwiML Voice Responses** - Professional voice interactions
- **Speech Recognition** - Real-time speech-to-text processing
- **Knowledge Base** - Smart question and keyword matching
- **Agent Transfer** - Seamless handoff to human agents
- **24/7 Availability** - Round-the-clock support
- **Error Handling** - Robust error handling and logging
- **Request Validation** - Twilio webhook signature validation

## 📁 Project Structure

```
instacall/
├── src/
│   ├── config/           # Configuration files
│   │   ├── constants.js  # App constants
│   │   └── environment.js # Environment config
│   ├── controllers/      # Business logic
│   │   └── voiceController.js
│   ├── middleware/       # Express middleware
│   │   ├── errorHandler.js
│   │   ├── requestLogger.js
│   │   └── validateTwilio.js
│   ├── routes/          # API routes
│   │   └── voice.js
│   └── utils/           # Utility functions
│       ├── logger.js
│       └── twimlGenerator.js
├── index.js             # Application entry point
├── package.json
└── .env.example         # Environment variables template
```

## 🛠 Installation

1. **Clone and install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

## 🌍 Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port | `5000` | No |
| `NODE_ENV` | Environment | `development` | No |
| `TWILIO_AUTH_TOKEN` | Twilio auth token | - | Production |
| `TWILIO_ACCOUNT_SID` | Twilio account SID | - | No |
| `AGENT_PHONE_NUMBER` | Agent transfer number | `+1234567890` | No |
| `HOLD_MUSIC_URL` | Hold music audio URL | Default | No |
| `CORS_ORIGIN` | CORS origin | `*` | No |
| `LOG_LEVEL` | Logging level | `info` | No |

## 📞 API Endpoints

### Voice Endpoints (TwiML)
- `POST /voice/greeting` - Main greeting for incoming calls
- `POST /voice/process-input` - Speech input processing with knowledge base
- `POST /voice/transfer-agent` - Agent transfer handling

### Information Endpoints (JSON)
- `GET /` - API welcome message
- `GET /health` - Health check with system info
- `GET /api/info` - API information and features

## 🔧 Twilio Configuration

1. **Configure your Twilio phone number webhook URL:**
   ```
   https://your-domain.com/voice/greeting
   ```

2. **Enable required Twilio add-ons:**
   - Speech Recognition (for voice input)

3. **Set environment variables:**
   - `TWILIO_AUTH_TOKEN` (for webhook validation)
   - `AGENT_PHONE_NUMBER` (for agent transfers)

## 📋 Call Flow

1. **Incoming Call** → Greeting → Speech Input Collection
2. **Speech Recognition** → Question Matching → Keyword Matching → Agent Transfer
3. **Smart Response** → Knowledge Base Answer or Agent Connection
4. **24/7 Support** → Always available agents and responses

## 🔒 Security Features

- **Webhook Validation** - Verifies requests are from Twilio
- **Environment-based Config** - Sensitive data in environment variables
- **Error Handling** - Graceful error responses
- **Request Logging** - Comprehensive request/response logging

## 🚀 Development

**Available Scripts:**
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server
- `npm test` - Run tests (placeholder)

**Development Features:**
- Hot reload with nodemon
- Detailed logging
- Webhook validation bypass in development
- Environment configuration validation

## 📊 Monitoring

The application includes comprehensive logging:
- **Call Logs** - All incoming calls with metadata
- **Speech Logs** - Speech recognition results
- **Recording Logs** - Voicemail recordings
- **Transfer Logs** - Agent transfer requests
- **Error Logs** - Application errors with stack traces
- **Request Logs** - HTTP request/response cycles

## 🔮 Future Enhancements

- AI/NLP integration for intelligent responses
- Database integration for call history
- Real-time analytics dashboard
- Multi-language support
- Advanced call routing
- CRM integration

## 📝 License

ISC

## 👤 Author

sam

---

**InstaCall** - AI-powered voice assistant for automated customer support