/*14.03.2024 CLASE 4.
--Crear el metodo gastar(dinero_gastado)
si el dinero gastado es mayor al que tenemos debera decir por consola 'ACCION invalida: Insuficiente dinero'
Si se puede gastar
Restar el dinero_gastado al dinero del personaje
dira 'El personaje {nombre de personaje} ha gastado {dinero gastado} y se queda con {dinero}'
--Crear la Entidad Item
nombre
categoria
nivel
costo
crear 2 items de su preferencia (utilizando la class Item)
--Metodo de Personaje
Hacer la logica para eliminar un item por su id
Recibira un id, buscara por id al elemento dentro del inventario y lo eliminara
Si no lo encuentra dira console.log("Error ACCION INVALIDA: No existe el item con id {id} dentro del inventario del personaje {nombre}")
Recomendacion:
findIndex => para buscar el indice
splice => para eliminarlo
--Tarea Programacion Orientada a objetos:
Van a crear una clase nueva llamada Mochila:
Atributos:
primer_bolsillo
segundo_bolsillo
bolsillito_de_izquierda
Metodos:
guardarItem(item, tipo_bolsillo)
Vamos a guardar un item en algunos de nuestros bolsillos (esta definido por el tipo_bolsillo)
Debemos verificar primero que ese bolsillo no este lleno, por ejemplo
primer_bolsillo permite hasta 3 items
segundo_bolsillo permite hasta 2
bolsillito de la izq permite solo 1
Si se excede el limite deberá decir por consola 'ERROR: el espacio de la mochila {tipo_bolsillo} esta lleno'
Ejemplo de prueba:
personaje.mochila.guardarItem(mate, 'bolsillo 1')
Eliminar Item (id_item, tipo_bolsillo)
Deberemos verificar si el id_item esta en dicho tipo_bolsillo
En caso de estar deberemos eliminarlo y retornarlo
En caso de no estar diremos por consola 'ERROR: El item con id {id_item} no esta en {tipo bolsillo}'
Ejemplo de prueba:
personaje.mochila.eliminarItem(1, 'bolsillito')
Una vez creada la mochila deberá crearse una nueva mochila por cada nuevo personaje
Ejemplo de prueba:
class Personaje {
    constructor(){
        this.mochila = new Mochila()
    }
}*/

class Personaje {
    constructor(nombre, edad, dinero) {
        this.nombre = nombre
        this.edad = edad
        this.dinero = dinero
        this.inventario = []
        this.mochila = new Mochila(this)//creo la propiedad mochila, instancia de la clase Mochila. NUNCA LE HUBIERA PASADO UN THIS COMO PARÁMETRO A LA INSTANCIA DE LA CLASE MOCHILA.
    }
    gastar(monto) {
        if (this.dinero < monto) {
            console.log(`ACCION invalida: Insuficiente dinero`)
        }
        else {
            this.dinero -= monto
            console.log(`El personaje ${this.nombre} ha gastado ${monto} y se queda con ${this.dinero}`)
        }
    }
    recibir(item) {
        this.inventario.push(item)
    }
    eliminar(id) {
        const idAEliminar = this.inventario.findIndex(item => item.id === id)
        idAEliminar === -1 ? console.log(`Error ACCION INVALIDA: No existe el item con id ${id} dentro del inventario del personaje ${this.nombre}`) : this.inventario.splice(idAEliminar, 1)
    }
}
class Item {
    constructor(id, nombre, categoria, nivel, costo) {
        this.id = id
        this.nombre = nombre
        this.categoria = categoria
        this.nivel = nivel
        this.costo = costo
    }
}
class Mochila {
    constructor(personaje) {//recibe el objeto personaje como parámetro en el constructor. NUNCA PENSÉ QUE DEBÍA PASARLE EL PERSONAJE COMO PARÁMETRO AL CONSTRUCTOR. PENSÉ QUE CREANDO UNA INSTANCIA DE LA CLASE MOCHILA EN LA CLASE PERSONAJE YA PODIA ACCEDER A LA MOCHILA DESDE PERSONAJE
        this.personaje = personaje
        this.primer_bolsillo = []//3
        this.segundo_bolsillo = []//2
        this.bolsillito_de_izquierda = []//1
    }
    guardarItem(item, tipo_bolsillo) {
        switch (tipo_bolsillo) {
            case 'primer_bolsillo':
                this.personaje.mochila.primer_bolsillo.length >= 3 ? console.log(`ERROR: el espacio de la mochila ${tipo_bolsillo} esta lleno`) : this.personaje.mochila.primer_bolsillo.push(item)
                break;
            case 'segundo_bolsillo':
                this.personaje.mochila.segundo_bolsillo.length >= 2 ? console.log(`ERROR: el espacio de la mochila ${tipo_bolsillo} esta lleno`) : this.personaje.mochila.segundo_bolsillo.push(item)
                break;
            case 'bolsillito_de_izquierda':
                this.personaje.mochila.bolsillito_de_izquierda.length >= 1 ? console.log(`ERROR: el espacio de la mochila ${tipo_bolsillo} esta lleno`) : this.personaje.mochila.bolsillito_de_izquierda.push(item)
                break;
            default:
                console.log(`Bolsillo inválido`);
        }
    }
    eliminarItem(id, tipo_bolsillo) {
        const idAEliminarDos = this.personaje.mochila[tipo_bolsillo].findIndex(item => item.id === id);//JJJJJJAAAAMÁS ME HUBIERA DADO CUENTA DE this.personaje.mochila[tipo_bolsillo]
        idAEliminarDos === -1 ? console.log(`ERROR: El item con id ${id} no esta en ${tipo_bolsillo}`) : this.personaje.mochila[tipo_bolsillo].splice(idAEliminarDos, 1);
    }
}
const personajeUno = new Personaje('pepe', 30, 400)
//personajeUno.gastar(300)
const itemUno = new Item(1, "mate", 'bazar', "importante", 10)
const itemDos = new Item(2, "termo", "bazar", "importante", 15)
const itemTres = new Item(3, "acolchado", "bazar", "importante", 30)
//personajeUno.recibir(itemUno)
//personajeUno.recibir(itemDos)
//personajeUno.eliminar(5)

personajeUno.mochila.guardarItem(itemUno, 'bolsillito_de_izquierda')//guardo mate (1) en bolsillito de izquierda

//personajeUno.mochila.guardarItem(itemDos, 'bolsillito_de_izquierda')

console.log(personajeUno.mochila.bolsillito_de_izquierda)//muestro bolsillito de izquierda

personajeUno.mochila.eliminarItem(2, 'bolsillito_de_izquierda')//intento eliminar el termo (2) que no está en el bolsillito de izquierda

personajeUno.mochila.eliminarItem(1, 'bolsillito_de_izquierda')//elimino el mate (1) de bolsillito de izquierda

console.log(personajeUno.mochila.bolsillito_de_izquierda)//muestro bolsillito de izquierda