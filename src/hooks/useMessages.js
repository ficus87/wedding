import { collection, onSnapshot, orderBy } from "firebase/firestore";
import { useState } from "react";
import { useEffect } from "react";
import { db } from "../firebase";

const useMessages = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(
            collection(db, "messages"),
            (snapshot) => {
                setMessages(snapshot.docs.map(_ => ({ ..._.data(), id: _.id })));
            });
        return unsub;
    }, []);

    return messages;
}

export default useMessages