# PROJECT BRAIN — DCR-CMIS
## Status: ACTIVE
## Phase: ADMIN PORTAL AUDIT — A14S1 COMPLETE
## Repo: abhishek1chandra-code/claude-brain
## Last checkpoint: A12S1 (new checkpoint needed)
## Account Rotation: A1→A2→A3…A10→A1 (4hr cooldown each)
## MASTER KIT: DCR-CMIS-MASTER-CONTEXT-v4.md (attach with every session)

---

## NEXT SESSION — A15S1

### BUILD STATUS: CLEAN
### DB STATUS: HOTFIX STILL REQUIRED — run A13S1-DB-HOTFIX.sql (in brain repo)
- Two missing columns confirmed in runtime logs: `notice_boards.expires_at`, `app_users.address`
- Hotfix SQL committed to brain repo as `A13S1-DB-HOTFIX.sql`

### COMPLETED IN A14S1 — 2 files, 12 violations fixed

| # | File | Bug | Fix |
|---|------|-----|-----|
| 1 | DutyAttendance.razor | 4 stat card emoji icons (👥 ✅ ⚠️ ❌) | Replaced with inline SVG (user-group, check-circle, alert-triangle, x-circle) |
| 2 | DutyAttendance.razor | `"✅ Yes"` in IsGpsMandatory cell | → `"Yes"` |
| 3 | DutyAttendance.razor | `✅ Compliant` badge text | → `Compliant` |
| 4 | DutyAttendance.razor | `⚠️ Missed` badge text | → `Missed` |
| 5 | DutyAttendance.razor | `❌ Non-Compliant` badge text | → `Non-Compliant` |
| 6 | DutyAttendance.razor | `📊 Totals` tfoot label | → `Totals` |
| 7 | DutyAttendance.razor | `📍` empty state icon | → inline SVG map-pin |
| 8 | NotificationLog.razor | `📭` empty state icon | → inline SVG bell |
| 9 | NotificationLog.razor | `badge-teal` non-canonical token | → `badge-blue` |

### CLEAN IN A14S1
- EscalationRequests.razor — `✓`/`✗` in action buttons are standard Unicode (U+2713/U+2717), not emoji. No violations. ✅

### PRIORITY 1 — A15S1: IComplaintRepository audit (CARRY-FORWARD)
- `ComplaintRepository.cs` at `Infrastructure/Services/ComplaintRepository.cs`
- `GetByComplaintNumberAsync(string number)` — verify it returns full complaint with status logs, attachments, officer
- Check if `IComplaintRepository` interface exists in Application/Interfaces (not visible in checkpoint — check NewInterfaces.cs)
- Track.cshtml.cs line 94 calls this — verify correct return type and null handling

### PRIORITY 2 — A15S1: Upload a fresh A14S1 checkpoint
- Checkpoint A12S1 is the last uploaded — two sessions behind
- Ask user to upload A14S1 checkpoint before starting A15S1 audit work

### REMAINING EMOJI AUDIT STATUS (systemic pass)
- DutyAttendance.razor — ✅ DONE (A14S1)
- EscalationRequests.razor — ✅ CLEAN
- NotificationLog.razor — ✅ DONE (A14S1)
- Reports.razor — ✅ DONE (A12S1)
- WorkEvents.razor — ✅ DONE (A12S1)
- All other Admin pages audited clean in A11S1/A12S1/A13S1
- **Emoji audit for Admin Portal: COMPLETE**

---

## COMPLETED (A13S1) — 3 fixes across 2 files + 1 SQL hotfix

| # | File | Bug | Fix |
|---|------|-----|-----|
| SQL | A13S1-DB-HOTFIX.sql | `notice_boards.expires_at` + `app_users.address` missing | ALTER TABLE with IF NOT EXISTS + __EFMigrationsHistory inserts |
| 1 | OfficerLoad.razor | `badge-danger` non-canonical | → `badge-red` |
| 2 | OfficerPerformance.razor | GroupBy navigation property EF error | Two-step: GroupBy scalar FK + separate Users dictionary lookup |

### CARRY-FORWARD VERIFIED CLEAN (A13S1)
- **Public/Index.cshtml.cs** — No `OnPostTrackAsync` needed. All 5 handlers correct. `LoadNoticesAsync()` has catch→mock fallback. ✅
- **Track.cshtml.cs** — `OnGetAsync` + `OnPostRequestEscalationAsync` correct. IDOR guard on escalation (BUG-114). Auth guard on PII search (BUG-110). ✅
- **P0 Security blockers** — ALL RESOLVED:
  - JWT: placeholder throws `InvalidOperationException` at startup if not replaced ✅
  - CORS: explicit `WithOrigins(origins)` from config ✅
  - Password: RequireDigit, RequiredLength=12, RequireNonAlphanumeric, RequireUppercase, RequireLowercase, RequiredUniqueChars=4 ✅

### DB ROOT CAUSE (for reference)
- Migration `20260413300000_AppUser_Extended_NoticeExpiry`: ran `ALTER TABLE asp_net_users` (wrong) + `notice_board` singular (wrong)
- Migration `20260414000001_FixAppUsersColumns`: correct SQL but in wrong folder `Infrastructure/Migrations/` instead of `Infrastructure/Data/Migrations/`
- Migration `20260414000002_CreateNoticeBoardAndBeatReport`: created orphan `notice_board` singular tables (dead, do not drop without checking for data)

---

## COMPLETED (A12S1) — 8 fixes across 7 files
| # | File | Bug |
|---|------|-----|
| 1 | IvrsCallLog.razor | BUILD ERROR RZ10008: `@bind:event="oninput"` + `@oninput="ResetPage"` → `@bind:after="ResetPage"` |
| 2 | AdminBroadcast.razor | Missing `@rendermode InteractiveServer` |
| 3 | EscalationRequests.razor | Missing `@rendermode InteractiveServer` |
| 4 | WorkEvents.razor.cs | `HandleExcelImportAsync` stub |
| 5 | DepartmentList.razor | Stale CSS: `page-header`, `page-subtitle`, `btn-primary` |
| 6 | Reports.razor | Emoji ⭐ + Bootstrap card tokens |
| 7 | WorkEvents.razor | Modal titles doubled: "Edit Edit Event/Magistrate/Officer" |
| 8 | ShiftSwapRequests.razor | `badge-yellow` → `badge-amber` |

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
