# PROJECT BRAIN — DCR-CMIS
## Status: ACTIVE
## Phase: UI-UNIFICATION + CSS-MASTER
## Repo: abhishek1chandra-code/claude-brain
## Last checkpoint: Checkpoint-30 (April 13-14, 2026)
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

## COMPLETED (as of Checkpoint-30)

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
- [x] Public/Index.cshtml — Citizen portal SPA (94KB, works but bloated — NEEDS REFACTOR)
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

### CSS (COMPLETED THIS SESSION — A1 S1)
- [x] dcr-cmis.css — UNIFIED master CSS (replaces all below)
  - Dark theme (default): :root / html[data-theme="dark"]
  - Light theme: html[data-theme="light"] + legacy body.light-mode
  - Sections: tokens, orbs, app shell, sidebar (grid+fixed variants), topbar, theme toggle, content, page header, glass components, stat cards, filter pills, tables, badges, buttons, forms, modals, alerts, charts, pagination, citizen portal, admin-specific, Blazor overrides, notice board, situation report, utilities, responsive, print
- [x] theme-toggle.js — localStorage + OS preference + tab-sync + Blazor re-render support

---

## IN PROGRESS

### CSS Migration (needs to be done in next session with VS Code / project)
Apply the new dcr-cmis.css to project:
1. Copy dcr-cmis.css → DCR.CMIS.Web/wwwroot/css/dcr-cmis.css
2. Copy theme-toggle.js → DCR.CMIS.Web/wwwroot/js/theme-toggle.js
3. Delete: admin.css, admin.css.bak, public.css.bak, app.css, public.css
4. In all _Layout.cshtml files: replace CSS links with <link rel="stylesheet" href="/css/dcr-cmis.css"/>
5. In NavMenu.razor.css: move any unique rules into dcr-cmis.css, delete the file
6. In MainLayout.razor.css: same
7. In all layouts + App.razor: add <script src="/js/theme-toggle.js"></script> before </body>
8. In each topbar/header: add <button class="theme-toggle-btn ib" data-theme-toggle aria-label="Toggle theme"></button>
9. Remove body.light-mode JS references, use window.dcrTheme.toggle() instead

---

## NEXT SESSION (A1 S2 or A2 S1)
Apply CSS migration listed above to the actual project files, then tackle:
**Public/Index.cshtml refactor** — strip Layout=null, slim from 94KB to ~20KB by:
- Move inline <style> blocks to dcr-cmis.css sections
- Move inline <script> to public.js
- Use proper _Layout.cshtml

---

## DECISIONS LOG
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
