import * as React from "react";
import { List, Datagrid, TextField, EmailField, Show, SimpleShowLayout, DateField, RichTextField } from 'react-admin';

export const UserList = (props) => (
    <List {...props}>
        <Datagrid>
            <TextField source="id" />
            <TextField source="name" />
            <TextField source="username" />
            <EmailField source="email" />
            <TextField source="address.street" />
            <TextField source="phone" />
            <TextField source="website" />
            <TextField source="company.name" />
            {/* <TextField source="id" />
            <EmailField source="mail" />
            <TextField source="phone" />
            <TextField source="societyName" />
            <TextField source="contact" />
            <TextField source="kabis" />
            <TextField source="confirmationUrl" />
            <TextField source="cancelUrl" /> */}
        </Datagrid>
    </List>
);

export const PostShow = (props) => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="title" />
            <TextField source="teaser" />
            <RichTextField source="body" />
            <DateField label="Publication date" source="created_at" />
        </SimpleShowLayout>
    </Show>
);