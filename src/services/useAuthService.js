import { auth, db } from '../../firebase-init';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    signOut,
    sendPasswordResetEmail
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Usuario, { usuarioConverter } from '../models/Usuario';

export function useAuthService() {

    const cadastrarEmailSenha = async (dadosUsuario) => {
        let userCredential = null;
        try {
            const { email, senha, nome, telefone } = dadosUsuario;
            userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const novoUsuario = new Usuario({
                nome: nome || '',
                email: email || '',
                telefone: telefone || '',
            });
            const userRef = doc(db, 'Usuarios', userCredential.user.uid).withConverter(usuarioConverter);
            await setDoc(userRef, novoUsuario);
            await sendEmailVerification(userCredential.user);
            await signOut(auth);
            return userCredential.user;
        } catch (error) {
            if (userCredential?.user) {
                await userCredential.user.delete().catch(() => { });
            }
            throw error;
        }
    };

    const loginEmailSenha = async (dadosUsuario) => {
        try {
            const { email, senha } = dadosUsuario;
            const userCredential = await signInWithEmailAndPassword(auth, email, senha);

            if (!userCredential.user.emailVerified) {
                await signOut(auth);
                const erro = new Error("E-mail não verificado. Enviamos um link de confirmação para o seu e-mail. Por favor, valide-o antes de acessar.");
                erro.code = "auth/unverified-email";
                throw erro;
            }

            const userRef = doc(db, 'Usuarios', userCredential.user.uid).withConverter(usuarioConverter);
            const userSnap = await getDoc(userRef);
            return userSnap.exists() ? userSnap.data() : userCredential.user;
        } catch (error) {
            throw error;
        }
    };

    const recuperarSenha = async (dadosUsuario) => {
        try {
            const email = typeof dadosUsuario === 'string' ? dadosUsuario : dadosUsuario?.email;
            await sendPasswordResetEmail(auth, email);
        } catch (error) {
            throw error;
        }
    };

    const buscarDadosUsuario = async (uid) => {
        try {
            const userRef = doc(db, 'Usuarios', uid).withConverter(usuarioConverter);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) {
                const usuario = userSnap.data();
                return {
                    nome: usuario.getNome ? usuario.getNome() : usuario.nome,
                    email: usuario.getEmail ? usuario.getEmail() : usuario.email,
                    telefone: usuario.getTelefone ? usuario.getTelefone() : usuario.telefone,
                };
            }
            return null;
        } catch (error) {
            console.error("Erro ao buscar dados do usuário no Firestore:", error);
            throw error;
        }
    };

    const deslogarUsuario = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            throw error;
        }
    };

    return {
        cadastrarEmailSenha,
        loginEmailSenha,
        recuperarSenha,
        buscarDadosUsuario,
        deslogarUsuario
    };
}

export default useAuthService;
