# DCR-CMIS — MASTER SESSION KIT
## Single file: paste this at every session start along with the project zip.
## Contains: Brain State · Architect Blueprint · UI/UX Skill · Build TODO List

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PART 1 — SESSION BRAIN (READ THIS FIRST EVERY SESSION)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## PROJECT BRAIN — DCR-CMIS
**Status:** ACTIVE  
**Phase:** UI-UNIFICATION + CSS-MASTER → COMPLETE. Next: OFFICER PORTAL DATA WIRING  
**Brain Repo:** abhishek1chandra-code/claude-brain  
**Last Checkpoint:** A3S3-FINAL (April 15, 2026) — full project zip provided  
**Account Rotation:** A1→A2→A3…A10→A1 (4hr cooldown each)

### Session Start Protocol (MANDATORY — NO EXCEPTIONS)
```
Step 1: git clone https://YOUR_PAT@github.com/abhishek1chandra-code/claude-brain.git /tmp/brain
Step 2: Confirm Phase, last completed items, NEXT SESSION task from /tmp/brain/PROJECT_BRAIN.md
Step 3: Extract uploaded project zip → /tmp/project/
Step 4: Proceed immediately on NEXT SESSION task. No clarifying questions unless two valid technical paths exist.
Step 5: At session end — update PROJECT_BRAIN.md, push brain, deliver FULL PROJECT ZIP (not just changed files).
```
**Token monitoring:** At ~70% context → prepare handoff. Push brain before session ends.  
**Extended thinking:** OFF unless complex architecture decision.  
**ALWAYS deliver the complete project zip** — not just changed files. User runs the full project locally.

---

## SOLUTION STRUCTURE
```
DCR.CMIS.sln
├── DCR.CMIS.Domain          ✅ COMPLETE — DO NOT TOUCH
├── DCR.CMIS.Application     ✅ COMPLETE — DO NOT TOUCH
├── DCR.CMIS.Infrastructure  ✅ COMPLETE — DO NOT TOUCH
├── DCR.CMIS.Web             🔄 IN PROGRESS (feature work)
└── DCR.CMIS.API             ✅ COMPLETE — DO NOT TOUCH (warnings only, see TODO)
```

---

## COMPLETED (as of A3S3-FINAL)

### CSS UNIFICATION — ✅ 100% COMPLETE
- [x] `dcr-cmis.css` — Unified master CSS (replaces glass-theme.css, admin.css, public.css, app.css)
- [x] `theme-toggle.js` — localStorage + OS preference + tab-sync + Blazor re-render support
- [x] All Blazor layouts migrated to dcr-cmis.css
- [x] All `_Layout.cshtml` files migrated
- [x] `App.razor` migrated
- [x] `Login.cshtml` — dcr-cmis.css + data-theme init + html[data-theme="light"] selectors
- [x] `Official/Index.cshtml` — dcr-cmis.css
- [x] `public.js` — dead `toggleTheme()` + dead IIFE removed
- [x] ZERO glass-theme.css / html.light-mode / body.classList.toggle('light-mode') refs anywhere
- [x] All Public/Account pages → inherit dcr-cmis.css via `_Layout.cshtml` (confirmed)
- [x] OfficialLogin.cshtml → standalone inline CSS, already uses data-theme correctly

### Backend (ALL DONE — DO NOT TOUCH)
- [x] Domain entities + enums, EF Core + 15+ migrations, AppDbContext, AuditInterceptor, DbSeeder
- [x] AuthService (Identity + JWT + OTP + refresh token)
- [x] All services: ComplaintRepository, AdminComplaintService, SlaService, ShiftService, NotificationService, ComplaintNotifier, DeputedPersonnelService, WorkEventService, AuditLogService, UserManagementService, DepartmentService, GpsService, IvrsConfigService, ReportService, ComplaintPdfService, IvrsService, GisService, ExcelImportService, EmailGateway, TwilioSmsGateway
- [x] Hangfire jobs: SlaMonitorJob, ShiftHandoverJob, ComplaintAutoAssignJob, ComplaintAutoCloseJob, OfficerTaskReminderJob, GpsCheckInReminderJob
- [x] SignalR: ComplaintHub, NotificationHub, DashboardHub
- [x] API: AdminComplaintController, DashboardController, UserManagementController, DepartmentController, ShiftController, WorkEventController, ReportController, IvrsConfigController, AuditLogController, FieldController, LanguageController

