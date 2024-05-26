import React, {useRef, useState} from 'react';
import { Button, Flex, TextField, Text} from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import axiosClient from "../services/axios-client";

export default function Login(props) {
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const [error, setError] = useState(null);


  function handleSubmit(e) {
    e.preventDefault();
    const payload = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    }
    console.log(payload);
    axiosClient.post("/login", payload)
      .then((response) => {
        localStorage.setItem("TOKEN", response.data.token);
        localStorage.setItem("USER.NAME", response.data.user.name);
        props.onOpenChange();
        props.loggedIn(true);
      })
      .catch(error => {
        setError("Wrong login or password");
        localStorage.removeItem("TOKEN");
      })
  }

  return (
    <Flex direction="column" gap="3" rows="3" width="auto">
      <TextField.Root type="email" placeholder="Email" ref={emailRef} width="auto"/>
      <TextField.Root type="password" placeholder="Password" ref={passwordRef}  width="auto"/>
      {error && <Text className="text-red-500">{ error }</Text>}
      <Button size="2" onClick={ handleSubmit }>Login</Button>
    </Flex>
  );
}
