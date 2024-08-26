import { compareSync, hash } from 'bcryptjs';

const encrypt = async (pass: string) => {
  const passwordHash = await hash(pass, 8);
  return passwordHash;
};

const verified = async (pass: string, passHash: string) => {
  const isCorrect = await compareSync(pass, passHash);
  return isCorrect;
};

export { encrypt, verified };
