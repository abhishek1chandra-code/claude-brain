> **⚠️ SUPREME RULE (overrides ALL other rules, no exceptions):** When any file needs editing — DELETE the file and write a complete new file from scratch. Never use str_replace or partial edits on any file.

# DCR-CMIS MASTER CONTEXT — v4
## Single Upload. Full Context. Zero Tool Calls.

> **Instructions for Claude (new session):** This is the single source of truth. Read it fully before taking any action. You are the Chief Architect and UI/UX expert. Build from this. Do not ask for clarification unless a decision has two valid technical paths. Prefer depth, precision, and production-grade craftsmanship over speed.

---

---

# PART 0 — SESSION OUTPUT CONTRACT (ENFORCED)

> **Claude: Read this before anything else. Violating these rules = failed session.**

## MANDATORY END-OF-SESSION CHECKLIST
Before writing any handoff text, Claude MUST call `present_files` for ALL of these:

1. ✅ **Project ZIP** — `DCR-CMIS-CHECKPOINT-A[N]S[N].zip` (repackaged from `/tmp/checkpoint/`)
2. ✅ **Master Context MD** — `DCR-CMIS-MASTER-CONTEXT-v4.md` (updated with session changes)

**These are NON-NEGOTIABLE outputs. No exceptions. No "I pushed to brain" substitution.**

## WHY THIS RULE EXISTS (failure post-mortem A4S4)
- Session A4S4 completed all work but NEVER called `present_files` for either output
- Zip existed at `/tmp/DCR-CMIS-CHECKPOINT-A4S4.zip` — never surfaced to user
- Master context was updated in brain repo — never copied to `/mnt/user-data/outputs/`
- Root cause: no hard checklist; brain push felt like "done" — it was not
- User had to ask for files manually in next message — wasted session time

## ENFORCEMENT RULES (Claude must follow)

### RULE 1 — Build zip EARLY
As soon as all file edits are done (before brain push), run:
```bash
cd /tmp && zip -r DCR-CMIS-CHECKPOINT-A[N]S[N].zip checkpoint/ -x "*.DS_Store"
cp DCR-CMIS-CHECKPOINT-A[N]S[N].zip /mnt/user-data/outputs/
```

### RULE 2 — Update master context BEFORE brain push
Patch Part 1 (phase, checkpoint, completed, next session) in master context.
Copy to outputs: `cp /tmp/brain/DCR-CMIS-MASTER-CONTEXT-v4.md /mnt/user-data/outputs/`

### RULE 3 — Call present_files BEFORE handoff text
```
present_files([
  "/mnt/user-data/outputs/DCR-CMIS-CHECKPOINT-A[N]S[N].zip",
  "/mnt/user-data/outputs/DCR-CMIS-MASTER-CONTEXT-v4.md"
])
```
This call MUST happen. The session is not complete until present_files is called.

### RULE 4 — Token budget awareness
At ~60% context: finish current task, skip non-critical work, go straight to outputs.
At ~70% context: STOP feature work. Package + present_files + push. Nothing else.

### RULE 5 — Session end sequence (fixed order)
1. Complete task / partial task
2. `zip` checkpoint → copy to outputs
3. Update master context → copy to outputs  
4. `present_files` both ← **cannot be skipped**
5. Brain push (PROJECT_BRAIN.md)
6. Handoff text

---

# PART 1 — SESSION STATE (PROJECT BRAIN)

## Status: ACTIVE
## Phase: INDEX REFACTOR COMPLETE → ADMIN PORTAL AUDIT NEXT
## Repo: abhishek1chandra-code/claude-brain
## Last Checkpoint: A10S1 (April 15, 2026)
## Account Rotation: A1→A2→A3…A10→A1 (4hr cooldown each)

---

## SOLUTION STRUCTURE & STATUS
```
DCR.CMIS.sln
├── DCR.CMIS.Domain          ✅ COMPLETE — DO NOT TOUCH
├── DCR.CMIS.Application     ✅ COMPLETE — DO NOT TOUCH
├── DCR.CMIS.Infrastructure  ✅ COMPLETE — DO NOT TOUCH
├── DCR.CMIS.Web             🔄 IN PROGRESS (build fix + UI cleanup)
└── DCR.CMIS.API             ✅ COMPLETE — DO NOT TOUCH
```

---

## COMPLETED (as of Checkpoint-31)

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
- [x] Public/Index.cshtml — Citizen portal SPA (677 lines — NEEDS BUILD FIX + REFACTOR)
- [x] Public/Account: Login, OfficialLogin, Register, Logout, MyComplaints, Profile, ChangePassword, Preferences
- [x] Public/Register: Mobile, VerifyOtp, Success
- [x] Public/ComplaintForm, Confirmation, EditComplaint, Track, Survey
- [x] ControlRoom/Index.cshtml + _Layout.cshtml (IVRS operator view)
- [x] ControlRoom/Index.cshtml.cs — MockIvrsCalls removed; real IvrsCallLog query via AppDbContext (A5S1)
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
- [x] dcr-cmis.css — UNIFIED master CSS (replaces all old CSS files)
  - Dark theme (default): `:root` / `html[data-theme="dark"]`
  - Light theme: `html[data-theme="light"]` + legacy `body.light-mode`
  - Sections: tokens, orbs, app shell, sidebar (grid+fixed variants), topbar, theme toggle, content, page header, glass components, stat cards, filter pills, tables, badges, buttons, forms, modals, alerts, charts, pagination, citizen portal, admin-specific, Blazor overrides, notice board, situation report, utilities, responsive, print
  - 1513 lines (Rotation Kit dcr-cmis.css = project master)
- [x] theme-toggle.js — localStorage + OS preference + tab-sync + Blazor re-render support

### CSS Migration (COMPLETE — A2 S2)
- [x] CrLayout.razor: → dcr-cmis.css
- [x] MagistrateLayout.razor: → dcr-cmis.css; removed C# ToggleTheme; replaced with data-theme-toggle button
- [x] OfficerLayout.razor: → dcr-cmis.css
- [x] PoliceLayout.razor: → dcr-cmis.css
- [x] AdminLayout.razor: already on dcr-cmis.css (A1 S1)
- [x] App.razor: already on dcr-cmis.css + theme-toggle.js (A1 S1)
- [x] NavMenu.razor.css: KEPT (Blazor ::deep scoped, uses CSS vars — no migration needed)
- [x] MainLayout.razor.css: KEPT (structural only, uses CSS vars — no migration needed)

