import { H3Event } from 'h3';

import * as PacientesModel from '~~/server/model/pacientes';

export const read = async () => {
  try {
    const result = await PacientesModel.read();

    return {
      data: result
    };
  } catch (err) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
}

export const create = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await PacientesModel.create({
      nome: body.nome,
      cpf: body.cpf,
      cep: body.cep,
      logradouro: body.logradouro,
      UF: body.UF
    });

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const detail = async (evt: H3Event) => {
  try {
    const result = await PacientesModel.detail(evt.context.params?.id as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const update = async (evt: H3Event) => {
  try {
    const body = await readBody(evt);
    const result = await PacientesModel.update(evt.context.params?.id as string, {
      nome: body.nome,
      cpf: body.cpf,
      cep: body.cep,
      logradouro: body.logradouro,
      UF: body.UF
    });

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};

export const remove = async (evt: H3Event) => {
  try {
    const result = await PacientesModel.remove(evt.context.params?.id as string);

    return {
      data: result
    };
  } catch {
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
};



;