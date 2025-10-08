import { CreateUserRepository, DeleteUserRepository, GetLoginUserRepository, StartSessionWhatsAppRepository, UpdateUserRepository } from "../../domain/repository/user"
import { CheckEmailExistsUserUseCaseRequest, CheckEmailExistsUserUseCaseResponse, CreateUserUseCaseRequest, CreateUserUseCaseResponse, 
DeleteUserUseCaseRequest, DeleteUserUseCaseResponse, GetLoginUserUseCaseRequest, GetLoginUserUseCaseResponse, StartSessionUserWthatsAppRequest, 
StartSessionUserWthatsAppResponse, UpdateUserUseCaseRequest, UpdateUserUseCaseResponse } from "../../domain/ucio/user"
import { CheckEmailExistsUserValidate, CreateUserValidate, DeleteUserValidate, GetLoginUserValidate, StartSessionWhatsAppValidate, UpdateUserValidate } from "../../domain/validate/user"
import { SuccessResponse } from "../response/response"
import { Request, Response } from 'express'
import { InternalServerError, PreconditionError, TAG_INTERNAL_SERVER_ERROR, TAG_PRE_CONDITION_ERROR } from "../../domain/association/error"
import { create, CreateOptions } from 'venom-bot'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { WhatsApoStatusEnum } from "../../domain/utils/enum"

dotenv.config()

class CreateUserRegisterController {
  async createUser(req: Request, res: Response): Promise<void> {
      const {name, email, password} = req.body
      console.log('req.body', req.body)
      const ucReq = new CreateUserUseCaseRequest(name, email, password)

      const validate = new CreateUserValidate()
      const repository = new CreateUserRepository()

      const usecase = async (req: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> => {
          try{
              const error = await validate.createUserValidate(req)
              console.log("error", error)
              if (!error) {
                const hashedPassword = await bcrypt.hash(password, 10)
                const user = await repository.createUser(
                  {
                    userID: uuidv4(),
                    name: req.name,
                    email: req.email,
                    passwordHash: hashedPassword,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
              )
              return new CreateUserUseCaseResponse(user, null)
              } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new CreateUserUseCaseResponse(null, new PreconditionError(error))
              }    
          }catch(error: any) {
            return new CreateUserUseCaseResponse(null, new PreconditionError(error.message));
          }
        }

      try {
        const ucRes = await usecase(ucReq)
        if(ucRes.error) {
          res.status(400).json({ error: ucRes.error })
        }else {
          new SuccessResponse().success(res, ucRes.user)
        }
      }catch (error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        new CreateUserUseCaseResponse(null, new InternalServerError(error.message))
      }
  }
}

// Login
const JWT_SECRET = process.env.JWT_SECRET

class LoginUserController {
  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, passwordHash } = req.body
    const ucReq = new GetLoginUserUseCaseRequest(email, passwordHash)
    const validate = new GetLoginUserValidate()
    const repository = new GetLoginUserRepository()

    const usecase = async (req: GetLoginUserUseCaseRequest): Promise<GetLoginUserUseCaseResponse> => {
        try {
          const error = await validate.getLoginUserValidate(req)
          if (!error) {
            const user = await repository.getLoginUser(email)
            
            if (!user || (await bcrypt.compare(req.passwordHash, user.passwordHash))) {
              return new GetLoginUserUseCaseResponse(null, null, new PreconditionError("Usuário não cadastrado ou senha inválida"))
            }

            const token = jwt.sign({ userID: user.userID, name: user.name, email: user.email }, JWT_SECRET as string, { expiresIn: '7d' })

            return new GetLoginUserUseCaseResponse(token, user, null)
          } else {
            console.log(TAG_PRE_CONDITION_ERROR, error)
            return new GetLoginUserUseCaseResponse(null, null, new PreconditionError(error))
          }       
        } catch (error: any) {
          console.log(TAG_INTERNAL_SERVER_ERROR, error)
          return new GetLoginUserUseCaseResponse(null, null, new InternalServerError(error.message))
        }
    }
    
    try {
      const ucRes = await usecase(ucReq)
      if (ucRes.error) {
        res.status(400).json({ error: ucRes.error })
      } else {
        new SuccessResponse().success(res, ucRes.token)
      }
    }catch(erro: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, erro)
      new GetLoginUserUseCaseResponse(null, null, new InternalServerError(erro.message))
    }
  }
}

