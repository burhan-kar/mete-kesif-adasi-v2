# GERÇEK 3D PİLOT — HAYVAN BAKIM MERKEZİ
Başlangıç: 2026-10-28 | Durum: Tasarım ve bağımlılık incelemesi, henüz model entegrasyonu yok.

## Amaç
Pati adlı **gerçek 3D** GLB köpek karakterini, kullanıcı hareketlerine cevap veren animasyonlarla, mevcut Phaser v2 sitesini bozmadan çalışan pilot üzerinde test etmek.

## Teknoloji
- Mevcut oyun: Phaser 3.90 (2D, korunacak)
- Pilot: Three.js + WebGLRenderer + GLTFLoader + AnimationMixer; glTF/GLB.
- Asset pipeline: Çok-açılı concept -> Tripo/Meshy -> Blender rig/texture/optim -> .glb.
- UI/progres: Phaser ile olan arayüz sonra ortak yaşam; pilot öncelikle ayrı `pilot-3d/index.html` içinde bağımsız test edilir.
- 3D dosya için `assets/characters/pati/pati_v01.glb`, animasyonlar `Idle`, `Happy`, `Wash`, `Feed`, `Pet`, `Celebrate`.
- İlk versiyonda animasyon klipleri modelle birlikte gelir; game loop içinde dosyaya referansla tetiklenir.

## Deneyim
1. İlk dokunuşla oyun/ses aktif.
2. Pati ekrana doğru bakar; göz kırpma ve nefes alma idle.
3. Sünger sürüklenince modelin üstündeki hedef alan hit-test edilir; Wash animasyonu ve partikül.
4. Mama sürüklenince Feed animasyonu.
5. Sevgiyle dokunulunca Pet animasyonu, yüze dönme ve kalp.
6. Tüm görevler bitince Celebrate animasyonu ve yıldız.
7. Haritaya dönüş ve kayıt mevcut oyunla tutarlı.

## Teknik performans testleri
- Ölçümlü hedef: düşük/orta Android telefonlarda en az 30 fps; desteklenen cihazlarda 60 fps.
- GLB tek karakter dahil yükleme verisi ve texture bellek ölçülecek; başlangıç hedefi pilot karakterin sıkıştırılmış varlık setinin yaklaşık 3–8 MB aralığında olması, kalite bozulursa tekrar değerlendirilecek.
- GLB üzerindeki gereksiz mesh/bone/texture kaldırılır, 1K–2K texture atlas tercih edilir.
- AnimationMixer, render alanı görünmez olduğunda pause.
- WebGL olmayan cihaz için basit 2D fallback.
- Parlaklığı ve ses çıkışını çocuklar için yumuşak tut.
- Tüm üretim kaynakları ve commercial license kaydı yapılacak.

## Giriş/çıkış kontrol listesi
[ ] 4 açıdan özgün onaylı karakter taslağı
[ ] İndirilebilir, orijinal, uygun lisanslı GLB dosyası
[ ] Model Blender'da açılıyor, 360 derece doğru yüzey
[ ] Rig ve animasyonlar var, mesh bozulmuyor
[ ] Üretim prompt/versiyon/dosya boyutu kaydı
[ ] Three.js çalışan ayrı pilot bağlantısı
[ ] Mobil Chrome/iOS Safari gerçek test sonuçları
[ ] Çocuk gelişimi ve ses kriterleri onayı
[ ] Mevcut Phaser oyunu regresyon kontrolü

## Başarısızlık kriterleri
Sadece 2D PNG veya SVG görüntü, sprite'ın yukarı-aşağı hareket etmesi, AI video klibin oynatılması veya tek bir konsept kolajının arka plan olarak kullanılması 3D interaktif oyun kabul edilmez.
