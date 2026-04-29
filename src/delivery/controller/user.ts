import { CreateUserUseCase, LoginUserUseCase, UpdateUserUseCase, DeleteUserUseCase, CheckEmailExistsUserUseCase } from "../../domain/usecase/UserUseCase"
import { CheckEmailExistsUserUseCaseRequest, CreateUserUseCaseRequest, DeleteUserUseCaseRequest, GetLoginUserUseCaseRequest, UpdateUserUseCaseRequest } from "../../domain/ucio/user"
import { SuccessResponse } from "../response/response"
import { Request, Response } from 'express'

class CreateUserRegisterController {
  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password } = req.body
    const ucReq = new CreateUserUseCaseRequest(name, email, password)
    const useCase = new CreateUserUseCase()

    const ucRes = await useCase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class LoginUserController {
  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, passwordHash } = req.body
    const ucReq = new GetLoginUserUseCaseRequest(email, passwordHash)
    const useCase = new LoginUserUseCase()

    const ucRes = await useCase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class UpdateUserController {
  async updateUser(req: Request, res: Response): Promise<void> {
    const { userID, name, email, password } = req.body
    const ucReq = new UpdateUserUseCaseRequest(userID, name, email, password)
    const useCase = new UpdateUserUseCase()

    const ucRes = await useCase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class DeleteUserController {
  async deleteUser(req: Request, res: Response): Promise<void> {
    const { userID } = req.body
    const ucReq = new DeleteUserUseCaseRequest(userID)
    const useCase = new DeleteUserUseCase()

    const ucRes = await useCase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

class CheckEmailExistsUserController {
  async checkEmailExistsUser(req: Request, res: Response): Promise<void> {
    const { email } = req.body
    const ucReq = new CheckEmailExistsUserUseCaseRequest(email)
    const useCase = new CheckEmailExistsUserUseCase()

    const ucRes = await useCase.execute(ucReq)
    new SuccessResponse().success(res, ucRes)
  }
}

export {
  CreateUserRegisterController, LoginUserController,
  UpdateUserController, DeleteUserController, CheckEmailExistsUserController
}