import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase/firebaseConfig";

export const fetchUserChats = async () => {
    if (!auth.currentUser) return [];

    try {
        const q = query(collection(db, "chats"), where("userIds", "array-contains", auth.currentUser.uid));
        const querySnapshot = await getDocs(q);

        const chatList = [];

        for (const chatDoc of querySnapshot.docs) {
            const chatData = chatDoc.data();
            const chatId: string = chatDoc.id;

            const otherUserId = chatData.userIds.find((id: string) => id !== auth.currentUser!.uid);

            const userRef = doc(db, "users", otherUserId);
            const userSnap = await getDoc(userRef);

            if (userSnap.exists()) {
                chatList.push({
                    chatId,
                    lastMessage: chatData.lastMessage,
                    timestamp: chatData.timestamp,
                    otherUser: {
                        id: otherUserId,
                        name: userSnap.data().name,
                        profilePic: userSnap.data().profilePic,
                    },
                });
            }
        }

        return chatList;

    } catch (error) {
        console.error("Error fetching chats:", error);
        return [];
    }
};