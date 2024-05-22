import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function CriteriaDocs() {
  return applyDecorators(
    ApiQuery({
      name: 'start',
      required: false,
      description: 'Número de la página a obtener',
      type: Number,
      example: 0,
    }),
    ApiQuery({
      name: 'size',
      required: false,
      description: 'Número registros a obtener',
      type: Number,
      example: 10,
    }),
    ApiQuery({
      name: 'filters',
      required: false,
      description: 'Filtras por propiedad enviar un JSON.stringify',
      type: String,
      example: '[{"field":"name","operator":"CONTAINS","value":"alejandro"}]',
    }),
    ApiQuery({
      name: 'selectProperties enviar un JSON.stringify',
      required: false,
      description:
        'Selecciona solo las propiedades que quieres traer en la consulta (si no se indica trae todos los campos disponibles)',
      type: String,
      example: '[name]',
    }),
    ApiQuery({
      name: 'globalFilter',
      required: false,
      description: 'Buscar por las globalFilterProperties',
      type: String,
      example: '',
    }),
    ApiQuery({
      name: 'globalFilterProperties enviar un JSON.stringify',
      required: false,
      description: 'Número registros a obtener',
      type: String,
      example: '[name]',
    }),
  );
}
