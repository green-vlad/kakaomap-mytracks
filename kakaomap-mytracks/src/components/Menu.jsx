import React from 'react';
import * as Menubar from '@radix-ui/react-menubar';
import './Menu.css';

const Menu = () => {
  return (
    <Menubar.Root className="MenubarRoot">
      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Login</Menubar.Trigger>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default Menu;