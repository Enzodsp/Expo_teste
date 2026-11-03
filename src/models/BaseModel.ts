export default abstract class BaseModel {
    private id: string | null;
    private criadoEm: Date;
    private atualizadoEm: Date;

    constructor(dados?: any) {
        this.id = dados?.id ?? null;
        this.criadoEm = dados?.criadoEm ? (dados.criadoEm.toDate ? dados.criadoEm.toDate() : new Date(dados.criadoEm)) : new Date();
        this.atualizadoEm = dados?.atualizadoEm ? (dados.atualizadoEm.toDate ? dados.atualizadoEm.toDate() : new Date(dados.atualizadoEm)) : new Date();
    }

    toFirestore(): any {
        const { ...dados } = this;
        return dados;
    }

    fromFirestore(snapshot: any, options?: any): BaseModel {
        const dados = snapshot.data(options) || {};
        this.id = snapshot.id;
        // Conversão de tipos do Firestore (Timestamp para Date através do método toDate())
        this.criadoEm = dados.criadoEm?.toDate ? dados.criadoEm.toDate() : (dados.criadoEm ? new Date(dados.criadoEm) : new Date());
        this.atualizadoEm = dados.atualizadoEm?.toDate ? dados.atualizadoEm.toDate() : (dados.atualizadoEm ? new Date(dados.atualizadoEm) : new Date());
        return this;
    }

    getId(): string | null {
        return this.id;
    }

    getCriadoEm(): Date {
        return this.criadoEm;
    }

    getAtualizadoEm(): Date {
        return this.atualizadoEm;
    }
}
