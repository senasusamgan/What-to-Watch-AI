# 🎬 What to Watch AI

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-4-38bdf8)
![OpenAI](https://img.shields.io/badge/AI-OpenAI-green)
![TMDB](https://img.shields.io/badge/TMDB-API-01d277)
![License](https://img.shields.io/badge/License-Portfolio-orange)

An AI-powered movie and TV discovery platform built with **Next.js**, **TypeScript**, **OpenAI**, and **TMDB**.

Describe what you want to watch in natural language and receive personalized movie or TV recommendations powered by AI. Explore each title through trailers, streaming availability, cast information, similar titles, and a fully localized **English / Turkish** interface.

---

## 🌐 Live Demo

👉 https://what-to-watch-ai-9esj.vercel.app/

---

# ✨ Features

- 🤖 AI-powered movie & TV recommendations
- 🎭 Natural language search based on mood, genre, actors, runtime, or similar movies
- 🌍 Full English & Turkish localization (i18n)
- 🎬 TMDB integration
- 🔍 Movie & TV search
- 📈 Daily trending titles
- 🎥 Official YouTube trailers
- 📺 Streaming provider availability (Turkey)
- ⭐ Ratings, genres, runtime and release year
- 👥 Cast information
- 🎞️ Similar recommendations
- 📱 Responsive design
- ⚡ Server Components & App Router
- 🚀 Deployed on Vercel

---

# 🖼 Screenshots

> *(Screenshots will be added soon.)*

- 🏠 Home Page
- 🤖 AI Recommendation
- 🎬 Movie Details
- 🎥 Trailer
- 📺 Streaming Providers
- 🌍 Language Switching

---

# 🚀 How It Works

1. Describe what you'd like to watch.
2. AI analyzes your request.
3. Three personalized recommendations are generated.
4. Each recommendation is matched with real TMDB data.
5. Explore trailers, cast, streaming providers and similar titles.

---

# 🛠 Tech Stack

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- next-intl
- OpenAI API
- TMDB API
- Zod
- Vercel

---

# 📂 Project Structure

```text
what-to-watch-ai/
│
├── app/
│   ├── [locale]/
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   └── title/
│   │       └── [type]/
│   │           └── [id]/
│   │               └── page.tsx
│   │
│   ├── api/
│   │   └── recommend/
│   │       └── route.ts
│   │
│   ├── globals.css
│   └── layout.tsx
│
├── components/
├── i18n/
├── lib/
├── messages/
├── middleware.ts
├── public/
├── .env.local
├── package.json
└── README.md
```

---

# ⚙️ Getting Started

## Clone the repository

```bash
git clone https://github.com/senasusamgan/What-to-Watch-AI.git
cd What-to-Watch-AI
```

---

## Install dependencies

```bash
npm install
```

---

## Create `.env.local`

```env
TMDB_ACCESS_TOKEN=your_tmdb_access_token
OPENAI_API_KEY=your_openai_api_key
```

---

## Run locally

```bash
npm run dev
```

Open

```
http://localhost:3000
```

---

# 🔐 Environment Variables

| Variable | Description |
|-----------|-------------|
| TMDB_ACCESS_TOKEN | TMDB Read Access Token |
| OPENAI_API_KEY | OpenAI API Key |

---

# 💬 Example Prompt

```
I want a dark, emotional sci-fi movie under two hours with an unexpected ending.
```

AI returns:

- Movie title
- Movie type
- Release year
- AI explanation
- TMDB rating
- Poster
- Link to detail page

---

# 🚀 Deployment

The application is deployed using **Vercel**.

Deployment steps:

1. Fork or clone the repository
2. Import into Vercel
3. Add Environment Variables
4. Deploy

Every push automatically creates a new deployment.

---

# 🔒 Security

- API keys are stored securely using Environment Variables.
- OpenAI requests run exclusively on the server.
- Secrets are never exposed to the client.
- `.env.local` is excluded via `.gitignore`.

---

# 🎯 Future Improvements

- ❤️ Favorites
- 📚 Watchlist
- 👤 User authentication
- 🧠 Smarter AI explanations
- 🎞 AI Movie Night mode
- 🌎 Additional languages
- 📊 Personalized recommendation history
- 👥 User profiles
- 🔗 Share recommendations

---

# 🙏 Credits

Movie and TV information provided by **TMDB**.

This product uses the TMDB API but is **not endorsed or certified by TMDB**.

---

# 👨‍💻 Author

**Sena Su Samgan**

GitHub:
https://github.com/senasusamgan

Live Project:
https://what-to-watch-ai-9esj.vercel.app/

---

# 📄 License

This project is shared for **portfolio and educational purposes**.