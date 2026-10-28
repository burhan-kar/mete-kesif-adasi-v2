# METE'NİN KEŞİF ADASI 3.0 — PROFESYONEL ÜRETİM YOL HARİTASI
Son güncelleme: 2026-10-28 | Durum: FAZ 2 TEKNİK GLB/THREE.JS PİLOT TESTTE (main v2 oyunu korunuyor)

## Hedef
4–7 yaşa uygun, Türkçe seslendirmeli, kaliteli, orijinal karakterli, çocuk merkezli bir keşif oyunu. Referans kalite: Lingokids kadar akıcı ve özenli bir deneyim; karakter, logo, arayüz ve sesler özgün olacaktır. Gerçek 3D karakterlerle animasyon hedeflenir; statik konsept görselleri gerçek 3D model sayılmaz.

## Mevcut durum — doğrulanmış depo incelemesi
- Repo: burhan-kar/mete-kesif-adasi-v2, GitHub Pages.
- Oyun: Phaser 3.90, index.html ve game.js, oyun mantığı ve yıldız kaydı localStorage ile mevcut.
- 5 bölüm: Hayvan Bakımı, Çiftlik, Orman, Deniz, Veteriner.
- Bazı SVG maskotlar ve JS çizimleri mevcut; yüksek kaliteli karakter modelleme/rigging/3D animasyon yok.
- Ses: Web Audio ile temel sentez efektleri; gerçek stüdyo efektleri, seslendirme ve müzik henüz yok.
- Proje açık kaynak deposu üzerinden yayınlanıyor; eski burhan-kar/kids-oyun deposuna DOKUNMA.
- Sorun: Phaser kendiliğinden gerçek 3D sahne/animasyon motoru değil; mevcut 2D kodu doğrudan 3D'ye yükseltemeyiz.
- Görsellerin ve uygulamanın gerçek cihazlarda performansı henüz test edilmiş sayılmamalı.

## Mimari karar
**Çift hatlı geliştirme:** Var olan Phaser oyunu stabil ve oynanabilir olarak kalacak. Ayrı bir 3D pilot sahne Three.js + GLB/GLTF ile hazırlanacak. 3D karakterin tarayıcı ve telefonda kalitesi/perfomansı kabul edilirse tek bir mini oyuna entegre edilecek. Bütün oyunu sıfırdan yazma kararı ancak pilot testinden sonra verilecek. Rive, özellikle arayüz ve tepkisel 2D animasyonlar için adaydır; gerçek 3D model çözümünün tek başına yerine geçmez. Blender ana düzenleme, rig ve optimizasyon aracıdır.

## Fazlar ve kabul kriterleri
### FAZ 0 — Planlama ve sabitleme [TAMAMLANDI]
- [x] Mevcut mimari ve 5 alan tespit edildi
- [x] 6 uzman rolü ve kalite kapıları tanımlandı
- [x] Araçlar, maliyet/ücretsiz planlar, lisans riskleri araştırıldı
- [x] GitHub'da takip sistemi ve üretim yönergeleri oluşturuldu
- [ ] Referans konsept için karakter tasarım onayı / standart poz sayfası

### FAZ 1 — Profesyonel sanat yönü [SIRADAKİ]
- [ ] Özgün görsel kimlik ve karakter model sayfaları: köpek, inek, tilki, yunus, tavşan
- [ ] Her karakter için önden, yandan, arkadan ve 3/4 görünüm; ifade seti
- [ ] Tek bir 3D model üretim aracı seçilerek ücretsiz deneme
- [ ] Sanat yönetimi onayı: oranlar, renk, okunabilirlik ve telif
**Kabul:** 5 maskot arasında güçlü görsel tutarlılık ve orijinal marka dili.

