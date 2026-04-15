# PROJECT BRAIN — DCR-CMIS
## Status: ACTIVE
## Phase: ADMIN PORTAL AUDIT — A13S1 COMPLETE
## Repo: abhishek1chandra-code/claude-brain
## Last checkpoint: A13S1 (April 15, 2026)
## Account Rotation: A1→A2→A3…A10→A1 (4hr cooldown each)
## MASTER KIT: DCR-CMIS-MASTER-CONTEXT-v4.md (attach with every session)

---

## NEXT SESSION — A14S1

### BUILD STATUS: CLEAN
### DB STATUS: HOTFIX REQUIRED — run A13S1-DB-HOTFIX.sql before next dev cycle

### COMPLETED IN A13S1 — 3 fixes across 2 files + 1 SQL hotfix

| # | File | Bug | Fix |
|---|------|-----|-----|
| SQL | A13S1-DB-HOTFIX.sql | `notice_boards.expires_at` missing (migration used wrong table name `notice_board`); `app_users.address` + 7 other columns missing (migration ran against `asp_net_users`); 20260414000001_FixAppUsersColumns in wrong namespace never applied | ALTER TABLE with IF NOT EXISTS + __EFMigrationsHistory inserts |
| 1 | OfficerLoad.razor | `badge-danger` is not a canonical CSS token (non-existent) | Changed to `badge-red` |
| 2 | OfficerPerformance.razor | `GroupBy(t => new { t.OfficerId, t.Officer!.UserName })` — navigation property in GroupBy key is not reliably translatable by EF Core; throws `InvalidOperationException` at runtime | Two-step: GroupBy on scalar `t.OfficerId`, then separate `Users` lookup + `ToDictionaryAsync` join in memory. Added try/catch guard. |

### CARRY-FORWARD VERIFIED CLEAN (A13S1)
- **Public/Index.cshtml.cs** — `OnPostTrackAsync` carry-forward resolved: page uses `OnGetAsync(?no=)` for tracking. No `OnPostTrackAsync` needed. All 5 handlers (SendOtp, VerifyOtp, PasswordLogin, Register, LoadNotices) are correct. `LoadNoticesAsync()` has catch→mock fallback so DB errors don't crash UI (explains 200 responses in log despite `expires_at` error). ✅
- **Track.cshtml.cs** — `OnGetAsync` + `OnPostRequestEscalationAsync` correct. IDOR guard on escalation (BUG-114). Auth guard on PII search (BUG-110). ✅
- **P0 Security blockers** — ALL RESOLVED IN CODEBASE:
  - JWT: `appsettings.json` has `REPLACE_VIA_ENV` placeholder; `Program.cs` throws `InvalidOperationException` if key contains "REPLACE" — production-safe ✅
  - CORS: explicit `WithOrigins(origins)` from config — no wildcard ✅
  - Password: RequireDigit, RequiredLength=12, RequireNonAlphanumeric, RequireUppercase, RequireLowercase, RequiredUniqueChars=4 — both API and Web Program.cs ✅

### DB ROOT CAUSE (for reference)
- Migration `20260413300000_AppUser_Extended_NoticeExpiry`:
  - Ran `ALTER TABLE asp_net_users` — wrong (EF maps AppUser → `app_users`)
  - Ran `ALTER TABLE notice_board ADD COLUMN IF NOT EXISTS expires_at` — wrong (singular, EF expects `notice_boards`)
  - Both silently no-oped due to IF NOT EXISTS
- Migration `20260414000001_FixAppUsersColumns`:
  - Correct SQL (targets `app_users`) but placed in `Infrastructure/Migrations/` (wrong folder)
  - Should be in `Infrastructure/Data/Migrations/` — EF never picked it up
- Migration `20260414000002_CreateNoticeBoardAndBeatReport`:
  - Creates orphan `notice_board` (singular) + `notice_board_attachment` (singular) tables
  - EF never queries these — they're dead tables. Do not drop without checking for data.

### PRIORITY 1 — A14S1: Remaining emoji audit
- DutyAttendance.razor: stat cards use 👥 ✅ ⚠️ ❌ 📍 📊 — replace with SVG icons
- EscalationRequests.razor: status icons in table
- NotificationLog.razor: empty state (📭)