### Web / Razor Pages (ALL DONE)
- [x] Public/Index, Public/Account/*, Public/Register/*, Public/ComplaintForm, Confirmation, EditComplaint, Track, Survey
- [x] ControlRoom/Index, Official/Index, Field/GpsReport, Admin/Complaints/Import

### Web / Blazor Pages (ALL DONE)
- [x] Admin: AdminDashboard, ComplaintList, ComplaintDetail, UserList, DepartmentList, OfficialApproval, Reports, AuditLog, IvrsConfig, IvrsCallLog, LocalBodies, PoliceStations, RevenueVillages, ShiftList, ShiftCalendar, ShiftHandoverLog, ShiftSwapRequests, DutyAttendance, EscalationRequests, GpsCheckInHistory, Manpower, SystemConfig, OtpSettings, WorkEvents, NotificationLog, AdminBroadcast, GisMap, _Reports/OfficerLoad, _Reports/OfficerPerformance
- [x] ControlRoom: CrDashboard, CrComplaintQueue, CrCallManagement, CrDialpad, CrIvrsFlow, CrOfficerStatus, CrShiftHandover
- [x] Magistrate: MagDashboard, MagComplaints, MagComplaintDetail, MagDeployment, MagGpsCheckin, SituationReport
- [x] Officer: OfficerDashboard, OfficerMobile, OfficerPerformance
- [x] Police: PoliceDashboard
- [x] Layouts: AdminLayout, CrLayout, MagistrateLayout, OfficerLayout, PoliceLayout
- [x] Shared: PaginationBar, DistrictMap (Leaflet)

---

## ⚠️ NEXT SESSION TODO LIST (A4 S1)

### PRIORITY 1 — BUILD ERRORS (project currently fails to build — fix first)

**File: `Pages/Public/Index.cshtml`**
- ERROR line 667/669: `RZ1008` — Single-statement control-flow Razor statements contain markup; wrap with `{ }` braces
- ERROR line 670-676: `RZ1005` — ":" is not valid at start of code block (likely a broken `@if`/`@switch` syntax)
- ERROR line 367: `CS1061` — `IndexModel` missing property `RegPassword` → add `[BindProperty] public string RegPassword { get; set; }` to `Index.cshtml.cs`
- ERROR line 391: `CS1061` — `IndexModel` missing `RegConfirmPassword` → add same
- ERROR line 413: `CS1061` — `IndexModel` missing `RegFatherName` → add same
- ERROR line 472: `CS1061` — `IndexModel` missing `RegBlock` → add same
- ERROR line 484: `CS1061` — `IndexModel` missing `RegPanchayat` → add same
- ERROR line 499: `CS1061` — `IndexModel` missing `RegVillage` → add same
- ERROR line 523: `CS1061` — `IndexModel` missing `RegAltMobile` → add same
- ERROR line 528: `CS1061` — `IndexModel` missing `RegPinCode` → add same
- ERROR line 538: `CS1061` — `IndexModel` missing `RegAadhaarNo` → add same
- ERROR line 546: `CS1061` — `IndexModel` missing `RegAddress` → add same
- ERROR line 664: `CS1061` — `IndexModel` missing `LocalBodiesJson` → add `public string LocalBodiesJson { get; set; }` (populated in `OnGetAsync`)
- ERROR line 665: `CS1061` — `IndexModel` missing `VillagesJson` → add same pattern

**File: `Pages/Public/_Layout.cshtml`**
- ERROR line 15: `RZ1034` — Malformed `<body>` tag helper — check for unclosed Razor expressions inside `<body>` attribute
- ERROR line 17/37: `RZ1006` — `else` block missing closing `}` — find and fix the if/else Razor block spanning these lines
- ERROR line 47: `RZ1010` — Unexpected `@{` inside a code block — remove the extra `@`
- ERROR lines 60/61: `RZ1026` — Unmatched `</body>` and `</html>` — fix the unclosed Razor block above causing these to appear orphaned

**Root cause summary:** `_Layout.cshtml` has a broken Razor `@if/@else` block (likely around the theme-toggle script injection). `Index.cshtml` has registration form bind properties missing from the PageModel and broken Razor control-flow syntax. Fix these two files first — all other errors cascade from them.

### PRIORITY 2 — WARNINGS (fix after build passes)

- `CS8604` in `FieldController.cs` line 79: Possible null `remarks` arg → add `remarks ?? string.Empty` or null check before passing to `UpdateStatusAsync`
- `CS0109` in `Officer/Index.cshtml.cs` line 42 and `ControlRoom/Index.cshtml.cs` line 51: `new` keyword not needed on `CurrentPage` — remove `new` keyword
- `CS0168` in `OfficerDashboard.razor.cs` line 57, `LocalBodies.razor.cs` line 41, `PoliceStations.razor.cs` line 37, `RevenueVillages.razor.cs` line 38: Unused variable `ex` in catch blocks → either `catch (Exception)` (discard) or `_logger.LogError(ex, ...)` to use it

### PRIORITY 3 — Feature Work (after build passes + warnings clean)
- OfficerDashboard.razor + OfficerDashboard.razor.cs: Wire real complaints assigned to officer (from `AdminComplaintService` filtered by officer userId)
- OfficerMobile.razor: Wire GPS check-in → `GpsService.RecordCheckInAsync()`
- OfficerPerformance.razor: Wire real metrics from `AdminComplaintService.GetOfficerPerformanceAsync()`

---

## DECISIONS LOG
- 2026-04-15 A3S3: CSS UNIFICATION COMPLETE. public.js dead code removed. All pages audited clean.
- 2026-04-14 A3S3: Login.cshtml + Official/Index.cshtml: glass-theme→dcr-cmis, data-theme fixes.
- 2026-04-14 A2S2: All Blazor layouts migrated. NavMenu.razor.css + MainLayout.razor.css kept as Blazor scoped CSS (use CSS vars — no migration needed).
- 2026-04-14 A1S1: KEEP old project, do NOT rebuild. Backend 90%+ complete.
- 2026-04-14 A1S1: Single CSS = dcr-cmis.css. Theme via `html[data-theme]`. Light = soft lavender-blue (#eef2ff base). Toggle via `data-theme-toggle` attribute + theme-toggle.js.

## DO NOT CHANGE (EVER)
- Backend: Domain, Application, Infrastructure, API — fully stable
- EF Core migrations — do not add without explicit task
- JWT / OTP auth flow
- Complaint number format: `JHB-YYYY-NNNNNN`
- Default language: Hindi (`hi`), secondary: `en-IN`
- Jehanabad district seed: 7 blocks, departments, police stations

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PART 2 — ARCHITECT BLUEPRINT (FULL SYSTEM SPEC)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## Project Identity

| Item | Value |
|---|---|
| Full Name | District Control Room – Citizen Management & Information System |
| Abbreviation | DCR-CMIS |
| Primary District | Jehanabad, Bihar, India |
| Scalability | Any district in Bihar (configurable) |
| Purpose | Military-grade-secure ultra-modern e-governance portal |
| Languages | Hindi (default `hi`) + English (`en-IN`) |
| Control Number (IVRS) | 1920 |

---

## Design Mandate — NON-NEGOTIABLE

### Glassmorphism at Maximum Depth
- `backdrop-filter: blur(18px–40px)` on every card, panel, modal, sidebar, nav
- Multi-layered transparency: outer shell (`rgba(255,255,255,0.08)`) → inner platter (`rgba(255,255,255,0.14)`) → content (`rgba(255,255,255,0.04)`)
- `border: 1px solid rgba(255,255,255,0.18)` + `box-shadow: 0 8px 32px rgba(0,0,0,0.37)`
- Background: Rich CSS gradient mesh only — NEVER hardcode image paths that don't exist
- Depth via `transform: translateZ` + layered pseudo-elements for "floating platter" feel
- CSS custom property design token system in `dcr-cmis.css` (was `glass-theme.css`)

### SPA-Feel Architecture
- **Static sidebar** — never reloads
- **Main content `<div>`** is the only DOM region swapped via `fetch()`
- Smooth CSS transitions on content swap (`opacity` fade + slight `translateY`)

### Sidebar — Retractable with Lock/Unlock
- Toggle pin (🔒/🔓); Unlocked = auto-collapse to icon-only; Locked = stays expanded
- State in `localStorage`; Mobile: bottom-sheet drawer

### Screen Utilization
- Multi-column grids: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- Responsive: 320px → 4K → tablet landscape/portrait
- PWA-ready (manifest + service worker exist)

### Uniform Design Language
Every portal (Citizen, Official, Admin, Control Room, Magistrate, Police) uses the same CSS token set, glass component library, sidebar + SPA shell, topbar with role badge / notification bell / language toggle / avatar.

---

## Technology Stack

| Layer | Technology |
|---|---|
| Framework | ASP.NET Core 8.0 |
| Primary UI | Razor Pages (cshtml) |
| Component UI | Blazor Server |
| ORM | EF Core 8 + Npgsql (PostgreSQL) |
| Database | PostgreSQL (snake_case via EFCore.NamingConventions) |
| Auth | ASP.NET Core Identity + JWT (15min access / 7day refresh) |
| Real-time | SignalR (3 hubs) |
| Background Jobs | Hangfire (PostgreSQL backend) |
| PDF | QuestPDF |
| Excel Export | ClosedXML |
| Excel Import | ExcelDataReader |
| Email | MailKit (SMTP) |
| SMS | Vonage / Twilio fallback |
| IVRS | FreeSWITCH via ESL TCP (port 8021) |
| Localization | .resx (hi + en-IN) |
| GIS | Leaflet.js via JS interop |
| Caching | IMemoryCache |
| Audit | Custom AuditInterceptor on EF SaveChanges |

---

## Domain Model — All Entities

### Core Enums (`DCR.CMIS.Domain/Enums/AllEnums.cs`)
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
FullName, FullNameHi, MobileNumber, Designation, DepartmentId, UserRole, IsActive, LastLoginAt, ProfilePhotoUrl, PreferredLanguage("hi"), RefreshToken, RefreshTokenExpiry, Gender, DateOfBirth, Address, IdType, IdNumber, IdTypeOther, IsApprovedByAdmin, RejectionReason, SmsNotificationsEnabled, EmailNotificationsEnabled, CreatedAt, UpdatedAt, IsDeleted → Complaints, ShiftAssignments

### Complaint (Central Aggregate)
Id, ComplaintNumber("JHB-2026-000123"), Description, CitizenName, MobileNumber, Email, Address, District("Jehanabad"), Latitude, Longitude, AreaType, BlockName, LocalBodyId, WardId, WardNoManual, RevenueVillageId, MohallaName, TolaName, Landmark, Pincode, PoliceStationId, Status, Category, Source, SlaLevel, EscalationLevel, SlaDeadline, Priority, IsSlaBreached, RegisteredAt, AssignedAt, ResolvedAt, ClosedAt, ReopenCount, DepartmentId, AssignedOfficerId, CitizenUserId, IsPubliclyVisible, CreatedAt, UpdatedAt, IsDeleted → StatusLogs, Attachments

### All Other Entities
- **ComplaintStatusLog**: ComplaintId, Status, Remarks, UpdatedByUserId, Source
- **ComplaintAttachment**: ComplaintId, FilePath, FileName, FileSize, UploadedAt
- **ComplaintNote**: ComplaintId, NoteText, CreatedByUserId, Source
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
- **OtpRequest**: MobileNumber, Otp(hashed), Purpose, IsUsed, ExpiresAt, Attempts
- **NotificationLog**: UserId, Title, Body, Channel, IsDelivered, SentAt
- **Shift**: Name, ShiftType, ShiftStart(TimeSpan), ShiftEnd(TimeSpan)
- **ShiftAssignment**: ShiftId, UserId, Date, IsHandoverDone, HandoverNotes, HandoverAt
- **ShiftSwapRequest**: RequestingUserId, TargetUserId, ShiftAssignmentId, Reason, Status, ReviewedByUserId
- **PoliceStation**: Name, Code, BlockName, OfficerInCharge, MobileNumber, IsActive
- **LocalBody**: Name, Type(LocalBodyType), BlockName, IsActive → Wards
- **Ward**: LocalBodyId, WardNumber, WardName
- **RevenueVillage**: Name, BlockName, PoliceStationId
- **SituationReport**: WorkEventId, MagistrateId, Status, Notes, ReportedAt, AttachmentPath
- **BeatReport**: OfficerId, WorkEventId, Location, Notes, Latitude, Longitude, ReportedAt, AttachmentPath
- **DutyReport**: OfficerId, WorkEventId, ReportText, AttachmentPath, ReportedAt
- **OfficerTask**: AssignedToUserId, AssignedByUserId, ComplaintId, Title, Description, DueAt, IsCompleted, CompletedAt, LastReminderSentAt
- **CitizenSurvey**: ComplaintId, CitizenUserId, SpeedRating, HelpfulnessRating, ResolutionRating, CommunicationRating, Comments, SubmittedAt
- **NoticeBoard**: Title, Body, Severity, IsActive, CreatedByUserId, ExpiresAt → NoticeBoardAttachments
- **NoticeBoardAttachment**: NoticeBoardId, FilePath, FileName
- **BroadcastLog**: SentByUserId, Message, TargetRole, SentAt, RecipientCount
- **AuditLog**: EntityName, EntityId, Action, OldValues(JSON), NewValues(JSON), UserId, Timestamp, IpAddress
- **ExcelImportJob**: FileName, Status, TotalRows, ProcessedRows, ErrorLog, StartedAt, CompletedAt
- **SystemConfig**: Key(unique), Value, Description, UpdatedAt

---

## Application Layer — Key Service Interfaces

### IAdminComplaintService
`GetPagedAsync` · `GetDetailAsync` · `UpdateStatusAsync` · `EscalateAsync` · `BulkUpdateStatusAsync` · `BulkAssignAsync` · `BulkSetPriorityAsync` · `SetPriorityAsync` · `SetSlaDeadlineAsync` · `ExportToCsvAsync` / `ExportToXlsxAsync` · `GetDashboardKpiAsync` · `GetCategoryBreakdownAsync` · `GetOfficerLoadAsync` · `GetOfficerPerformanceAsync` · `GetSurveyAveragesAsync` · `GetSlaWarningCountAsync` · `GetDailyTrendAsync` · `BulkAddNoteAsync` · `LogReassignmentAsync` / `GetReassignmentLogsAsync`

### SLA Thresholds
| Level | First Escalation | Second | Final/Breach |
|---|---|---|---|
| Normal | 48h | 66h | 72h |
| Urgent | 12h | 20h | 24h |
| Critical | 3h | 5h | 6h |

### IVRS (FreeSWITCH ESL)
- Config in `ivrs_config.json` · ESL TCP probe on port 8021 · `GetQueueCountAsync()` via `api calls_count` ESL command
- Default DTMF: 1→Register, 2→Track, 3→Transfer to Operator, 4→Repeat

### Auth Flows
- **Citizen**: OTP (6-digit, 5min TTL, 3 attempts max) OR Username/Password
- **Official**: Username/Email + Password only; new official needs `IsApprovedByAdmin` queue
- **JWT**: access 15min / refresh 7days; stored in HttpOnly cookie

---

## Background Jobs (Hangfire)

| Job | Schedule |
|---|---|
| SlaMonitorJob | Every 30 min |
| ComplaintAutoAssignJob | Every 5 min |
| ComplaintAutoCloseJob | Daily |
| ShiftHandoverJob | Shift boundary |
| GpsCheckInReminderJob | Every 60 min |
| OfficerTaskReminderJob | Periodic |

---

## Portal Structure

### Citizen Portal (`/Public/`)
- Landing: Full-width notice board + login/register SPA tabs (OTP login / Password login / Register inline)
- No official/admin login links visible on citizen page
- After login SPA sidebar: Track Grievances · Apply New Grievance · Profile · Notifications · Survey
- Complaint number: `JHB-YYYY-NNNNNN`; encrypted barcode PDF receipt on every submission

### Official Login (`/Official/Index`)
- Separate from citizen; same glassmorphism; official notice board; app download links
- Role-based routing: Admin→`/Admin/Dashboard` · ControlRoom→`/ControlRoom/Index` · Officer→`/Officer/Index` · Magistrate→`/Magistrate/Dashboard` · Police→`/Police/Dashboard`

### Control Room (`/ControlRoom/`)
- Operator: receive queue, verify/forward complaints, manual entry, IVRS view (read-only)
- Shift Incharge (superset): retract/reassign, broadcast, shift reports, escalations, IVRS activate/pause

### Admin Portal (`/Admin/`)
- Full KPI dashboard, all complaint management, user management, work events, shift management, notice board, IVRS config, GIS map, reports, system config
- Dynamic Form Builder (no-code drag-and-drop, deploys button on citizen dashboard)

### Magistrate Portal (`/Magistrate/`)
- Dispose complaints, GPS check-in with SituationStatus (SOS → immediate SignalR alert), situation reports, beat reports, duty report PDF

### Officer Portal (`/Officer/`)
- View assigned complaints, dispose with remarks + signed report upload, meeting schedule confirmations, OfficerMobile.razor for mobile-optimized view

### Police Portal (`/Police/`)
- GPS check-in, beat reports, view work events/deployment, notice board

---

## PDF Receipt (QuestPDF — IComplaintPdfService)
Bihar State Emblem + "जिला नियंत्रण कक्ष, जहानाबाद" bilingual header · Reference number large · Citizen details · Encrypted barcode (scannable by app) · QR code → public tracking page · Digital signature placeholder · Artistic border · Footer: 1920, website URL

---

## CSS / Design Token System (`dcr-cmis.css`)
```css
:root {
  --glass-bg: rgba(255,255,255,0.08);  --glass-bg-hover: rgba(255,255,255,0.14);
  --glass-border: rgba(255,255,255,0.18);  --glass-shadow: 0 8px 32px rgba(0,0,0,0.37);
  --glass-blur: blur(20px);  --glass-blur-heavy: blur(40px);
  --surface-1: rgba(255,255,255,0.04);  --surface-2: rgba(255,255,255,0.08);  --surface-3: rgba(255,255,255,0.14);
  --accent-primary: #4f9cf9;  --accent-secondary: #22d3ee;
  --accent-success: #34d399;  --accent-warning: #fbbf24;  --accent-danger: #f87171;
  --text-primary: rgba(255,255,255,0.92);  --text-secondary: rgba(255,255,255,0.64);
  --sidebar-width: 260px;  --sidebar-collapsed: 72px;  --topbar-height: 64px;
  --radius-sm: 8px;  --radius-md: 16px;  --radius-lg: 24px;
}
/* Light theme: html[data-theme="light"] { --glass-bg: rgba(255,255,255,0.72); ... } */
/* Background: CSS gradient mesh only — radial + linear gradients in deep navy/indigo/teal */
/* Light base: #eef2ff (soft lavender-blue) — NOT plain white */
```

Theme switching: `html[data-theme="dark|light"]` via `theme-toggle.js`. Use `data-theme-toggle` attribute on any button. Never use `body.classList` / `html.light-mode` — those are dead patterns purged in A3S3.

---

## Architecture Principles — Non-Negotiable

| Principle | Rule |
|---|---|
| Soft Delete | `IsDeleted=true` on all auditable entities. Never hard-delete. |
| Audit Everything | Every state change on Complaint, User, Shift → AuditLog via AuditInterceptor |
| No God Objects | Services max ~300 lines. No direct DbContext in Razor pages. |
| High Cohesion | Each service does one bounded thing |
| Low Coupling | All DI via interfaces. No service locator, no static access. |
| SOLID | One purpose per interface. Anemic domain is acceptable (CRUD-heavy gov system). |

---

## Jehanabad Domain Data
- **Blocks (7):** Jehanabad, Ghoshi, Kako, Makhdumpur, Modanganj, Ratni-Farmali, Hulasganj
- **Departments (seed):** Land Revenue, District Social Welfare, PWD, Health, Education, Agriculture, Food & Consumer Protection, Rural Development, Electricity (BSPHCL), Water Resources, Police, Home Guard
- **Bihar Yojna Schemes:** PM Awas (Gramin), Mukhyamantri Kanya Utthan, Bihar Student Credit Card, Gram Parivahan, MNREGA, Atal Pension, PM Fasal Bima, Mukhyamantri Vriddhajan Pension, Kabir Anteyshti Anudan, Other

---

## Configuration Reference (`appsettings.json` key sections)
```json
"Jwt": { "Key": "min 32 chars", "AccessTokenExpiryMinutes": 15, "RefreshTokenExpiryDays": 7 }
"FreeSWITCH": { "Host": "127.0.0.1", "EslPort": 8021, "EslPassword": "...", "IvrsExtension": "1920", "Enabled": false }
"Hangfire": { "SlaCheckIntervalMinutes": 30, "GpsReminderIntervalMinutes": 60, "AutoAssignIntervalMinutes": 5 }
"Complaint": { "ReopenWindowHours": 24, "AutoCloseDays": 30 }
"Sms.Enabled": false  // toggle without code change
"Email.Enabled": false
```

---

## Build & Startup Sequence
```
1. dotnet ef database update
2. DbSeeder.cs seeds departments, blocks, roles, admin user
3. Hangfire jobs registered + started
4. SignalR hubs mapped
5. FreeSWITCH config loaded from ivrs_config.json (or defaults)
6. Middleware order: SecurityHeadersMiddleware → OtpRateLimitMiddleware → Auth → Authorization → Endpoints
```

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PART 3 — UI/UX SKILL (APPLY ON ALL UI WORK)
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**When to apply:** Any task that changes how a feature looks, feels, moves, or is interacted with.  
**Skip:** Pure backend, API-only, DB, infrastructure, non-visual automation.

## Rule Priority Order (follow 1→10)

| Priority | Category | Impact | Key Checks | Anti-Patterns |
|---|---|---|---|---|
| 1 | Accessibility | CRITICAL | Contrast 4.5:1, Alt text, Keyboard nav, Aria-labels | No focus rings, Icon-only buttons without labels |
| 2 | Touch & Interaction | CRITICAL | Min 44×44px, 8px+ spacing, Loading feedback | Hover-only reliance, Instant 0ms state changes |
| 3 | Performance | HIGH | WebP/AVIF, Lazy load, CLS < 0.1 | Layout thrashing |
| 4 | Style Selection | HIGH | Match product type, Consistency, SVG icons | Mixing flat+skeuomorphic, Emoji as icons |
| 5 | Layout & Responsive | HIGH | Mobile-first breakpoints, No horizontal scroll | Fixed px containers, Disable zoom |
| 6 | Typography & Color | MEDIUM | Base 16px, line-height 1.5, Semantic tokens | Text <12px, Gray-on-gray, Raw hex in components |
| 7 | Animation | MEDIUM | 150–300ms, Transform/opacity only | Animating width/height, No reduced-motion support |
| 8 | Forms & Feedback | MEDIUM | Visible labels, Error near field, Submit feedback | Placeholder-only label, Errors only at top |
| 9 | Navigation | HIGH | Predictable back, Bottom nav ≤5, Deep linking | Overloaded nav, Broken back behavior |
| 10 | Charts & Data | LOW | Legends, Tooltips, Accessible colors | Color-only meaning |

## Critical Rules for This Project (Glassmorphism Gov Portal)

### Glassmorphism Specifics
- Every card/panel/modal: `backdrop-filter: blur(20px)` + `background: rgba(255,255,255,0.08)` + `border: 1px solid rgba(255,255,255,0.18)`
- Background gradient mesh only — NEVER use image files for backgrounds
- Light mode uses `#eef2ff` base (soft lavender-blue), NOT plain white — preserves premium aesthetic
- Inner glass platters: `rgba(255,255,255,0.14)` with heavier `blur(40px)` for depth layering
- Theme via `html[data-theme="dark|light"]` ONLY. Never `body.classList` or `html.light-mode`.

