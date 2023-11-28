const productos = [
    {
        id: 1,
        nombre: 'silla',
        desc: 'es una silla'
    },
    {
        id: 2,
        nombre: 'mesa',
        desc: 'es una mesa'
    },
    {
        id: 3,
        nombre: 'placard',
        desc: 'es un placard'
    }
]

const carritos = [
    {
        id: 1,
        prods: [
            {
                cant: 1,
                prod: 1
            }
        ]
    },
    {
        id: 2,
        prods: [
            {
                cant: 5,
                prod: 1
            }

        ]
    }
]

// si busco el carrito 1, quiero ver:
const p = {
    id: 1,
    prods: [
        {
            cant: 1,
            prod: {
                id: 1,
                nombre: 'silla',
                desc: 'es una silla'
            }
        }
    ]
}

// NO QUIERO HACER ESTO!!!
// const carr = carritos.findOne({_id: 1})
// const tempProds = {}
// for (let i = 0; i < carr.prods.length; i++) {
//     if (tempProds[carr.prods[i]]) {
//         tempProds[carr.prods[i]] = productos.findOne({ _id: prod})
//     }
//     carr.prods[i] = tempProds[carr.prods[i]] //.....
// }
// NO QUIERO HACER ESTO!!!