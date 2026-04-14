# PROJECT BRAIN — DCR-CMIS
## Status: ACTIVE
## Phase: UI-UNIFICATION + CSS-MASTER → COMPLETE
## Repo: abhishek1chandra-code/claude-brain
## Last checkpoint: Checkpoint-31 (April 14, 2026 — A2 S2) [files from checkpoint zip]
## Account Rotation: A1→A2→A3…A10→A1 (4hr cooldown each)

---

## STACK
- ASP.NET Core 8.0 Razor Pages + Blazor Server
- EF Core 8 + PostgreSQL (Npgsql), snake_case naming
- ASP.NET Core Identity + JWT (15min access / 7day refresh)
- SignalR 3 hubs: ComplaintHub, NotificationHub, DashboardHub
- Hangfire (PostgreSQL backend), QuestPDF, ClosedXML, MailKit, Vonage/Twilio, FreeSWITCH ESL
- Leaflet.js (GIS), IMemoryCache, custom AuditInterceptor

## SOLUTION STRUCTURE
```
DCR.CMIS.sln
├── DCR.CMIS.Domain          ✅ COMPLETE
├── DCR.CMIS.Application     ✅ COMPLETE
├── DCR.CMIS.Infrastructure  ✅ COMPLETE
├── DCR.CMIS.Web             🔄 IN PROGRESS (feature work)
└── DCR.CMIS.API             ✅ COMPLETE
```

---

## COMPLETED (as of Checkpoint-31 + A3 S3 FULL)

### Backend (ALL DONE — DO NOT TOUCH)
- [x] All domain entities + enums (AllEnums.cs, AppUser, Complaint, all related entities)
- [x] All EF Core configurations + 15+ migrations
- [x] AppDbContext + AuditInterceptor + DbSeeder (departments, blocks, roles)
- [x] AuthService (Identity + JWT + OTP + refresh token)
- [x] ComplaintRepository, AdminComplaintService (34KB, fully featured)
- [x] SlaService, ShiftService, NotificationService, ComplaintNotifier
- [x] DeputedPersonnelService, WorkEventService, AuditLogService
- [x] UserManagementService, DepartmentService, GpsService, IvrsConfigService
- [x] ReportService (PDF/Excel), ComplaintPdfService (QuestPDF)
- [x] IvrsService (FreeSWITCH ESL), GisService, ExcelImportService
- [x] EmailGateway (MailKit), TwilioSmsGateway
- [x] HangfireConfig + SlaMonitorJob, ShiftHandoverJob, ComplaintAutoAssignJob, ComplaintAutoCloseJob, OfficerTaskReminderJob, GpsCheckInReminderJob
- [x] ComplaintHub, NotificationHub, DashboardHub (SignalR)
- [x] API project: AdminComplaintController, DashboardController, UserManagementController, DepartmentController, ShiftController, WorkEventController, ReportController, IvrsConfigController, AuditLogController, FieldController, LanguageController

### Web / Razor Pages (DONE)
- [x] All pages use Public _Layout.cshtml → dcr-cmis.css (inherited via _ViewStart)
- [x] Standalone pages with Layout=null: Login, OfficialLogin, Official/Index — all fixed to dcr-cmis.css + data-theme
- [x] public.js cleaned: dead toggleTheme() + dead IIFE removed (A3 S3)

### Web / Blazor Pages (DONE)
- [x] All Blazor layouts + components migrated to dcr-cmis.css

### CSS — UNIFICATION COMPLETE ✅
- [x] dcr-cmis.css — UNIFIED master CSS (includes alias vars for legacy components)
- [x] theme-toggle.js — localStorage + OS preference + tab-sync + Blazor re-render support
- [x] Zero glass-theme.css refs anywhere (grep confirmed, .bak files excluded)
- [x] Zero html.light-mode / body.light-mode CSS selectors (grep confirmed)
- [x] Zero body.classList.toggle('light-mode') calls in any JS (confirmed)
- [x] public.js: dead toggleTheme() + dead IIFE cleaned (A3 S3 final)

