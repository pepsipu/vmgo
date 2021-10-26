import mongoose from 'mongoose';
import { compare } from 'bcrypt';
import router from './router';

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  computers: [String],
});

const User = mongoose.model('User', userSchema);

export interface LoginData {
  password: string,
  email: string,
}

const login = (req: any, res: any, user: any) => {
  const {
    id, username, email,
  } = user;
  req.session.userId = id;
  res.status(200);
  res.cookie('id', id);
  res.cookie('username', username);
  res.cookie('email', email);
  res.send({ error: false });
};

// logs in user if their password is correct
router.post('/user/login', async (req, res) => {
  const { email, password }: LoginData = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return;
  }
  // check password hashes
  if (!await compare(password, user.password)) {
    return;
  }
  login(req, res, user);
});
