import React from 'react';
import {Box, Button, Flex, Grid, Text, TextField} from "@radix-ui/themes";
import Modal from "./Modal.";
import "@radix-ui/themes/styles.css";

export default function Login(props) {
  return (
    <Flex direction="column" gap="3" rows="3" width="auto">
        <TextField.Root type="email" placeholder="Email" />
        <TextField.Root type="password" placeholder="Password" />
        <Button size="2">Login</Button>
    </Flex>
  );
}
