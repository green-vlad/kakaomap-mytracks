import { useState } from "react";
import TracksList from "./TracksList";
import Modal from "./Modal.";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "@radix-ui/themes";
import Login from "./Login";
import "@radix-ui/themes/styles.css";



const Menu = () => {
  const [openTracksList, setOpenTracksList] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <div className="absolute z-10 bg-gray-200 w-full max-h-12 flex justify-between p-1 bg-transparent">
      <Modal open={ openLogin } onOpenChange={ setOpenLogin }>
        <Dialog.Trigger asChild>
          <Button className="float-left">Login</Button>
        </Dialog.Trigger>
        <Modal.Content title="Login">
          <Login />
        </Modal.Content>
      </Modal>
      <Modal open={ openTracksList } onOpenChange={ setOpenTracksList }>
        <Modal.Button asChild>
          <Button>Show tracks</Button>
        </Modal.Button>
        <Modal.Content title="Tracks list">
          <TracksList />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Menu;