import React, {useState} from 'react';
import {Table} from "@radix-ui/themes";
import * as Checkbox from "@radix-ui/react-checkbox";
import { CheckboxIcon } from "@radix-ui/react-icons";
import { TbTrash } from "react-icons/tb";
import { updateTrack } from "../services/Loaders";

function Track(props) {
  return (
    <Table.Row key={props.index} className={props.index % 2 === 0 ? 'bg-gray-100' : ''}>
      <Table.Cell className="grow">{props.item.description}</Table.Cell>
      <Table.Cell>{ props.item.startDatetime }</Table.Cell>
      <Table.Cell>
        <div className="flex flex-row">
          <input
            name="isPublic"
            className="m-0.5"
            type="checkbox"
            defaultChecked={props.item.isPublic > 0}
            onChange={e => {
              updateTrack({id: props.item.id, value: e.target.checked, name: e.target.name});
            }}
          />
          <input
            name="isVisible"
            className="m-0.5"
            type="checkbox"
            defaultChecked={props.item.isVisible > 0}
            onChange={e => {
              updateTrack({id: props.item.id, value: e.target.checked, name: e.target.name});
            }}
          />
          <TbTrash className="text-2xl"/>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default Track;