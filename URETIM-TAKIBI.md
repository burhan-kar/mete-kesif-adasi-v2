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
- **Kabul kanıtı:** 4 ayrı açı, SVG başlık/açıklama, renk/morfoloji anahtarı ve bağımlılıksız test kaynağı commit edildi; CI ve cihazda görsel onay sonucu raporlanana kadar **TESTTE**.
- **Roller:** Teknik TESTTE, sanat TESTTE, animasyon BLOKE (rig/GLB yok), çocuk gelişimi TESTTE, ses UYGULANMAZ, QA TESTTE.
- **Maliyet ve kaynak:** 0 TL; dış içerik/abonelik/çocuk verisi kullanılmadı. Bu dosya **gerçek 3D karakter değil**, yalnızca 2D üretim referansıdır.
- **Sonraki blokaj:** Karakter tasarım onayı; ardından Blender/GLB, animasyon ve gerçek cihaz ölçümleri. Onay almadan premium kalite veya pilot tamamlandı demiyoruz.

## Sırada (öncelik sıralı)
- [ ] P0 Köpek 3D karakter konseptini 4 açıdan tutarlı üret ve onayla — **taslak üretildi, TESTTE; tasarım onayı bekleniyor**
- [ ] P0 GLB model üret, modelin gerçek kullanılabilirliğini test et
- [ ] P0 Blender'da mesh/UV/rig/topoloji/animasyon kontrolü
- [ ] P0 Three.js küçük pilotu oluştur, animasyonları test et
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
