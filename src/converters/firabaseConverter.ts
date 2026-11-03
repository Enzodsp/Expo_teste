import BaseModel from "../models/BaseModel";

// Implementação genérica de FirestoreDataConverter
function firebaseConverter<T extends BaseModel>(ModelClass: new (dados?: any) => T): any {
    // Conversor de classe para um objeto plano do firestore
    function toFirestore(value: BaseModel | any): any {
        if (value && typeof value.toFirestore === 'function') {
            return value.toFirestore();
        }
        return { ...value };
    }

    // Conversor de objeto plano do firestore para uma classe
    function fromFirestore(snapshot: any, options: any): T {
        const instance = new ModelClass();
        return instance.fromFirestore(snapshot, options) as T;
    }

    return { toFirestore, fromFirestore };
}

export default firebaseConverter;
