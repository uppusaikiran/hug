# Database Schema

## Overview

Solace uses Supabase for data storage with the following structure:

### Profiles
```sql
profiles (
  id UUID PRIMARY KEY,
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

### Mood Entries
```sql
mood_entries (
  id UUID PRIMARY KEY,
  user_id UUID,
  mood TEXT,
  notes TEXT,
  created_at TIMESTAMP
)
```

### Challenges
```sql
challenges (
  id UUID PRIMARY KEY,
  user_id UUID,
  title TEXT,
  description TEXT,
  start_date TIMESTAMP,
  end_date TIMESTAMP,
  progress INTEGER,
  status TEXT
)
```

### Resources
```sql
resources (
  id UUID PRIMARY KEY,
  user_id UUID,
  title TEXT,
  description TEXT,
  url TEXT,
  category TEXT,
  is_favorite BOOLEAN
)
```

## Security

- Row Level Security (RLS) enabled
- User-specific data access
- Secure API endpoints