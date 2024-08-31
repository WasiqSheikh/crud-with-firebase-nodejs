const express = require("express");
const cors = require("cors");
const { addDoc, getDocs, doc, updateDoc, deleteDoc, query, where, writeBatch } = require("firebase/firestore");
const { User } = require("./config");
const app = express();
const { getFirestore } = require("firebase/firestore");

const db = getFirestore();

app.use(express.json());
app.use(cors());


app.get("/", async (req, res) => {
    try {
        const querySnapshot = await getDocs(User);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        return res.status(200).json(data);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

app.post("/create", async (req, res) => {
    try {
        const data = req.body;
        const docRef = await addDoc(User, data);
        return res.status(200).json({ message: "User created successfully", id: docRef.id });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
});

app.post("/update", async (req, res) => {

    try {
        const id = req.body.id;
        delete req.body.id;
        const docToUpdate = await doc(User, id);
        const updatedDoc = await updateDoc(docToUpdate, req.body);
        return res.status(200).json({ message: "User updated successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

app.post("/delete", async (req, res) => {
    try {
        const id = req.body.id;
        const docToDelete = await doc(User, id);
        await deleteDoc(docToDelete);
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

app.post("/updateMany", async (req, res) => {

    try {
        

        const querySnapshot = await getDocs(query(User, where("age", ">=", 25)));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        let batch;
        let docs = [];

        console.log('querySnapshot.size = ', querySnapshot.size)
        if (querySnapshot.size > 0) {
            batch = writeBatch(db);
            querySnapshot.forEach(async doc => {
                docs.push(doc);
                batch.update(doc.ref, { isAdult: true });
            });

            await batch.commit();
        }

        return res.status(200).json({ data: {}, message: "Users details to update" });
     } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    })


app.listen(5000, () => console.log("Server running on port 5000"));
