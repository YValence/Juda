-- ═══════════════════════════════════════════════════════════════════
-- JUDA GAMING — BASE DE DONNÉES SUPABASE (V1)
-- À copier-coller dans Supabase -> SQL Editor -> New Query -> Run
-- ═══════════════════════════════════════════════════════════════════

-- 1. PROFILS DES JOUEURS
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL CHECK (length(username) BETWEEN 3 AND 20),
  avatar_url TEXT,
  role TEXT DEFAULT 'player' CHECK (role IN ('player', 'admin')),
  points INTEGER DEFAULT 0 CHECK (points >= 0),
  total_points_earned INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Activation de RLS sur profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture publique des profils"
  ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Modification de son propre profil"
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- 2. TABLE DE CONFIGURATION DU JEU
CREATE TABLE IF NOT EXISTS public.config (
  key TEXT PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.config ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture de la config pour tous"
  ON public.config FOR SELECT USING (true);

-- Insertion des valeurs de base
INSERT INTO public.config (key, value) VALUES
  ('daily_point_cap', '300'::jsonb),
  ('weekly_point_cap', '1500'::jsonb),
  ('activation_codes', '["MANGA2026", "ARCADEV1", "CHAMAH99"]'::jsonb)
ON CONFLICT (key) DO NOTHING;

-- 3. QUESTIONS DE QUIZ
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  difficulty INTEGER DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  question_text TEXT NOT NULL,
  choices JSONB NOT NULL,
  correct_index INTEGER NOT NULL CHECK (correct_index BETWEEN 0 AND 3),
  media_type TEXT DEFAULT 'text' CHECK (media_type IN ('text', 'image', 'audio')),
  media_url TEXT,
  status TEXT DEFAULT 'validated' CHECK (status IN ('draft', 'validated', 'archived')),
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture des questions validées"
  ON public.questions FOR SELECT USING (status = 'validated');

-- 4. SESSIONS DE QUIZ JOUÉES
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  questions JSONB NOT NULL,
  score INTEGER DEFAULT 0,
  points_earned INTEGER DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture de ses propres sessions"
  ON public.quiz_sessions FOR SELECT USING (auth.uid() = player_id);

CREATE POLICY "Insertion de sa propre session"
  ON public.quiz_sessions FOR INSERT WITH CHECK (auth.uid() = player_id);

-- 5. HISTORIQUE DES QUESTIONS VUES (ANTI-RÉPÉTITION)
CREATE TABLE IF NOT EXISTS public.seen_questions (
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  question_id UUID REFERENCES public.questions(id) ON DELETE CASCADE,
  seen_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (player_id, question_id)
);

ALTER TABLE public.seen_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gestion de ses questions vues"
  ON public.seen_questions FOR ALL USING (auth.uid() = player_id);

-- 6. TRANSACTIONS DE POINTS
CREATE TABLE IF NOT EXISTS public.point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  balance_after INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.point_transactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture de ses propres transactions"
  ON public.point_transactions FOR SELECT USING (auth.uid() = player_id);

-- 7. QUÊTES QUOTIDIENNES (CONTENU DU JOUR)
CREATE TABLE IF NOT EXISTS public.daily_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE UNIQUE NOT NULL,
  mystery_character JSONB NOT NULL,
  mystery_technique JSONB NOT NULL,
  quote JSONB NOT NULL,
  emoji JSONB NOT NULL,
  price_game JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.daily_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Lecture du contenu du jour pour tous"
  ON public.daily_content FOR SELECT USING (true);

-- 8. TENTATIVES DE QUÊTES QUOTIDIENNES PAR JOUEUR
CREATE TABLE IF NOT EXISTS public.daily_attempts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  game_type TEXT NOT NULL CHECK (game_type IN (
    'mystery_character', 'mystery_technique', 'quote', 'emoji', 'price_game'
  )),
  score INTEGER DEFAULT 0,
  attempts_used INTEGER DEFAULT 0,
  completed BOOLEAN DEFAULT false,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (player_id, date, game_type)
);

ALTER TABLE public.daily_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gestion de ses propres quêtes quotidiennes"
  ON public.daily_attempts FOR ALL USING (auth.uid() = player_id);

-- 9. SUIVI DES GAINS JOURNALIERS (PLAFONDS)
CREATE TABLE IF NOT EXISTS public.daily_earnings (
  player_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  quiz_points INTEGER DEFAULT 0,
  quest_points INTEGER DEFAULT 0,
  PRIMARY KEY (player_id, date)
);

ALTER TABLE public.daily_earnings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Gestion de ses gains quotidiens"
  ON public.daily_earnings FOR ALL USING (auth.uid() = player_id);

-- 10. TRIGGER AUTOMATIQUE CRÉATION DE PROFIL LORS DE L'INSCRIPTION
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'username', 'Joueur_' || substring(new.id::text, 1, 6)),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
