# Inmobiliaria

- propiedades ( venta / alquiler)
- clientes (propietarios / inquilinos)

V1: solo ingreso de propiedades

- propiedades ( venta / alquiler )
id: String
direccion: String
cantAmbientes: Number

- propietario (propietarios)
id: String
nombre: String
telefono: String
email: String
propiedades: [ String ] // ids de propiedades

casos de uso:
- registrar un propietario
- listar propietarios
  
- cargar una propiedad a un propietario
- listar propiedades