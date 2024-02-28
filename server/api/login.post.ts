import { useSessionAuth } from '@/server/utils/session';
import * as UserCtrl from '@/server/controller/user';

const users = UserCtrl.read();

interface Login {
  name: string;
  password: string;
}

export default defineEventHandler(async (event) => {
  try {
    const usersResult = await UserCtrl.read();
    const users = usersResult.data;

    const body = await readBody<Login>(event);

    const user = users.find(user => user.name === body.name && user.password === body.password);

    if (!user) {
      throw createError({
        statusCode: 400,
        statusMessage: 'Invalid username or password'
      });
    }

    const session = await useSessionAuth(event);
    await session.update({
      name: user.name,
      email: user.email
    });

    return {
      success: true
    };
  } catch (err) {
    console.log(err);
    throw createError({
      statusCode: 500,
      statusMessage: 'Something went wrong'
    });
  }
});