### SPA Shell Rules
- Sidebar NEVER reloads. Only `#mainContent` div is swapped via `fetch()`
- Active menu item always highlighted; sidebar state preserved during navigation
- Content swap: `opacity` fade-in + `translateY(4px→0)` at 200–280ms ease-out
- Sidebar lock state in `localStorage('sidebarLocked')`; mobile → bottom-sheet drawer

### Bilingual UI
- ALL UI text must have Hindi + English versions
- Form labels: Hindi first, English below or parenthetical
- Error messages and status labels also bilingual
- RTL-safe layout (no hardcoded left/right directional styles — use logical properties where possible)

### Form Design Rules
- Multi-column grid for data entry: `grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`
- Minimum scroll; fields spread across full width
- Required fields: asterisk + `aria-required="true"`
- Error: below the field, red glow on input border, bilingual message
- Submit button: loading spinner state during async; success/error state after
- Mobile input height ≥44px

### Animation Rules for This Stack (Blazor + Razor)
- Use CSS transitions only for most interactions (Blazor re-render timing is unpredictable for JS animations)
- `theme-toggle.js` handles all theme transition — do NOT add duplicate transition JS
- Content area swap: pure CSS `opacity` + `transform` via class toggle
- Duration: 150–280ms, ease-out entering, ease-in exiting

