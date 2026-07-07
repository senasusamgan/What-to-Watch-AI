# 🎬 What to Watch AI

An AI-powered movie and TV recommendation app built with Next.js, OpenAI, and TMDB.

Users can describe what they feel like watching, receive three personalized recommendations, and explore each title through posters, ratings, trailers, cast information, and similar content.

## Live Demo

[Open What to Watch AI](https://what-to-watch-ai-9esj.vercel.app/)

## Features

- Personalized movie and TV recommendations powered by OpenAI
- Natural-language prompts based on mood, genre, runtime, era, or similar titles
- Real movie and TV data from TMDB
- Poster, rating, release year, and recommendation reason
- Clickable recommendation cards
- Search for movies and TV shows
- Daily trending titles
- Dedicated cinematic detail pages
- Official trailers embedded from YouTube
- Cast information
- Similar and recommended titles
- Responsive design for desktop and mobile
- Production deployment through Vercel

## How It Works

1. The user describes what they want to watch.
2. OpenAI returns three structured recommendations.
3. Each recommendation is matched with a real TMDB title.
4. The app displays the poster, rating, year, and AI-generated reason.
5. Clicking a card opens a detailed title page.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- OpenAI API
- TMDB API
- Zod
- Vercel

## Project Structure

```text
what-to-watch-ai/
├── app/
│   ├── api/
│   │   └── recommend/
│   │       └── route.ts
│   ├── title/
│   │   └── [type]/
│   │       └── [id]/
│   │           └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── AiRecommendationForm.tsx
├── lib/
│   └── tmdb.ts
├── public/
├── .env.local
├── package.json
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/senasusamgan/What-to-Watch-AI.git
cd What-to-Watch-AI
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env.local`

Create a file named `.env.local` in the root directory:

```env
TMDB_ACCESS_TOKEN=your_tmdb_read_access_token
OPENAI_API_KEY=your_openai_api_key
```

Do not commit this file or expose your API keys publicly.

### 4. Start the development server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

## Environment Variables

| Variable | Description |
|---|---|
| `TMDB_ACCESS_TOKEN` | TMDB API Read Access Token |
| `OPENAI_API_KEY` | OpenAI API key used for personalized recommendations |

## Example Prompt

```text
I want a dark, immersive science-fiction movie under two hours.
```

The app returns three recommendations with:

- Title
- Type
- Release year
- AI-generated explanation
- TMDB poster
- TMDB rating
- Link to the full detail page

## Deployment

The project is deployed with Vercel.

To deploy your own version:

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Add `TMDB_ACCESS_TOKEN` and `OPENAI_API_KEY` under Environment Variables.
4. Deploy the project.

Every new push to the production branch can trigger a new Vercel deployment automatically.

## Security

- API keys are stored in environment variables.
- OpenAI requests are handled through a server-side API route.
- Secret keys are never exposed to the browser.
- `.env.local` should remain excluded through `.gitignore`.

## API Usage

OpenAI API usage may create charges depending on request volume and the model used.

TMDB data is provided through the TMDB API.

This product uses the TMDB API but is not endorsed or certified by TMDB.

## Future Improvements

- User accounts and saved watchlists
- Recommendation history
- Streaming-provider availability
- Filters for runtime, genre, year, and rating
- Turkish and English language support
- Dark and light themes
- Shareable recommendation lists
- Feedback controls for improving recommendations
- Recently viewed titles
- Personalized profiles

## Author

**Ege Özgür**

- GitHub: [senasusamgan](https://github.com/senasusamgan)
- Live Project: [What to Watch AI](https://what-to-watch-ai-9esj.vercel.app/)

## License

This project is currently shared for portfolio and educational purposes.
