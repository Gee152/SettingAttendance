import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity({schema: 'public', name: 'proposal'})
class ProposalModel {
    @PrimaryGeneratedColumn('increment')
        public ID: number | null
    
    @Column({ name: 'address', type: 'varchar', nullable: false, length: '255' })
        public address: string

    @Column({ name: 'cod_operator', type: 'varchar', nullable: false, length: '100' })
        public codOperator: string

    @Column({ name: 'holder', type: 'varchar', nullable: false, length: '255' })
        public holder: string
    
    @Column({ name: 'dependents', type: 'varchar', nullable: true, length: '255' })
        public dependents: string | null
    
    @Column({ name: 'date_of_birth', type: 'date', nullable: false })
        public dateOfBirth: Date

    @Column({ name: 'cpf', type: 'varchar', nullable: false, length: '15' })
        public cpf: string

    @Column({ name: 'identity', type: 'varchar', nullable: true, length: '20' })
        public identity: string | null

    @Column({ name: 'proposal_number', type: 'varchar', nullable: false, length: '100' })
        public proposalNumber: string

    @Column({ name: 'whatsapp', type: 'varchar', nullable: false, length: '15' })
        public whatsapp: string

    @Column({ name: 'zip_code', type: 'varchar', nullable: false, length: '15' })
        public zipCode: string

    @Column({ name: 'number_resident', type: 'varchar', nullable: false, length: '1000' })
        public numberResident: string
    
    @Column({ name: 'uf', type: 'varchar', nullable: false, length: '2' })
        public UF: string

    @Column({ name: 'contact', type: 'varchar', nullable: false, length: '255' })
        public contact: string

    @Column({ name: 'email', type: 'varchar', nullable: false, length: '255' })
        public email: string

    @Column({ name: 'contract_readjustment', type: 'date', nullable: false })
        public contractReadjustment: Date

    @Column({ name: 'contract_implementation', type: 'date', nullable: false })
        public contractImplementation: Date

    @Column({ name: 'bill_expiration', type: 'date', nullable: false })
        public billExpiration: Date

    @Column({ name: 'contract_price', type: 'decimal', nullable: false, precision: 10, scale: 2 })
        public contractPrice: number

    @Column({ name: 'lead', type: 'varchar', nullable: false, length: '255' })
        public lead: string

    @Column({ name: 'plan', type: 'varchar', nullable: false, length: '255' })
        public plan: string

    @Column({ name: 'type_of_contract', type: 'varchar', nullable: false, length: '100' })
        public typeOfContract: string

    @Column({ name: 'office', type: 'varchar', nullable: false, length: '255' })
        public office: string

    @Column({ name: 'broker', type: 'varchar', nullable: false, length: '255' })
        public broker: string

    @Column({ name: 'adm_fee', type: 'decimal', nullable: false, precision: 10, scale: 2 })
        public admFee: number

    @Column({ name: 'supervisor', type: 'varchar', nullable: false, length: '255' })
        public supervisor: string

    @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
        public createdAt!: Date

    @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
        public updatedAt!: Date

    @Column({ name: 'is_active', type: 'boolean', default: true })
        public isActive: boolean

    constructor(
        ID: number | null,
        address: string,
        codOperator: string,
        holder: string,
        dependents: string | null,
        dateOfBirth: Date,
        cpf: string,
        identity: string | null,
        proposalNumber: string,
        whatsapp: string,
        zipCode: string,
        numberResident: string,
        UF: string,
        contact: string,
        email: string,
        contractReadjustment: Date,
        contractImplementation: Date,
        billExpiration: Date,
        contractPrice: number,
        lead: string,
        plan: string,
        typeOfContract: string,
        office: string,
        broker: string,
        admFee: number,
        supervisor: string,
        isActive: boolean
    ) {
        this.ID = ID
        this.address = address
        this.codOperator = codOperator
        this.holder = holder
        this.dependents = dependents
        this.dateOfBirth = dateOfBirth
        this.cpf = cpf
        this.identity = identity
        this.proposalNumber = proposalNumber
        this.whatsapp = whatsapp
        this.zipCode = zipCode
        this.numberResident = numberResident
        this.UF = UF
        this.contact = contact
        this.email = email
        this.contractReadjustment = contractReadjustment
        this.contractImplementation = contractImplementation
        this.billExpiration = billExpiration
        this.contractPrice = contractPrice
        this.lead = lead
        this.plan = plan
        this.typeOfContract = typeOfContract
        this.office = office
        this.broker = broker
        this.admFee = admFee
        this.supervisor = supervisor
        this.isActive = isActive
    }
}

export {
    ProposalModel
}
