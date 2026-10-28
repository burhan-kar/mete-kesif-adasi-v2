# Pati 3D Pilot v0.1 — üretim kaynağı, lisans ve sınırlamalar
Tarih: 2026-10-28. Durum: **TESTTE**.

- **GLB:** `assets/characters/pati/pati_v01.glb` — orijinal glTF 2.0 skinli köpek teknik modeli, 11 kemik, 6 animasyon; 10 materyal, yerleşik 32×32 prosedürel PNG doku; lisanslı üçüncü taraf mesh/3D karakter kullanılmadı.
- **Üretici:** `scripts/generate-pati-glb.mjs` — özgün, tekrarlanabilir ve çevrimdışı Node.js standart kütüphane üretimi; ücretli abonelik, API anahtarı veya model sunucusu gerektirmez.
- **Animasyonlar:** Idle, Happy, Wash, Feed, Pet, Celebrate; glTF eklem kanallarına bağlıdır.
- **Pilot:** `pilot-3d/index.html` + `pilot-3d/pilot.js` — özgün Türkçe bakım etkileşimi, 2D fallback, ses aç/kapat, tekrar, tek görev, 64px üzeri kontroller. Ana Phaser oyunu değiştirilmez.
- **Kullanılan üçüncü taraf kod:** Three.js ve GLTFLoader, MIT lisansı: https://github.com/mrdoob/three.js/blob/master/LICENSE (CDN sürümü: `0.180.0`). İnternet erişimi yalnızca Three.js modüllerini yüklemek için gerekir; runtime çocuk verilerini hiçbir servise göndermez.
- **Ses:** Ses kayıtları/ses sanatçısı yok; izin verilen kullanıcı etkileşiminden sonra cihazın Web Speech API'si ile Türkçe ses ve düşük WebAudio ton. Desteklenmiyorsa sessiz çalışır.
- **Durum:** Bu **gerçek ve dokulu 3D GLB teknik prototiptir**, ancak nihai profesyonel heykel, organik skin ağırlıkları ve cilalı animasyon kalite eşiği **GEÇİLMEDİ**.
- **Açık QA:** Blender içinde rig/UV/deformasyon incelemesi; Android Chrome ve iPhone Safari 30fps/bellek, tarayıcı GLTFLoader çalışması, çocuk kullanıcılı test, 5 dünya regresyonu.
- **Maliyet:** $0 yeni harcama; yalnızca ücretsiz özgün kod + MIT açık kaynak. Cloud API anahtarı, reklam, hesap veya ödeme yok.
