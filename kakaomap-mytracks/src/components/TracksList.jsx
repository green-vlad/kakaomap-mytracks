import React from 'react';
import { Table } from "@radix-ui/themes";
import * as Form from '@radix-ui/react-form';
import "@radix-ui/themes/styles.css"
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckboxIcon } from '@radix-ui/react-icons';
import {TbWorld, TbEyeClosed, TbTrash} from "react-icons/tb";

const TestData = [
  {
    id: 1,
    name: "track 1",
    startDateTime: '2024-01-01 10:10:00',
    finishDateTime: '2024-01-01 11:10:00',
    isPublished: true,
    isHidden: false
  },
  {
    id: 2,
    name: "track 2",
    startDateTime: '2024-01-01 10:10:00',
    finishDateTime: '2024-01-01 11:10:00',
    isPublished: true,
    isHidden: false
  },
  {
    id: 3,
    name: "track 3",
    startDateTime: '2024-01-01 10:10:00',
    finishDateTime: '2024-01-01 11:10:00',
    isPublished: true,
    isHidden: false
  },
  {
    id: 4,
    name: "track 4",
    startDateTime: '2024-01-01 10:10:00',
    finishDateTime: '2024-01-01 11:10:00',
    isPublished: true,
    isHidden: false
  },
];

function TracksList(props) {
  return (
    <div>
      <Table.Root className="text-violet11 bg-white">
        <Table.Body>
          <Table.Row className="text-center">
            <Table.RowHeaderCell>Short description</Table.RowHeaderCell>
            <Table.RowHeaderCell>Start</Table.RowHeaderCell>
            <Table.RowHeaderCell>Finish</Table.RowHeaderCell>
            <Table.RowHeaderCell className="text-xl"><TbWorld/></Table.RowHeaderCell>
            <Table.RowHeaderCell className="text-xl"><TbEyeClosed/></Table.RowHeaderCell>
            <Table.RowHeaderCell className="text-xl"></Table.RowHeaderCell>
          </Table.Row>
          {TestData.map((item, index) => (
            <Table.Row key={index} className={index % 2 == 0 ? 'bg-gray-100' : ''}>
              <Table.Cell>{item.name}</Table.Cell>
              <Table.Cell>{item.startDateTime}</Table.Cell>
              <Table.Cell>{item.finishDateTime}</Table.Cell>
              <Table.Cell>
                <Checkbox.Root
                  className="shadow-blackA4 hover:bg-violet3 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none focus:shadow-[0_0_0_2px_black] m-0.5">
                  <Checkbox.Indicator>
                    <CheckboxIcon/>
                  </Checkbox.Indicator>
                </Checkbox.Root>
              </Table.Cell>
              <Table.Cell>
                <Checkbox.Root
                  className="shadow-blackA4 hover:bg-violet3 flex h-[20px] w-[20px] appearance-none items-center justify-center rounded-[4px] bg-white outline-none focus:shadow-[0_0_0_2px_black] m-0.5">
                  <Checkbox.Indicator>
                    <CheckboxIcon/>
                  </Checkbox.Indicator>
                </Checkbox.Root>
              </Table.Cell>
              <Table.Cell className="text-xl"><TbTrash/></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
      <Form.Root>
        <Form.FormField>
          <Form.FormControl type="file" className="file:bg-amber-300 file:px-6 file:py-3 file:m-5 file:border-none file:rounded-full file:cursor-pointer"/>
        </Form.FormField>
      </Form.Root>
    </div>
  );
}

export default TracksList;