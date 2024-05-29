import React, { useEffect, useState } from 'react';
import { Button, Flex, Table, Text, Select } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import "@radix-ui/themes/styles.css"
import { TbWorld, TbArrowBigLeft } from "react-icons/tb";
import { loadTracks } from "../services/Loaders";
import Track from "./Track";
import axiosClient from "../services/axios-client";

function TracksList(props) {
  const [tracks, setTracks] = useState([]);
  const [status, setStatus] = useState(null);
  const [file, setFile] = useState(null);
  const [color, setColor] = useState(null);

  function _setTracks(data) {
    setTracks(data);
  }

  function handleColor(e) {
    e.target.style.backgroundColor = e.target.value;
    setColor(e.target.value);
  }

  function handleFileChange(e) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("color", color);
    setStatus("Uploading file...")
    axiosClient.post(
      "/tracks/upload",
      formData, {
        onUploadProgress: (progressEvent) => { setStatus("Uploading file...")},
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      .then(response => {
        if (response.status === 204) {
          setStatus("File uploaded successfully.");
          loadTracks({ _setTracks });
        }
      })
      .catch(error => {
        setStatus("Error uploading file...");
      });
    }

  useEffect(() => {
    loadTracks({ _setTracks });
  }, []);

  return (
    <div>
      <Table.Root className="text-violet11 bg-white">
        <Table.Body>
          <Table.Row className="text-center">
            <Table.RowHeaderCell>Short description</Table.RowHeaderCell>
            <Table.RowHeaderCell>Date</Table.RowHeaderCell>
            <Table.RowHeaderCell className="text-2xl text-center"><TbWorld/></Table.RowHeaderCell>
          </Table.Row>
          {tracks.map((item, index) => (
            <Track index={ index } item={ item } key={ index } />
          ))}
        </Table.Body>
      </Table.Root>
      <Form.Root onSubmit={handleSubmit}>
        <Form.FormField className="flex items-center">
          <Form.FormControl onChange={handleFileChange} type="file"
                            className="file:bg-blue-700 text-white file:px-1 file:py-1 file:m-1 file:border-none file:rounded-full file:cursor-pointer"/>
          <select name="color" defaultChecked="#000000" onClick={handleColor} className="bg-black text-white rounded-full mx-1">
            <option value="#000000" className="bg-[#000000] text-white">Black</option>
            <option value="#FF0000" className="bg-[#FF0000] text-white">Red</option>
            <option value="#FFAE00" className="bg-[#FFAE00] text-white">Chinese Yellow</option>
            <option value="#42FF00" className="bg-[#42FF00] text-white">Harlequin</option>
            <option value="#001FFF" className="bg-[#001FFF] text-white">Blue</option>
            <option value="#FF00E8" className="bg-[#FF00E8] text-white">Fuchsia</option>
          </select>
          <Button className="align-middle bg-blue-700" size="2" radius="full">Upload</Button>
        </Form.FormField>
      </Form.Root>
      {status && <Text>{status}</Text>}
    </div>
  );
}

export default TracksList;