---

## ✅ TODO — NEXT SESSION: A11S1 — Admin Portal Audit (Remaining Pages)

### A10S1 COMPLETED
- [x] **Public/Index.cshtml refactor — `@section Scripts` cleaned:**
  - No `<style>` blocks existed in Index.cshtml (only inline `style=""` attributes on elements — correct, no migration needed)
  - Extracted OTP countdown timer logic to `initOtpCountdown(total, resendLock)` in `public.js`
  - Extracted login-mode post-error restore to `restoreLoginMode(btnId)` in `public.js`
  - Inline `@section Scripts` reduced to 4 lines: 2 Razor data injections + 2 conditional function calls
  - Removed 2 stale empty `{}` blocks from `public.js`
  - SPA tab behavior verified: `setLoginMode` / `showRegister` / `showLogin` / `slideToStep` all correctly wired via `onclick` attrs — no issues
- [x] **Blazor CSS sweep — CLEAN:** Zero `glass-theme.css` or `admin.css` references anywhere in codebase

### A9S1 COMPLETED
- [x] **Build errors verified ALREADY FIXED** — All previously logged errors (Index.cshtml missing props, _Layout.cshtml Razor errors, FieldController null ref, CS0109 warnings) were resolved in the A8S1 zip. No further action needed.
- [x] **Blazor audit batch 2 — all 5 pages verified:**
  - `IvrsCallLog.razor` ✅ real DB via `IIvrsService.GetRecentCallsAsync` + **FIXED: added caller/status/date filters + 20-per-page pagination** (was hardcoded 200, no filter)
  - `EscalationRequests.razor` ✅ real EF query + **FIXED: `_loading=false` moved to `finally` block** + `_error` display added
  - `GisMap.razor` ✅ real GPS data via `/api/gis/live-officers` — Jehanabad coords correct
  - `SystemConfig.razor` ✅ full real CRUD via `ISystemConfigService`
  - `OtpSettings.razor` ✅ full real CRUD via `ISystemConfigService`

### NEXT: A11S1 — Admin Portal Audit (Remaining Pages)
Pages to audit (verify real-service-wired, no mock data):
1. `IvrsConfig.razor` — verify `IIvrsConfigService.GetConfigAsync()` / `SaveConfigAsync()`
2. `LocalBodies.razor` — verify real DB queries
3. `PoliceStations.razor` — verify real DB queries
4. `RevenueVillages.razor` — verify real DB queries
5. `ShiftList.razor` / `ShiftCalendar.razor` — verify `IShiftService` calls
6. `Manpower.razor` — verify `IDeputedPersonnelService` / `IWorkEventService`
7. `GpsCheckInHistory.razor` — verify `IGpsService` calls

---

