-- =============================================
-- LABTRACK DATABASE SCHEMA (Firebase Data Connect / PostgreSQL)
-- =============================================

-- Labs table: supports multiple laboratories
CREATE TABLE labs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    code VARCHAR(10) NOT NULL UNIQUE,
    description TEXT,
    location VARCHAR(200),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Users table: KepalaLab, Admin, Laboran
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    firebase_uid VARCHAR(128) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    display_name VARCHAR(100) NOT NULL,
    role VARCHAR(20) NOT NULL CHECK (role IN ('kepalalab', 'admin', 'laboran')),
    role_title VARCHAR(50),
    phone VARCHAR(20),
    telegram_chat_id VARCHAR(50),
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- User-Lab assignments (many-to-many)
CREATE TABLE user_labs (
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
    PRIMARY KEY (user_id, lab_id)
);

-- Assets table: tools and consumables
CREATE TABLE assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    barcode VARCHAR(100) NOT NULL UNIQUE,
    barcode_source VARCHAR(20) NOT NULL CHECK (barcode_source IN ('PRODUCT', 'GENERATED')),
    name VARCHAR(200) NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('tool', 'consumable')),
    lab_id UUID NOT NULL REFERENCES labs(id),
    brand VARCHAR(100),
    model VARCHAR(100),
    location VARCHAR(200),
    condition VARCHAR(20) NOT NULL CHECK (condition IN ('baik', 'cukup_baik', 'rusak')) DEFAULT 'baik',
    status VARCHAR(200) NOT NULL DEFAULT 'Tersedia',
    image_url TEXT,
    purchase_date DATE,
    purchase_price DECIMAL(15,2),
    quantity DECIMAL(10,2),
    unit VARCHAR(20),
    min_stock DECIMAL(10,2),
    current_borrower_id UUID REFERENCES users(id),
    checkout_at TIMESTAMPTZ,
    overdue_hours INTEGER DEFAULT 24,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Barcode sequence counter (for generation)
CREATE TABLE barcode_sequences (
    lab_id UUID PRIMARY KEY REFERENCES labs(id),
    last_sequence INTEGER DEFAULT 0
);

-- Transactions: immutable audit log
CREATE TABLE transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    type VARCHAR(20) NOT NULL CHECK (type IN ('STOCK_IN', 'STOCK_OUT', 'RETURN', 'TRANSFER')),
    asset_id UUID NOT NULL REFERENCES assets(id),
    lab_id UUID NOT NULL REFERENCES labs(id),
    performed_by UUID NOT NULL REFERENCES users(id),
    borrower_id UUID REFERENCES users(id),
    quantity DECIMAL(10,2),
    unit VARCHAR(20),
    method VARCHAR(20) NOT NULL CHECK (method IN ('WEB_SCAN', 'TELEGRAM', 'MANUAL')) DEFAULT 'WEB_SCAN',
    duration_minutes INTEGER,
    target_lab_id UUID REFERENCES labs(id),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings: per-lab configuration
CREATE TABLE settings (
    lab_id UUID PRIMARY KEY REFERENCES labs(id),
    overdue_duration_hours INTEGER DEFAULT 24,
    low_stock_alert_enabled BOOLEAN DEFAULT true,
    telegram_notifications_enabled BOOLEAN DEFAULT false,
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX idx_assets_barcode ON assets(barcode);
CREATE INDEX idx_assets_lab_id ON assets(lab_id);
CREATE INDEX idx_assets_category ON assets(category);
CREATE INDEX idx_assets_status ON assets(status);
CREATE INDEX idx_assets_current_borrower ON assets(current_borrower_id) WHERE current_borrower_id IS NOT NULL;
CREATE INDEX idx_transactions_asset_id ON transactions(asset_id);
CREATE INDEX idx_transactions_lab_id ON transactions(lab_id);
CREATE INDEX idx_transactions_created_at ON transactions(created_at);
CREATE INDEX idx_transactions_type ON transactions(type);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_firebase_uid ON users(firebase_uid);

-- Trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_labs_updated_at BEFORE UPDATE ON labs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_assets_updated_at BEFORE UPDATE ON assets FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_settings_updated_at BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Initial seed data (run after table creation)
-- INSERT INTO labs (name, code) VALUES ('Lab Komputer Utama', 'LKU');
-- INSERT INTO settings (lab_id, overdue_duration_hours) SELECT id, 24 FROM labs WHERE code = 'LKU';
-- INSERT INTO barcode_sequences (lab_id) SELECT id FROM labs WHERE code = 'LKU';