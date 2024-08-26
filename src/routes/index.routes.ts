import { Router } from 'express';
import { readdirSync } from 'fs';

const PATH_ROUTER = `${__dirname}`;
const router = Router();
const files = readdirSync(PATH_ROUTER);
const cleanFileName = (fileName: string) => {
  return fileName.split('.').shift();
};

files.forEach((filename) => {
  const cleanName = cleanFileName(filename);

  if (cleanName !== 'index') {
    const kebabCaseName = cleanName?.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

    import(`./${cleanName}.routes`).then((moduleRouter) => {
      router.use(`/${kebabCaseName}`, moduleRouter.router);
    });
  }
});

export { router };
