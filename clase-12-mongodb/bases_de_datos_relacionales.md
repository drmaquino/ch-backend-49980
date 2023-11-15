Persona {
  nombre: pdapasp,
  direccion: {
    calle: fadfasd
    nro: 31123
    cp: ffdsf234
  },
  telefonos: [
    45234523452,
    52435245345,
    523452645373
  ]
}


Personas
________

id | nombre | direccion | 
-------------------------
1  |  pepe  | 1         | 
2  |  pepe  |           | 
3  |  pepe  |           | 
4  |  pepe  | 2         | 
5  |  pepe  |           | 
6  |  pepe  |           | 
7  |  pepe  |           | 
8  |  pepe  |           | 


Direcciones
___________

id | calle             | altura | cp 
---------------------------------------------
1  | fasdfasdfasdfadgs |  42354 | sgdf2534534
2  | fasdfasdfasdfadgs |  42354 | sgdf2534534
3  | fasdfasdfasdfadgs |  42354 | sgdf2534534
4  | fasdfasdfasdfadgs |  42354 | sgdf2534534
5  | fasdfasdfasdfadgs |  42354 | sgdf2534534
6  | fasdfasdfasdfadgs |  42354 | sgdf2534534
7  | fasdfasdfasdfadgs |  42354 | sgdf2534534
8  | fasdfasdfasdfadgs |  42354 | sgdf2534534


Telefonos
___________

idPersona | telefono
------------------------
1         | 42356326245  
1         | 42356326245  
1         | 42356326245  
2         | 42356326245  
2         | 42356326245  
4         | 42356326245  
4         | 42356326245  
4         | 42356326245  

SQL
---

SELECT * FROM personas 
  LEFT JOIN direcciones ON personas.direccion = direcciones.id,
  LEFT JOIN telefonos ON personas.id = telefonos.idPersona,
WHERE personas.id = 1


