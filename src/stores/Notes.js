import { defineStore } from 'pinia';
import { ref } from 'vue';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from "firebase/firestore";
import { db } from '@/assets/js/firebase.js';

const notesCollectionRef = collection(db, 'notes');
const notesCollectionQuery = query(notesCollectionRef, orderBy('date', 'desc'));

export const useNotesStore = defineStore('notes', () => {
  const notes = ref([]);

  const notesLoaded = ref(false);

  async function index() {
    onSnapshot(notesCollectionQuery, (querySnapshot) => {
      notesLoaded.value = false;
      let notes = [];
      querySnapshot.forEach((doc) => {
        notes.push({
          id: doc.id,
          content: doc.data().content,
          date: doc.data().date
        });
      });
      setTimeout(() => {
        this.notes = notes;
        notesLoaded.value = true;
      }, 5000);
    });
  }

  function show(id) {
    return notes.value.filter(note => note.id === id )[0].content;
  }

  async function store(newNote) {
    const date = new Date().getTime().toString();

    await addDoc(notesCollectionRef, {
      content: newNote,
      date: date
    });
  }

  async function update(id, content) {
    await updateDoc(doc(notesCollectionRef, id), {
      content: content
    });
  }

  async function destroy(id) {
    await deleteDoc(doc(notesCollectionRef, id));
  }

  function totalNotesCount() {
    return notes.value.length;
  }

  function totalCharactersCount() {
    return notes.value.reduce((total, note) => {
      return total + note.content.length;
    }, 0);
  }

  return {
    notesLoaded,
    notes,
    index,
    show,
    store,
    update,
    destroy,
    totalNotesCount,
    totalCharactersCount
  };
});