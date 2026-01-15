type PathObject = { [key: string]: PathObject };

export function getPath(obj: PathObject, path: string) {
  const paths = path.split('.');

  paths.forEach((path) => {
    if (obj === undefined) {
      return undefined;
    }

    obj = obj[path];
  });

  return obj;
}

export function setPath(obj: PathObject, path: string, value: unknown) {
  const paths = path.split('.');

  paths.forEach((path, index) => {
    if (index === paths.length - 1) {
      // @ts-expect-error This will work;
      obj[path] = value;
    } else {
      const current = obj[path];

      if (current) {
        obj = current;
      } else {
        obj[path] = {};
        obj = obj[path];
      }
    }
  });
}
