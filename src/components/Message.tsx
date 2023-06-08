import { IMessage, MessageKind } from "../types";

type MessageProps = {
    message: IMessage
}

function Message({ message }: MessageProps) {
    const { text, type } = message;
    let typeStyle = '';

    switch (type) {
        case MessageKind.SUCCESS:
            typeStyle = "border-green-400 bg-green-50 text-green-600";
            break;
        case MessageKind.WARNING:
            typeStyle = "border-orange-400 bg-orange-50 text-orange-600"
            break;
        case MessageKind.ERROR:
            typeStyle = "border-red-400 bg-red-50 text-red-600"
            break;
        default:
            typeStyle = "border-red-400 bg-red-50 text-red-600"
    }

    return (
        <div className={`px-3 py-4 text-sm rounded-lg mb-2 border ${typeStyle}`}>
            {text}
        </div>
    )
}


export default Message