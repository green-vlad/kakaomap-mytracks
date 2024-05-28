import React, { useEffect, useState } from 'react';
import { Table } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import "@radix-ui/themes/styles.css"
import { TbWorld } from "react-icons/tb";
import { loadTracks } from "../services/Loaders";
import Track from "./Track";

function TracksList(props) {
  const[ tracks, setTracks ] = useState([]);

  function _setTracks(data) {
    setTracks(data);
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
      <Form.Root>
        <Form.FormField>
          <Form.FormControl type="file" className="file:bg-blue-500 text-white file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:cursor-pointer"/>
        </Form.FormField>
      </Form.Root>
    </div>
  );
}

export default TracksList;