# METE'NİN KEŞİF ADASI — CANLI İŞ TAKİBİ
Güncelleme: 2026-10-28

## Tamamlandı
- [x] Mevcut Phaser oyununda 5 dünya, temel soru ve bakım mekanikleri bulunuyor
- [x] SVG maskotlar, yıldız sistemi, temel ses düğmesi, harita var
- [x] Mevcut teknik durum incelendi; 2D ve gerçek 3D farkı belirlendi
- [x] 6 uzman rolü, üretim kalitesi ve çocuk gelişimi kapıları oluşturuldu
- [x] 3D/animasyon/ses araçları için resmi sayfa araştırması tamamlandı
- [x] Yol haritası ve araç araştırması GitHub'da saklandı
- [x] Mete Game Studio AI özel ChatGPT uzman iş akışı eklentisi oluşturuldu (v0.1.0); kullanım için kullanıcının eklentiyi açması/etkinleştirmesi gerekebilir
- [x] Özgün 3D sanat kılavuzu, beş maskot taslağı ve gerçek 3D teknik pilot kabul kriterleri belgelendi

## Üretim kanıtı (2026-10-28)
- GitHub: AGENTS.md, PROJE-YOL-HARITASI.md, UZMAN-AJAN-IS-AKISI.md, ARAC-ARASTIRMASI-2026-10.md, URETIM-TAKIBI.md, docs/3D-SANAT-KILAVUZU.md, docs/GERCEK-3D-PILOT-TEKNIK-PLANI.md dosyaları oluşturuldu.
- ChatGPT: Mete Game Studio AI v0.1.0, özel plugin, dosyaları tekrar listelenerek doğrulandı.
- Bu çalışma sırasında herhangi bir üçüncü taraf ücretli abonelik açılmadı ve gerçek 3D GLB karakter henüz üretilmedi.

