import _ from 'lodash';
import pathToRegexp from 'path-to-regexp';
import { IMenuItem } from 'types';
import umiRouter from 'umi/router';
import AnsiConvertor from 'ansi-to-html';

import { parse } from 'qs';

const ansiConvertor = new AnsiConvertor({ escapeXML: true });

// export const { defaultLanguage } = i18n
// export const languages = i18n.languages.map(item => item.key)
export const languages: any[] = [];
export const defaultLanguage = 'en';

/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|undefined}   Return frist object when query success.
 */
export function queryArray(array: any[], key: string, value: string) {
  if (!Array.isArray(array)) {
    return;
  }
  return array.find(_ => _[key] === value);
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(array: any[], id = 'id', parentId = 'pid', children = 'children') {
  const result: any[] = [];
  const hash = {};
  const data = _.cloneDeep(array);

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index];
  });

  data.forEach(item => {
    const hashParent = hash[item[parentId]];
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = []);
      hashParent[children].push(item);
    } else {
      result.push(item);
    }
  });
  return result;
}

/**
 * Adjust the router to automatically add the current language prefix before the pathname in push and replace.
 */
const myRouter = { ...umiRouter };

export const router = myRouter;

export function pathMatchRegexp(regexp: pathToRegexp.Path, pathname: string) {
  return pathToRegexp(regexp).exec(pathname);
}

export function queryPathKeys(array: string[], current: string, parentId: string, id = 'id') {
  const result = [current];
  const hashMap = new Map();
  array.forEach(item => hashMap.set(item[id], item));

  const getPath = (current: string) => {
    const currentParentId = hashMap.get(current)[parentId];
    if (currentParentId) {
      result.push(currentParentId);
      getPath(currentParentId);
    }
  };

  getPath(current);
  return result;
}

/**
 * In an array of objects, specify an object that traverses the objects whose parent ID matches.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    current   Specify the object that needs to be queried.
 * @param   {string}    parentId  The alias of the parent ID of the object in the array.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @return  {array}    Return a key array.
 */
export function queryAncestors(array: IMenuItem[], current: IMenuItem, parentId: string, id = 'id') {
  const result = [current];
  const hashMap = new Map();
  array.forEach(item => hashMap.set(item[id], item));

  const getPath = (current: IMenuItem) => {
    const currentParentId = hashMap.get(current[id])[parentId];
    if (currentParentId) {
      result.push(hashMap.get(currentParentId));
      getPath(hashMap.get(currentParentId));
    }
  };

  getPath(current);
  return result;
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
export function queryLayout(layouts: any, pathname: string) {
  let result = 'public';

  const isMatch = (regepx: RegExp) => {
    return regepx instanceof RegExp ? regepx.test(pathname) : pathMatchRegexp(regepx, pathname);
  };

  for (const item of layouts) {
    let include = false;
    let exclude = false;
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true;
          break;
        }
      }
    }

    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
          exclude = true;
          break;
        }
      }
    }

    if (include && !exclude) {
      result = item.name;
      break;
    }
  }

  return result;
}

export const maskCurrency = (value: string, maxLength = 12, radix = ',') => {
  const currencyRegExp = new RegExp(`(\\d{1,${maxLength - 3}})(,)?(\\d{2})`, 'g');
  return value.replace(currencyRegExp, (match, p1, p2, p3) => [p1, p3].join(radix));
};

export const parseFromUrl = (url: string) => {
  if (url?.startsWith('?')) {
    const query = url?.substring(1);
    var value = parse(query);
    if (typeof value?.from === 'string') {
      return value;
    }
  }
  return null;
};

export const colorize = (value: string) => {
  return ansiConvertor
    .toHtml(value)
    .replace('&lt;mark&gt;', '<mark>')
    .replace('&lt;/mark&gt;', '</mark>');
};

export { default as Color } from './theme';
export { default as classnames } from 'classnames';
export { default as request } from './request';
export { default as config } from './config';
export { default as constants } from './constants';
