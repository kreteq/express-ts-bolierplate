import { Request, Response } from "express";


class AuthController {
  
  async login(req: Request, res: Response) : Promise<void> {
    try {
      res
        .status(200)
        .json({
          success: true,
          message: 'success'
        })
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

export default new AuthController();
