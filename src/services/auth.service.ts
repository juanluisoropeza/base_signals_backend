import { LoginResult, User } from '../interfaces/user.interface';
import { encrypt, verified } from '../utils/bcrypt.handle';
import { generateToken } from '../utils/jwt.handle';
import { addUser, getUserByEmail } from './user.service';

const registerNewUser = async (newUser: User): Promise<User | string> => {
  const checkIs = await getUserByEmail(newUser.email);
  if (checkIs) {
    return 'USER_ALREADY_EXIST';
  }
  if (newUser.password === undefined) {
    return 'USER_NEEDS_PASSWORD';
  }
  const passHash = await encrypt(newUser.password);
  const user = {
    ...newUser,
    password: passHash,
  };
  const registerUser = await addUser(user);
  return registerUser;
};

const loginUser = async (email: string, password: string): Promise<LoginResult | null> => {
  const checkIs = await getUserByEmail(email);
  if (!checkIs) {
    return 'NOT_FOUND_USER';
  }

  if (checkIs.password === null || checkIs.password === undefined) {
    return null;
  }

  const userForResponse: User = {
    _id: checkIs._id,
    name: checkIs.name,
    lastname: checkIs.lastname,
    gender: checkIs.gender,
    phone: checkIs.phone,
    email: checkIs.email,
    role: checkIs.role,
    active: checkIs.active,
  };

  const isCorrect = await verified(password, checkIs.password);
  if (!isCorrect) {
    return 'PASSWORD_INCORRECT';
  }

  const token = generateToken(checkIs._id ?? '');

  const data = {
    token: token,
    user: userForResponse,
  };
  return data;
};

export { loginUser, registerNewUser };
