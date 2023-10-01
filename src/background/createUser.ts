import { Auth, createUserWithEmailAndPassword } from "firebase/auth";

async function createUser(auth: Auth, email: string, password: string) {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
}

export { createUser };