### PRIORITY 2 — A14S1: IComplaintRepository interface
- Track.cshtml.cs uses `IComplaintRepository.GetByComplaintNumberAsync()` — verify this interface and its implementation exist and return `ComplaintDetailDto` correctly (not yet audited)

---

## COMPLETED (A12S1) — 8 fixes across 7 files
| # | File | Bug |
|---|------|-----|
| 1 | IvrsCallLog.razor | BUILD ERROR RZ10008: duplicate `oninput` — `@bind:event="oninput"` + `@oninput="ResetPage"` → Changed to `@bind:after="ResetPage"` |
| 2 | AdminBroadcast.razor | Missing `@rendermode InteractiveServer` |
| 3 | EscalationRequests.razor | Missing `@rendermode InteractiveServer` |
| 4 | WorkEvents.razor.cs | `HandleExcelImportAsync` was a stub |
| 5 | DepartmentList.razor | Stale CSS: `page-header`, `page-subtitle`, `btn-primary` |
| 6 | Reports.razor | Emoji ⭐ + Bootstrap card tokens |
| 7 | WorkEvents.razor | Modal titles doubled: "Edit Edit Event/Magistrate/Officer" |
| 8 | ShiftSwapRequests.razor | `badge-yellow` (non-existent) → `badge-amber` |

## COMPLETED (A11S1) — 10 fixes across 7 files
| # | File | Bug |
|---|------|-----|
| 1 | IvrsConfig.razor.cs | Infinite spinner on failure |
| 2 | IvrsConfig.razor | No error UI; emoji 🔢 |
| 3 | LocalBodies.razor | Missing @rendermode |
| 4 | LocalBodies.razor.cs | AllBlocks missing RatniFardipur |
| 5 | PoliceStations.razor | Missing @rendermode |
| 6 | PoliceStations.razor.cs | AllBlocks missing RatniFardipur |
| 7 | RevenueVillages.razor | Stale CSS |
| 8 | RevenueVillages.razor.cs | AllBlocks missing RatniFardipur |
| 9 | ShiftList.razor.cs | HandleExcelImportAsync stub |
| 10 | GpsCheckInHistory.razor | Missing @rendermode + @layout |

## COMPLETED (A7S1–A5S1–A6S1–A4S4)
- Full audit: AdminDashboard, ComplaintList, UserList, OfficialApproval
- LocalBodiesJson / VillagesJson in Index.cshtml.cs
- ControlRoom/Index.cshtml.cs — real EF replacing MockIvrsCalls
- CS0168 warning: 4 Blazor files fixed
- All build errors and warnings resolved

## DO NOT CHANGE
Backend (Domain/Application/Infrastructure/API), EF migrations, JWT/OTP auth, Complaint number format JHB-YYYY-NNNNNN, Hindi default language, Jehanabad seed data

## ARCHITECTURAL CONSTANTS
- 7 Jehanabad blocks: JehanabadHQ, Kako, Ghoshi, Modanganj, Hulasganj, Makhdumpur, RatniFardipur
- CSS tokens: `ph`, `ph-title`, `ph-sub`, `form-control`, `btn-cta`, `tbl`, `badge-green`, `badge-amber`, `badge-red`, `badge-blue`, `badge-gray`, `glass`, `glass-card`, `table-header`, `p-16`, `p-20` (dcr-cmis.css)
- No emojis in UI — SVG icons only
- All Blazor interactive pages MUST have `@rendermode InteractiveServer`
- All admin pages MUST have `@layout AdminLayout`
- `@bind:event="oninput"` owns the oninput slot — use `@bind:after="Method"` never `@oninput="Method"` alongside it
- Excel import stubs: audit every HandleExcelImport* method for actual ExcelImportSvc calls
- EF GroupBy: never use navigation properties in GroupBy key — use scalar FKs + separate dictionary lookup
- EF migrations: ALL migrations must live in `Infrastructure/Data/Migrations/` folder, namespace `DCR.CMIS.Infrastructure.Data.Migrations`
