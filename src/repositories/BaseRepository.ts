import BaseModel from "../models/BaseModel";

function firebaseConverter<T extends BaseModel>(ModelClass: new () => T): any {
    function toFirestore(value: BaseModel): any {
        value.toFirestore()
    }
    function fromFirestore(snapshot: any, options: any): T {
        return new ModelClass().fromFirestore(snapshot, options) as T
    }

    return { toFirestore, fromFirestore }
}

export default firebaseConverter