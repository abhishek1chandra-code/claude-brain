-- ============================================================
-- DCR-CMIS A13S1 DB HOTFIX
-- Run once against dcr_cmis_db on localhost:5432
-- ============================================================

BEGIN;

-- Fix 1: notice_boards missing expires_at
ALTER TABLE notice_boards
    ADD COLUMN IF NOT EXISTS expires_at TIMESTAMPTZ NULL;

-- Fix 2: app_users missing address
ALTER TABLE app_users
    ADD COLUMN IF NOT EXISTS address TEXT NULL;

-- Mark bad migrations as applied so EF doesn't re-run them
INSERT INTO "__EFMigrationsHistory" ("MigrationId", "ProductVersion")
VALUES
    ('20260413300000_AppUser_Extended_NoticeExpiry', '8.0.13'),
    ('20260414000001_FixAppUsersColumns', '8.0.13'),
    ('20260414000002_CreateNoticeBoardAndBeatReport', '8.0.13')
ON CONFLICT ("MigrationId") DO NOTHING;

COMMIT;
