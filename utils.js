const data = {
  separator: '$',
}
export const pipe = (...functions) => args => functions.reduce((arg, nextFn) => nextFn(arg), args);
export const split = text => text.split(data.separator);
export const trim = text => text.trim();
export const toLowerCase = text => text.toLowerCase();
