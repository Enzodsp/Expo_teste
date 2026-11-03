import BaseModel from "./BaseModel";
import { Endereco } from "./Endereco";
import firebaseConverter from "../converters/firabaseConverter";

export default class Usuario extends BaseModel {
  private nome: string;
  private email: string;
  private senha: string;
  private telefone: string;
  private endereco: Endereco;

  constructor(dados?: any) {
    super(dados);
    this.nome = dados?.nome || "";
    this.email = dados?.email || "";
    this.senha = dados?.senha || "";
    this.telefone = dados?.telefone || "";
    this.endereco = dados?.endereco ? (dados.endereco instanceof Endereco ? dados.endereco : new Endereco(dados.endereco)) : new Endereco();
  }

  override toFirestore(): any {
    const { senha, ...dados } = this;
    return {
      nome: this.nome,
      email: this.email,
      telefone: this.telefone,
      endereco: this.endereco?.toFirestore ? this.endereco.toFirestore() : {},
      criadoEm: this.getCriadoEm(),
      atualizadoEm: this.getAtualizadoEm()
    };
  }

  override fromFirestore(snapshot: any, options: any): Usuario {
    super.fromFirestore(snapshot, options);
    const dados = snapshot.data(options) || {};
    this.nome = dados.nome || "";
    this.email = dados.email || "";
    this.telefone = dados.telefone || "";
    this.endereco = new Endereco(dados.endereco);
    return this;
  }

  getNome(): string {
    return this.nome;
  }

  getEmail(): string {
    return this.email;
  }

  getSenha(): string {
    return this.senha;
  }

  getTelefone(): string {
    return this.telefone;
  }

  getEndereco(): Endereco {
    return this.endereco;
  }
}

export const usuarioConverter = firebaseConverter(Usuario);