class UpdateUserController {
  async updateUser(req: Request, res: Response): Promise<void> {
    const {userID, name, email, password} = req.body
    const ucReq = new UpdateUserUseCaseRequest(userID, name, email, password)

    const validate = new UpdateUserValidate()
    const repository = new UpdateUserRepository()

    const usecase = async (req: UpdateUserUseCaseRequest): Promise<UpdateUserUseCaseResponse> => {
      try {
        const error = await validate.updateUserValidate(req)
        if (!error) {
          const updateUser = await repository.updateLoginUser(req.userID)
          console.log("updateUser", updateUser)
          if(updateUser?.userID === req.userID) {
            const now = new Date()
            updateUser.name = req.name,
            updateUser.email = req.email,
            updateUser.passwordHash = req.passwordHash,
            updateUser.updatedAt = now
            await repository.updateUser(updateUser)
          }
          return new UpdateUserUseCaseResponse( null )
        } else {
          console.log(TAG_PRE_CONDITION_ERROR, error)
          return new UpdateUserUseCaseResponse(new PreconditionError(error))
        }
      }catch(error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        return new UpdateUserUseCaseResponse(new InternalServerError(error.message))
      }
    }

    try {
      const ucRes = await usecase(ucReq)
      if (ucRes.error) {
        res.status(400).json({ error: ucRes.error })
      } else {
        new SuccessResponse().success(res, ucRes)
      }
    }catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error)
      new UpdateUserUseCaseResponse(new InternalServerError(error.message))
    }
  }
}

class DeleteUserController {
  async deleteUser(req: Request, res: Response): Promise<void> {
      const { userID } = req.body
      const ucReq = new DeleteUserUseCaseRequest(userID)
      const validate = new DeleteUserValidate()
      const repository = new DeleteUserRepository()

      const usecase = async (req: DeleteUserUseCaseRequest): Promise<DeleteUserUseCaseResponse> => {
        try{
          const error = await validate.deleteUser(req)
          if (!error) {
            await repository.deleteUserRepository(req.userID)
            return new DeleteUserUseCaseResponse(null)
          } else {
            console.log(TAG_PRE_CONDITION_ERROR, error)
            return new DeleteUserUseCaseResponse(new PreconditionError(error))
          }
        }catch(error: any) {
          console.log(TAG_INTERNAL_SERVER_ERROR, error)
          return new DeleteUserUseCaseResponse(new InternalServerError(error))
        }
      }

      try {
        const ucRes = await usecase(ucReq)
        if (ucRes.error) {
          res.status(400).json({ error: ucRes.error })
        } else {
          new SuccessResponse().success(res, ucRes)
        }
      }catch (error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error)
        new DeleteUserUseCaseResponse(new InternalServerError(error))
      }
  }
}

class StartSessionUserWhatsAppController {
  async startSessionUserWhatsApp(req: Request, res: Response): Promise<void> {
    const {userID, session } = req.body
    const ucReq = new StartSessionUserWthatsAppRequest(userID, session)
    const validate = new StartSessionWhatsAppValidate()
    const repository = new StartSessionWhatsAppRepository()

    
    let responseSent = false;
    const usecase = async (req: StartSessionUserWthatsAppRequest): Promise<StartSessionUserWthatsAppResponse> => {

      try {
        const error = await validate.startSessionWhatsAppValidate(req);

        if (!error) {
          const conectWhastApp = await repository.startSessionWhatsAppRepository(req.userID);

          console.log("conectWhastApp", conectWhastApp);
          if (conectWhastApp) {
            const options: CreateOptions = {
              session,
              catchQR: (base64Qrimg) => {
                if (!responseSent) {
                  responseSent = true
                  console.log("QR gerado", base64Qrimg)
                  res.json({ qrCode: base64Qrimg })
                }
              },
              browserArgs: ['--no-sandbox']
            }

            const client = await create(options)
            session.set(session, client)
            console.log("WhatsApp conectado", session.set)
            return new StartSessionUserWthatsAppResponse(true, session, userID, null)
          }
        }

        return new StartSessionUserWthatsAppResponse(false, null, userID, new PreconditionError(error || "Erro ao iniciar sessão"));

      } catch (error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error);
        return new StartSessionUserWthatsAppResponse(false, null, userID, new InternalServerError(error.message));
      }
    };

