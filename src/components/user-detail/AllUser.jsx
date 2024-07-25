import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "../../firebase/FirebaseProvider";

const AllUser = () => {
  const firebase = useFirebase();

  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const users = await firebase.getAllUserData();
      setUsers(users);
    };

    fetchUsers();
  }, [firebase]);
  return (
    <div>
      {users &&
        users.map((user) => (
          <div key={user.uid}>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.description}</p>
          </div>
        ))}

      <Link to="/users">
        <button>Back</button>
      </Link>
    </div>
  );
};

export default AllUser;
