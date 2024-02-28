import { sql } from '~~/server/db';


export type PacientesModel = {
  id: number;
  nome: string;
  cpf: string;
  cep: string;
  logradouro: string;
  UF: string;
  created_date: string;
};

export const read = async () => {
  const result = await sql({
    query: 'SELECT id, nome, cpf, cep, logradouro, UF FROM pacientes'
  });

  return result as PacientesModel[];
};

export const create = async (data: Pick<PacientesModel, 'nome' | 'cpf' | 'cep'| 'logradouro'| 'UF' >) => {
  const result = (await sql({
    query: `
      INSERT INTO pacientes (
        nome,
        cpf,
        cep,
        logradouro,
        UF
      ) VALUES (
        ?,
        ?,
        ?,
        ?,
        ?
      ) 
    `,
    values: [data.nome, data.cpf, data.cep,data.logradouro,data.UF]
  })) as any;

  return result.length === 1 ? (result[0] as PacientesModel) : null;
};

export const detail = async (id: string) => {
  const result = (await sql({
    query: 'SELECT id, nome, cpf, cep, logradouro, UF FROM pacientes WHERE id = ?',
    values: [id]
  })) as any;

  return result.length === 1 ? (result[0] as PacientesModel) : null;
};

export const update = async (id: string, data: Pick<PacientesModel, 'nome' | 'cpf' | 'cep'| 'logradouro'| 'UF'>) => {
  await sql({
    query: `
      UPDATE pacientes
      SET
        nome = ?,
        cpf = ?,
        cep = ?,
        logradouro = ?,
        UF = ?

      WHERE id = ?
    `,
    values: [data.nome, data.cpf,data.cep, data.logradouro, data.UF, id]
  });

  return await detail(id);
};

export const remove = async (id: string) => {
  await sql({
    query: 'DELETE FROM pacientes WHERE id = ?',
    values: [id]
  });

  return true;
};
