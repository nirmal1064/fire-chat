import { SyntheticEvent, FC } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthProvider";

const Home: FC = () => {
  const { activeUser, logOut } = useAuth();
  const handleLogout = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await logOut();
    } catch (error) {}
  };

  return (
    <div>
      Welcome {activeUser?.email}
      <Button onClick={handleLogout} variant="danger">
        LogOut
      </Button>
    </div>
  );
};

export default Home;
