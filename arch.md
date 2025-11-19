paw-finder/
│
├── app/
│ ├── layout.tsx
│ ├── page.tsx # Home
│ ├── lost/
│ │ ├── page.tsx # Lost animals list
│ │ ├── [id]/page.tsx # Lost animal detail
│ │ └── new/page.tsx # Form to report lost animal
│ ├── found/
│ │ ├── page.tsx # Found animals list
│ │ ├── [id]/page.tsx # Found animal detail
│ │ └── new/page.tsx # Form to report found animal
│ ├── api/
│ │ ├── animals/
│ │ │ ├── upload/route.ts # Handles image upload + OpenAI embedding + DB insert
│ │ │ ├── search/route.ts # Searches by embedding similarity
│ │ │ └── [id]/route.ts # Fetch, update or delete specific animal
│ │ └── auth/
│ │ └── route.ts # Optional if you add auth
│ └── profile/
│ └── page.tsx # User profile
│
├── components/
│ ├── AnimalCard.tsx
│ ├── AnimalForm.tsx
│ ├── UploadButton.tsx
│ └── SearchBar.tsx
│
├── lib/
│ ├── supabaseClient.ts # Supabase client init
│ ├── openaiClient.ts # OpenAI API init
│ ├── embeddings.ts # Functions to create/search embeddings
│ ├── utils.ts # Helper functions
│ └── types.ts # TypeScript interfaces
│
├── styles/
│ └── globals.css
│
├── .env.local # API keys for Supabase & OpenAI
├── package.json
└── README.md