---

## IN PROGRESS — NONE

---

## NEXT SESSION
**Phase: OFFICER PORTAL — Data Wiring**

OfficerDashboard.razor + OfficerDashboard.razor.cs — wire real data:
1. Real complaints assigned to officer (from ComplaintRepository / AdminComplaintService filtered by officer userId)
2. GPS check-in backend: GpsService.RecordCheckIn() call from OfficerMobile.razor
3. OfficerPerformance.razor — wire real metrics from AdminComplaintService.GetOfficerPerformanceAsync()

Also check: Admin MainLayout.razor.css + NavMenu.razor.css — verify they only use CSS vars (no hardcoded colors), no action needed if clean.

---

## DECISIONS LOG
- 2026-04-15 A3 S3 FINAL: CSS UNIFICATION COMPLETE. public.js dead code removed: (1) top IIFE wiring #theme-toggle to body.classList.toggle (replaced by theme-toggle.js), (2) toggleTheme() function using body.classList, (3) IIFE applying body.classList.add('light-mode') on load. All pages audited — Public/Account pages use _Layout (inherit dcr-cmis.css), complaint pages same. OfficialLogin has standalone inline CSS (already uses data-theme correctly). No further CSS migration work needed.
- 2026-04-14 A3 S3: Login.cshtml + Official/Index.cshtml: glass-theme.css → dcr-cmis.css. Login.cshtml: html.light-mode → html[data-theme="light"]. Theme init script updated to setAttribute. Official/Index.cshtml JS was already correct.
- 2026-04-14 A2 S2: CSS Migration COMPLETE. All Blazor layouts now use dcr-cmis.css. NavMenu.razor.css + MainLayout.razor.css kept as Blazor scoped CSS (they use CSS vars, no migration needed).
- 2026-04-14 A2 S2: Rotation kit dcr-cmis.css synced from project (1513 lines = project master).
- 2026-04-14 A1 S1: KEEP old project, do NOT rebuild. Backend 90%+ complete.
- 2026-04-14 A1 S1: Single CSS file = dcr-cmis.css. Replaces glass-theme.css, admin.css, public.css, app.css.
- 2026-04-14 A1 S1: Theme switching via html[data-theme] attribute. Legacy body.light-mode also supported for backward compat.
- 2026-04-14 A1 S1: Light theme uses soft lavender-blue (#eef2ff base) NOT plain white.
- 2026-04-14 A1 S1: Theme toggle JS in theme-toggle.js. Use data-theme-toggle attribute on any button.
- 2026-04-14 A1 S1: Git-based rotation kit is the state transport mechanism.

## DO NOT CHANGE
- Backend (Domain, Application, Infrastructure, API) — fully stable
- EF Core migrations — do not add without explicit task
- JWT / OTP auth flow — working
- Complaint number format: "JHB-2026-XXXXXX"
- Default language: Hindi (hi), secondary: en-IN
- Jehanabad district seed data: 7 blocks, departments, police stations

---

## ROTATION KIT CONTENTS (v3)
| File | Purpose |
|------|---------|
| DCR-CMIS-ARCHITECT-BLUEPRINT.md | Master spec, domain model, build order |
| PROJECT_BRAIN.md (this file) | Session state, decisions, next task |
| dcr-cmis.css | Unified design system CSS |
| theme-toggle.js | Theme switching JS |
| session_start_prompt.txt | Paste at session start |
| session_end_prompt.txt | Paste near token limit |
| emergency_handoff_prompt.txt | Emergency only |
| SKILL.md | UI/UX design intelligence skill |

## HOW TO START A NEW SESSION
Paste session_start_prompt.txt, fill A[N] and S[N].
Claude will clone brain repo, read PROJECT_BRAIN.md, confirm state, then proceed.
Session end: paste session_end_prompt.txt, Claude pushes updated brain.
