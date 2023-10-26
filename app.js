const yargs = require("yargs");
const contact = require("./contact"); 

yargs.command({
  command: "add",
  describe: "add new contact",
  builder: {
    nama: {
      describe: "name",
      demandOption: true,
      type: "string",
    },
    mobile: {
      describe: "phone Number",
      demandOption: true,
      type: "string",
    },
    email: {
      describe: "email address",
      demandOption: false,
      type: "string",
    },
  },

  handler(argv) {
    contact.simpanData(argv.nama, argv.mobile, argv.email);
  },
});

// menampilkan list kontak
yargs.command({
  command: `list`,
  describe: `menampilkan list kontak`,
  handler(){
      contact.listKontak();
  }
});

// menampilkan detail kontak berdasarkan nama
yargs.command({
  command: `detail`,
  describe: `menampilkan detail kontak`,
  builder: {
      nama: {
          describe: `Nama Lengkap`,
          demandOption: true,
          type: `string`,
      },
  },
  handler(argv){
      contact.detailKontak(argv.nama);
  }
});

// menghapus daftar kontak berdasarkan nama
yargs.command({
  command: `delete`,
  describe: `menghapus daftar kontak`,
  builder: {
      nama: {
          describe: `Nama Lengkap`,
          demandOption: true,
          type: `string`,
      },
  },
  handler(argv){
      contact.hapusKontak(argv.nama);
  }
});

yargs.parse();