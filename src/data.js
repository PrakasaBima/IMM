// Semua konten diambil dari Company Profile PT Inti Mas Mulia (CP.IMM.pdf).

export const company = {
  name: 'PT Inti Mas Mulia',
  short: 'Inti Mas Mulia',
  tagline: 'General Contractor · Batam',
  address: 'Jl. Trans Barelang, Ruko Griya Laguna Mas Blok A No. 09, Batam',
  phone: { label: '(0778) 3852 598', href: 'tel:+627783852598' },
  mobile: { label: '0813 7109 0660', href: 'tel:+6281371090660' },
  email: 'intimasmulia.pt@gmail.com',
  whatsapp: 'https://wa.me/6281371090660',
};

export const navLinks = [
  { href: '#tentang', label: 'Tentang' },
  { href: '#struktur', label: 'Struktur' },
  { href: '#layanan', label: 'Layanan' },
  { href: '#proyek', label: 'Proyek' },
  { href: '#klien', label: 'Klien' },
];

export const stats = [
  { value: 14, label: 'Lingkup kerja' },
  { value: 24, suffix: '+', label: 'Klien' },
  { value: 2, label: 'Partner teknologi' },
  { value: 1, label: 'Workshop di Batam' },
];

export const vision = 'Menjadi mitra yang kompeten, profesional, aman, dan berkualitas.';

export const mission = [
  'Produk berkualitas & kompetitif',
  'Layanan profesional',
  'Kemitraan yang saling menguntungkan',
  'Inovasi yang memberi nilai tambah',
];

export const services = [
  { icon: 'flame', title: 'Steam Boiler', desc: 'Instalasi, commissioning, dan perawatan.' },
  { icon: 'pipe', title: 'Piping & Ducting', desc: 'Fabrikasi dan instalasi jalur pipa.' },
  { icon: 'bolt', title: 'Electrical & Panel', desc: 'Kelistrikan, panel kontrol, penerangan.' },
  { icon: 'chip', title: 'Automation', desc: 'Mesin otomatis, conveyor, retrofit.' },
  { icon: 'wrench', title: 'Fabrication & Machining', desc: 'Jig, fixture, tool & die presisi.' },
  { icon: 'refresh', title: 'Repair & Overhaul', desc: 'Overhaul ME/AE dan stern shaft.' },
  { icon: 'lifebuoy', title: 'Marine Safety', desc: 'Servis lifeboat dan alat keselamatan kapal.' },
  { icon: 'search', title: 'NDT & Maintenance', desc: 'Inspeksi NDT dan perawatan berkala.' },
];

export const jobScope = [
  'Marine Safety Service Station',
  'Mechanical',
  'Steam Boiler',
  'Electrical',
  'Construction Civil',
  'Machining',
  'Automation',
  'Jig & Fixture',
  'Repair & Reconditioning',
  'Service & Maintenance',
  'Panel Control',
  'Conveyor System',
  'Overhaul ME & AE',
  'Overhaul Stern Shaft',
];

// size: 'wide' | 'tall' | undefined — mengatur layout grid galeri
export const projects = [
  { img: 'steam-boiler.jpg', title: 'Steam Boiler', sub: 'Instalasi & commissioning', alt: 'Instalasi dua unit steam boiler', size: 'wide' },
  { img: 'piping.jpg', title: 'Piping', sub: 'Fabrikasi & pengelasan', alt: 'Fabrikasi jalur pipa dan flange', size: 'tall' },
  { img: 'marine-safety.jpg', title: 'Marine Safety', sub: 'Servis lifeboat', alt: 'Pengiriman lifeboat untuk servis', size: 'tall' },
  { img: 'reconditioning.jpg', title: 'Reconditioning', sub: 'Pengukuran presisi', alt: 'Pengukuran presisi saat rekondisi komponen' },
  { img: 'automation.jpg', title: 'Automation', sub: 'Desain mesin custom', alt: 'Desain 3D mesin otomasi' },
  { img: 'ducting.jpg', title: 'Ducting System', sub: 'Instalasi area pabrik', alt: 'Instalasi sistem ducting di area pabrik', size: 'wide' },
  { img: 'electrical.jpg', title: 'Electrical', sub: 'Cable tray & lighting', alt: 'Instalasi kabel tray dan penerangan' },
  { img: 'maintenance.jpg', title: 'Maintenance', sub: 'Servis unit HVAC', alt: 'Perawatan unit outdoor HVAC' },
];

