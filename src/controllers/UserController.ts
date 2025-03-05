import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {
  async getIndex(req: Request, res: Response) : Promise<void> {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) res.status(404).json({ message: "User not found" });
      else 
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  async getUser(req: Request, res: Response) : Promise<void> {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user)  res.status(404).json({ message: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      const { name, email } = req.body;
      const user = await UserService.createUser(name, email);
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to create user" });
    }
  }
}

export default new UserController();
