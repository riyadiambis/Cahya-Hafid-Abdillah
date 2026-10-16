// --- Skin / Theme Preference Initialization ---
try{var s=localStorage.getItem('hafid-skin');if(s==='green'||s==='light'||s==='dark'){document.documentElement.setAttribute('data-skin',s)}}catch(e){}

// --- Image Registry (Decoded Assets) ---
window.IMG = {
  "portrait_cut": "assets/img/portrait_cut.webp",
  "portrait_photo": "assets/img/portrait_photo.webp",
  "pr_insta": "assets/img/pr_insta.webp",
  "pr_gemini": "assets/img/pr_gemini.webp",
  "pr_nano": "assets/img/pr_nano.webp",
  "pr_putu": "assets/img/pr_putu.webp",
  "pr_goyang": "assets/img/pr_goyang.webp",
  "gsa_jacket": "assets/img/gsa_jacket.webp",
  "gsa_gemini": "assets/img/gsa_gemini.webp",
  "gsa_crowd": "assets/img/gsa_crowd.webp",
  "gsa_inaug": "assets/img/gsa_inaug.webp",
  "gsa_twibbon": "assets/img/gsa_twibbon.webp",
  "gsa_class": "assets/img/gsa_class.webp",
  "gsa_group": "assets/img/gsa_group.webp",
  "gsa_pelatihan": "assets/img/gsa_pelatihan.webp",
  "gsa_heart": "assets/img/gsa_heart.webp",
  "gsa_event": "assets/img/gsa_event.webp",
  "gsa_celebrate": "assets/img/gsa_celebrate.webp",
  "jtv_welcome": "assets/img/jtv_welcome.webp",
  "jtv_group": "assets/img/jtv_group.webp",
  "ig_pintar": "assets/img/ig_pintar.webp",
  "ig_einstein": "assets/img/ig_einstein.webp",
  "ig_freire": "assets/img/ig_freire.webp",
  "ig_penulis": "assets/img/ig_penulis.webp",
  "ig_belajar": "assets/img/ig_belajar.webp",
  "ig_perpus": "assets/img/ig_perpus.webp",
  "ig_c1": "assets/img/ig_c1.webp",
  "ig_c2": "assets/img/ig_c2.webp",
  "ig_c3": "assets/img/ig_c3.webp",
  "ig_c4": "assets/img/ig_c4.webp",
  "ig_c5": "assets/img/ig_c5.webp",
  "ig_c6": "assets/img/ig_c6.webp",
  "rm_medsos": "assets/img/rm_medsos.webp",
  "rm_hormuz": "assets/img/rm_hormuz.webp",
  "rm_ramadhan": "assets/img/rm_ramadhan.webp",
  "rm_ai": "assets/img/rm_ai.webp",
  "rm_norwegia": "assets/img/rm_norwegia.webp",
  "gh_1": "assets/img/gh_1.webp",
  "gh_2": "assets/img/gh_2.webp",
  "yt_1": "assets/img/yt_1.webp",
  "yt_2": "assets/img/yt_2.webp",
  "yt_3": "assets/img/yt_3.webp",
  "ill_lighthouse": "assets/img/ill_lighthouse.webp",
  "ill_person": "assets/img/ill_person.webp",
  "ct_felsi": "assets/img/ct_felsi.webp",
  "ct_possi": "assets/img/ct_possi.webp",
  "ct_jawapos": "assets/img/ct_jawapos.webp",
  "ct_copy": "assets/img/ct_copy.webp",
  "ct_gemini": "assets/img/ct_gemini.webp",
  "ct_host": "assets/img/ct_host.webp",
  "ct_fes": "assets/img/ct_fes.webp",
  "pg6": "assets/img/pg6.webp",
  "pg7": "assets/img/pg7.webp",
  "pg8": "assets/img/pg8.webp",
  "pg14": "assets/img/pg14.webp",
  "pg15": "assets/img/pg15.webp",
  "pg16": "assets/img/pg16.webp",
  "pg17": "assets/img/pg17.webp",
  "pg25": "assets/img/pg25.webp",
  "pg26": "assets/img/pg26.webp",
  "pg27": "assets/img/pg27.webp",
  "pg28": "assets/img/pg28.webp"
};