## 28.10.2026 — P0 Pati dört açı referansı (TESTTE)
- **Görev:** Pati'nin dört görünümünü özgün, değiştirilebilir vektör konsept olarak üretmek (FAZ 1 taslak).
- **Gerçek çıktı:** `assets/concepts/pati-model-sheet-v01.svg` (ön, sol profil, arka, 3/4); `docs/licenses/PATI-KONSEPT-V01.md`; `docs/reports/PATI-KONSEPT-QA-2026-10-28.md`; `scripts/validate-pati-concept.mjs` ve GitHub Actions kontrolü.
- **GitHub geliştirme dalı:** `studio/p0-pati-four-view-concept-2026-10-28` — ana Phaser oyununun `index.html` / `game.js` dosyaları değiştirilmedi.
- **Kabul kanıtı:** 4 ayrı açı, SVG başlık/açıklama, renk/morfoloji anahtarı ve bağımlılıksız test kaynağı commit edildi; GitHub Actions yapısal testi **SUCCESS** ([run 40658346341](https://github.com/burhan-kar/mete-kesif-adasi-v2/actions/runs/40658346341)); cihazda görsel ve tasarım onayı beklediği için **TESTTE**.
- **Roller:** Teknik SVG/CI PASS (3D test yok), sanat TESTTE, animasyon BLOKE (rig/GLB yok), çocuk gelişimi TESTTE, ses UYGULANMAZ, QA TESTTE.
- **Maliyet ve kaynak:** 0 TL; dış içerik/abonelik/çocuk verisi kullanılmadı. Bu dosya **gerçek 3D karakter değil**, yalnızca 2D üretim referansıdır.
- **Sonraki blokaj:** Karakter tasarım onayı; ardından Blender/GLB, animasyon ve gerçek cihaz ölçümleri. Onay almadan premium kalite veya pilot tamamlandı demiyoruz.

## 28.10.2026 — P0 gerçek GLB ve ayrı bakım pilotu (TESTTE; GLB CI PASS)
- **Görev:** Ücretsiz gerçek 3D Pati prototipi ve bağımsız Three.js sahnesi; profesyonel son model iddiası yok.
- **Kaynak dosya:** `scripts/generate-pati-glb.mjs` (standart Node.js; tekrarlanabilir, dış model/ücretli API yok).
- **Gerçek ikili varlık:** `assets/characters/pati/pati_v01.glb` — **570.520 bayt**, 11 eklemli iskelet, 10 materyal grubu, yerleşik prosedürel PNG doku, 6 klip (Idle/Happy/Wash/Feed/Pet/Celebrate).
- **Pilot ve test:** `pilot-3d/index.html`, `pilot-3d/pilot.js`, `scripts/validate-pati-glb.mjs`; `docs/reports/PATI-3D-PILOT-QA-2026-10-28.md`; `docs/licenses/PATI-3D-PILOT-V01.md`.
- **Otomatik kanıt:** [GitHub Actions run 40677305473](https://github.com/burhan-kar/mete-kesif-adasi-v2/actions/runs/40677305473) **SUCCESS** — generator açıldı, GLB gerçek binary üretildi, skin/texture/animasyon doğrulandı, pilot JS sözdizimi ve önceki konsept denetimi geçti. GLB commit: `b0dbd183c41084b594ba1b3f8e970fe6e7a247a2`.
- **Uzman kontrol kapıları:** Teknik GLB ikili/yapı **PASS**; sanat **TESTTE** (yumuşak mesh ve cilalı profesyonel stil yok); animasyon **TESTTE** (gerçek render/deformasyon); çocuk gelişimi tasarım **PASS / kullanıcı testi bekliyor**; ses **TESTTE** (cihaza bağlı Web Speech); QA güvenlik **PASS / mobil FPS-bellek TESTTE**.
- **Önemli sınır:** Blender sistemde kurulu olmadığından gerçek Blender rig/UV kontrolü yapılmadı; Android Chrome, iOS Safari ve Windows Chrome ekran görüntüsü, ses, performans ve 5 dünya regresyon testleri henüz yapılmadı. GitHub Pages `main` hâlâ eski Phaser oyununu sunar; yeni pilot yalnız geliştirme dalındadır.
- **Maliyet / veri:** 0 TL yeni harcama, Three.js MIT ve özgün kod/asset; reklam, analiz, çocuk verisi veya ücretli servis yok.
- **Sonraki adım:** Ayrı pilotun gerçek tarayıcı/telefon testi; kaliteli sanat üretim standardı ve Blender deformasyon değerlendirmesi; ardından kontrollü ana oyuna entegrasyon.

## 28.10.2026 — 2D yedek mod ve çocuk bakım akışı QA (PASS: otomatik / TESTTE: gerçek tarayıcı)
- **Risk düzeltmesi:** Three.js CDN indirmesi başarısız olduğunda boş sayfa yerine 2D Pati görünümü ve çalışır Yıka → Besle → Sev akışı.
- **Çıktı:** `pilot-3d/index.html` çevrimdışı bağımsız bakım kodu, `pilot-3d/pilot.js` modül hazır işareti, `scripts/validate-pati-fallback.mjs` test senaryosu ve `.github/workflows/pati-pilot-static-qa.yml`.
- **CI kanıtı:** [GitHub Actions #40677878489](https://github.com/burhan-kar/mete-kesif-adasi-v2/actions/runs/40677878489) **SUCCESS** (GLB rig/clip/texture, pilot JS, 2D akış, 0/3→3/3, ses düğmeleri, konsept kalite testi).
- **Cihaz sınırı:** Bu ortamda Chromium ağ ve dosya erişimi engellendiği için canlı tarayıcı testi yapılamadı; Windows/Android/iPhone gerçek arayüz testi **TESTTE**. Erişilebilirlik otomatik yapı kontrolleri gerçek kullanıcılı denetimin yerini tutmaz.
- **Maliyet:** 0 TL; ücretli işlem yok.

## Sırada (öncelik sıralı)
- [ ] P0 Köpek 3D karakter konseptini 4 açıdan tutarlı üret ve onayla — **taslak üretildi, TESTTE; tasarım onayı bekleniyor**
- [x] P0 GLB dosyasını üret ve ikili/skin/animasyon yapısını test et — **GitHub CI PASS**; gerçek tarayıcı kullanılabilirlik testi ayrıca **TESTTE**
- [ ] P0 Blender'da mesh/UV/rig/topoloji/animasyon kontrolü
- [ ] P0 Three.js küçük pilotu oluştur, animasyonları test et — **pilot kodu commit edildi, statik JS CI PASS; tarayıcı görsel/animasyon TESTTE**
- [ ] P0 Orta seviye Android + iPhone Safari gerçek cihaz testi
- [ ] P1 Tam hayvan bakım mini oyunu 3D pilot entegrasyonu
- [ ] P1 Türkçe yönerge ve özel ses efektleri
- [ ] P1 Çocuk gelişi̇mi kontrolü ve aile kullanım denemesi
- [ ] P2 Dört ek dünyayı aynı kaliteye taşıma
- [ ] P2 Yayın, güvenlik, lisans, erişilebilirlik ve performans denetimi

## Durum sözlüğü
PLANLANDI = henüz yapılmadı
ÜRETİMDE = mevcut sohbet veya tanımlı dış görev içinde aktif olarak çalışılıyor
TESTTE = ürün var, kabul kriterleri ölçülüyor
TAMAMLANDI = kod ve varlık gerçekten üretildi, kaydedildi, test edildi
BLOKE = kullanıcı izni, hesap, ödeme veya teknik erişim gerekiyor

## Açık kararlar
- Birinci 3D aracı: Meshy vs Tripo, ücretsiz deneme çıktılarına göre
- 3D vs 2.5D dağıtım: gerçek performans verisi sonrası
- Ücretli abonelik: Pilot modeli mevcut ortamda üretmek mümkün olmazsa kullanıcı onayıyla

## Her görevde kaydedilecekler
Tarih / görev / araç / kaynak varlık / commit SHA / test cihazı / test sonucu / lisans / yeni durum.
