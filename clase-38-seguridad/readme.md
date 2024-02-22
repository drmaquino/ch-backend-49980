Principales vulnerabilidades del proyecto 1 (Sólo las principales observaciones, si quieres aclarar alguna adicional, ¡adelante!)

A04 Insecure Design: El input de password no tiene type=password y por lo tanto se puede visualizar.
A04 Insecure Design: Al guardar al usuario, no se hace ninguna validación del input y el usuario se puede guardar vacío.
A04 Insecure Design: El patrón de diseño por capas no se está aplicando correctamente, el router de vistas sí accede al controlador de vistas, pero el router de sesión tiene implementada directamente la funcionalidad, sin separarlo del controller.
A05 Security Misconfiguration : El puerto está hardcodeado, lo cual se prestará a problemáticas futuras.
A06 Vulnerable and Outdated components: ¿Por qué tenemos un módulo de FileSystem para usuarios que fue dejado a la mitad y nunca se implementó? Claro ejemplo de feature obsoleta o sin haberse implementado.
A07: Identification and authentication failures: El password no se está hasheando (a pesar de que bcrypt está instalado).
(No es necesario mencionar otras vulnerabilidades porque evidentemente no están siquiera implementadas, como configuraciones,  logging y monitoreo, etc.)

---

Principales vulnerabilidades del proyecto 2  (Sólo las principales observaciones, si quieres aclarar alguna adicional, ¡adelante!)

A04 - Insecure Design: El proyecto no hace validación del correo repetido al registrar a un usuario
A04 Insecure Design: El input de password no tiene type=password y por lo tanto se puede visualizar.
A05 - Security Misconfiguration : El puerto está hardcodeado, lo cual se prestará a problemáticas futuras.
A05 - Security Misconfiguration: La url de Mongo está hardcodeada.
A05 - Security Misconfiguration: La configuración general de errores está mal implementada, al mandar un campo vacío en el registro, la alerta devuelve success, aunque haya ocurrido un error por detrás. (lo mismo para login)
A09 - Logging and monitoring Failures: Intenta registrar dos usuarios con el mismo correo. ¿Qué pasa? La base de datos devuelve un error, pero nuestro log es muy “genérico”. Nota cómo en la consola se imprime sólo “error” lo cual no nos da suficiente información sobre el error ocurrido.

Nota que el Dao de Mongo y el Dao de FileSystem existentes en el proyecto, no están relacionados en el nombre del método. Si se hizo una migración desde FileSystem hacia Mongo, entonces el dao de Filesystem es innecesario y es un A06 - Outdated component. Por otra parte, si la intención sí es hacer uso de ambos o por alguna razón el dao de FileSystem sí será utilizado, entonces es un A04 - Insecure design, debido a que no está implementándose correctamente el patrón de diseño correspondiente a la persistencia, pues la lógica de negocio está fuertemente acoplada a un método del Dao, haciendo que, si en algún punto se llegara a forzar un cambio de persistencia, el servidor se vendría abajo debido a que no coincidirían los nombres de los métodos. Ésto no es necesariamente una vulnerabilidad, sin embargo, podemos tomarlo como ejemplo práctico de casos más complejos.

---

Principales vulnerabilidades del proyecto 3 (Sólo las principales observaciones, si quieres aclarar alguna adicional, ¡adelante!)

A01 - Broken Access Control: El token de sesión del usuario expira en 30 segundos, ¿por qué puedo seguir navegando a la ruta de perfil?
A01 - Broken Access Control: Si mi sesión está pensada para ver mi perfil, ¿por qué al cambiar la url de manera manual, puedo ver el perfil de las otras personas, si éste debería ser privado?
A03 - Injection: Busca los cambios en el Dao de usuarios de Mongo, ahora recibe parámetros para dinamizar la búsqueda, Sin embargo, en el controlador de usuario notamos que no hay una validación del query que se recibe desde el request, de manera que está propenso a que se pueda manipular para llegar a datos más sensibles.
A05 - Security Misconfiguration: A pesar de ya estar utilizando dotenv para poder cargar la información de Mongo, notamos cómo el token de jsonwebtoken no tiene oculto el secret con el cual se armó.
A07 - Identification and authentication failures: El sistema que actualmente tenemos permite hacer n intentos de logueo, sin algún bloqueo, por lo que está expuesto a ataques de ruptura por fuerza bruta.
