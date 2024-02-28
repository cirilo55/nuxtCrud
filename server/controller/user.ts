import { H3Event } from 'h3';

import * as UserModel from '~~/server/model/user';

export const read = async () => {
  try {
    const result = await UserModel.read();

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
    const result = await UserModel.create({
      name: body.name,
      email: body.email,
      password: body.password
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



;