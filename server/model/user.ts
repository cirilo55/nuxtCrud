import { sql } from '~~/server/db';

export type UserModel = {
  id: number;
  name: string;
  email: string;
  password: string;
  created_date: string;
};

export const read = async () => {
  const result = await sql({
    query: 'SELECT * FROM users'
  });

  return result as UserModel[];
};

export const create = async (data: Pick<UserModel, 'name' | 'email' | 'password'>) => {
  const result = (await sql({
    query: `
      INSERT INTO users (
        name,
        email,
        password
      ) VALUES (
        ?,
        ?,
        ?
      ) 
    `,
    values: [data.name, data.email, data.password]
  })) as any;

  return result.length === 1 ? (result[0] as UserModel) : null;
};

// export const detail = async (id: string) => {
//   const result = (await sql({
//     query: 'SELECT id, title, content, created_date FROM blog WHERE id = ?',
//     values: [id]
//   })) as any;

//   return result.length === 1 ? (result[0] as BlogModel) : null;
// };

// export const update = async (id: string, data: Pick<BlogModel, 'title' | 'content'>) => {
//   await sql({
//     query: `
//       UPDATE blog
//       SET
//         title = ?,
//         content = ?
//       WHERE id = ?
//     `,
//     values: [data.title, data.content, id]
//   });

//   return await detail(id);
// };

// export const remove = async (id: string) => {
//   await sql({
//     query: 'DELETE FROM blog WHERE id = ?',
//     values: [id]
//   });

//   return true;
// };
