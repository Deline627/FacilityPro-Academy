import { auth, db } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";

export async function registerUser({ name, email, password, employeeId, role }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  const userData = {
    uid,
    name,
    email: email.toLowerCase(),
    employeeId: employeeId || "",
    role: role || "New Starter",
    completedPhases: [],
    hasSeenWelcome: false,
    registeredAt: new Date().toISOString(),
  };

  await setDoc(doc(db, "users", uid), userData);
  return userData;
}

export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const uid = userCredential.user.uid;

  const userDoc = await getDoc(doc(db, "users", uid));
  if (!userDoc.exists()) throw new Error("User profile not found");

  return userDoc.data();
}

export async function logoutUser() {
  await signOut(auth);
}

export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
      callback(userDoc.exists() ? userDoc.data() : null);
    } else {
      callback(null);
    }
  });
}

export async function savePhaseCompletion(uid, completedPhases) {
  await updateDoc(doc(db, "users", uid), {
    completedPhases: [...completedPhases],
  });
}

export async function markWelcomeSeen(uid) {
  await updateDoc(doc(db, "users", uid), { hasSeenWelcome: true });
}

export async function getUserProfile(uid) {
  const userDoc = await getDoc(doc(db, "users", uid));
  return userDoc.exists() ? userDoc.data() : null;
}
