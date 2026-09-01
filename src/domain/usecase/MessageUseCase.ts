import { CreateMessageUseCaseRequest, CreateMessageUseCaseResponse, DeleteMessageUseCaseRequest, DeleteMessageUseCaseResponse, GetMessageUseCaseRequest, GetMessageUseCaseResponse, UpdateMessageUseCaseRequest, UpdateMessageUseCaseResponse, ListMessageUseCaseRequest, ListMessageUseCaseResponse } from "../ucio/message"
import { PreconditionError, InternalServerError, TAG_PRE_CONDITION_ERROR, TAG_INTERNAL_SERVER_ERROR } from "../association/error"
import { CreateMessageRepository, DeleteMessageRepository, GetMessageRepository, UpdateMessageRepository, ListMessageRepository } from "../repository/message"
import { CreateMessageValidate, DeleteMessageValidate, GetMessageValidate, UpdateMessageValidate } from "../validate/message"
import { MessageStatus } from '../../infra/database/entity/message.entity'
import { v4 as uuidv4 } from 'uuid'

export class CreateMessageUseCase {
    constructor(
        private validate: CreateMessageValidate = new CreateMessageValidate(),
        private repository: CreateMessageRepository = new CreateMessageRepository()
    ) {}

    async execute(req: CreateMessageUseCaseRequest): Promise<CreateMessageUseCaseResponse> {
        try {
            const error = await this.validate.createMessageValidate(req)
            if (error) {
                return new CreateMessageUseCaseResponse(new PreconditionError(error))
            }

            await this.repository.createMessage({
                messageID: uuidv4(),
                content: req.content,
                status: MessageStatus.CREATED,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            return new CreateMessageUseCaseResponse(null)
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new CreateMessageUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class GetMessageUseCase {
    constructor(
        private validate: GetMessageValidate = new GetMessageValidate(),
        private repository: GetMessageRepository = new GetMessageRepository()
    ) {}

    async execute(req: GetMessageUseCaseRequest): Promise<GetMessageUseCaseResponse> {
        try {
            const error = await this.validate.getMessageValidate(req)
            if (error) {
                return new GetMessageUseCaseResponse(null, new PreconditionError(error))
            }

            const message = await this.repository.getMessage(req.messageID)
            return new GetMessageUseCaseResponse(message, null)
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new GetMessageUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}

export class UpdateMessageUseCase {
    constructor(
        private validate: UpdateMessageValidate = new UpdateMessageValidate(),
        private repository: UpdateMessageRepository = new UpdateMessageRepository()
    ) {}

    async execute(req: UpdateMessageUseCaseRequest): Promise<UpdateMessageUseCaseResponse> {
        try {
            const error = await this.validate.updateMessageValidate(req)
            if (!error) {
                const updateMessage = await this.repository.getMessage(req.messageID)
                if (updateMessage?.messageID === req.messageID) {
                    const now = new Date()
                    updateMessage.content = req.content
                    updateMessage.status = MessageStatus.UPDATED
                    updateMessage.updatedAt = now
                    await this.repository.updateMessage(updateMessage)
                }
                return new UpdateMessageUseCaseResponse(null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new UpdateMessageUseCaseResponse(new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new UpdateMessageUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class DeleteMessageUseCase {
    constructor(
        private validate: DeleteMessageValidate = new DeleteMessageValidate(),
        private repository: DeleteMessageRepository = new DeleteMessageRepository()
    ) {}

    async execute(req: DeleteMessageUseCaseRequest): Promise<DeleteMessageUseCaseResponse> {
        try {
            const error = await this.validate.deleteMessage(req)
            if (!error) {
                await this.repository.deleteMessage(req.messageID)
                return new DeleteMessageUseCaseResponse(null)
            } else {
                return new DeleteMessageUseCaseResponse(new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new DeleteMessageUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class ListMessageUseCase {
    constructor(
        private repository: ListMessageRepository = new ListMessageRepository()
    ) {}

    async execute(req: ListMessageUseCaseRequest): Promise<ListMessageUseCaseResponse> {
        try {
            const messages = await this.repository.listMessage()
            return new ListMessageUseCaseResponse(messages, null)
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new ListMessageUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}