## DECISIONS LOG
- **2026-04-15 A10S1:** Index.cshtml @section Scripts refactored. Extracted `initOtpCountdown(total, resendLock)` and `restoreLoginMode(btnId)` into public.js. Inline block now 4 lines (data-only). SPA tabs verified clean. Blazor CSS sweep: zero stale glass-theme.css/admin.css refs. Brain now updated from A7S1 → A10S1 (A8S1/A9S1 pushes were missed — state carried via zip + master context).
- **2026-04-15 A9S1:** Blazor audit batch 2 complete. All 5 pages verified real-wired. Two fixes applied: (1) IvrsCallLog.razor — added caller/status/date filters + 20-per-page pagination (loads 500 records client-side via `GetRecentCallsAsync(500)`); (2) EscalationRequests.razor — `_loading=false` moved to `finally` block (was missing from catch, causing infinite spinner on DB error) + added `_error` string for user-facing error message. GisMap/SystemConfig/OtpSettings all clean.
- **2026-04-15 A9S1:** All previously logged build errors confirmed ALREADY FIXED in A8S1 zip — removed from TODO.
- **2026-04-15 A8S1:** ZIP packaging root cause diagnosed and fixed — nested `checkpoint/checkpoint/checkpoint/checkpoint/` structure caused `dotnet restore` failure since deploy script only unwraps one `checkpoint/` level. A8S1 zip uses single wrapper. Brain push was interrupted at session limit; master context updated manually.
- **2026-04-15 A8S1:** Blazor audit batch 1 complete: Reports.razor (ExportCsv real API nav + dead injection removed), AuditLog.razor.cs (badge tokens fixed), DepartmentList.razor (real userId + stale count fix), GetJobAsync added to IExcelImportService. Track.cshtml.cs verified real-wired.
- **2026-04-15:** Build failure logged as TODO for next session. Build errors are in Public/Index.cshtml (missing model properties + Razor syntax), Public/_Layout.cshtml (malformed Razor), API/FieldController.cs (nullable), and several Blazor pages (unused ex variable, new keyword warning).
- **2026-04-14 A2 S2:** CSS Migration COMPLETE. All Blazor layouts now use dcr-cmis.css. MagistrateLayout: removed C# theme state, now uses data-theme-toggle (JS-driven). NavMenu.razor.css + MainLayout.razor.css kept as Blazor scoped CSS (they use CSS vars, no migration needed).
- **2026-04-14 A2 S2:** Rotation kit dcr-cmis.css synced from project (1513 lines = project master).
- **2026-04-14 A1 S1:** KEEP old project, do NOT rebuild. Backend 90%+ complete.
- **2026-04-14 A1 S1:** Single CSS file = dcr-cmis.css. Replaces glass-theme.css, admin.css, public.css, app.css.
- **2026-04-14 A1 S1:** Theme switching via `html[data-theme]` attribute (modern standard). Legacy `body.light-mode` also supported for backward compat.
- **2026-04-14 A1 S1:** Light theme uses soft lavender-blue (#eef2ff base) NOT plain white — maintains premium government portal aesthetic.
- **2026-04-14 A1 S1:** Theme toggle JS in theme-toggle.js (separate from site.js). Use `data-theme-toggle` attribute on any button.
- **2026-04-14 A1 S1:** Git-based rotation kit is the state transport mechanism.

## DO NOT CHANGE — EVER
- Backend (Domain, Application, Infrastructure, API) — fully stable
- EF Core migrations — do not add without explicit task
- JWT / OTP auth flow — working
- Complaint number format: `"JHB-2026-XXXXXX"`
- Default language: Hindi (`hi`), secondary: `en-IN`
- Jehanabad district seed data: 7 blocks, departments, police stations

---

## SESSION PROMPTS (for reference — no need to use these now, file replaces them)

**Session Start:**
```
You are continuing DCR-CMIS. Account [A_N], Session [S_N].
Upload: this MD file + project zip. Read Part 1 state → confirm phase → fix build errors first (Part 1 TODO) → then proceed to next tasks.
```

**Session End:**
```
Update PROJECT_BRAIN section of this MD file with: COMPLETED (this session), IN PROGRESS (partial), NEXT SESSION (exact task), DECISIONS LOG. Push updated kit.
```

**Emergency Handoff:**
```
EMERGENCY. Read this MD file Part 1. NEXT SESSION task = [what was interrupted]. Continue immediately.
```

---

# PART 2 — ARCHITECT BLUEPRINT

## Project Identity

| Item | Value |
|---|---|
| Full Name | District Control Room – Citizen Management & Information System |
| Abbreviation | DCR-CMIS |
| Primary District | Jehanabad, Bihar, India |
| Scalability Mandate | Any district in Bihar (configurable) |
| Purpose | Military-grade-secure, ultra-modern e-governance portal replacing manual complaint, application, and grievance workflows for district administration |
| Languages | Hindi (default, `hi`) + English (`en-IN`) |
| Control Number (IVRS) | 1920 |

---

## Design Mandate — NON-NEGOTIABLE

### Glassmorphism at Maximum Depth
Every surface MUST embody deepest glassmorphism:
- `backdrop-filter: blur(18px–40px)` on every card, panel, modal, sidebar, nav
- **Multi-layered transparency**: outer glass shell (`rgba(255,255,255,0.08)`) → inner glass platter (`rgba(255,255,255,0.14)`) → content area (`rgba(255,255,255,0.04)`)
- `border: 1px solid rgba(255,255,255,0.18)` with `box-shadow: 0 8px 32px rgba(0,0,0,0.37)`
- Background: Rich CSS gradient mesh (linear-gradient + radial-gradient layers in deep navy/indigo/teal/slate). **NEVER hardcode image file paths that don't exist.**
- Depth illusion: `transform: translateZ` and layered pseudo-elements for "floating platter" feel
- Consistent CSS custom property design token system in `dcr-cmis.css`

### SPA-Feel Architecture (Partial Page Updates)
- **Static sidebar** — never reloads
- **Main content `<div>`** is the only DOM region that gets swapped
- Use `fetch()` API to pull JSON data and reconstruct DOM inside main content area — page MUST NOT fully reload on menu navigation
- Active menu item state preserved; sidebar stays intact
- Smooth CSS transitions on content swap (`opacity` fade + slight `translateY`)

### Sidebar — Retractable with Lock/Unlock
- Toggle pin button (🔒/🔓 icon)
- **Unlocked (auto)**: collapses to icon-only on content focus, expands on hover
- **Locked (expanded)**: stays fully expanded
- State persisted in `localStorage`
- On mobile: sidebar becomes bottom-sheet drawer

### Maximum Screen Area Utilization
- No decorative wasted space. Forms spread fields across full width in multi-column grids (`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`)
- Minimum scroll on all data-entry forms
- Responsive: 320px mobile → 4K desktop → tablet landscape/portrait
- Ready for Android/iOS app wrapping (clean API, PWA manifest)

### Uniform Design Language Across ALL Role Portals
Every login context (Citizen, Official, Admin, Control Room, Magistrate, Police) MUST use:
- Same CSS design token set (dcr-cmis.css)
- Same glass component library
- Same Sidebar + main-content SPA shell
- Same Topbar with role badge, notification bell, language toggle, avatar

---

## Technology Stack

### Backend
| Layer | Technology |
|---|---|
| Framework | ASP.NET Core 8.0 |
| Primary UI | Razor Pages (cshtml) — Citizen & Control Room portals |
| Component UI | Blazor Server — Admin, Magistrate, Officer component pages |
| ORM | Entity Framework Core 8 + Npgsql (PostgreSQL) |
| Database | PostgreSQL (snake_case table naming via EFCore.NamingConventions) |
| Auth | ASP.NET Core Identity + JWT Bearer (access 15 min / refresh 7 days) |
| Real-time | SignalR (3 hubs: ComplaintHub, NotificationHub, DashboardHub) |
| Background Jobs | Hangfire (PostgreSQL backend) |
| PDF Generation | QuestPDF |
| Excel Export | ClosedXML |
| Excel Import | ExcelDataReader |
| Email | MailKit (SMTP) |
| SMS | Vonage (formerly Nexmo) / Twilio fallback |
| IVRS | FreeSWITCH via ESL TCP (port 8021) |
| Localization | .resx resource files (hi + en-IN) |
| GIS | Leaflet.js via JavaScript interop |
| Caching | IMemoryCache |
| Audit | Custom AuditInterceptor on EF SaveChanges |

### Project Structure (Clean Architecture, 4+1 projects)
```
DCR.CMIS.sln
├── DCR.CMIS.Domain          → Entities, Enums, Interfaces (no dependencies)
├── DCR.CMIS.Application     → DTOs, Interfaces (contracts only)
├── DCR.CMIS.Infrastructure  → EF Core, Services, Identity, Jobs, Reports, IVRS
├── DCR.CMIS.Web             → Razor Pages + Blazor Server (presentation)
└── DCR.CMIS.API             → REST API (for mobile app & IVRS webhooks)
```

### Key NuGet Packages
```xml
<!-- Infrastructure -->
QuestPDF 2024.3.4
ClosedXML 0.102.2
ExcelDataReader 3.7.0
Hangfire.Core 1.8.14
Hangfire.PostgreSql 1.20.9
MailKit 4.3.0
Vonage 7.1.2
Npgsql.EntityFrameworkCore.PostgreSQL 8.0.11
Microsoft.AspNetCore.Authentication.JwtBearer 8.0.13
Microsoft.AspNetCore.Identity.EntityFrameworkCore 8.0.13
EFCore.NamingConventions 8.0.0

<!-- Web -->
Hangfire.AspNetCore 1.8.14
Microsoft.AspNetCore.SignalR.Client 8.0.13
```

---

## Domain Model — All Entities

### Core Enums (in `DCR.CMIS.Domain/Enums/AllEnums.cs`)
```csharp
UserRole         { Admin=1, ControlRoom=2, Officer=3, Public=4, Magistrate=5, PoliceOfficer=6 }
ComplaintStatus  { Registered, Forwarded, UnderInvestigation, ActionTaken, Resolved, Closed, Reopened, Escalated }
ComplaintCategory{ LawAndOrder, Infrastructure, SanitationWater, ElectricityPower, HealthMedical, RevenueProperty, DisasterRelief, Other, SOS }
ComplaintSource  { IvrsCall, WebPortal, WalkIn, MobileApp, ManualEntry }
SlaLevel         { Normal(72h), Urgent(24h), Critical(6h) }
EscalationLevel  { None, FirstEscalation, SecondEscalation, FinalEscalation }
ComplaintPriority{ Low, Normal, High, Critical }
EscalationRequestStatus { Pending, Acknowledged, Rejected }
EventType        { Festival, Election, ExamDuty, VIPVisit, CommunalSensitive, NaturalDisaster, Other }
DutyType         { LawOrderMagistrate, ExecutiveMagistrate, LawOrderCoordinator, SectorMagistrate }
ForceType        { DistrictPolice, PAC, CRPF, SSB, RAF, HomeGuard }
CallStatus       { Ringing, Answered, OnHold, Transferred, Merged, Disconnected, Missed }
ShiftType        { Morning, Afternoon, Night }
SituationStatus  { AllPeaceful, MinorIncident, ActiveIncident, SOS }
NoticeSeverity   { Info, Warning, Critical }
// Separate files:
AreaType         { Urban, Rural }
IdDocumentType   { Aadhaar, VoterId, DrivingLicense, Passport, Other }
LocalBodyType    { NagarPanchayat, NagarParishad, NagarNigam, GramPanchayat }
```

### AppUser (extends IdentityUser<int>)
```csharp
FullName, FullNameHi, MobileNumber, Designation
DepartmentId → Department
UserRole (enum)
IsActive, LastLoginAt, ProfilePhotoUrl
PreferredLanguage (default "hi")
RefreshToken, RefreshTokenExpiry
Gender, DateOfBirth, Address
IdType (IdDocumentType?), IdNumber, IdTypeOther
IsApprovedByAdmin, RejectionReason
SmsNotificationsEnabled, EmailNotificationsEnabled
CreatedAt, UpdatedAt, IsDeleted
→ ICollection<Complaint> Complaints
→ ICollection<ShiftAssignment> ShiftAssignments
```

### Complaint (Central Aggregate)
```csharp
Id, ComplaintNumber (system-generated, e.g. "JHB-2026-000123")
Description, CitizenName, MobileNumber, Email, Address
District (default: "Jehanabad"), Latitude, Longitude
AreaType, BlockName
LocalBodyId → LocalBody, WardId → Ward, WardNoManual
RevenueVillageId → RevenueVillage
MohallaName, TolaName, Landmark, Pincode
PoliceStationId → PoliceStation
Status (ComplaintStatus), Category, Source
SlaLevel, EscalationLevel, SlaDeadline
Priority (ComplaintPriority), IsSlaBreached
RegisteredAt, AssignedAt, ResolvedAt, ClosedAt, ReopenCount
DepartmentId → Department
AssignedOfficerId → AppUser
CitizenUserId → AppUser
IsPubliclyVisible, CreatedAt, UpdatedAt, IsDeleted
→ ICollection<ComplaintStatusLog> StatusLogs
→ ICollection<ComplaintAttachment> Attachments
```

### All Other Entities
- **ComplaintStatusLog**: ComplaintId, Status, Remarks, UpdatedByUserId, Source
- **ComplaintAttachment**: ComplaintId, FilePath, FileName, FileSize, UploadedAt
- **ComplaintNote**: ComplaintId, NoteText, CreatedByUserId, Source (internal)
- **ComplaintFeedback**: ComplaintId, SpeedRating, HelpfulnessRating, ResolutionRating, CommunicationRating, Comments
- **ComplaintReassignmentLog**: ComplaintId, PreviousOfficerId, NewOfficerId, ReassignedByUserId, Reason
- **EscalationRequest**: ComplaintId, CitizenUserId, Reason, Status, ReviewedByUserId
- **Department**: Name, NameHi, Code, HeadOfficerName, ContactEmail, ContactPhone, IsActive
- **WorkEvent**: EventName, Description, EventType, StartDate, EndDate, Location, SensitivityLevel, IsActive
- **DeputedMagistrate**: WorkEventId, Name, Designation, OfficeName, MobileNumber, AppUserId, DeploymentLocation, DutyType, ReportingToId, GpsMandatory, IsReserve, IsActive, ActivatedAt, ActivatedByUserId
- **DeputedPoliceOfficer**: WorkEventId, Name, Rank, BadgeNumber, MobileNumber, AppUserId, ForceType, PoliceStationId, DeploymentLocation, IsActive
- **ReservePersonnel**: WorkEventId, Name, Designation, MobileNumber, ForceType, IsAvailable
- **GpsCheckIn**: UserId, WorkEventId, Latitude, Longitude, Accuracy, SituationStatus, IsSos, CheckedInAt, DeputedMagistrateId, DeputedPoliceOfficerId
- **IvrsCallLog**: UniqueCallId, CallerNumber, Extension, Status, StartTime, EndTime, DurationSeconds, RecordingUrl, DtmfInputs, ComplaintId
- **OtpRequest**: MobileNumber, Otp (hashed), Purpose, IsUsed, ExpiresAt, Attempts
- **NotificationLog**: UserId, Title, Body, Channel (SMS/Email/Push), IsDelivered, SentAt
- **Shift**: Name, ShiftType, ShiftStart (TimeSpan), ShiftEnd (TimeSpan)
- **ShiftAssignment**: ShiftId, UserId, Date, IsHandoverDone, HandoverNotes, HandoverAt
- **ShiftSwapRequest**: RequestingUserId, TargetUserId, ShiftAssignmentId, Reason, Status, ReviewedByUserId
- **PoliceStation**: Name, Code, BlockName, OfficerInCharge, MobileNumber, IsActive
- **PoliceStationBlockMapping**: PoliceStationId, BlockName
- **LocalBody**: Name, Type (LocalBodyType), BlockName, IsActive
- **Ward**: LocalBodyId, WardNumber, WardName
- **RevenueVillage**: Name, BlockName, PoliceStationId
- **SituationReport**: WorkEventId, MagistrateId, Status (SituationStatus), Notes, ReportedAt, AttachmentPath
- **BeatReport**: OfficerId, WorkEventId, Location, Notes, Latitude, Longitude, ReportedAt, AttachmentPath
- **DutyReport**: OfficerId, WorkEventId, ReportText, AttachmentPath, ReportedAt
- **OfficerTask**: AssignedToUserId, AssignedByUserId, ComplaintId, Title, Description, DueAt, IsCompleted, CompletedAt, LastReminderSentAt
- **CitizenSurvey**: ComplaintId, CitizenUserId, SpeedRating, HelpfulnessRating, ResolutionRating, CommunicationRating, Comments, SubmittedAt
- **NoticeBoard**: Title, Body, Severity (NoticeSeverity), IsActive, CreatedByUserId, ExpiresAt → ICollection<NoticeBoardAttachment>
- **NoticeBoardAttachment**: NoticeBoardId, FilePath, FileName
- **BroadcastLog**: SentByUserId, Message, TargetRole, SentAt, RecipientCount
- **AuditLog**: EntityName, EntityId, Action, OldValues (JSON), NewValues (JSON), UserId, Timestamp, IpAddress
- **ExcelImportJob**: FileName, Status, TotalRows, ProcessedRows, ErrorLog, StartedAt, CompletedAt
- **SystemConfig**: Key (unique), Value, Description, UpdatedAt

---

## Application Layer — Service Interfaces

All interfaces in `DCR.CMIS.Application/Interfaces/`:

### IAdminComplaintService
- `GetPagedAsync(ComplaintFilterDto)` → `PagedResult<ComplaintSummaryDto>`
- `GetDetailAsync(int id)` → `ComplaintDetailDto`
- `UpdateStatusAsync(AdminComplaintActionDto, userId)`
- `EscalateAsync(EscalateComplaintDto, userId)`
- `BulkUpdateStatusAsync(ids, status, userId)` / `BulkAssignAsync` / `BulkSetPriorityAsync`
- `SetPriorityAsync` / `SetSlaDeadlineAsync`
- `ExportToCsvAsync(filter)` / `ExportToXlsxAsync(filter)`
- `GetDashboardKpiAsync()` → `DashboardKpiDto`
- `GetCategoryBreakdownAsync(days)` / `GetOfficerLoadAsync()` / `GetOfficerPerformanceAsync()`
- `GetSurveyAveragesAsync()` / `GetSlaWarningCountAsync()` / `GetDailyTrendAsync(days)`
- `BulkAddNoteAsync` / `LogReassignmentAsync` / `GetReassignmentLogsAsync`

### IComplaintRepository
- `CreateAsync`, `GetByIdAsync`, `GetByComplaintNumberAsync`, `GetPagedAsync`
- `UpdateStatusAsync(int id, ComplaintStatus status, string remarks, int updatedByUserId)`
- `AssignOfficerAsync`, `ReopenAsync`, `GetByMobileAsync`

### ISlaService
- `CalculateDeadline(SlaLevel, registeredAt)` → DateTime
- `IsBreached(deadline)` → bool
- `GetBreachedComplaintsAsync()`, `EscalateAsync(complaintId, level)`

### SLA Thresholds
| Level | First Escalation | Second | Final/Breach |
|---|---|---|---|
| Normal | 48h | 66h | 72h |
| Urgent | 12h | 20h | 24h |
| Critical | 3h | 5h | 6h |

### IIvrsService
- `IsConnectedAsync()` — TCP probe to FreeSWITCH ESL port 8021
- `GetQueueCountAsync()` — ESL `api calls_count` command
- `LogCallAsync(callerNumber, dtmfResponse, callStatus, durationSeconds)`
- Pushes SignalR events to `cr-dashboard` group on call log

### IIvrsConfigService
- `GetConfigAsync()` / `SaveConfigAsync(IvrsConfigDto)` / `TestConnectionAsync()`
- **Default DTMF Menu**: 1→Register, 2→Track, 3→Transfer to Operator, 4→Repeat

### Other Interfaces
- `IAuthService`: JWT + Refresh token, OTP generation, role-based token claims
- `IShiftService`: shifts, assignments, handover, swap requests
- `IDeputedPersonnelService`: magistrate/police deputation CRUD + GPS
- `IGpsService`: `RecordCheckInAsync`, `GetActiveDeploymentLocationsAsync`, `GetLastCheckInAsync`
- `IWorkEventService`: event CRUD + deputation status
- `IReportService`: PDF/XLSX report generation
- `IComplaintPdfService`: encrypted barcode receipt generation
- `INotificationService`: SMS + Email dispatch + log
- `IUserManagementService`: user CRUD, approval, role assignment
- `IDepartmentService`, `IGisService`, `IExcelImportService`, `IAuditService`, `ISystemConfigService`

---

## Background Jobs (Hangfire)

| Job | Schedule | Purpose |
|---|---|---|
| `SlaMonitorJob` | Every 30 min | Escalate complaints approaching SLA breach |
| `ComplaintAutoAssignJob` | Every 5 min | Auto-assign unassigned complaints |
| `ComplaintAutoCloseJob` | Daily | Auto-close resolved complaints after 30 days |
| `ShiftHandoverJob` | Shift boundary | Auto-trigger handover workflow |
| `GpsCheckInReminderJob` | Every 60 min | Remind active deputed officers to GPS check-in |
| `OfficerTaskReminderJob` | Periodic | Remind officers of overdue tasks |

---

## SignalR Hubs

| Hub | Group / Purpose |
|---|---|
| `ComplaintHub` | `cr-dashboard` — real-time complaint queue updates |
| `NotificationHub` | Per-user — push notifications |
| `DashboardHub` | Admin KPI updates, live complaint count changes |

---

## Portal Structure — Pages & Routes

### Public Citizen Portal (`/Public/`)

**Citizen Landing + Login Page (`/Public/Index`):**
- Full-width dynamic notice board (animated ticker + card grid, severity color-coded)
- Auth Panel SPA tabs:
  - Tab 1: OTP Login (Mobile → OTP)
  - Tab 2: Username/Email + Password login
  - Tab 3: New Citizen Registration Form (expands inline)
    - Fields: Full Name, Mobile, Email, Password, Confirm Password, Gender, DOB, Father Name, Address, Alt Mobile, Pin Code, Aadhaar No, Block, Panchayat, Village, ID Type + Number
    - Mobile OTP verification step before final submit
    - On success: animated receipt / welcome panel
- No official/admin login links visible

**Citizen Dashboard (SPA shell with retractable sidebar):**
- Track My Grievances: Application Status, Complaint Status, Meeting Appointment Status
- Apply New Grievance: Government Yojna, Register Complaint, Schedule Meeting
- My Profile, Notifications, Survey/Feedback
- Each section updates only main content div via `fetch()`

**Complaint Form fields (Jehanabad-specific):**
- Category dropdown (all ComplaintCategory values in Hindi+English)
- Location: District (locked: Jehanabad) → Block → Area Type → Local Body/Revenue Village → Ward/Mohalla → Landmark
- Police Station (auto-populated from block)
- Priority suggestion
- Photo/Document attachment (multi-file: PDF, JPG, PNG, HEIC max 10MB)
- ComplaintNumber format: `JHB-YYYY-NNNNNN`

**JSON properties on IndexModel (needed for cascading dropdowns):**
- `LocalBodiesJson` — serialized local bodies list
- `VillagesJson` — serialized revenue villages list

### Official Landing + Login Page (`/Official/Index`)
- Separate from citizen portal; same glassmorphism
- Official/government notice board
- Login form for all official roles
- App download links (Android/iOS)
- Role routing post-auth:
  ```
  Admin → /Admin/Dashboard
  ControlRoom → /ControlRoom/Index
  Officer → /Officer/Index
  Magistrate → /Magistrate/Dashboard
  PoliceOfficer → /Police/Dashboard
  ```

### Control Room Portal (`/ControlRoom/`)
- Hybrid: index is cshtml, sub-pages are Blazor
- **Operator**: complaint queue (real-time SignalR), accept/verify/forward complaints, digitize walk-in, IVRS view (read-only)
- **Shift Incharge**: all Operator + retract/reassign, broadcast, shift reports, IVRS activate/pause
- **IVRS Architecture**: FreeSWITCH ESL, config in `ivrs_config.json`, DTMF configurable, per-operator allocation

### Admin Portal (`/Admin/`)
- Blazor Server — most powerful portal
- Full sidebar: Complaint Mgmt, User Mgmt, Dept Mgmt, Work Events, Shift Mgmt, Notice Board, IVRS Config, GIS Map, Reports, System Config, Dynamic Form Builder
- Dynamic Form Builder: drag-and-drop field addition, deploy → citizen sidebar auto-updates

### Magistrate Portal (`/Magistrate/`)
- Blazor Server
- Dispose complaints, GPS check-in with SituationStatus, SOS → SignalR alert to admin+CR, situation/beat/duty reports

### Police Officer Portal (`/Police/`)
- Identical pattern to Magistrate
- GPS check-in, beat report, complaint forwarding, duty report PDF

### Departmental Officer Portal (`/Officer/`)
- Hybrid cshtml + Blazor
- Dispose complaint (dropdown: Disposed/Dropped/Not Relevant/Under Investigation) + remarks + signed report upload
- Confirm/allot meeting time
- OfficerMobile.razor for mobile-optimized view

---

## Receipt & PDF Generation

Every application/complaint generates a **receipt PDF** with:
- Header: Bihar State Emblem + "जिला नियंत्रण कक्ष, जहानाबाद" bilingual
- Reference number in large font
- Citizen details, submission date/time
- Category, description summary
- Encrypted barcode (unique per record, scannable for verification)
- QR code → public tracking page
- Digital signature placeholder
- Artistic border (QuestPDF)
- Footer: 1920, website URL

---

## Authentication & Security

### Citizen Login Flows
1. OTP Login: mobile → OTP (6-digit, 5 min TTL, max 3 attempts)
2. Username/Password: ASP.NET Core Identity
3. Registration: mobile OTP verification → account created → `IsApprovedByAdmin=true` by default

### Official Login
- Username/Email + Password only
- New registration requires `IsApprovedByAdmin=false` → Admin approval queue
- JWT: access token 15 min, refresh token 7 days

### Security Measures
- `OtpRateLimitMiddleware` per IP/mobile
- `SecurityHeadersMiddleware`: X-Frame-Options, CSP, HSTS, X-Content-Type-Options
- JWT in HttpOnly cookie (not localStorage)
- CSRF protection on all forms
- Audit interceptor logs all entity changes
- Role-based authorization per portal
- Passwords: PBKDF2 via ASP.NET Identity

---

## Localization
- Default: Hindi (`hi`), Secondary: `en-IN`
- Language toggle in topbar (persisted to cookie + `AppUser.PreferredLanguage`)
- `.resx` resource files in `Resources/Pages/`
- All labels, status messages, notifications bilingual

---

## GIS / Mapping
- Leaflet.js via `LeafletInterop.cs` (Blazor JS interop)
- `jehanabad_blocks.json` — GeoJSON of Jehanabad 7 blocks
- Admin GIS: complaint heatmap + officer GPS locations
- `admin-heatmap.js` — complaint density per block
- `GisService.cs` — server-side geospatial queries

---

## Configuration (appsettings.json)
```json
{
  "ConnectionStrings.DefaultConnection": "PostgreSQL connection string",
  "Jwt": { "Key": "min 32 chars", "AccessTokenExpiryMinutes": 15, "RefreshTokenExpiryDays": 7 },
  "ApiBaseUrl": "http://localhost:5001/",
  "FreeSWITCH": { "Host": "127.0.0.1", "EslPort": 8021, "EslPassword": "...", "IvrsExtension": "1920", "TtsEngine": "espeak-ng", "TtsVoice": "hi", "Enabled": false },
  "Hangfire": { "SlaCheckIntervalMinutes": 30, "GpsReminderIntervalMinutes": 60, "AutoAssignIntervalMinutes": 5 },
  "Notifications": { "SmtpHost": "", "SmtpPort": 587, "ControlRoomNumber": "1920" },
  "Localization": { "DefaultCulture": "hi", "SupportedCultures": ["hi", "en-IN"] },
  "Complaint": { "ReopenWindowHours": 24, "AutoCloseDays": 30 },
  "Sms.Enabled": false,
  "Email.Enabled": false
}
```

---

## CSS Design Token System (dcr-cmis.css)

```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-bg-hover: rgba(255, 255, 255, 0.14);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-shadow: 0 8px 32px rgba(0, 0, 0, 0.37);
  --glass-blur: blur(20px);
  --glass-blur-heavy: blur(40px);
  --surface-1: rgba(255,255,255,0.04);
  --surface-2: rgba(255,255,255,0.08);
  --surface-3: rgba(255,255,255,0.14);
  --accent-primary: #4f9cf9;    /* indigo-blue */
  --accent-secondary: #22d3ee;  /* cyan */
  --accent-success: #34d399;
  --accent-warning: #fbbf24;
  --accent-danger: #f87171;
  --text-primary: rgba(255,255,255,0.92);
  --text-secondary: rgba(255,255,255,0.64);
  --sidebar-width: 260px;
  --sidebar-collapsed: 72px;
  --topbar-height: 64px;
  --radius-sm: 8px;
  --radius-md: 16px;
  --radius-lg: 24px;
}

/* Page background — CSS gradient mesh only, no images */
body {
  background: 
    radial-gradient(ellipse at 20% 50%, rgba(67, 97, 238, 0.3) 0%, transparent 60%),
    radial-gradient(ellipse at 80% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%),
    radial-gradient(ellipse at 60% 80%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
    linear-gradient(135deg, #0a0e27 0%, #0d1b3e 40%, #0a1628 100%);
  min-height: 100vh;
}

.glass-card {
  background: var(--glass-bg);
  backdrop-filter: var(--glass-blur);
  -webkit-backdrop-filter: var(--glass-blur);
  border: 1px solid var(--glass-border);
  box-shadow: var(--glass-shadow);
  border-radius: var(--radius-md);
}

.glass-platter {
  background: var(--surface-2);
  backdrop-filter: var(--glass-blur-heavy);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: var(--radius-sm);
  padding: 1.5rem;
}
```

### SPA Shell Layout
```html
<body>
  <div class="app-shell">
    <aside class="sidebar glass-card" id="sidebar">
      <!-- Logo, nav items, lock/unlock toggle -->
    </aside>
    <div class="main-wrapper">
      <header class="topbar glass-card">
        <!-- Role badge, notifications, language, avatar -->
      </header>
      <main class="content-area" id="mainContent">
        <!-- fetch() populates this div only -->
      </main>
    </div>
  </div>
</body>
```

### Sidebar Retract Implementation
```javascript
const sidebar = document.getElementById('sidebar');
let isLocked = localStorage.getItem('sidebarLocked') === 'true';

function toggleLock() {
  isLocked = !isLocked;
  localStorage.setItem('sidebarLocked', isLocked);
  sidebar.classList.toggle('locked', isLocked);
  updateLockIcon();
}

sidebar.addEventListener('mouseenter', () => { if (!isLocked) sidebar.classList.add('expanded'); });
sidebar.addEventListener('mouseleave', () => { if (!isLocked) sidebar.classList.remove('expanded'); });
```

---

## API Layer (`DCR.CMIS.API/`)

Controllers: `AdminComplaintController`, `DashboardController`, `UserManagementController`, `DepartmentController`, `ShiftController`, `WorkEventController`, `ReportController`, `IvrsConfigController`, `AuditLogController`, `FieldController`, `LanguageController`

JWT Bearer auth on all endpoints. CORS configured for web + mobile origins.

---

## Jehanabad District Data

**Blocks (7):** Jehanabad, Ghoshi, Kako, Makhdumpur, Modanganj, Ratni-Farmali, Hulasganj

**Government Yojna Schemes (seed data):**
PM Awas Yojana (Gramin), Mukhyamantri Kanya Utthan Yojana, Bihar Student Credit Card, Mukhyamantri Gram Parivahan Yojana, MNREGA, Atal Pension Yojana, PM Fasal Bima Yojana, Mukhyamantri Vriddhajan Pension, Kabir Anteyshti Anudan Yojana, Other

**Departments (seed):** Land Revenue, District Social Welfare, PWD, Health, Education, Agriculture, Food & Consumer Protection, Rural Development, Electricity (BSPHCL), Water Resources, Police, Home Guard

**Meeting Officers (seed):** District Magistrate, Additional Collector, SDO (Jehanabad), BDOs (7 blocks), District Social Welfare Officer, District Agriculture Officer, District Health Officer

---

## Architecture Principles — Non-Negotiable

| Principle | Implementation |
|---|---|
| High Cohesion | Each service does one bounded thing |
| Low Coupling | Services depend on interfaces, not concrete classes |
| No God Objects | Service classes must not exceed ~300 lines |
| No Anti-patterns | No service locator, no static service access, no direct DbContext in Razor pages |
| SOLID | Every interface has one purpose |
| Audit Everything | Every state change on Complaint, User, Shift → AuditLog via AuditInterceptor |
| Soft Delete | `IsDeleted=true` on all auditable entities. Never hard-delete. |

---

## File/Attachment Handling
- Upload path: `wwwroot/uploads/complaints/` (+ subfolders by date)
- Max file size: configurable (default 10MB)
- Allowed types: PDF, JPG, PNG, HEIC
- Served via authenticated endpoint (not directly from wwwroot for official docs)

---

## Build & Startup Sequence
```
1. dotnet ef database update
2. AppDbContext seeded via DbSeeder.cs
3. Hangfire jobs registered and started
4. SignalR hubs mapped
5. FreeSWITCH config loaded from ivrs_config.json (if exists) or defaults
6. Middleware pipeline:
   SecurityHeadersMiddleware → OtpRateLimitMiddleware → Auth → Authorization → Endpoints
```

---

## Future Capabilities (Plug-in Ready)
1. Android/iOS Apps — API + PWA manifest ready
2. Dynamic Form Builder — `DynamicFormDefinition` + `DynamicFormSubmission` entities
3. AI complaint categorization — `IComplaintCategorizationService` placeholder
4. WhatsApp notifications — `IWhatsAppGateway`
5. Video meeting integration — Jitsi/Zoom embed
6. Dashboard widget customization — per-role configurable KPI grid
7. Multi-district scaling — all queries filtered by `District` claim

---

# PART 3 — UI/UX DESIGN RULES (Applied to DCR-CMIS)

> For DCR-CMIS: glassmorphism is the chosen style. All rules below apply — when in conflict, glassmorphism design mandate (Part 2) wins, but accessibility rules (Priority 1) are always non-negotiable.

## Rule Priority Reference

| Priority | Category | Impact | Key Checks |
|----------|----------|--------|------------|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels |
| 2 | Touch & Interaction | CRITICAL | Min 44×44px, 8px+ spacing, Loading feedback |
| 3 | Performance | HIGH | WebP/AVIF, Lazy loading, CLS < 0.1 |
| 4 | Style Selection | HIGH | Match product type, Consistency, SVG icons (no emoji) |
| 5 | Layout & Responsive | HIGH | Mobile-first, No horizontal scroll |
| 6 | Typography & Color | MEDIUM | Base 16px, Line-height 1.5, Semantic color tokens |
| 7 | Animation | MEDIUM | Duration 150–300ms, Spatial continuity |
| 8 | Forms & Feedback | MEDIUM | Visible labels, Error near field, Progressive disclosure |
| 9 | Navigation Patterns | HIGH | Predictable back, Bottom nav ≤5, Deep linking |
| 10 | Charts & Data | LOW | Legends, Tooltips, Accessible colors |

## Critical Rules (Always Apply)

### Accessibility (CRITICAL)
- Minimum contrast 4.5:1 normal text, 3:1 large text
- Visible focus rings 2–4px on all interactive elements
- Descriptive alt text for meaningful images
- `aria-label` for icon-only buttons
- Tab order matches visual order; full keyboard support
- Use `<label>` with `for` attribute on all form inputs
- Skip to main content for keyboard users
- Sequential h1→h6, no level skip
- Don't convey info by color alone (add icon/text)
- Support `prefers-reduced-motion`

### Touch & Interaction (CRITICAL)
- Min touch target 44×44pt (iOS) / 48×48dp (Android)
- Minimum 8px gap between touch targets
- Use click/tap for primary interactions; don't rely on hover alone
- Disable button during async operations; show spinner
- `cursor-pointer` on clickable elements
- Visual feedback on press within 80–150ms

### Forms (for DCR-CMIS multi-field government forms)
- Visible label per input (never placeholder-only)
- Error shown below the related field (not only at top)
- Required fields marked with asterisk
- Multi-step flows show step indicator; allow back navigation
- Inline validation on blur (not on keystroke)
- `autocomplete` attributes for autofill support
- Long forms auto-save drafts
- Destructive actions use red and are spatially separated
- Mobile input height ≥44px

### Layout (for DCR-CMIS SPA shell)
- Mobile-first breakpoints: 375 / 768 / 1024 / 1440
- No horizontal scroll on mobile
- 4pt/8dp spacing system
- Fixed navbar/bottom bar must reserve safe padding for content below
- `min-h-dvh` over `100vh` on mobile
- Multi-column grid for forms: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- Max container width on desktop: max-w-6xl / 7xl

### Typography (for DCR-CMIS)
- Base 16px body text, minimum 12px anywhere
- Line-height 1.5–1.75 for body text
- 65–75 chars per line max
- Consistent type scale: 12 14 16 18 24 32
- Bold headings (600–700), Regular body (400), Medium labels (500)
- Semantic color tokens; never raw hex in components

### Animation (for DCR-CMIS SPA transitions)
- 150–300ms for micro-interactions; complex transitions ≤400ms
- Use transform/opacity only; never animate width/height/top/left
- ease-out for entering, ease-in for exiting
- Content swap: opacity fade + slight translateY
- Show skeleton/shimmer for loads >300ms
- Every animation must be interruptible

### Charts (for DCR-CMIS Admin Dashboard)
- Match chart type: trend→line, comparison→bar, proportion→pie/donut
- Use accessible color palettes (not red/green only)
- Always show legend; tooltips on hover/tap
- Label axes with units
- Responsive: reflow on small screens
- Empty state: "No data yet" with guidance
- Use tabular figures for data columns

### Navigation (for DCR-CMIS sidebar + portal routing)
- Back navigation predictable; preserve scroll/state
- All key screens reachable via deep link
- Active nav item visually highlighted
- Modals offer clear close/dismiss affordance
- Sidebar is secondary nav; bottom nav (mobile) max 5 items with labels

## Pre-Delivery Checklist (DCR-CMIS)
- [ ] No emojis used as icons (SVG only)
- [ ] All icons from consistent family and style
- [ ] Pressed-state visuals don't shift layout bounds
- [ ] Semantic theme tokens used (dcr-cmis.css custom properties)
- [ ] All tappable elements have pressed feedback
- [ ] Touch targets ≥44×44pt
- [ ] Micro-interaction timing 150–300ms
- [ ] Primary text contrast ≥4.5:1 in dark mode
- [ ] Secondary text contrast ≥3:1 in dark mode
- [ ] Dividers/borders distinguishable in dark mode
- [ ] Light theme tested separately from dark theme
- [ ] Scroll content not hidden behind fixed bars
- [ ] Verified on 375px, large phone, tablet (portrait + landscape)
- [ ] 4/8dp spacing rhythm maintained
- [ ] All form fields have labels, hints, and error messages
- [ ] Color not the only indicator for status/severity

---

# PART 4 — HOW TO START THIS SESSION

1. **Read Part 1** — confirm current phase and TODO list
2. **Pull latest project files** from brain repo or zip if provided:
   ```bash
   git clone https://YOUR_PAT@github.com/abhishek1chandra-code/claude-brain.git /tmp/brain
   cat /tmp/brain/PROJECT_BRAIN.md
   ```
3. **Priority: Fix build errors first** (see Part 1 TODO section — errors and warnings listed with root causes and fixes)
4. **Then proceed** to next tasks in order
5. **Token monitoring**: at ~75% context → wrap up; push brain before session ends

**End of session push:**
```bash
cd /tmp/brain && git config user.email "claude@anthropic.com" && git config user.name "Claude" && git add . && git commit -m "A[N] S[N] — [brief description]" && git push
```

**End message format:**
`HANDOFF → Next: A[N+1]. Task: [exact next task]. Pushed ✅`

---

*Document version: v4 — A10S1 Index.cshtml refactor + Blazor CSS sweep complete | Updated: April 15, 2026*
*Replaces: DCR-CMIS-ARCHITECT-BLUEPRINT.md + PROJECT_BRAIN.md + SKILL.md (key rules) + session prompts*
