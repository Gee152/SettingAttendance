import { CreateContactUseCaseRequest, CreateContactUseCaseResponse, GetContactUseCaseRequest, GetContactUseCaseResponse, UpdateContactUseCaseRequest, UpdateContactUseCaseResponse, DeleteContactUseCaseRequest, DeleteContactUseCaseResponse, ListContactUseCaseRequest, ListContactUseCaseResponse } from "../ucio/contact"
import { CreateContactValidate, GetContactValidate, UpdateContactValidate, DeleteContactValidate } from "../validate/contact"
import { CreateContactRepository, GetContactRepository, UpdateContactRepository, DeleteContactRepository, ListContactRepository } from "../repository/contact"
import { PreconditionError, InternalServerError, TAG_PRE_CONDITION_ERROR, TAG_INTERNAL_SERVER_ERROR } from "../association/error"
import { v4 as uuidv4 } from 'uuid'

export class CreateContactUseCase {
    constructor(
        private validate: CreateContactValidate = new CreateContactValidate(),
        private repository: CreateContactRepository = new CreateContactRepository()
    ) {}

    async execute(req: CreateContactUseCaseRequest): Promise<CreateContactUseCaseResponse> {
        try {
            const error = await this.validate.createContactValidate(req)
            if (!error) {
                await this.repository.createContact({
                    contactID: uuidv4(),
                    userID: req.userID,
                    name: req.name,
                    phoneNumber: req.phoneNumber,
                    tags: req.tags,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                return new CreateContactUseCaseResponse(null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new CreateContactUseCaseResponse(new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new CreateContactUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class GetContactUseCase {
    constructor(
        private validate: GetContactValidate = new GetContactValidate(),
        private repository: GetContactRepository = new GetContactRepository()
    ) {}

    async execute(req: GetContactUseCaseRequest): Promise<GetContactUseCaseResponse> {
        try {
            const error = await this.validate.getContactValidate(req)
            if (!error) {
                const contact = await this.repository.getContact(req.contactID)
                return new GetContactUseCaseResponse(contact, null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new GetContactUseCaseResponse(null, new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new GetContactUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}

export class UpdateContactUseCase {
    constructor(
        private validate: UpdateContactValidate = new UpdateContactValidate(),
        private repository: UpdateContactRepository = new UpdateContactRepository()
    ) {}

    async execute(req: UpdateContactUseCaseRequest): Promise<UpdateContactUseCaseResponse> {
        try {
            const error = await this.validate.updateContactValidate(req)
            if (!error) {
                const updateContact = await this.repository.getContact(req.contactID)
                if (updateContact?.contactID === req.contactID) {
                    const now = new Date()
                    updateContact.name = req.name
                    updateContact.phoneNumber = req.phoneNumber
                    updateContact.tags = req.tags
                    updateContact.updatedAt = now
                    await this.repository.updateContact(updateContact)
                }
                return new UpdateContactUseCaseResponse(null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new UpdateContactUseCaseResponse(new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new UpdateContactUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class DeleteContactUseCase {
    constructor(
        private validate: DeleteContactValidate = new DeleteContactValidate(),
        private repository: DeleteContactRepository = new DeleteContactRepository()
    ) {}

    async execute(req: DeleteContactUseCaseRequest): Promise<DeleteContactUseCaseResponse> {
        try {
            const error = await this.validate.deleteContactValidate(req)
            if (!error) {
                await this.repository.deleteContact(req.contactID)
                return new DeleteContactUseCaseResponse(null)
            } else {
                console.log(TAG_PRE_CONDITION_ERROR, error)
                return new DeleteContactUseCaseResponse(new PreconditionError(error))
            }
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new DeleteContactUseCaseResponse(new InternalServerError(error.message))
        }
    }
}

export class ListContactUseCase {
    constructor(
        private repository: ListContactRepository = new ListContactRepository()
    ) {}

    async execute(req: ListContactUseCaseRequest): Promise<ListContactUseCaseResponse> {
        try {
            const contacts = await this.repository.listContact()
            return new ListContactUseCaseResponse(contacts, null)
        } catch (error: any) {
            console.log(TAG_INTERNAL_SERVER_ERROR, error)
            return new ListContactUseCaseResponse(null, new InternalServerError(error.message))
        }
    }
}