    try {
      const ucRes = await usecase(ucReq);
      if (!responseSent) {
        if (ucRes.error) {
          res.status(400).json({ error: ucRes.error });
        } else {
          new SuccessResponse().success(res, ucRes.session);
        }
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error);
      if (!responseSent) {
        new StartSessionUserWthatsAppResponse(false, null, userID, new InternalServerError(error.message));
      }
    }
  }

}

class CheckSessionUserWhatsAppController {
  async checkSessionUserWhatsApp(req: Request, res: Response): Promise<void> {
    const {userID, session } = req.body
    const ucReq = new StartSessionUserWthatsAppRequest(userID, session)
    const validate = new StartSessionWhatsAppValidate()
    const repository = new StartSessionWhatsAppRepository()

    
    let responseSent = false;
    const usecase = async (req: StartSessionUserWthatsAppRequest): Promise<StartSessionUserWthatsAppResponse> => {

      try {
        const error = await validate.startSessionWhatsAppValidate(req);

        if (!error) {
          const conectWhastApp = await repository.startSessionWhatsAppRepository(req.userID);

          console.log("conectWhastApp", conectWhastApp);
          if (conectWhastApp) {
            const options: CreateOptions = {
              session: WhatsApoStatusEnum.CONNECTED,
              catchQR: (base64Qrimg) => {
                if (!responseSent) {
                  responseSent = true;
                  console.log("QR gerado", base64Qrimg);
                  res.json({ qrCode: base64Qrimg });
                }
              },
              browserArgs: ['--no-sandbox']
            };

            await create(options);
            console.log("WhatsApp conectado", options);
            return new StartSessionUserWthatsAppResponse(true, session, userID, null);
          }
        }

        return new StartSessionUserWthatsAppResponse(false, null, userID, new PreconditionError(error || "Erro ao iniciar sessão"));

      } catch (error: any) {
        console.log(TAG_INTERNAL_SERVER_ERROR, error);
        return new StartSessionUserWthatsAppResponse(false, null, userID, new InternalServerError(error.message));
      }
    };

    try {
      const ucRes = await usecase(ucReq);
      if (!responseSent) {
        if (ucRes.error) {
          res.status(400).json({ error: ucRes.error });
        } else {
          new SuccessResponse().success(res, ucRes.session);
        }
      }
    } catch (error: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, error);
      if (!responseSent) {
        new StartSessionUserWthatsAppResponse(false, null, userID, new InternalServerError(error.message));
      }
    }
  }

}

class CheckEmailExistsUserController {
  async checkEmailExistsUser(req: Request, res: Response): Promise<void> {
    const { email } = req.body

    const ucReq = new CheckEmailExistsUserUseCaseRequest(email)
    const validate = new CheckEmailExistsUserValidate()
    const repository = new GetLoginUserRepository()

    const usecase = async (req: CheckEmailExistsUserUseCaseRequest): Promise<CheckEmailExistsUserUseCaseResponse> => {
        try {
          const error = await validate.checkEmailExistsValidate(req)

          if (!error) {
            const user = await repository.getLoginUser(email)

            if (req.email !== user?.email) {
              return new CheckEmailExistsUserUseCaseResponse(new PreconditionError("Email não encontrado"))
            }

            return new CheckEmailExistsUserUseCaseResponse(null)
          } else {
            console.log(TAG_PRE_CONDITION_ERROR, error)
            return new CheckEmailExistsUserUseCaseResponse(new PreconditionError("Email já cadastrado"))
          }       
        } catch (error: any) {
          console.log(TAG_INTERNAL_SERVER_ERROR, error)
          return new CheckEmailExistsUserUseCaseResponse(new InternalServerError(error.message))
        }
    }
    
    try {
      const ucRes = await usecase(ucReq)
      if (ucRes.error) {
        res.status(400).json({ error: ucRes.error })
      } else {
        new SuccessResponse().success(res, ucRes)
      }
    }catch(erro: any) {
      console.log(TAG_INTERNAL_SERVER_ERROR, erro)
      new CheckEmailExistsUserUseCaseResponse(new InternalServerError(erro.message))
    }
  }
}


export {
  CreateUserRegisterController, LoginUserController, StartSessionUserWhatsAppController, 
  UpdateUserController, DeleteUserController, CheckEmailExistsUserController, CheckSessionUserWhatsAppController
}