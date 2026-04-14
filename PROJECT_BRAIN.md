# PROJECT BRAIN — DCR-CMIS
## Status: ACTIVE
## Phase: OFFICER PORTAL DATA WIRING (after build fix)
## Repo: abhishek1chandra-code/claude-brain
## Last checkpoint: A3S3-FINAL (April 15, 2026)
## Account Rotation: A1→A2→A3…A10→A1 (4hr cooldown each)
## MASTER KIT: DCR-CMIS-MASTER-KIT.md (in this repo — attach with every session zip)

---

## NEXT SESSION — A4 S1

### PRIORITY 1: Fix build errors FIRST
**Index.cshtml.cs** — Add missing [BindProperty] properties:
RegPassword, RegConfirmPassword, RegFatherName, RegBlock, RegPanchayat, RegVillage, RegAltMobile, RegPinCode, RegAadhaarNo, RegAddress, LocalBodiesJson, VillagesJson

**Pages/Public/_Layout.cshtml** — Fix broken Razor if/else block (lines ~15-60):
- RZ1034: malformed <body> tag — check for unclosed Razor expression in body attributes
- RZ1006: else block missing closing } (lines 17 and 37)
- RZ1010: unexpected @{ inside code block (line 47) — remove extra @
- RZ1026: unmatched </body></html> (lines 60/61) — fix the unclosed block above

**Pages/Public/Index.cshtml** — Fix Razor control-flow syntax:
- RZ1008 lines 667/669: single-statement control-flow contains markup — wrap with { }
- RZ1005 lines 670-676: ":" not valid at start of code block — fix @if/@switch syntax

### PRIORITY 2: Fix warnings
- FieldController.cs line 79: CS8604 null remarks — add ?? string.Empty
- Officer/Index.cshtml.cs line 42 + ControlRoom/Index.cshtml.cs line 51: CS0109 remove `new` keyword from CurrentPage
- OfficerDashboard.razor.cs line 57, LocalBodies.razor.cs line 41, PoliceStations.razor.cs line 37, RevenueVillages.razor.cs line 38: CS0168 unused `ex` — either discard catch or log it

### PRIORITY 3: Feature work (after build clean)
- OfficerDashboard.razor + .razor.cs: wire real complaints (filter by officer userId via AdminComplaintService)
- OfficerMobile.razor: wire GPS check-in → GpsService.RecordCheckInAsync()
- OfficerPerformance.razor: wire real metrics → AdminComplaintService.GetOfficerPerformanceAsync()

---

## COMPLETED (A3S3-FINAL)
- CSS UNIFICATION 100% COMPLETE
- public.js dead code removed
- All pages audited — zero glass-theme.css / html.light-mode / body.classList.toggle refs
- Full details in DCR-CMIS-MASTER-KIT.md (Part 1)

## DO NOT CHANGE
Backend (Domain/Application/Infrastructure/API), EF migrations, JWT/OTP auth, Complaint number format JHB-YYYY-NNNNNN, Hindi default language, Jehanabad seed data
