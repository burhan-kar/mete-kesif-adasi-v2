# P0 — Pati dört açı konsept: uzman kalite kapıları
**Tarih:** 28.10.2026  
**İş:** Pati için 4 açılı özgün 2D modelleme referansı (FAZ 1 giriş çıktısı)  
**Durum:** **TESTTE**; nihai sanat onayı, profesyonel 3D model ve mobil test yapılmadı.  
**Teslim:** `assets/concepts/pati-model-sheet-v01.svg` ve `docs/licenses/PATI-KONSEPT-V01.md`  
**Kaynak:** Proje `docs/3D-SANAT-KILAVUZU.md`; dış varlık yok; maliyet 0 TL.

## Sıralı altı uzman rolü değerlendirmesi
| Rol | Kontrol | Kanıt | Sonuç |
| --- | --- | --- | --- |
| 1. Teknik lider | Ana Phaser dosyalarına dokunmadan, ayrı konsept varlığı; SVG yapısal kontrolü | Yalnızca yeni dalda SVG, test ve belge; `scripts/validate-pati-concept.mjs` | **TESTTE** — CI/gerçek ekran görüntüsü kontrolü bekleniyor |
| 2. 3D sanat yönetmeni | Özgün palette dört açı, değişmeyen krem göğüs/dark-sol-kulak/kuyruk ucu | Dört etiketli görünüm ve renk anahtarı | **TESTTE** — çizim 2D taslak; kullanıcı sanat onayı ve 3D kalite yeterliliği bekleniyor |
| 3. Animasyon yönetmeni | Kemik hiyerarşisi, ağırlıklar, Idle/Happy/Wash/Feed/Pet/Celebrate | Bu dosya SVG; animasyon/rig içermez | **BLOKE** — GLB ve deformasyon testleri sonraki faz |
| 4. Çocuk gelişimi | Sevimli ve tehdit oluşturmayan ifade, görsel ayırt edicilik | Büyük gözler, yumuşak hatlar, kontrast yüz bölgeleri | **TESTTE** — hedef yaş çocuklarla gerçek gözlem yapılmadı |
| 5. Türkçe ses | Yumuşak yönerge, mute, ilk dokunuş | Bu statik referansta ses bulunmaz | **UYGULANMAZ** — ses kalitesi kabul kapısı henüz geçilmedi |
| 6. QA/erişilebilirlik/gizlilik | SVG title/desc, betik/dış URL yok, kaynak bildirimi, dört panel | Sıfır bağımlılıklı Node denetleyicisi ve varlık manifesti | **TESTTE** — otomatik kontrol sonuçları ve telefon/masaüstü görsel kontrolü bekleniyor |

## Kapı kararları
- **ART / GATE-1:** Taslak üretildi; **GEÇMEDİ**. Dört görünümün özgünlüğü ve görsel tutarlılığı sanat onayına sunulmalı. Beş maskot kalite uyumu ayrıca gereklidir.
- **3D / GATE-2:** **GEÇMEDİ**. Mesh, rig ve GLB oluşturulmadı.
- **ANIM / GATE-2:** **GEÇMEDİ**. Animasyon klibi yok.
- **EDU / GATE-3:** **TESTTE**. Çocuğa gösterilmiş veya işlevsel görev eklenmiş değil.
- **AUDIO / GATE-4:** **UYGULANMAZ**. Yeni ses üretilmedi.
- **TECH / GATE-5:** Oyun kodu değiştirilmedi; **CI, gerçek cihaz ve regresyon testleri yapılmış sayılmaz**.
- **PRIVACY:** Varlık yalnızca yerel SVG; izleme, çocuk verisi veya üçüncü taraf API çağrısı yok.

## Sonraki adım
1. Pati'nin oranları, krem göğsü, koyu sol kulağı ve dört açısı için tasarım onayı/revizyonu.
2. Onaylı tasarımdan indirilebilir gerçek GLB model; Blender ile geometri, UV, rig, animasyon testi.
3. Three.js ayrı pilot, 30 fps hedefli cihaz ölçümü ve Phaser regresyonu.

**Not:** Bu rapor otomatik ve tasarım odaklı kontrol listesi kullanır; gerçek bir insan uzmanla görüşme veya profesyonel kullanıcılı test yapıldığını iddia etmez.
