import User, { IUser } from "../models/User";
import redisClient from "../config/cache";

class UserService {
  async getUserById(id: string): Promise<IUser | null> {
    const cachedUser = await redisClient.get(`user:${id}`);
    if (cachedUser) return JSON.parse(cachedUser);

    const user = await User.findById(id);
    if (user) await redisClient.set(`user:${id}`, JSON.stringify(user), { EX: 3600 });

    return user;
  }

  async createUser(name: string, email: string): Promise<IUser> {
    const user = new User({ name, email });
    await user.save();
    return user;
  }
}

export default new UserService();