### FAZ 2 — Gerçek 3D pilot [TEKNİK PROTOTİP ÜRETİLDİ; TESTTE]
- **28.10.2026:** Bağımsız `pilot-3d/` Three.js prototipi ve özgün `assets/characters/pati/pati_v01.glb` (11 bone, 6 animasyon, embedded texture) PR #1 geliştirme dalına kaydedildi; [ücretsiz CI başarılı](https://github.com/burhan-kar/mete-kesif-adasi-v2/actions/runs/40677305473). Prosedürel teknik model profesyonel görsel kalite kabulünü geçmez; Blender, canlı tarayıcı, Android ve iOS testleri **bekliyor**.
- [x] Köpeğin GLB/GLTF **teknik prototip** modeli (ikili yapı, kemik, materyal, texture CI PASS; 3D görsel kalite ayrıca TESTTE)
- [x] Idle, mutlu, yıkanma, beslenme, sevilme, kutlama animasyon kanalları (GLB CI PASS; deformasyon/gerçek oynanış TESTTE)
- [ ] Three.js prototipinde dokunma, sürükle-bırak ve kamera — **dokunma/bakım buton kodu var; sürükle-bırak ve tarayıcı QA henüz tamamlanmadı**
- [ ] Düşük/orta seviye mobil cihaz testi ve 2D fallback
**Kabul:** Yüksek kaliteli görsel görünüm, çalışır animasyon ve yanıt veren etkileşim. Hedef test bütçesi: düşük telefonlarda 30 fps, orta segmentte 60 fps hedefi; ilk yükleme ve bellek ölçülerek belirlenecek.

### FAZ 3 — Ses ve öğrenme sistemi [PLANLANDI]
- [ ] Türkçe yönergeler ve olumlu geribildirim sesleri
- [ ] Ses düzeyi, müzik aç/kapat, tekrar dinle, sessiz oynama
- [ ] Çocuk gelişimi gözden geçirmesi: yönergesiz keşif, tek görev odağı, 64 px+ dokunma alanı, hata cezası yok
- [ ] Oyuncuya yaşa uygun sade ilerleme; ebeveyn alanı ayrı

### FAZ 4 — Beş dünya üretimi [PLANLANDI]
- [ ] Köpek bakım merkezi (referans kalite şablonu)
- [ ] Çiftlik, orman, deniz, veteriner — ayrı özgün 3D mekanlar
- [ ] En az 3 anlamlı etkileşim/oyun per bölüm; sadece çoktan seçmeli quiz değil
- [ ] Ödüller, hikâye akışı, karakter tepkileri, yeniden oynanabilirlik

### FAZ 5 — Test ve yayın [PLANLANDI]
- [ ] Windows Chrome, Android Chrome ve iPhone Safari testleri
- [ ] Performans, dokunmatik, yatay/dikey ekran, ses ilk dokunuş ile başlama
- [ ] Yaş grubuna uygun oyun testleri; ebeveyn geri bildirimleri
- [ ] Veri minimizasyonu, üçüncü taraf izleme/çocuk verisi toplamama, ticari varlıkların lisans envanteri
- [ ] Sahne/ses/ikonların kullanılabilirliği ve sürüm günlüğü
- [ ] Stabil ana sürüm yayınlama, eski sürümü yedekleme

## Dosya standardı
assets/concepts/ — onaylı konsept
assets/characters/<name>/ — GLB, atlas, thumbnail
assets/environments/<world>/ — sahne varlıkları
assets/audio/voice|sfx|music/ — lisanslı sesler
docs/licenses/ — kaynak, plan, üretim tarihi, kullanım hakkı
docs/reports/ — pilot testleri, kalite kontrolleri
Her varlık manifestinde dosya adı, oluşturma aracı, lisans, prompt/referans, çözünürlük, poligon, animasyon ve test durumu yazılacak.

## Üretim ilkeleri
- Kod değişiklikleri küçük, doğrulanabilir commit'ler ve sürüm notlarıyla yapılır.
- Önce pilot, sonra ücretli abonelik. Otomatik ödeme/abonelik kullanıcı onayı olmadan YOK.
- Ücretli üretim çıktılarının lisansı aboneliğe ve gizlilik ayarına bağlı olabilir.
- Kullanıcıya yalnızca tamamlanan çalışmalar ve kritik kararlar raporlanır.
- Sohbet kapalıyken bu ajan kendi kendine çalışmaz. Uzun süreli otonomi gerektiğinde Codex/Work görevi ayrıca kurulacaktır.
