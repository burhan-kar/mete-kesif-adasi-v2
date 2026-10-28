# METE'NİN KEŞİF ADASI 3.0 — PROFESYONEL ÜRETİM YOL HARİTASI
Son güncelleme: 2026-10-28 | Durum: PLAN ONAY İÇİN HAZIR / PİLOT HAZIRLIĞI

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

### FAZ 2 — Gerçek 3D pilot [PLANLANDI]
- [ ] Köpeğin GLB/GLTF modeli (yüklenebilir, kemikli/rigli, materyalli)
- [ ] Idle, mutlu, yıkanma, beslenme, sevilme, kutlama animasyonları
- [ ] Three.js prototipinde dokunma, sürükle-bırak ve kamera
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
