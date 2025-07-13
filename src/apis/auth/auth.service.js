import { UserRepository } from "../../repositories/users.repository.js";
import bcrypt, { hash } from "bcryptjs";
import { signJwt } from "../../service/jwt.sign.js";
import crypto from "crypto";

const userRepo = new UserRepository();

class AuthService {
  async example(username, password) {
    try {
      const newUser = await userRepo.create({
        name: username,
        password: password,
      });

      console.log("Created user:", newUser);

      const allUsers = await userRepo.getAll();
      console.log("All users:", allUsers);
    } catch (error) {
      console.error("Error:", error.message);
    }
  }

  async register(name, email, password, role) {
    const vailisRole = ["admin", "member"];
    if (role && !vailisRole.includes(role)) {
      throw new Error("vai trò kh hiowj lẹ");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hashSync(password, salt);

    const createUser = userRepo.create({
      name,
      password: hashPass,
      email,
      role,
    });
    return {
      name: createUser.name,
      email: (await createUser).email,
      role: createUser.role,
    };
  }

  async login(name, password) {
    const findUser = userRepo.getUserByName(name);
    console.log("check find", findUser);

    const checkPass = await bcrypt.compare(password, findUser.password);
    if (!checkPass) {
      throw new Error("Mật khẩu không hợp lệ");
    }

    const token = signJwt({
      id: findUser.id,
      name: findUser.name,
      role: findUser.role,
    });
    return {
      user: { name: findUser.name, email: findUser.email, role: findUser.role },
      token,
    };
  }
}

export default new AuthService();
