# Mete Game Studio AI — repo working instructions
This repository is the **new** Mete'nin Keşif Adası version. NEVER modify `burhan-kar/kids-oyun`.

Read before working: `PROJE-YOL-HARITASI.md`, `UZMAN-AJAN-IS-AKISI.md`, `URETIM-TAKIBI.md`, `ARAC-ARASTIRMASI-2026-10.md`.

## Expert hats
Technical Lead (Phaser/Three.js), 3D Art Director, Animation Designer, Child Development/Educational Design, Turkish Audio Lead, QA/Accessibility/Safety. These are review roles, not separately autonomous runtime workers.

## Product goals
Original Turkish children's educational island game ages 4–7, comparable in polish and joy to leading kids' apps but no copying of Lingokids assets, characters, audio or branding. First target is a real rigged, textured and animated **dog** model and a Three.js + GLB test scene; maintain a working Phaser baseline.

## Engineering rules
- Never call procedural vector/emoji art 'professional 3D'.
- Preserve the current published game while developing new 3D pilots.
- Keep all API keys and subscription credentials out of static site, GitHub, browser source.
- Default to no child accounts, tracking, ads or collecting personal data.
- Include license/provenance for every external asset.
- Mobile-first, 30fps+ minimum target on tested low devices, load/bundle measured, gentle audio, large touch zones, spoken instructions, no punitive mistakes.
- Mark tasks 'completed' only after real assets/code exist AND are verified.
- Update tracking and release notes after code changes; report concise Turkish progress.
