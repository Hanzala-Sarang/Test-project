import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../firebase/FirebaseProvider";

const Me = () => {
  const firebase = useFirebase();
  const [user, setUser] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      const user = await firebase.getRegistereduser();
      setUser(user);
    };
    fetchUser();
  }, [firebase]);
  return (
    <div>
      {" "}
      <div>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>{user.description}</p>
      </div>
      <Link to="/users">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Me;
