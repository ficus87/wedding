import { useEffect, useState } from 'react'
import { collection, onSnapshot } from "firebase/firestore";
import { db } from '../../firebase';
const useGuests = () => {

    const [guests, setGuests] = useState([]);

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "guests"), (snapshot) => {
            setGuests(snapshot.docs.map(_ => ({ ..._.data(), id: _.id })));
        });
        return unsub;
    }, []);

    return guests;
}

export default useGuests