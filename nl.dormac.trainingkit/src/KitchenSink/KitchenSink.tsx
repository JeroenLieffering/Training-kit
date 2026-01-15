import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import InboxIcon from '@mui/icons-material/Inbox';
import SendIcon from '@mui/icons-material/Send';
import WarningIcon from '@mui/icons-material/WarningAmber';

import React, { useState } from 'react';

import { FormProvider, useForm } from 'react-hook-form';
import {
  BackButton,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Container,
  InputField,
  Modal,
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  RadioField,
  SelectField,
  Separator,
  Switch,
  Tabs,
  TextareaField,
  Title,
  TopBar,
  CheckboxField,
  Debug,
  Alert,
} from '../components';
import { useNavigate } from '../hooks/useNavigate';
import {
  BaseTable,
  BaseTableBody,
  BaseTableCaption,
  BaseTableCell,
  BaseTableFooter,
  BaseTableHead,
  BaseTableHeader,
  BaseTableRow,
} from '../shadcn';

export function KitchenSink() {
  const navigateTo = useNavigate();

  const form = useForm({
    defaultValues: {
      email: '',
      weight: '',
      description: '',
      type: 'mentions',
      mode: 'OUTPUT',
      agree: true,
    },
  });

  function onSubmit() {
    navigateTo({ page: 'PRODUCTS' });
  }

  const [checked, setChecked] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  function toggleModal() {
    setModalOpen(!modalOpen);
  }

  const invoices = [
    {
      invoice: 'INV001',
      paymentStatus: 'Paid',
      totalAmount: '$250.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV002',
      paymentStatus: 'Pending',
      totalAmount: '$150.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV003',
      paymentStatus: 'Unpaid',
      totalAmount: '$350.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV004',
      paymentStatus: 'Paid',
      totalAmount: '$450.00',
      paymentMethod: 'Credit Card',
    },
    {
      invoice: 'INV005',
      paymentStatus: 'Paid',
      totalAmount: '$550.00',
      paymentMethod: 'PayPal',
    },
    {
      invoice: 'INV006',
      paymentStatus: 'Pending',
      totalAmount: '$200.00',
      paymentMethod: 'Bank Transfer',
    },
    {
      invoice: 'INV007',
      paymentStatus: 'Unpaid',
      totalAmount: '$300.00',
      paymentMethod: 'Credit Card',
    },
  ];

  return (
    <Container>
      <TopBar>
        <BackButton onClick={() => navigateTo({ page: 'PRODUCTS' })}>
          Products
        </BackButton>
        <Title>Kitchen Sink</Title>
      </TopBar>
      <Tabs
        tabs={[
          {
            id: 'form',
            label: 'Form',
            icon: SendIcon,
            content() {
              return (
                <Card className="tw-w-full">
                  <CardHeader>
                    <CardTitle>Form</CardTitle>
                    <CardDescription>Shows the form elements</CardDescription>
                  </CardHeader>
                  <CardContent className="tw-grid tw-gap-4">
                    <Switch value={checked} onChange={setChecked} />

                    <Debug value={form.watch()} />

                    <Separator orientation="horizontal" />

                    <FormProvider {...form}>
                      <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="tw-w-2/3 tw-grid tw-gap-4"
                      >
                        <RadioField
                          register={() => form.register('type')}
                          label="Type"
                          options={[
                            {
                              id: 'all',
                              value: 'all',
                              label: 'All new message',
                            },
                            {
                              id: 'mentions',
                              value: 'mentions',
                              label: 'Direct messages and mentions',
                            },
                            {
                              id: 'none',
                              value: 'none',
                              label: 'Nothing',
                            },
                          ]}
                        />

                        <RadioField
                          orientation="vertical"
                          register={() => form.register('type')}
                          label="Type"
                          options={[
                            {
                              id: 'all',
                              value: 'all',
                              label: 'All new message',
                            },
                            {
                              id: 'mentions',
                              value: 'mentions',
                              label: 'Direct messages and mentions',
                            },
                            {
                              id: 'none',
                              value: 'none',
                              label: 'Nothing',
                            },
                          ]}
                        />

                        <InputField
                          register={() => form.register('email')}
                          type="email"
                          label="Email"
                        />

                        <InputField
                          register={() => form.register('weight')}
                          type="text"
                          label="Weight"
                          addon="kg"
                        />

                        <TextareaField
                          register={() => form.register('description')}
                          label="Description"
                        />

                        <SelectField
                          register={() => form.register('mode')}
                          label="Mode"
                          options={[
                            {
                              value: 'INPUT',
                              label:
                                'Input: cobot only inserts raw material into machine',
                            },
                            {
                              value: 'OUTPUT',
                              label:
                                'Ouput: cobot only takes finished product out of machine',
                            },
                            {
                              value: 'INPUT_OUTPUT',
                              label:
                                'Input & Output: Cobot inserts and takes material from machine',
                            },
                          ]}
                        />

                        <CheckboxField
                          register={() => form.register('agree')}
                          label="Terms and conditions"
                        >
                          Agree
                        </CheckboxField>

                        <Button type="submit">Submit</Button>
                      </form>
                    </FormProvider>
                  </CardContent>
                </Card>
              );
            },
          },

          {
            id: 'table',
            label: 'Table',
            icon: AccountBalanceIcon,
            content() {
              return (
                <Card className="tw-w-full">
                  <CardHeader>
                    <CardTitle>Table</CardTitle>
                    <CardDescription>Shows table elements</CardDescription>
                  </CardHeader>
                  <CardContent className="tw-space-y-2">
                    <BaseTable>
                      <BaseTableCaption>
                        A list of your recent invoices.
                      </BaseTableCaption>
                      <BaseTableHeader>
                        <BaseTableRow>
                          <BaseTableHead className="tw-w-24">
                            Invoice
                          </BaseTableHead>
                          <BaseTableHead>Status</BaseTableHead>
                          <BaseTableHead>Method</BaseTableHead>
                          <BaseTableHead className="tw-text-right">
                            Amount
                          </BaseTableHead>
                        </BaseTableRow>
                      </BaseTableHeader>
                      <BaseTableBody>
                        {invoices.map((invoice) => (
                          <BaseTableRow key={invoice.invoice}>
                            <BaseTableCell className="tw-font-medium">
                              {invoice.invoice}
                            </BaseTableCell>
                            <BaseTableCell>
                              {invoice.paymentStatus}
                            </BaseTableCell>
                            <BaseTableCell>
                              {invoice.paymentMethod}
                            </BaseTableCell>
                            <BaseTableCell className="tw-text-right">
                              {invoice.totalAmount}
                            </BaseTableCell>
                          </BaseTableRow>
                        ))}
                      </BaseTableBody>
                      <BaseTableFooter>
                        <BaseTableRow>
                          <BaseTableCell colSpan={3}>Total</BaseTableCell>
                          <BaseTableCell className="tw-text-right">
                            $2,500.00
                          </BaseTableCell>
                        </BaseTableRow>
                      </BaseTableFooter>
                    </BaseTable>

                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#" isActive>
                            2
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationEllipsis />
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationNext href="#" />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </CardContent>
                  <CardFooter>
                    <Button>Save password</Button>
                  </CardFooter>
                </Card>
              );
            },
          },

          {
            id: 'buttons',
            label: 'Buttons',
            icon: CarRepairIcon,
            content() {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle>Buttons</CardTitle>
                  </CardHeader>
                  <CardContent className="tw-grid tw-grid-cols-3 tw-gap-4">
                    <div className="tw-grid tw-gap-4">
                      <h2>Plain</h2>

                      <Button>Default</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="outline">Outline</Button>
                    </div>

                    <div className="tw-grid tw-gap-4">
                      <h2>Loading</h2>

                      <Button loading>Default</Button>
                      <Button variant="secondary" loading>
                        Secondary
                      </Button>
                      <Button loading variant="destructive">
                        Destructive
                      </Button>
                      <Button loading variant="ghost">
                        Ghost
                      </Button>
                      <Button loading variant="outline">
                        Outline
                      </Button>
                    </div>

                    <div className="tw-grid tw-gap-4">
                      <h2>With Icons</h2>

                      <Button icon={SendIcon}>Default</Button>
                      <Button icon={SendIcon} variant="secondary">
                        Secondary
                      </Button>
                      <Button icon={SendIcon} variant="destructive">
                        Destructive
                      </Button>
                      <Button icon={SendIcon} variant="ghost">
                        Ghost
                      </Button>
                      <Button icon={SendIcon} variant="outline">
                        Outline
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            },
          },

          {
            id: 'modal',
            label: 'Modal',
            icon: InboxIcon,
            content() {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle>Modal</CardTitle>
                  </CardHeader>
                  <CardContent className="tw-grid tw-grid-cols-3 tw-gap-4">
                    <Button onClick={toggleModal}>Open modal</Button>

                    {modalOpen ? (
                      <Modal onClose={toggleModal} title="test">
                        Hallo
                      </Modal>
                    ) : null}
                  </CardContent>
                </Card>
              );
            },
          },

          {
            id: 'alerts',
            label: 'Alerts',
            icon: WarningIcon,
            content() {
              return (
                <Card>
                  <CardHeader>
                    <CardTitle>Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="tw-grid tw-gap-4">
                    <Alert variant="default" title="This is a default alert" />

                    <Alert variant="warning" title="This is a warning alert" />

                    <Alert
                      variant="destructive"
                      title="This is a destructive alert"
                    />

                    <Alert variant="default" title="This is a default alert">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nemo magni vel modi repudiandae accusamus vero voluptas
                      cum, culpa, nulla debitis nostrum corrupti obcaecati
                      inventore enim iure est neque officiis deleniti.
                    </Alert>

                    <Alert variant="warning" title="This is a warning alert">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nemo magni vel modi repudiandae accusamus vero voluptas
                      cum, culpa, nulla debitis nostrum corrupti obcaecati
                      inventore enim iure est neque officiis deleniti.
                    </Alert>

                    <Alert
                      variant="destructive"
                      title="This is a destructive alert"
                    >
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Nemo magni vel modi repudiandae accusamus vero voluptas
                      cum, culpa, nulla debitis nostrum corrupti obcaecati
                      inventore enim iure est neque officiis deleniti.
                    </Alert>
                  </CardContent>
                </Card>
              );
            },
          },
        ]}
      />
    </Container>
  );
}
