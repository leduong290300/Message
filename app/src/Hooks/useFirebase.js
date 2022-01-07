import { useEffect, useState } from "react";
import { database } from "../Firebase/Config";
const useFirebase = (collection, condition) => {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    let collectionRef = database.collection(collection).orderBy("createdAt");
    if (collection) {
      if (!condition.compareValue || !condition.compareValue.length) {
        return;
      }
      collectionRef = collectionRef.where(
        condition.fieldName,
        condition.operator,
        condition.compareValue,
      );
    }
    const unsub = collectionRef.onSnapshot((snapshot) => {
      const documents = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setDocuments(documents);
    });
    return unsub;
  }, [collection, condition]);
  return documents;
};
export default useFirebase;
