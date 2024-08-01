controller -> isinya untuk menerima req handler express(web) nya

services -> untuk mengatur businness logic database

controller menerima req, mengirimkan datanya ke services, menerima data dari servicesnya, lalu di kembalikan lagi ke response webnya

pertukaran data yang di kirim oleh req dan juga response datanya, nanti datanya akan di simpan dalam bentuk model

saat model di kirim ke services, misal login / registrasi, kita butuh yang namanya validasi
