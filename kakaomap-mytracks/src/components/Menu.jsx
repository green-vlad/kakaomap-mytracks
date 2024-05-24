import { useState } from "react";
import TracksList from "./TracksList";
import Modal from "./Modal.";
import * as Dialog from "@radix-ui/react-dialog";
import {Button, Flex} from "@radix-ui/themes";


const Menu = () => {
  const [openTracksList, setOpenTracksList] = useState(false);
  const [open, setOpen] = useState(false);

  return (
    <div className="absolute z-10 bg-gray-200 w-full max-h-12 flex justify-between p-1 bg-transparent">
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Login</Button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-8 text-gray-900 shadow">
            <Flex display="flex">window tesing</Flex>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
      <Modal open={ open } onOpenChange={ setOpen }>
        <Modal.Button asChild>
          <Button className="float-right">Show tracks</Button>
        </Modal.Button>
        <Modal.Content title="Tracks list">
          <TracksList />
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default Menu;