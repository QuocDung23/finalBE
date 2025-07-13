import UserModel from '../models/users.model.js';

export class UserRepository {
  async create(dto) {
    const { name, email, password, role } = dto;

    if (!name || !email || !password || !role) {
      console.log(name,  email, password);
      throw new Error('Name, email, and password are required.');
    }
    const result = await UserModel.create({
      name,
      email,
      password,
    });

    return {
      name,
      email,
      id: String(result.id),
    };
  }

  async getUserByName(name) {
    if(!name){
      throw new Error('Vui lòng nhập tên')
    }
    
    const findUser = await UserModel.findOne({ name }).lean()
    if(!findUser){
      console.log('Không tìm tháy người này');
      return null
    }
  }

  async getOneById(id) {
    const user = await UserModel.findOne({
      id: id,
    });

    if (!user) {
      throw new Error('not found');
    }

    return {
      id: String(user.id),
      name: String(user.name),
      email: String(user.email),
    };
  }

  async getAll() {
    const users = await UserModel.find();
    if (!users) throw new Error('Not found user');
    
    return users.map(user => ({
      id: user._id.toString(),
      name: user.name,
      email: user.email
    }));
  }

  async deleteOneById(id) {
    const deletedUser = await UserModel.findOneAndDelete({ _id: id }).lean();
    if (!deletedUser) throw new Error('not found');
    
    return {
      id: String(deletedUser._id),
      name: deletedUser.name,
      email: deletedUser.email,
    };
  }
}