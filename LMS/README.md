# LMS Native

A modern, cross-platform **Library Management System (LMS)** built with React Native and Expo. This application provides an intuitive interface for managing library resources, tracking issues, and supporting both users and administrators.

## Features

- User authentication (login)
- Dashboard with library statistics and recent activity
- Search and browse books/resources
- Responsive UI using Tailwind CSS & NativeWind
- Cross-platform support (Android, iOS, Web)

## Tech Stack

- React Native
- Expo
- Expo Router
- NativeWind (Tailwind CSS for React Native)
- AsyncStorage
- Axios

## Getting Started

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd LMS
   ```
2. **Install dependencies:**
   ```
   npm install
   ```
3. **Start the development server:**
   ```
   npm start
   ```
4. **Run on your device or browser:**
   - Android: `npm run android`
   - iOS: `npm run ios`
   - Web: `npm run web`

## Project Structure

```
LMS/
  app/
    _layout.js
    index.js
    login.js
    dashboard.js
  assets/
  global.css
  package.json
  ...
```

## API

The app connects to a backend API for authentication and data management. See the code in `app/dashboard.js` for example usage.

---