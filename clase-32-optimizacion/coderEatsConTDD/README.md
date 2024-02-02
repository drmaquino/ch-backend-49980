router -> controller -> servicio -> repositorio -> dao -> mongoose
      resp http + cod    resultado     Usuario    POJO   mongodb  


CASO DE USO: "actualizar nombre"

cliente -> http req (  url,              method,  json      )
//                    /api/users/123     PUT      { nombre: "pepe" }

presentacion
-------------------------------------------------------------------------------
ruteo

-router
router recibe: /api/users/123     PUT      { nombre: "pepe" }
a partir de method y url (/api/users     POST), delega a un controller

-controller
controller recibe:   req.param (123)   req.body { nombre: "pepe" }
lo unico que hace es extraer los datos de adentro de al req
y delega al servicio correspondiente (al servicio que resuelve el PUT a users)
si este falla, atrapo el error y se lo paso al mid de manejo de errores
para que conteste al cliente ( añadiendo codigo de estado http )
ej:
NO LO ENCONTRE -> 404
FALLO LA PERSISTENCIA -> 500
DATOS INVALIDOS -> 400

si salió todo bien, contesto al cliente (pongo el codigo que corresponde)
PUT -> actualizacion -> 204
POST -> creacion -> 201 (incluye el obj creado en el body)

ruteo
------------------------------------------------------------------------------------
negocio

-service
usersService recibe: id -> 123, userDto -> { nombre: "pepe" }

buscar al usuario (repositorio de usuarios)
el repo de usuarios le pide al dao de usuarios que haga la busqueda

si falla la busqueda
  lanzo error FALLO LA PERSISTENCIA

si sale bien la busqueda
si no lo encuentro,
  lanzo error NO LO ENCONTRE

si lo encuentra, lo hidrata a new Usuario() y devuelve esa instancia de Usuario

le pido al usuario que se cambie su nombre con el que yo le recibi ("pepe"),
el usuario hace la validacion, y 
sino pasa la regla de negocio
  lanzo un error DATOS INVALIDOS

si pasa la regla
  se actualiza

finalmente lo guardo modificado (le paso el usuario al repo de usuarios)
internamente, el repo deshidrata el usuario, y entrega un POJO al dao de usuario

si falla la base
  lanzo error FALLO LA PERSISTENCIA

si falla el update, por ej pq no lo encontró
  lanzo error NO LO ENCONTRE

si salió bien el guardado (la actualizacion del nuevo usuario modificado), 

negocio
-------------------------------------------------------------------------
persistencia

dao recibe el pedido de hacer un readOne(id)
internamente usa el driver de la db que corresponda para hacer la consulta
en nuestro caso: 

usersModel.findOne({ _id: id })
si lo encuentro
  lo devuelvo como un POJO (los daos devuelven POJOS, SIEMPRE)
si no lo encuentro
  devuelvo null
si falla la db
  lanzo un error
