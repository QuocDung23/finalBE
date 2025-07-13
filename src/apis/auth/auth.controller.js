import AuthService from "./auth.service.js";

class AuthController {
  async example(req, res) {
    try {
      const userLogin = req.body;
      const username = userLogin.name;
      const password = userLogin.password;
      console.log("username:", username);
      const responseSer = await AuthService.example(username, password);
      if (!example)
        return res.status(500).json({
          success: false,
          message: error.message,
        });
      req.user = token;

      return res.status(200).json({
        success: true,
        // data: userLogin
        data: token,
      });
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: error.message,
      });
    }
  }

  async register(req, res) {
    try {
      const { name, password, email, role } = req.body;
      if ((!name, !password, !email, !role)) {
        return res.status(400).json({
          message: "điền thêm thông tin",
        });
      }

      const user = await AuthService.register(name, password, email, role);
      return res.status(201).json({
        success: true,
        message: "Đăng kí thành công",
        data: {
          name: user.username,
          email: user.email,
          role: user.role,
          creator: user._id,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
  async login(req, res) {
    try {
      const { name, password } = req.body;
      if (!name || !password) {
        return res.status(401).json({
          success: false,
          message: "Điền thiếu thông tintin",
        });
      }
      const { user, token } = await AuthService.login(name, password);
      console.log(user, token);
      if (!user || !token) {
        return res.status(401).json({
          success: false,
          message: "Tên đăng nhập hoặc mật khẩu không đúng",
        });
      }

      req.user = user; // Gán user cho req nếu cần dùng ở middleware tiếp theo

      return res.status(200).json({
        success: true,
        message: "Đăng nhập thành công",
        data: {
          token,
          creator: user.id,
        },
      });
    } catch (error) {
        console.log(error);
        return res.status(400).json({
          success: false,
          message: error.message,
        })
    }
  }
}

export default new AuthController();