// --- Main Portfolio Logic & Interactions ---
(function(){
'use strict';
var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
var $ = function(s,r){return (r||document).querySelector(s)};
var $$ = function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};
var ICON = function(n){return '<svg class="i" aria-hidden="true"><use href="#i-'+n+'"/></svg>'};

/* ---------- Images ---------- */
function applyImages(root){
  $$('img[data-img]',root).forEach(function(im){
    var k=im.getAttribute('data-img'), src=window.IMG&&window.IMG[k];
    if(src && im.getAttribute('src')!==src){ im.setAttribute('src',src); }
    var a=im.getAttribute('data-alt'); if(a!==null){ im.setAttribute('alt',a); }
    im.decoding='async';
  });
}

/* ---------- Data ---------- */
var ROLES = [
  {org:'Rantau Mendunia Foundation', title:'Manager of Content Writer',
   body:'<p>Memimpin dan mengelola tim 7 orang dalam proses pembuatan, kurasi, manajemen brief, koreksi, hingga penerbitan konten berita, isu sosial, kesehatan, pemuda, SDGs, dan kisah-kisah inspiratif.</p><ul><li>Terlibat dalam pelatihan serta evaluasi mingguan dan bulanan.</li><li>Mampu membuat konten bulanan hingga 131,58%.</li></ul>'},
  {org:'PT Tumbuh Global Indonesia', title:'PIC of Content Writer (Growthhub)',
   body:'<p>Memimpin dan terlibat aktif dalam pembuatan konten pengembangan karier, SDGs, dan sumber daya manusia, melalui proses penyusunan ide, penulisan, koreksi, hingga penerbitan konten di Instagram dan LinkedIn.</p>'},
  {org:'Google Indonesia', title:'Google Student Ambassador 2026',
   body:'<p>Melakukan branding dan promosi penggunaan Google Gemini serta ekosistem Google melalui media sosial, lewat infografis dan video konten pendek sebanyak 3 konten per minggu. Juga mengadakan event offline di kampus sebagai duta AI Google.</p>'},
  {org:'JTV Digital Hub', title:'JTV Content Writer Intern',
   body:'<p>Magang sebagai content writer di JTV Digital Hub. Menulis berita untuk PortalJTV.com, antara lain liputan kunjungan Gubernur Jawa Timur ke Bangkalan dan kecelakaan truk di jalur Pantura Pasuruan (Juli 2026).</p>'},
  {org:'Jurnalistik Teknologi Pendidikan', title:'Divisi Redaksi',
   body:'<p>Membantu memimpin dan mengelola penulisan berita, majalah, Instagram, dan website program studi Teknologi Pendidikan Unesa secara lebih terstruktur. Bertanggung jawab atas kualitas data, tata bahasa, dan penggunaan kaidah jurnalistik pada hasil tulisan.</p>'},
  {org:'IDN Times Community', title:'Freelancer penulis',
   body:'<p>Penulis aktif yang mengangkat isu ekonomi, pendidikan, kesehatan mental, politik, dan geopolitik dalam komunitas IDN Community.</p>'},
  {org:'Teknologi Pendidikan Unesa', title:'Wakil Ketua Angkatan 2024',
   body:'<p>Bertugas mengarahkan, memfasilitasi, dan memimpin 176 mahasiswa angkatan 2024 dalam kegiatan akademik dan non-akademik di Program Studi Teknologi Pendidikan.</p>'},
  {org:'Erise (Edutech Writer Society)', title:'Co-Founder & Vice President',
   body:'<p>Komunitas buatan program studi Teknologi Pendidikan yang dibuat untuk memfasilitasi kebutuhan mahasiswa dalam kepenulisan ilmiah dan dasar-dasar metodologi penelitian. Dibuat tahun 2026.</p>'},
  {org:'Writing Project & Dandelion Project', title:'Anggota komunitas',
   body:'<p>Tergabung dalam Writing Project Community dan Dandelion Project Community, komunitas kepenulisan tempat saya terus menerbitkan artikel dan karya tulisan, termasuk 2 proyek antologi rekor MURI bersama para penulis terbaik di Indonesia.</p>'}
];

var ARTICLES = [
  {id:'sosok-lamijan',cat:'Sosok',outlet:'Sosok · Kisah Inspiratif',date:'6 Des 2025',page:'pg6',
   title:'Kisah Inspiratif Dr. Lamijan Hadi Susarno: Berjuang Melawan Keterbatasan Fisik hingga Mengabdi di UNESA',
   excerpt:'Dari kondisi fisik yang rentan di masa kecil hingga menembus birokrasi ketat era 1980-an, perjalanan seorang dosen Teknologi Pendidikan Unesa.',
   summary:['Profil Dr. Lamijan Hadi Susarno, M.Pd., dosen Program Studi Teknologi Pendidikan Unesa. Lahir di Nganjuk, masa kecilnya diwarnai kondisi fisik yang rentan, bahkan ia pernah mengalami mati suri saat berusia tujuh bulan.','Kondisi itu memengaruhi pilihannya masuk SMEA Pembina Jombang jurusan Tata Usaha. Ia kemudian kuliah S1 di IKIP Surabaya (kini Unesa) sejak 1981 dan menjadi penerima beasiswa Supersemar, lalu menghadapi kendala administratif "Sampul D" di era Orde Baru sebelum lolos seleksi dosen FIP Unesa pada 1986 sebagai satu dari empat orang.'],
   points:['Pernah meraih juara 1 stenografi (menulis cepat).','Melepas peluang mengajar di SMA Negeri Grogol, Kediri demi mengabdi di almamaternya.','Menjadi saksi perkembangan kampus, dari Pecindilan hingga kampus modern.'],
   quote:'Jika saya dilayani dengan baik, maka saya harus memperlakukan dengan baik juga.'},
  {id:'berita-rri',cat:'Berita',outlet:'Berita Harian · Prodi TP',date:'5 Sep 2025',page:'pg7',
   title:'Kisah Inspiratif Dosen Teknologi Pendidikan UNESA Bahas Pentingnya Peran Orang Tua dalam Literasi Digital Keluarga di RRI Surabaya',
   excerpt:'Dua dosen Teknologi Pendidikan menjadi narasumber program Mozaik Indonesia di RRI Pro 1 Surabaya.',
   summary:['Irena Yolanda Mureen, Ph.D. dan Husni Mubarok, Ph.D. menjadi narasumber program Mozaik Indonesia di RRI Pro 1 Surabaya pada 5 September 2025, dengan tema urgensi orang tua memahami literasi digital dalam mendampingi anak belajar di rumah.','Keduanya menekankan orang tua sebagai filter pertama anak di ruang digital: memilah informasi, memilih platform belajar yang tepat, memantau aktivitas daring, dan menanamkan etika berkomunikasi. Mereka mendorong pelatihan literasi digital bagi orang tua lewat sekolah maupun komunitas.'],
   points:['Literasi digital orang tua semakin penting pasca-pandemi.','Pembelajaran anak kini banyak bergantung pada media daring.'],
   links:[{l:'Baca artikel asli',u:'https://ktp.fip.unesa.ac.id/post/dosen-teknologi-pendidikan-unesa-bahas-pentingnya-peran-orang-tua-dalam-literasi-digital-keluarga-di-rri-surabaya'}]},
  {id:'berita-kazakhstan',cat:'Berita',outlet:'Berita Bulanan · Prodi TP',date:'2 Des 2025',page:'pg8',
   title:'Prodi Teknologi Pendidikan UNESA Gelar Kuliah Tamu, Hadirkan Peneliti dari Kazakhstan',
   excerpt:'Kuliah tamu internasional menghadirkan peneliti kimia dari Al-Farabi Kazakh National University untuk mendukung internasionalisasi prodi.',
   summary:['Program Studi S1, S2, dan S3 Teknologi Pendidikan FIP Unesa menggelar kuliah tamu internasional pada 1 Desember 2025 di Auditorium O1 lantai dua. Pembicara utamanya Meruyertkozha Toktarbek, Ph.D. dari Departemen Kimia, Al-Farabi Kazakh National University, Almaty.','Ia memaparkan profil departemennya (57 pengajar, 13 profesor, pengantar dalam bahasa Kazakh, Rusia, dan Inggris), empat arah ilmiah, serta riset madu, jamur pangan, dan tanaman halofit. Moderator Rizki Fitri R. U., S.Pd., M.Sc. berharap acara ini melatih kepercayaan diri mahasiswa berbahasa Inggris.'],
   points:['Mahasiswa berharap ada pembicara dari Jerman, Inggris, atau Swiss.','Ditutup dengan sesi tanya jawab interaktif.']},
  {id:'jtv-khofifah',cat:'Berita',outlet:'PortalJTV.com',date:'6 Jul 2026',page:'pg14',
   title:'Kunjungi Bangkalan, Gubernur Khofifah Borong Produk UMKM dan Gelar Bazar Murah untuk Tekan Inflasi',
   excerpt:'Gubernur Jawa Timur meninjau Bazar Murah di Perum Grand Kemayoran, Bangkalan, untuk menjaga harga bahan pokok.',
   summary:['Gubernur Jawa Timur Khofifah Indar Parawansa meninjau Bazar Murah di Perum Grand Kemayoran, Kabupaten Bangkalan, pada 6 Juli 2026. Ia memborong produk pelaku UMKM lalu membagikannya gratis kepada warga.','Bazar menjual kebutuhan pokok seperti beras, telur, dan cabai 40 persen lebih murah berkat subsidi Pemprov. Khofifah juga membagikan beras SPHP untuk lansia dan telur untuk ibu yang memiliki balita, sebagai bagian dari upaya menjaga stabilitas harga dan menekan inflasi.'],
   points:['Agenda: memborong dagangan UMKM, menjual pokok lebih murah, mendistribusikan beras SPHP dan telur.'],
   links:[{l:'Baca di PortalJTV',u:'https://portaljtv.com/news/kunjungi-bangkalan-gubernur-khofifah-borong-produk-umkm-dan-gelar-bazar-murah?biro=portal-jtv'}]},
  {id:'jtv-pasuruan',cat:'Berita',outlet:'PortalJTV.com',date:'7 Jul 2026',page:'pg15',
   title:'Diduga Sistem Kemudi Rusak, Truk Muatan Kardus Tabrak 2 Rumah dan Warung di Jalur Pantura Pasuruan',
   excerpt:'Truk bermuatan kardus menabrak dua rumah dan satu warung di Jalan Raya Rejoso. Tidak ada korban jiwa.',
   summary:['Sebuah truk bermuatan kardus menabrak dua rumah dan satu warung di Jalan Raya Rejoso, Kabupaten Pasuruan, pada 7 Juli 2026. Kecelakaan di Jalur Pantura Pasuruan-Probolinggo itu diduga kuat akibat kerusakan sistem kemudi.','Tidak ada korban jiwa. Kerugian materiil ditaksir Rp2 juta untuk truk dan Rp11 juta untuk warung dan dua rumah. Satlantas dibantu warga mengamankan dan mengevakuasi lokasi, sementara polisi masih menyelidiki penyebab pastinya.'],
   points:['Arus lalu lintas di Jalur Pantura tetap lancar dari kedua arah.'],
   links:[{l:'Baca di PortalJTV',u:'https://portaljtv.com/news/diduga-sistem-kemudi-rusak-truk-muatan-kardus-hantam-2-rumah-di-jalur-pantura-pasuruan?biro=portal-jtv'}]},
  {id:'idn-blockchain',cat:'Artikel',outlet:'IDN Times · Economy',date:'Artikel',page:'pg16',
   title:'Blockchain, Bitcoin, Altcoin? Apa Perbedaannya?',
   excerpt:'Penjelasan untuk pemula: teknologi di belakang kripto, aset pelopornya, dan semua alternatif lainnya.',
   summary:['Artikel penjelas yang meluruskan kebingungan umum soal investasi digital. Blockchain digambarkan sebagai "buku catatan digital raksasa" dan infrastruktur tempat aset digital berpindah, ibarat sistem operasi ponsel.','Bitcoin (2009, Satoshi Nakamoto, maksimal 21 juta keping) adalah aplikasi pertama di atasnya, sedangkan Altcoin mencakup semua aset kripto selain Bitcoin, dari Ethereum dengan kontrak pintarnya hingga XRP dan Dogecoin.'],
   points:['Analogi: Blockchain = sistem operasi, Bitcoin = aplikasi pertama, Altcoin = aplikasi lain.','Pesan: pelajari fungsi dan proyek di balik aset sebelum berinvestasi.'],
   links:[{l:'Baca di IDN Times',u:'https://www.idntimes.com/business/community/blokchain-bitcoin-altcoin-apa-perbedaanya-1-01-7h2yz-7f7p24/preview'}]},
  {id:'idn-bulan',cat:'Artikel',outlet:'IDN Times',date:'Artikel',page:'pg17',
   title:'3 Fakta Penemuan Air di Permukaan Bulan, Sangat Mengejutkan!',
   excerpt:'Molekul air ditemukan di Kawah Clavius oleh teleskop SOFIA milik NASA. Apa artinya bagi eksplorasi antariksa?',
   summary:['Ulasan tiga fakta tentang penemuan molekul air di permukaan Bulan yang terkena sinar matahari, yang diumumkan NASA pada 26 Oktober 2020 lewat teleskop SOFIA.','Pertama, lokasinya di Kawah Clavius, belahan selatan Bulan. Kedua, jumlahnya kecil namun signifikan, setara sebotol air 12 ons dalam satu meter kubik tanah. Ketiga, temuan ini menjadi langkah awal pendukung misi eksplorasi luar angkasa karena air berpotensi diolah menjadi air minum, oksigen, hingga bahan bakar roket.'],
   points:['Mematahkan anggapan bahwa air di permukaan Bulan yang terpapar matahari akan menguap.'],
   links:[{l:'Buka tautan artikel',u:'https://myqrcode.mobi/d01ba409'}],
   note:'Tautan berasal dari QR code pada portofolio.'},
  {id:'opini-stunting',cat:'Opini',outlet:'Opini Pribadi',date:'12 Mar 2026',page:'pg28',
   title:'Mencegah Stunting dengan Pola Pikir',
   excerpt:'Program seperti MBG dan PMT tidak cukup tanpa literasi gizi dan perubahan cara berpikir masyarakat.',
   summary:['Opini yang berargumen bahwa pencegahan stunting harus diawali perubahan pola pikir. Penurunan angka stunting melambat dari 21,5% (SKI 2023) menjadi 19,8% (SSGI 2024), padahal anggaran besar sudah digelontorkan dan Perpres 72/2021 menargetkan 14,2%.','Tulisan ini mengulas mitos gizi yang masih mengakar, seperti larangan ikan laut atau telur bagi ibu hamil dan anggapan "anak pendek itu murni genetik". Generasi Milenial dan Gen Z diajak memutus rantai mitos dengan literatur sains dan anjuran medis.'],
   points:['Bantuan gizi tanpa pemahaman ibarat menyiram air ke tanah berlapis plastik.','Kampanye perubahan perilaku dipandang sebagai intervensi pertama negara.']},
  {id:'cerita-konser',cat:'Cerita',outlet:'Medium · Inspiratif',date:'Cerita',page:'pg25',
   title:'Konser Tunggal di Tengah Malam',
   excerpt:'Tentang kesunyian malam yang membuat pikiran berkonser, dan belajar mendengarkannya tanpa menutupinya dengan musik.',
   summary:['Cerita reflektif tentang malam saat lampu dimatikan dan pikiran justru menjadi riuh. Penulis dulu menyalakan musik untuk menutupi suara di kepalanya.','Suatu malam ia mencoba hal berbeda: berbaring dalam gelap dan mendengarkan. Ia menyadari kesunyian dan kegelapan hanyalah kanvas kosong, dan berdamai dengan isi kepala lebih ampuh daripada mengaburkannya.'],
   points:['Bentuk: cerita pendek reflektif dengan metafora "konser".'],
   quote:'Aku mematikan lampu agar malam terasa sunyi. Ternyata, kegelapan di luar tak ada apa-apanya dibanding sunyi yang tiba-tiba menetap di dalam hatiku.'},
  {id:'cerita-mercusuar',cat:'Cerita',outlet:'Medium · Inspiratif',date:'Cerita',page:'pg26',
   title:'Seperti Menjadi Mercusuar',
   excerpt:'Beda antara sendiri dan kesepian, serta mengapa mercusuar cukup diam dan bersinar.',
   summary:['Esai yang membedakan kesendirian (rumah pohon rahasia yang menenangkan) dari kesepian (pesta ulang tahun yang tak didatangi siapa pun).','Penulis memakai metafora mercusuar: ia tidak berlarian mencari kapal, tetapi berdiri kokoh dan bersinar. Saat kita nyaman dengan diri sendiri dan melakukan hal yang dicintai, kapal-kapal kecil akan datang karena melihat cahaya itu.'],
   points:['Pesan penutup: jangan matikan lampumu, teruslah bersinar.'],
   quote:'Kebanyakan orang mengira sendiri dan kesepian adalah dua hal yang sama. Padahal bagiku, mereka seperti air dan minyak.',
   links:[{l:'Buka tautan tulisan',u:'https://myqrcode.mobi/5cbb4cf1'}],note:'Tautan berasal dari QR code pada portofolio.'},
  {id:'cerita-laki',cat:'Cerita',outlet:'Medium · Inspiratif',date:'Cerita',page:'pg27',
   title:'Laki-Laki Gak Harus Bisa Semuanya, Kan?',
   excerpt:'Tentang beban ekspektasi, dan bahwa laki-laki juga manusia yang bisa lelah.',
   summary:['Esai reflektif yang dibuka dengan pesan kerja pukul dua dini hari, lalu mengurai tekanan ekspektasi bahwa laki-laki harus selalu bisa dan selalu kuat.','Penulis menegaskan bahwa laki-laki bukan mesin tanpa celah, melainkan manusia yang bisa lelah, dan mengakui bahwa tidak harus bisa semuanya.'],
   points:['Menyoroti ketimpangan: sembilan puluh sembilan hal berhasil tak dipuji, satu kesalahan kecil langsung ditunjuk.'],
   quote:'Laki-laki bukanlah mesin. Tetapi, mereka adalah insan manusia yang juga dapat merasakan lelah dan tekanan.'}
];

var PROMPTS = [
  {img:'pr_insta',title:'Instagram 3D: keluar dari bingkai',sub:'Potret kreatif dengan ilusi 3D. Subjek duduk di bingkai Instagram raksasa dan satu kakinya keluar dari bingkai.',tags:['Nano Banana','Potret','Ilusi 3D'],
   text:'A hyper-realistic creative portrait of a stylish young man in the photo provided, posed inside a giant Instagram post frame prop, designed to look like a real social media feed. The man wears dark sunglasses and dark shoes. Don\'t change the face of the man.\n\nHe sits casually inside the Instagram frame with a confident, trendy vibe. His right elbow rests on his knee, while his left arm is relaxed. To create a striking 3D illusion, one of his legs extends outward, sticking out of the Instagram frame into the viewer\'s space, making it appear as though he\'s stepping out of the virtual world into reality.\n\nThe Instagram frame is highly realistic, complete with username (Fiiddoo), a profile photo using the picture I gave you, a verified checkmark, display name "Team Google", caption text: "Too real to stay inside frame. #AI_Creator #TeamGoogle #GoogleStudentAmbassador", and bottom icons (heart, comment, share, save, profile). A hand is holding the lower right edge of the frame for added realism and perspective.\n\nThe background is a clean, minimalist dark gray studio backdrop with soft, balanced lighting, ensuring the man and the Instagram cut-out frame remain the focus. The lighting highlights the textures of his clothing and the 3D effect of the leg extending outside the frame.'},
  {img:'pr_gemini',title:'This Picture Make by Nanobanana Gemini',sub:'Foto pemandangan dari atas dengan tipografi raksasa di atas rumput dan subjek berbaring rileks.',tags:['Nano Banana','Tipografi','Foto udara'],
   text:'Sebuah foto pemandangan dari atas yang memukau, menampilkan hamparan rumput hijau subur dan cerah yang diterangi sinar matahari alami yang berkilauan, menciptakan bayangan lembut dan dramatis dari pepohonan yang tak terlihat di atasnya. Di tengah lapangan terbaring seorang pria dan dikelilingi oleh bayangan pohon.\n\nTepat di tengah bingkai, tertulis langsung di atas rumput bertekstur dengan huruf putih raksasa, tebal, dan sedikit kasar, kalimat "THIS PICTURE MAKE BY NANOBANANA GEMINI" disusun dalam baris-baris bertumpuk dan bergeser. Font yang digunakan adalah "Supersonic Rocketship", memberikan estetika dinamis, bergaya tangan, dan mirip spidol yang berinteraksi dengan helai-helai rumput. Kata "NANOBANANA" menonjol sebagai teks bergaris dengan rumput hijau terlihat di tengahnya, berwarna kuning, sementara kata-kata lainnya berwarna putih solid mengikuti jejak bayangan dari pepohonan.\n\nSeorang pria berbaring telentang tepat di tengah kata "MAKE", tepat di atas huruf "K" dan "E", dalam pose yang sangat rileks. Pria tersebut mengenakan topi baseball merah yang menutupi bagian atas kepalanya, kaos lengan pendek bergaya retro dengan garis-garis horizontal hijau, biru, dan putih, celana pendek khaki longgar, serta sepatu kets putih dengan kaus kaki gelap. Sebuah ransel biru kecil terletak di bawahnya.\n\nSuasana keseluruhan sangat kreatif, editorial, dan menginspirasi, memadukan alam dengan desain grafis yang berani.'},
  {img:'pr_nano',title:'Nano Banana: potret fantasi senja',sub:'Potret realistis dari sudut frog angle dengan langit senja dan padang bunga.',tags:['Nano Banana','Potret','Frog angle'],
   text:'Sebuah potret kreatif yang sangat realistis dari seorang pemuda bergaya berpose di atas lahan dalam dunia fantasi. Dia berdiri melamun, terkagum-kagum melihat ke arah atas langit yang mulai menunjukkan suasana senja dengan langit biru. Dia memakai celana kargo warna cream dengan baju kaos warna abu-abu. Jangan ubah wajah pria ini.\n\nPencahayaan stabil cenderung hangat, dengan angle diambil dari arah bawah kaki (frog angle). Fokus pada pria tersebut. Pada bagian top of picture tambahkan visualisasi dari rerumputan dan bunga-bunga kecil serta serangga yang beterbangan.\n\nBuat dalam kualitas 4K Full HD. Kreasikan semenarik mungkin. [random picture]'},
  {img:'pr_putu',title:'Kue putu melayang',sub:'Fotografi makanan artistik: empat kue putu pandan dengan aliran gula jawa dan taburan kelapa.',tags:['Nano Banana','Fotografi makanan','Kuliner Indonesia'],
   text:'A breathtaking, ultra-high-definition (full 1080p) artistic food photograph. Meticulously centered within a tall, vertical composition are four (4) exquisite, artisanal Indonesian Kue Putu, presented as vibrant green pandan rice flour cylinders. Each of the four putu cakes is presented partially unrolled and sliced diagonally, revealing a rich, glossy, deep-amber Gula Jawa (palm sugar) core.\n\nMost prominently, a thick, glistening stream of Gula Jawa syrup is actively dripping from the central core of the top-most cake, cascading down through the centers of the lower cakes in a continuous, beautiful line of dark, glistening liquid. The outer texture of each cake is a delicate, fluffy coating of finely shredded fresh white coconut, and the cut edges are heavily dusted.\n\nA mesmerizing cloud of individual fresh white coconut shavings drifts and falls like fine snow around the levitating cakes, adding to the sense of dynamic motion. Scattered among this falling coconut are several small, precisely cut pieces of fresh, vibrant green pandan leaf, suspended at various points.\n\nThe background is a dramatic, deeply textured, painterly teal and turquoise surface, accented by subtle, warm coral pink light in the background depth. The lighting is a focused, dramatic spotlight from the front-right, making the glistening syrup shine and the textures pop with exquisite micro detail clarity. The perspective is a straight-on, eye-level shot with shallow depth of field. The small, white star-shaped element is retained in the lower right corner. The intricate details of the cut edges of the four cakes, tiny sugar crystal facets, and the porosity of the pandan are rendered with crystal-clear precision. Presented in tall portrait orientation.'},
  {img:'pr_goyang',title:'Kembang goyang melayang',sub:'Foto produk minimalis kue kering khas Betawi yang terpecah di udara.',tags:['Nano Banana','Foto produk','Minimalis'],
   text:'(Buat foto produk) Sebuah produk makanan bernama "Kembang goyang", kue kering tradisional khas Betawi yang berbentuk seperti kelopak bunga dan bertekstur renyah.\n\nBuat produk melayang di udara. Salah satu kue tersebut terpecah di udara dan menaburkan remah-remah (buat di tengah gambar untuk posisinya), dengan kue lain yang normal di sekelilingnya (jangan diberikan kata-kata di dalamnya).\n\nLatar belakang kuning tanpa sambungan, bayangan lembut tipis, estetika minimalis, gaya fotografi, produk ultra realistis, resolusi tinggi 1080p HD. Potret, skala 3:4.'}
];

var GSA = [
  {img:'gsa_inaug',cap:'Inaugurasi GSA 2026'},
  {img:'gsa_jacket',cap:'Event Google'},
  {img:'gsa_twibbon',cap:'Twibbon GSA 2026'},
  {img:'gsa_gemini',cap:'Pelatihan Gemini AI'},
  {img:'gsa_class',cap:'Event GSA di kampus'},
  {img:'gsa_crowd',cap:'Kebersamaan #TeamGoogle'},
  {img:'gsa_pelatihan',cap:'Pelatihan Google'},
  {img:'gsa_heart',cap:'Foto bersama peserta'},
  {img:'gsa_group',cap:'Event GSA'},
  {img:'gsa_event',cap:'GSA Event: prompt interaktif untuk pendidikan'}
];

var IG = [
  ['ig_pintar','Gimana cara orang pintar belajar? Pintar karena bawaan dari lahir itu mitos'],
  ['ig_einstein','Kutipan Albert Einstein tentang pendidikan dan berpikir'],
  ['ig_freire','Kutipan Paulo Freire: pendidikan mengubah manusia'],
  ['ig_penulis','Mengapa penulis takut dinilai?'],
  ['ig_belajar','Kenapa harus belajar? Lantas sampai kapan aku harus menunda?'],
  ['ig_perpus','Kita nggak harus bisa semua hal'],
  ['ig_c1','Belajar hal baru ga selama itu'],
  ['ig_c2','Belajar 20 jam aja cukup'],
  ['ig_c3','Mitos yang sering kita dengar'],
  ['ig_c4','Pendidikan itu (sebenarnya) nggak bisa mengubah dunia'],
  ['ig_c5','Di era sekarang, menghafal itu udah kedaluwarsa'],
  ['ig_c6','Pendidikan itu memahami, bukan menghafal']
];
var RM = [
  ['rm_hormuz','Selat Hormuz ditutup! Apa dampaknya kepada perekonomian Indonesia?'],
  ['rm_medsos','Indonesia akan batasi penggunaan medsos untuk anak usia di bawah 16 tahun'],
  ['rm_norwegia','WNI jadi guru PNS di Norwegia digaji Rp 80 juta sebulan'],
  ['rm_ai','Pekerjaan ini akan digantikan AI dalam 1 tahun! Prediksi CEO AI Microsoft'],
  ['rm_ramadhan','Pemerintah menetapkan awal Ramadhan 1447 H jatuh pada Kamis, 19 Februari 2026']
];
var GH = [
  ['gh_1','Sering janjiin "Tunggu Aku Sukses" tapi pas kerja masih moody? Stop halu!'],
  ['gh_2','Better magang atau aktif organisasi? Konten untuk si "kupu-kupu" dan camaba']
];

var CERTS = [
  {img:'ct_felsi',title:'Terbaik II Jurnalistik (FeLSI)',org:'Festival Literasi Siswa Indonesia, tingkat SMA Provinsi Kalimantan Selatan',date:'10–12 Juli 2023',
   desc:'Piagam Penghargaan dari Dinas Pendidikan dan Kebudayaan Provinsi Kalimantan Selatan untuk Cahya Hafid Abdillah (SMAN 1 Kusan Hilir) sebagai Terbaik II Jurnalistik. Festival diselenggarakan Kemendikbudristek melalui Balai Pengembangan Talenta Indonesia secara daring.'},
  {img:'ct_possi',title:'Medali Emas Biologi (POSSI 2022)',org:'Pekan Olimpiade Siswa Seluruh Indonesia',date:'18 Desember 2022',
   desc:'Piagam Penghargaan sebagai Peraih Medali Emas bidang Biologi (SMA, MA, dan SMK) dengan predikat A+, dalam kompetisi tingkat nasional di Purwokerto. Mewakili SMAN 1 Kusan Hilir, Provinsi Kalimantan Selatan.'},
  {img:'ct_jawapos',title:'Study Visit Jawa Pos 2026',org:'Civics Study Club · Newsroom Experience',date:'12 Februari 2026',
   desc:'Sertifikat peserta kegiatan Study Visit Jawa Pos 2026 bertema "CSC Newsroom Experience: Mengupas Tuntas Jurnalistik di Jawa Pos", diselenggarakan secara offline di Jawa Pos Surabaya.'},
  {img:'ct_copy',title:'Kelas Copywriting Fundamentals',org:'Skillpedia · Program pembelajaran skill daring',date:'2 JP · 2 jam',
   desc:'Menyelesaikan kelas Copywriting Fundamentals dengan nilai ujian 94 (A) dan predikat sangat baik.'},
  {img:'ct_gemini',title:'Kelas Gemini AI di Smartphone',org:'Skillpedia · Program pembelajaran skill daring',date:'1,8 JP · 1 jam 50 menit',
   desc:'Menyelesaikan kelas Gemini AI di Smartphone dengan nilai ujian 100 (A) dan predikat sangat baik.'},
  {img:'ct_host',title:'Host uTech International Podcast',org:'Prodi Teknologi Pendidikan, Universitas Negeri Surabaya',date:'23 Desember 2025',
   desc:'Sertifikat sebagai Host pada uTech International Podcast, Educational Technology Study Program, Universitas Negeri Surabaya.'},
  {img:'ct_fes',title:'Future Entrepreneur Summit',org:'FEST Management x BEM Universitas Negeri Surabaya',date:'2024 – 2025',
   desc:'Rangkaian sertifikat dari Future Entrepreneur Summit: Startup Founder Clash (kompetisi ide bisnis tingkat nasional), Pelatihan Entrepreneurship, Training Public Speaking (GROW Project), Future Entrepreneur Summit 2025, dan FEST Goworld Asia Futurepreneur Selection Program 2025.'}
];
var MORE = [
  ['Innovative Minds Outclass (IMO) 2024, HMP Teknologi Pendidikan','27–28 Sep 2024'],
  ['Startup Founder Clash, kompetisi ide bisnis tingkat nasional (daring)','1 Okt – 20 Des 2024'],
  ['Webinar Self-Development, FEST Management','23 Nov 2024'],
  ['Pelatihan Entrepreneurship, GROW x FEST','22 Feb 2025'],
  ['Training Public Speaking, GROW Project','22 Feb 2025'],
  ['Future Entrepreneur Summit 2025, Airlangga Convention Center','22 Feb 2025'],
  ['FEST Goworld Asia Futurepreneur Selection Program 2025','22 Feb 2025'],
  ['Sertifikat peserta aktif POSSI 2022 (Biologi)','18 Des 2022']
];

/* ---------- Skin ---------- */
var skinBtns = $$('[data-skin-set]');
var metaTheme = $('meta[name="theme-color"]');
var SKIN_BG = {green:'#86bea9',light:'#f0edf1',dark:'#504d51'};
function setSkin(s, persist){
  if(!SKIN_BG[s]) s='green';
  document.documentElement.setAttribute('data-skin',s);
  skinBtns.forEach(function(b){b.setAttribute('aria-pressed', String(b.getAttribute('data-skin-set')===s))});
  if(metaTheme) metaTheme.setAttribute('content',SKIN_BG[s]);
  if(persist){ try{localStorage.setItem('hafid-skin',s)}catch(e){} }
}
skinBtns.forEach(function(b){b.addEventListener('click',function(){setSkin(b.getAttribute('data-skin-set'),true)})});
setSkin(document.documentElement.getAttribute('data-skin'),false);

/* ---------- Giant text fit ---------- */
function fit(){
  $$('[data-fit]').forEach(function(el){
    var box = el.closest('[data-fit-box]'); if(!box) return;
    var txt = $('.giant-text',el)||el;
    el.style.fontSize='100px';
    var w = txt.getBoundingClientRect().width || txt.offsetWidth;
    if(!w) return;
    var target = box.clientWidth*(parseFloat(el.getAttribute('data-fit'))||1);
    var fs = 100*target/w;
    var cap = box.clientHeight*0.9; if(cap>0) fs = Math.min(fs,cap);
    el.style.fontSize = fs.toFixed(1)+'px';
  });
}
fit();
if(document.fonts && document.fonts.ready){ document.fonts.ready.then(fit); }
window.addEventListener('load',fit);
if('ResizeObserver' in window){ var ro=new ResizeObserver(function(){fit()}); $$('[data-fit-box]').forEach(function(b){ro.observe(b)}); }
else { window.addEventListener('resize',fit); }

/* ---------- Hero pointer parallax ---------- */
(function(){
  var hero=$('#beranda'), wrap=$('#cutWrap'), giant=$('.giant');
  if(!hero||!wrap||reduce||!window.matchMedia('(hover:hover) and (pointer:fine)').matches) return;
  var tx=0,ty=0,cx=0,cy=0,raf=0;
  function loop(){
    cx+=(tx-cx)*.08; cy+=(ty-cy)*.08;
    wrap.style.setProperty('--px',(cx*16).toFixed(2)+'px');
    wrap.style.setProperty('--py',(cy*10).toFixed(2)+'px');
    giant.style.setProperty('--gx',(cx*-12).toFixed(2)+'px');
    if(Math.abs(tx-cx)>.001||Math.abs(ty-cy)>.001){raf=requestAnimationFrame(loop)}else{raf=0}
  }
  hero.addEventListener('pointermove',function(e){
    var r=hero.getBoundingClientRect();
    tx=((e.clientX-r.left)/r.width-.5)*2; ty=((e.clientY-r.top)/r.height-.5)*2;
    if(!raf) raf=requestAnimationFrame(loop);
  });
  hero.addEventListener('pointerleave',function(){tx=0;ty=0;if(!raf) raf=requestAnimationFrame(loop)});
})();

/* ---------- Scroll drift ---------- */
(function(){
  var items=$$('[data-drift]'); if(!items.length||reduce) return;
  var ticking=false;
  function upd(){
    ticking=false;
    var vh=window.innerHeight;
    items.forEach(function(el){
      var r=el.getBoundingClientRect();
      if(r.bottom<-200||r.top>vh+200) return;
      var mid=r.top+r.height/2-vh/2;
      var k=parseFloat(el.getAttribute('data-drift'))||0;
      el.style.setProperty('--dy',Math.max(-60,Math.min(60,mid*k)).toFixed(1)+'px');
      if(el.classList.contains('feat-img')) el.style.transform='translate3d(0,'+Math.max(-60,Math.min(60,mid*k)).toFixed(1)+'px,0)';
    });
  }
  function onScroll(){ if(!ticking){ticking=true;requestAnimationFrame(upd)} }
  window.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',onScroll);
  upd();
})();

/* ---------- Roles accordion ---------- */
(function(){
  var host=$('#roles'); if(!host) return;
  host.innerHTML=ROLES.map(function(r,i){
    var id='role-'+i;
    return '<div class="role'+(i===0?' open':'')+'">'
      +'<h3 style="font:inherit"><button class="role-btn" type="button" aria-expanded="'+(i===0)+'" aria-controls="'+id+'">'
      +'<span class="role-org">'+r.org+'</span><span class="role-title">'+r.title+'</span>'
      +'<span class="role-ico" aria-hidden="true">'+ICON('plus')+'</span></button></h3>'
      +'<div class="role-panel" id="'+id+'" role="region" aria-label="'+r.org+'"'+(i===0?'':' inert')+'><div><div class="role-body">'+r.body+'</div></div></div></div>';
  }).join('');
  host.addEventListener('click',function(e){
    var btn=e.target.closest('.role-btn'); if(!btn) return;
    var role=btn.closest('.role'), panel=$('.role-panel',role);
    var open=!role.classList.contains('open');
    role.classList.toggle('open',open);
    btn.setAttribute('aria-expanded',String(open));
    if(open) panel.removeAttribute('inert'); else panel.setAttribute('inert','');
  });
})();

/* ---------- Dialog (reader) ---------- */
var dlg=$('#reader'), rdOpener=null;
function openDialog(opener){
  rdOpener=opener||null;
  if(typeof dlg.showModal==='function'){ if(!dlg.open) dlg.showModal(); } else { dlg.setAttribute('open',''); }
  document.documentElement.classList.add('lock');
  $('.rd-body',dlg).scrollTop=0; $('#rdMedia').scrollTop=0;
}
function closeDialog(){ if(typeof dlg.close==='function'){ if(dlg.open) dlg.close(); } else { dlg.removeAttribute('open'); } }
dlg.addEventListener('close',function(){
  document.documentElement.classList.remove('lock');
  if(rdOpener && document.contains(rdOpener)){ try{rdOpener.focus({preventScroll:true})}catch(e){} }
});
dlg.addEventListener('click',function(e){ if(e.target===dlg) closeDialog(); });
$('#rdClose').addEventListener('click',closeDialog);

function fillDialog(o){
  $('#rdMedia').innerHTML='<img data-img="'+o.img+'" data-alt="'+(o.imgAlt||'').replace(/"/g,'&quot;')+'" alt="">';
  applyImages($('#rdMedia'));
  $('#rdMeta').innerHTML=o.meta;
  $('#rdTitle').textContent=o.title;
  $('#rdText').innerHTML=o.paras.map(function(p){return '<p>'+p+'</p>'}).join('');
  var pts=$('#rdPoints'); pts.innerHTML=(o.points||[]).map(function(p){return '<li>'+p+'</li>'}).join(''); pts.hidden=!(o.points&&o.points.length);
  var q=$('#rdQuote'); if(o.quote){q.textContent='“'+o.quote+'”';q.hidden=false}else{q.textContent='';q.hidden=true}
  $('#rdLinks').innerHTML=(o.links||[]).map(function(l){return '<a href="'+l.u+'" target="_blank" rel="noopener noreferrer">'+l.l+ICON('arr')+'</a>'}).join('');
  var n=$('#rdNote'); if(o.note){n.textContent=o.note;n.hidden=false}else{n.textContent='';n.hidden=true}
}

/* ---------- Articles ---------- */
(function(){
  var cats=['Semua'].concat(ARTICLES.reduce(function(a,x){if(a.indexOf(x.cat)<0)a.push(x.cat);return a},[]));
  var chips=$('#chips'), cards=$('#cards'), cur='Semua';
  chips.innerHTML=cats.map(function(c,i){return '<button class="chip" type="button" data-cat="'+c+'" aria-pressed="'+(i===0)+'">'+c+'</button>'}).join('');
  function render(){
    var list=ARTICLES.filter(function(a){return cur==='Semua'||a.cat===cur});
    cards.innerHTML=list.length?list.map(function(a){
      return '<article class="card"><div class="card-media"><img data-img="'+a.page+'" data-alt="" alt="" loading="lazy"></div>'
        +'<div class="card-body"><p class="card-meta"><span>'+a.outlet+'</span><time>'+a.date+'</time></p>'
        +'<h3><button class="card-open" type="button" data-id="'+a.id+'">'+a.title+'</button></h3>'
        +'<p class="card-ex">'+a.excerpt+'</p>'
        +'<span class="card-more" aria-hidden="true">Baca ringkasan '+ICON('arr')+'</span></div></article>';
    }).join(''):'<p class="empty">Belum ada tulisan di kategori ini.</p>';
    applyImages(cards);
  }
  chips.addEventListener('click',function(e){
    var b=e.target.closest('.chip'); if(!b) return;
    cur=b.getAttribute('data-cat');
    $$('.chip',chips).forEach(function(c){c.setAttribute('aria-pressed',String(c===b))});
    render();
  });
  cards.addEventListener('click',function(e){
    var b=e.target.closest('.card-open'); if(!b) return;
    var a=ARTICLES.filter(function(x){return x.id===b.getAttribute('data-id')})[0]; if(!a) return;
    fillDialog({img:a.page,imgAlt:'Lembar asli tulisan: '+a.title,meta:'<span>'+a.outlet+'</span><time>'+a.date+'</time>',title:a.title,paras:a.summary,points:a.points,quote:a.quote,links:a.links,note:a.note});
    openDialog(b);
  });
  render();
})();

/* ---------- Prompt viewer ---------- */
(function(){
  var img=$('#pvImg'), tags=$('#pvTags'), title=$('#pvTitle'), sub=$('#pvSub'), text=$('#pvText'), pick=$('#pvPick'), copy=$('#pvCopy');
  var cur=0, timer=0;
  PROMPTS.forEach(function(p,i){
    var b=document.createElement('button'); b.type='button'; b.className='thumb'; b.setAttribute('aria-pressed',String(i===0)); b.setAttribute('aria-label','Karya '+(i+1)+': '+p.title);
    b.innerHTML='<img data-img="'+p.img+'" data-alt="" alt="">'; b.addEventListener('click',function(){show(i)});
    pick.appendChild(b);
  });
  applyImages(pick);
  function show(i,instant){
    cur=i; var p=PROMPTS[i];
    $$('.thumb',pick).forEach(function(t,k){t.setAttribute('aria-pressed',String(k===i))});
    function paint(){
      img.setAttribute('src',window.IMG[p.img]); img.setAttribute('alt','Hasil gambar: '+p.title);
      tags.innerHTML=p.tags.map(function(t){return '<li>'+t+'</li>'}).join('');
      title.textContent=p.title; sub.textContent=p.sub; text.textContent=p.text; text.scrollTop=0;
      img.classList.remove('swap');
    }
    if(instant||reduce){paint();return}
    img.classList.add('swap'); clearTimeout(timer); timer=setTimeout(paint,260);
  }
  copy.addEventListener('click',function(){
    copyText(PROMPTS[cur].text).then(function(ok){toast(ok?'Prompt disalin':'Tidak bisa menyalin otomatis. Seleksi teks prompt secara manual.')});
  });
  show(0,true);
})();

/* ---------- GSA polaroids ---------- */
(function(){
  var host=$('#polas'); if(!host) return;
  var drifts=['-0.05','0.04','-0.03','0.05','-0.04'];
  host.innerHTML=GSA.map(function(g,i){
    return '<figure class="pola" data-drift="'+drifts[i%drifts.length]+'"><img data-img="'+g.img+'" data-alt="'+g.cap+'" alt="" loading="lazy"><figcaption>'+g.cap+'</figcaption></figure>';
  }).join('');
  applyImages(host);
})();

/* ---------- Konten tabs ---------- */
(function(){
  $('#gridIg').innerHTML=IG.map(function(x){return '<figure><img data-img="'+x[0]+'" data-alt="'+x[1].replace(/"/g,'&quot;')+'" alt="" loading="lazy"></figure>'}).join('');
  $('#feedRm').innerHTML=RM.map(function(x){return '<figure><img data-img="'+x[0]+'" data-alt="'+x[1].replace(/"/g,'&quot;')+'" alt="" loading="lazy"><figcaption>'+x[1]+'</figcaption></figure>'}).join('');
  $('#ghGrid').innerHTML=GH.map(function(x){return '<figure><img data-img="'+x[0]+'" data-alt="'+x[1].replace(/"/g,'&quot;')+'" alt="" loading="lazy"><figcaption>'+x[1]+'</figcaption></figure>'}).join('');
  $('#ytLink').innerHTML='<a class="ghost" href="https://myqrcode.mobi/5fec186c" target="_blank" rel="noopener noreferrer">'+ICON('yt')+'Buka channel'+ICON('arr')+'</a>';
  var tabs=$$('.tab',$('#tabs'));
  function activate(t,focus){
    tabs.forEach(function(x){
      var on=x===t; x.setAttribute('aria-selected',String(on)); x.setAttribute('tabindex',on?'0':'-1');
      var pn=document.getElementById(x.getAttribute('aria-controls')); if(pn) pn.hidden=!on;
    });
    if(focus) t.focus();
  }
  tabs.forEach(function(t,i){
    t.addEventListener('click',function(){activate(t)});
    t.addEventListener('keydown',function(e){
      var k=e.key, n=-1;
      if(k==='ArrowRight') n=(i+1)%tabs.length; else if(k==='ArrowLeft') n=(i-1+tabs.length)%tabs.length;
      else if(k==='Home') n=0; else if(k==='End') n=tabs.length-1;
      if(n>=0){e.preventDefault();activate(tabs[n],true)}
    });
  });
  applyImages($('#konten'));
})();

/* ---------- Sertifikat ---------- */
(function(){
  var host=$('#certs');
  host.innerHTML=CERTS.map(function(c,i){
    return '<article class="cert"><div class="cert-media"><img data-img="'+c.img+'" data-alt="" alt="" loading="lazy"></div>'
      +'<div class="cert-body"><h3><button class="cert-open" type="button" data-i="'+i+'">'+c.title+'</button></h3><p>'+c.org+'</p><p>'+c.date+'</p></div></article>';
  }).join('');
  applyImages(host);
  host.addEventListener('click',function(e){
    var b=e.target.closest('.cert-open'); if(!b) return;
    var c=CERTS[+b.getAttribute('data-i')]; if(!c) return;
    fillDialog({img:c.img,imgAlt:'Sertifikat: '+c.title,meta:'<span>'+c.org+'</span><time>'+c.date+'</time>',title:c.title,paras:[c.desc]});
    openDialog(b);
  });
  $('#more').innerHTML=MORE.map(function(m){return '<li><span>'+m[0]+'</span><span>'+m[1]+'</span></li>'}).join('');
})();

/* ---------- Clipboard + toast ---------- */
var toastEl=$('#toast'), toastT=0;
function toast(msg){ toastEl.textContent=msg; toastEl.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(function(){toastEl.classList.remove('show')},2400); }
function copyText(t){
  function fallback(){
    return new Promise(function(res){
      try{
        var ta=document.createElement('textarea'); ta.value=t; ta.setAttribute('readonly',''); ta.style.cssText='position:fixed;top:0;left:0;opacity:0';
        document.body.appendChild(ta); ta.select(); var ok=document.execCommand('copy'); ta.remove(); res(!!ok);
      }catch(e){res(false)}
    });
  }
  if(navigator.clipboard && navigator.clipboard.writeText){
    return navigator.clipboard.writeText(t).then(function(){return true},function(){return fallback()});
  }
  return fallback();
}

/* ---------- Scroll spy ---------- */
(function(){
  var links=$$('#pills .pill'); if(!links.length||!('IntersectionObserver' in window)) return;
  var map={}; links.forEach(function(l){map[l.getAttribute('href').slice(1)]=l});
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        links.forEach(function(l){l.removeAttribute('aria-current')});
        var l=map[en.target.id]; if(l){ l.setAttribute('aria-current','true'); if(l.scrollIntoView){ var p=l.parentNode.parentNode; if(p.scrollWidth>p.clientWidth){ p.scrollTo({left:l.offsetLeft-16,behavior:reduce?'auto':'smooth'}); } } }
      }
    });
  },{rootMargin:'-40% 0px -55% 0px'});
  Object.keys(map).forEach(function(id){var s=document.getElementById(id); if(s) io.observe(s)});
})();

/* ---------- Misc ---------- */
var yr=$('#yr'); if(yr) yr.textContent=String(new Date().getFullYear());
applyImages(document);
})();
