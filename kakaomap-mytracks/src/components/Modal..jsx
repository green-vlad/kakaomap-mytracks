import * as Dialog from "@radix-ui/react-dialog";
import {TbX} from "react-icons/tb";
import "@radix-ui/themes/styles.css";

export default function Modal({ open, onOpenChange, children }) {
  return (
    <Dialog.Root open={ open } onOpenChange={ onOpenChange }>
      { children }
    </Dialog.Root>
  );
}

function ModalContent({ title, children, setOpen }) {
  return (
    <>
      <Dialog.Overlay className="fixed inset-0 backdrop-blur-sm" />
      <Dialog.Content className="fixed left-1/2 top-1/2 w-full max-w-sm -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-4 text-gray-900 shadow">
        <Dialog.Title className="text-4xl m-4">{ title }</Dialog.Title>
        <Dialog.Close className="relative float-right -top-24 -right-6 text-gray-400 hover:text-gray-500 rounded-full border border-black bg-gray-200">
          <TbX />
        </Dialog.Close>
        {children}
      </Dialog.Content>
    </>
  );
}

Modal.Button = Dialog.Trigger;
Modal.Close = Dialog.Close;
Modal.Content = ModalContent;