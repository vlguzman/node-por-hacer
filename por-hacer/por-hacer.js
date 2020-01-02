const fs = require('fs');

let listadoPorHacer = [];

const guardarData = () => {

    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('data/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });

}

const cargarData = () => {

    try {

        listadoPorHacer = require('../data/data.json');

    } catch (error) {

        listadoPorHacer = [];

    }

}


const crear = (descripcion) => {

    cargarData();

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);

    guardarData();

    return porHacer;

}

const getListado = () => {

    cargarData();
    return listadoPorHacer;

}

const actualizar = (descripcion, completado = true) => {

    cargarData();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarData();
        return true;
    } else {
        return false;
    }

}

const borrar = (descripcion) => {

    cargarData();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {

        listadoPorHacer = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);
        guardarData();
        return true;

    } else {

        return false;

    }

}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}