export const highlightProject = {
  title: 'Pemeliharaan Mesin Weed Harvester',
  desc: 'Proyek untuk BP Batam.',
  year: '2021',
};

export const qualityPoints = ['Tepat waktu', 'Solusi custom', 'Upgrade & retrofit'];

export const products = [
  'Tool & Die System',
  'Product Tester',
  'Wire Coiling System',
  'Inspection System',
  'Packaging System',
];

export const clients = [
  'PT Fajar Mas Murni',
  'PT Turbo Diesel Intl',
  'PT Sinergi Oil',
  'PT Britoil',
  'PT Indokarya Energi',
  'PT Bandar Victory',
  'PT Senometal',
  'PT Oenggul Pipa Inspeksitama',
  'PT Amtek',
  'PT RTD / Java Velosi Mandiri',
  'PT Tropolis',
  'PT Advanced Offshore Serv',
  'PT Marcopolo',
  'PT JMS Batam',
  'PT Batamec',
  'PT Mitra Maritim Mandiri',
  'PT Citra Shipyard',
  'PT Sumber Marine Shipyard',
  'PT Indomarco Prismatama',
  'PT Rotary Engineering Indonesia',
  'PT Dharma Sentosa Marindo',
  'PT Destinasi Maritim Indonesia',
  'PT Soechi Indonesia',
  'PT Pancaran Maritim Transportindo',
];

export const partners = [
  { name: 'Panasonic Industrial Devices', desc: 'Automation controls · Singapore' },
  { name: 'Mastool Precision Engineering', desc: 'Precision engineering · sejak 1986' },
];

// Struktur organisasi, per tingkat dari atas ke bawah.
// `note` = atasan langsung untuk tingkat staf.
// `team` = bawahan langsung yang digambar sebagai garis lurus tersendiri di bawah anggota itu.
export const organization = [
  { level: 'Pimpinan', members: [{ name: 'Nanang Supriyanto', role: 'Director', lead: true }] },
  {
    level: 'Manajemen',
    members: [
      { name: 'Robert Dwi Putra', role: 'General Manager' },
      { name: 'Suparman', role: 'Operational Manager' },
      { name: 'M Alfi', role: 'CI', 
        team: 
        [{ name: 'Agit', role: 'Staff CI' }] 
      },
    ],
  },
  {
    level: 'Kepala Divisi',
    members: [
      { name: 'Aris Pardomuan S', role: 'Senior Marketing' },
      { name: 'Safix Alfian', role: 'Designer' },
      { name: 'Ariawati', role: 'FA & Procurement' },
      { name: 'Alya Maslihatul Salsa', role: 'HRD' },
      { name: 'Heri Tri Handoko', role: 'Engineering' },
    ],
  },
  {
    level: 'Tim Lapangan',
    members: [
      { name: null, role: 'Marketing', note: 'Senior Marketing' },
      { name: 'Budi', role: 'Fabrication', note: 'Engineering' },
      { name: 'Habitra', role: 'Technician', note: 'Fabrication' },    ],
  },
];

export const contactPersons = [
  { name: 'Nanang Supriyanto', role: 'Director', phone: '0813 7109 0660', href: 'tel:+6281371090660' },
  { name: 'Ariawati', role: 'FA & Procurement', phone: '0813 6400 2012', href: 'tel:+6281364002012' },
];
