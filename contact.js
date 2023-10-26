const fs = require("fs");
const validator = require("validator");

// Membuat folder 
const dirPath = "./data";
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath);
};

// Membuat file 
const dataPath = "./data/contacts.json";
if (!fs.existsSync(dataPath)) {
  fs.writeFileSync(dataPath, "[]", "utf-8");
};

// loadKontak
const loadContact = (nama,mobile, email) => {
  const file = fs.readFileSync(dataPath, `utf-8`);
  const contacts = JSON.parse(file);
  return contacts;
}

//simpan Data
const simpanData = (nama, mobile, email) => {
const contact = { nama, mobile, email }; 
const contacts = loadContact();

// Duplikat nama
  const DuplikatNama = contacts.find ((contact) => contact.nama === nama);
  if (DuplikatNama) {
      console.log ("Nama sudah terpakai, silahkan isi dengan nama yang lain")    
      return false;
    };
  
  // validasi cek email
  if (email) {
    if (!validator.isEmail(email)) {
      console.log("Email Tidak terdaftar. Silahkan Masukan Kembali!");
      return false;
    }
  }

  // validasi cek no telp
  if (mobile) {
    if (!validator.isMobilePhone(mobile, 'id-ID')) {
      console.log("No Telp Tidak Sesuai, Masukan kembali");
      return false;
    }
  }

  contacts.push(contact); 
  fs.writeFileSync(dataPath, JSON.stringify(contacts)); 
  
  console.log("Terima kasih sudah memasukkan data!"); 
};

// list kontak
  const listKontak =() => {
    const contacts = loadContact ();
    console.log ("Daftar List Kontak :")
    contacts.forEach ((contact,i) => {
      console.log (`${i + 1}. ${contact.nama} - ${contact.mobile}`);  
    });
  }

// list detail
const detailKontak= (nama) => {
const contacts = loadContact();

  const contact = contacts.find((contact) => contact.nama === nama);
  if(!contact) {
      console.log(`Nama ${nama} Tidak Sesuai, Silahkan coba lagi !`)
      return false;
  }

  console.log(`Nama:`, contact.nama);
  console.log(`Mobile :`, contact.mobile);
  if(contact.email){
      console.log(`Email:`, contact.email);
  }
}

// hapus kontak
const hapusKontak = (nama) => {
  const contacts = loadContact();
  const newContacts = contacts.filter(
      (contact) => contact.nama !== nama
  );

  if(contacts.length === newContacts.length) {
      console.log(`nama ${nama} Tidak ditemukan, silahkan coba lagi`)
      return false;
  }

  fs.writeFileSync(dataPath, JSON.stringify(newContacts));

  console.log(`Data kontak ${nama} berhasil dihapus`)
};

module.exports = { simpanData, listKontak, detailKontak, hapusKontak }