### Accessibility (Government Portal — High Priority)
- All form fields: `<label for="">` not placeholder-only
- All icon-only buttons: `aria-label` required
- Color contrast: dark mode text ≥4.5:1, secondary text ≥3:1
- Keyboard navigation: all interactive elements reachable via Tab, logical order
- Status badges: don't use color alone — always include text label

### Pre-Delivery UI Checklist
- [ ] No emojis as icons — use SVG (Heroicons / Lucide / custom inline SVG)
- [ ] All touch targets ≥44×44px
- [ ] Glassmorphism depth present (blur + transparency + border + shadow on every surface)
- [ ] Both dark and light themes tested
- [ ] Bilingual labels on all user-facing text
- [ ] No raw hex in components — all CSS variables from `dcr-cmis.css`
- [ ] Forms use multi-column grid, no unnecessary scrolling
- [ ] Submit/async actions have loading + feedback states
- [ ] Sidebar does not reload on navigation

---

# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# PART 4 — SESSION PROMPT TEMPLATES
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

## SESSION START PROMPT (paste this + attach project zip + this MD file)
```
You are continuing the DCR-CMIS project. Account [A_X], Session [S_X].

Step 1 — Pull brain:
git clone https://YOUR_PAT@github.com/abhishek1chandra-code/claude-brain.git /tmp/brain && cat /tmp/brain/PROJECT_BRAIN.md

Step 2 — Confirm: Current phase · Last completed items · NEXT SESSION task

Step 3 — Extract uploaded project zip to /tmp/project/

Step 4 — Read DCR-CMIS-MASTER-KIT.md (this file) for full context on decisions, blueprint, UI rules.

Step 5 — Proceed immediately on NEXT SESSION task. No clarifying questions unless two valid technical paths exist.

RULES:
- Always deliver the COMPLETE PROJECT ZIP at session end (not just changed files)
- Push updated PROJECT_BRAIN.md to brain repo at session end
- Token monitoring: at ~70% context, prepare handoff
- Extended thinking: OFF
```

## SESSION END PROMPT (paste when approaching token limit)
```
Session ending. Before finishing:
1. Update /tmp/brain/PROJECT_BRAIN.md with: completed items, decisions made, NEXT SESSION task
2. git add PROJECT_BRAIN.md && git commit -m "A[X]S[X]: [summary]" && git push
3. Package full project zip → DCR-CMIS-CHECKPOINT-A[X]S[X].zip
4. Present the zip for download
```

## EMERGENCY HANDOFF PROMPT (if session fails mid-task)
```
Session failed mid-task. State: [describe what was being worked on and where it stopped].
Files modified so far: [list].
Error/blocker: [describe].
NEXT SESSION must: [specific continuation steps].
Push whatever brain state exists, package whatever files are complete.
```

---

*Master Kit Version: A3S3-FINAL | Updated: April 15, 2026*  
*Next update: after A4S1 build fixes are complete*
