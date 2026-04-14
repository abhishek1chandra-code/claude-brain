# PROJECT BRAIN — DCR-CMIS
## Status: ACTIVE
## Phase: UI-UNIFICATION + CSS-MASTER
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
├── DCR.CMIS.Web             🔄 IN PROGRESS (UI cleanup)
└── DCR.CMIS.API             ✅ COMPLETE
```

---

## COMPLETED (as of Checkpoint-31 + A3 S3)

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
- [x] Public/Index.cshtml — AUDIT COMPLETE (A3 S3): No inline <style>, @section Scripts is minimal (server-data only), Layout="_Layout" ✓, all JS in public.js ✓
- [x] Public/Account: Login, OfficialLogin, Register, Logout, MyComplaints, Profile, ChangePassword, Preferences
- [x] Public/Register: Mobile, VerifyOtp, Success
- [x] Public/ComplaintForm, Confirmation, EditComplaint, Track, Survey
- [x] ControlRoom/Index.cshtml + _Layout.cshtml (IVRS operator view)
- [x] Field/GpsReport.cshtml
- [x] Admin/Complaints/Import.cshtml

### Web / Blazor Pages (DONE)
- [x] Admin: AdminDashboard, ComplaintList, ComplaintDetail, UserList, DepartmentList, OfficialApproval, Reports, AuditLog, IvrsConfig, IvrsCallLog, LocalBodies, PoliceStations, RevenueVillages, ShiftList, ShiftCalendar, ShiftHandoverLog, ShiftSwapRequests, DutyAttendance, EscalationRequests, GpsCheckInHistory, Manpower, SystemConfig, OtpSettings, WorkEvents, NotificationLog, AdminBroadcast, GisMap, _Reports/OfficerLoad, _Reports/OfficerPerformance
- [x] ControlRoom: CrDashboard, CrComplaintQueue, CrCallManagement, CrDialpad, CrIvrsFlow, CrOfficerStatus, CrShiftHandover
- [x] Magistrate: MagDashboard, MagComplaints, MagComplaintDetail, MagDeployment, MagGpsCheckin, SituationReport
- [x] Officer: OfficerDashboard, OfficerMobile, OfficerPerformance
- [x] Police: PoliceDashboard
- [x] Layouts: AdminLayout, CrLayout, MagistrateLayout, OfficerLayout, PoliceLayout
- [x] Shared: PaginationBar, DistrictMap (Leaflet)

### CSS (COMPLETE)
- [x] dcr-cmis.css — UNIFIED master CSS (1513 lines, in rotation kit + /tmp/brain/)
- [x] theme-toggle.js — localStorage + OS preference + tab-sync + Blazor re-render support
- [x] All Blazor layouts migrated (A1 S1 + A2 S2)
- [x] All _Layout.cshtml files migrated (A1 S1)
- [x] App.razor migrated (A1 S1)

### CSS Migration — Standalone Pages (COMPLETE A3 S3)
- [x] Public/Account/Login.cshtml: glass-theme.css → dcr-cmis.css; html.light-mode → html[data-theme="light"]; inline script updated to setAttribute('data-theme',...)
- [x] Official/Index.cshtml: glass-theme.css → dcr-cmis.css (JS already used data-theme correctly — no further changes)
- [x] No other glass-theme.css / admin.css refs found anywhere (grep confirmed)

---

## IN PROGRESS — NONE

---

## NEXT SESSION
**public.js cleanup + remaining Public account pages audit:**
- public.js: Remove dead `toggleTheme()` function (uses old body.classList approach — Index page now uses data-theme-toggle attribute + theme-toggle.js). Replace with no-op or remove entirely.
- public.js: Remove dead IIFE at bottom: `(function(){ if(localStorage.getItem('dcr-theme')==='light') document.body.classList.add('light-mode'); })();`
- Audit remaining Public/Account pages (OfficialLogin, Register, Logout, MyComplaints, Profile, ChangePassword, Preferences) for any glass-theme.css / admin.css / html.light-mode refs
- Audit Public/ComplaintForm, Confirmation, EditComplaint, Track, Survey for same
- After all above: declare CSS UNIFICATION COMPLETE, update Phase to NEXT_PHASE (TBD from ARCHITECT-BLUEPRINT)

---

## DECISIONS LOG
- 2026-04-14 A3 S3: Login.cshtml + Official/Index.cshtml: glass-theme.css → dcr-cmis.css. Login.cshtml: html.light-mode → html[data-theme="light"] across all inline CSS selectors. Theme init script updated: classList.add('light-mode') → setAttribute('data-theme','light'/'dark'). Official/Index.cshtml JS was already correct (data-theme). Grep confirmed zero remaining glass-theme/admin.css refs in .razor/.cshtml files.
- 2026-04-14 A3 S3: Public/Index.cshtml AUDITED — already fully clean. No inline <style>, minimal @section Scripts (server JSON vars + C# conditionals only), Layout="_Layout" set, all JS functions in public.js. No action needed.
- 2026-04-14 A2 S2: CSS Migration COMPLETE. All Blazor layouts now use dcr-cmis.css. MagistrateLayout: removed C# theme state, now uses data-theme-toggle (JS-driven). NavMenu.razor.css + MainLayout.razor.css kept as Blazor scoped CSS (they use CSS vars, no migration needed).
- 2026-04-14 A2 S2: Rotation kit dcr-cmis.css synced from project (1513 lines = project master).
- 2026-04-14 A1 S1: KEEP old project, do NOT rebuild. Backend 90%+ complete.
- 2026-04-14 A1 S1: Single CSS file = dcr-cmis.css. Replaces glass-theme.css, admin.css, public.css, app.css.
- 2026-04-14 A1 S1: Theme switching via html[data-theme] attribute (modern standard). Legacy body.light-mode also supported for backward compat.
- 2026-04-14 A1 S1: Light theme uses soft lavender-blue (#eef2ff base) NOT plain white — maintains premium government portal aesthetic.
- 2026-04-14 A1 S1: Theme toggle JS in theme-toggle.js (separate from site.js). Use data-theme-toggle attribute on any button.
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
| dcr-cmis.css | Unified design system CSS (NEW in A1 S1) |
| theme-toggle.js | Theme switching JS (NEW in A1 S1) |
| session_start_prompt.txt | Paste at session start |
| session_end_prompt.txt | Paste near token limit |
| emergency_handoff_prompt.txt | Emergency only |
| SKILL.md | UI/UX design intelligence skill |

## HOW TO START A NEW SESSION
Paste session_start_prompt.txt, fill A[N] and S[N].
Claude will clone brain repo, read PROJECT_BRAIN.md, confirm state, then proceed.
Session end: paste session_end_prompt.txt, Claude pushes updated brain.
