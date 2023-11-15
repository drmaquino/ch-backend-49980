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
--------
[
  {
    "id": 1,
    "nombre": "pdapasp",
    "direccion": {
      "calle": "fadfasd"
      "nro": 31123
      cp: "ffdsf234"
    },
    telefonos: [
      "45234523452",
      "52435245345",
      "523452645373"
    ]
  },
    {
    "id": 2,
    "nombre": "pdapasp",
    "direccion": {
      "calle": "fadfasd",
      "piso":3,
      "dpto": "a",
      "nro": 31123,
      cp: "ffdsf234"
    },
    telefonos: [
      "45234523452",
      "52435245345",
      "523452645373"
    ]
  },
  {
    "id": 3,
    "nombre": "pdapasp",
    "direccion": {
      "calle": "fadfasd",
      "piso":3,
      "dpto": "a",
      "nro": 31123,
      cp: "ffdsf234"
    },
    email: "fasdfas@mail.com"
  }
]

noSQL
-----

db.personas.findOne({ id: 1 })

