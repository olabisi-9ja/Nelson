-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. PROFILES (Extends Supabase Auth)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role TEXT NOT NULL DEFAULT 'customer' CHECK (role IN ('customer', 'vip', 'artisan', 'manager', 'admin')),
  first_name TEXT,
  last_name TEXT,
  phone_number TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 3. COLLECTIONS
CREATE TABLE IF NOT EXISTS public.collections (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.collections ENABLE ROW LEVEL SECURITY;

-- 4. PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  collection_id UUID REFERENCES public.collections(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  base_price DECIMAL(12,2) NOT NULL,
  is_commissionable BOOLEAN NOT NULL DEFAULT true,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- 5. VARIANTS
CREATE TABLE IF NOT EXISTS public.variants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  sku TEXT UNIQUE,
  size TEXT,
  color TEXT,
  material TEXT,
  inventory_count INTEGER DEFAULT 0,
  price_adjustment DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.variants ENABLE ROW LEVEL SECURITY;

-- 6. COMMISSIONS
CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'in_production', 'completed', 'shipped', 'cancelled')),
  total_amount DECIMAL(12,2) NOT NULL,
  deposit_amount DECIMAL(12,2) NOT NULL,
  measurements JSONB, -- Storing sizing/foot scan data
  customizations JSONB, -- Leather, color, sole, monogram
  assigned_artisan_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

-- 7. PRODUCTION TIMELINE
CREATE TABLE IF NOT EXISTS public.production_timeline (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  commission_id UUID REFERENCES public.commissions(id) ON DELETE CASCADE,
  stage_name TEXT NOT NULL, -- e.g. "Leather Selected", "Cutting", "Stitching"
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'in_progress', 'completed')),
  notes TEXT,
  media_urls TEXT[], -- Array of image/video URLs
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
ALTER TABLE public.production_timeline ENABLE ROW LEVEL SECURITY;

-- 8. RLS POLICIES (Basic placeholders to allow everything for admins, restrict for users)
CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Collections are viewable by everyone." ON public.collections FOR SELECT USING (true);
CREATE POLICY "Products are viewable by everyone." ON public.products FOR SELECT USING (status = 'published');
CREATE POLICY "Variants are viewable by everyone." ON public.variants FOR SELECT USING (true);

CREATE POLICY "Users can view own commissions." ON public.commissions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can view own timeline." ON public.production_timeline FOR SELECT USING (
  commission_id IN (SELECT id FROM public.commissions WHERE user_id = auth.uid())
);
