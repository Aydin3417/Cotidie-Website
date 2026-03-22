-- ============================================
-- COTIDIE LOGO ARENA — Supabase Tablo Kurulumu
-- ============================================
-- Bu SQL'i Supabase Dashboard > SQL Editor'e yapıştır ve çalıştır.

-- 1) USERS tablosu
CREATE TABLE IF NOT EXISTS arena_users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2) RATINGS tablosu
CREATE TABLE IF NOT EXISTS arena_ratings (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name TEXT NOT NULL,
    logo_id TEXT NOT NULL,
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_name, logo_id)
);

-- 3) TOURNAMENTS tablosu
CREATE TABLE IF NOT EXISTS arena_tournaments (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name TEXT NOT NULL,
    winner_id TEXT NOT NULL,
    finalist_id TEXT NOT NULL,
    size INTEGER NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4) MATCH HISTORY tablosu
CREATE TABLE IF NOT EXISTS arena_matches (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name TEXT NOT NULL,
    winner_id TEXT NOT NULL,
    loser_id TEXT NOT NULL,
    round_name TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5) Row Level Security — herkese okuma/yazma izni (public arena)
ALTER TABLE arena_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE arena_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE arena_tournaments ENABLE ROW LEVEL SECURITY;
ALTER TABLE arena_matches ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read arena_users" ON arena_users FOR SELECT USING (true);
CREATE POLICY "Public insert arena_users" ON arena_users FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read arena_ratings" ON arena_ratings FOR SELECT USING (true);
CREATE POLICY "Public insert arena_ratings" ON arena_ratings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update arena_ratings" ON arena_ratings FOR UPDATE USING (true);

CREATE POLICY "Public read arena_tournaments" ON arena_tournaments FOR SELECT USING (true);
CREATE POLICY "Public insert arena_tournaments" ON arena_tournaments FOR INSERT WITH CHECK (true);

CREATE POLICY "Public read arena_matches" ON arena_matches FOR SELECT USING (true);
CREATE POLICY "Public insert arena_matches" ON arena_matches FOR INSERT WITH CHECK (true);

-- 5b) SWIPES tablosu (Tinder tarzı)
CREATE TABLE IF NOT EXISTS arena_swipes (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    user_name TEXT NOT NULL,
    logo_id TEXT NOT NULL,
    direction TEXT NOT NULL CHECK (direction IN ('left', 'right')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(user_name, logo_id)
);

ALTER TABLE arena_swipes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read arena_swipes" ON arena_swipes FOR SELECT USING (true);
CREATE POLICY "Public insert arena_swipes" ON arena_swipes FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update arena_swipes" ON arena_swipes FOR UPDATE USING (true);
