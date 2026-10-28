# Pati — 3D Pilot v0.1 Uzman Kalite İncelemesi
**Tarih:** 28.10.2026 • **Durum:** TESTTE — aşamalar otomatik kontrolden geçmeden tamamlandı sayılmaz.

| Uzman rolü | Kontrol | Sonuç |
|---|---|---|
| 1 Teknik | Gerçek glTF 2.0 GLB, skinned mesh, 11 bone, texture, bağımsız Three.js pilot, mevcut Phaser'e dokunmama | Yerel GLB parse PASS; GitHub CI ve browser yükleme TESTTE |
| 2 3D sanat | Pati'nin karamel/krem paleti, koyu sol kulak, sevimli yuvarlak form | Prosedürel 3D prototip; sanat onayı ve heykel/mesh cilası TESTTE |
| 3 Animasyon | Idle, Happy, Wash, Feed, Pet, Celebrate; eklem bazlı keyframe'ler | Altı skeletal klip mevcut; gerçek cihazda deformasyon/klip geçişi TESTTE |
| 4 Çocuk gelişimi | 4–7 yaş, tek hedef, 3 sakin bakım eylemi, en az 64px buton, cezasız oynama | Tasarım kontrolü PASS; çocukla test yapılmadı |
| 5 Türkçe ses | Cihaz Web Speech, varsayılan sessiz, ilk kullanıcı jesti, tekrar butonu, düşük ton | Kod var, gerçek ses cihaz testi TESTTE |
| 6 QA/Gizlilik | 2D güvenli görünüm, reklam/analiz/çocuk verisi yok, MIT bağımlılık kaydı | Kod incelemesi PASS; Android+iPhone ve Windows Chrome TESTTE |

## Gerçek ölçüm ve teknik durum
- Yerel Node.js üreticiyle 570.520 bayt GLB, **11 bone, 6 animasyon, 10 materyal, yerleşik 32×32 texture**, 14.080 üçgen üretildi.
- Python `trimesh` 10 geometri grubunu başarıyla 3D scene olarak yükledi; GLB magic ve chunk doğrulandı. Bunlar **browser render veya Blender deformasyon testi değildir.**
- Üretilen kemikler rig/skin bağlarına sahiptir; vertex ağırlıkları **rijit 1.0**. Profesyonel yumuşak skin deformation bu fazda sağlanmadı.
- Blender ortamda kurulu olmadığından UV ve rigging Blender UI testi yapılmadı.
- GitHub Actions sonucu ayrıca kaydedilecek; `node scripts/validate-pati-glb.mjs` GLB yapısını denetler.
- Pilot Three.js modüllerini jsDelivr üzerinden indirir; çevrimdışı çalışması garanti edilmez. Gerekirse self-hosted yerel MIT dağıtımı eklenmeli.
- Mobil FPS, bellek, 2D fallback görünümü, animasyon doğal görünümü ve erişilebilirliği **henüz ölçülmedi**.

## Sıradaki kalite kapısı
Android Chrome ve iOS Safari gerçek cihaz görüntü testi + Blender model/animasyon geçişi, görsel stil ve çocuk kullanıcılı gözlem. Beş bölümlü Phaser v2'yi değiştirmeden yürütülür. Ücretli işlem yok.
