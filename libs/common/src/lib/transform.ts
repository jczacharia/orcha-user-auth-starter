/* eslint-disable @typescript-eslint/ban-types */
import { IPagination } from './pagination';
import { IParser } from './parser';
import { IQuery } from './query';

export function parseOrchestraQuery<T, Q extends IQuery<T>>(query: Q, entities: T): IParser<T, Q>;
export function parseOrchestraQuery<T, Q extends IQuery<T>>(
  query: Q,
  entities: T[] | IPagination<T>
): IParser<T[], Q>;
export function parseOrchestraQuery<T, Q extends IQuery<T>>(
  query: Q,
  entities: T | T[] | IPagination<T> | undefined
) {
  if (!entities) return undefined;

  // is pagination
  if ('items' in entities && 'meta' in entities) {
    const i = parseOrchestraQuery(query, entities.items);
    // TODO any
    (entities as any).items = i;
    return (entities as unknown) as IParser<T[], Q>;
  }

  if (Array.isArray(query)) {
    query = query[0];
  }

  const remove = (e: T) => {
    const qKeys = Object.keys(query as object);
    for (const k of Object.keys(e)) {
      if (!qKeys.includes(k)) {
        delete e[k as keyof T];
      }
    }

    for (const [k, q] of Object.entries(query as object)) {
      if (typeof q === 'object') {
        parseOrchestraQuery(q, e[k as keyof T]);
      }
    }

    return e;
  };

  if (Array.isArray(entities)) {
    entities.map((e) => remove(e));
    return (entities as unknown) as IParser<T[], Q>;
  } else {
    entities = remove(entities);
    return (entities as unknown) as IParser<T, Q>;
  }
}
