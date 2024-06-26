import { useEffect, useRef, useState } from "react";
import TracksList from "./TracksList";
import Modal from "./Modal.";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import Login from "./Login";
import "@radix-ui/themes/styles.css";
import { loadVisibleTracks } from "../services/Loaders";



const Menu = (props) => {
  const [openTracksList, setOpenTracksList] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  function logoff() {
    if (loggedIn) {
      localStorage.removeItem("TOKEN");
      setLoggedIn(false);
      props.doAfterClose();
    }
  }

  useEffect(() => {
    if (localStorage.getItem("TOKEN")) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="absolute z-10 bg-gray-200 w-full max-h-12 flex justify-between p-1 bg-transparent">
      {!loggedIn ?
        <Modal open={ openLogin } onOpenChange={ setOpenLogin }>
          <Dialog.Trigger asChild>
            <Button className="float-left">Login</Button>
          </Dialog.Trigger>
          <Modal.Content title="Login" onOpenChange={ setOpenLogin } doAfterClose={ props.doAfterClose }>
            <Login onOpenChange={ setOpenLogin } loggedIn={ setLoggedIn } />
          </Modal.Content>
        </Modal>
      :
        <>
          <div className="flex flex-row items-center">
            <Button className="float-left" onClick={logoff}>Logoff</Button>
            <span className="mx-1">Logged in as {localStorage.getItem('USER.NAME')} </span>
          </div>
          <Modal open={openTracksList} onOpenChange={setOpenTracksList}>
            <Modal.Button asChild>
              <Button>Show tracks</Button>
            </Modal.Button>
            <Modal.Content title="Tracks list" onOpenChange={setOpenLogin} doAfterClose={props.doAfterClose}>
              <TracksList/>
            </Modal.Content>
          </Modal>
        </>
      }
    </div>
  );
};

export default Menu;