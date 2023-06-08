
export enum MessageKind {
    SUCCESS,
    WARNING,
    ERROR
}

export interface IMessage {
    text: string,
    type?: MessageKind,
}

