import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import Table from '@/components/Table/Table';
import CreateClient from '@/components/CreateClient/CreateClient';
import { makeServer } from '../../server';
import Menu from '@/components/Menu/Menu';
import { saveClientsToStorage, loadClientsFromStorage } from '@/pages/api/localStorage';


function Home(): JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [clients, setClients] = useState<Customer[]>([]);

  useEffect(() => {
    const getClients = async () => {
      const server = await makeServer();
      const data = server.db.customers;
      setClients(data || []);
      saveClientsToStorage(data);
    };

    getClients();
    const clientsFromStorage = loadClientsFromStorage();
    if (clientsFromStorage && clientsFromStorage.length) {
      setClients(clientsFromStorage);
    }
  }, []);

  useEffect(() => {
    const clientsFromStorage = loadClientsFromStorage();
    if (searchText === '' && clientsFromStorage) {
      setClients(clientsFromStorage);
    }
  }, [searchText]);

  const handleAdd = (client: Customer) => {
    const newClients = [...clients, client];
    setClients(newClients);
    setShowModal(false);
    saveClientsToStorage(newClients);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const allClients = loadClientsFromStorage();
    if (!allClients) return;
    const filteredClients = allClients.filter((client) =>
      client.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setClients(filteredClients);
  };

  const handleResetSearch = () => {
    setSearchText('');
    const clientsFromStorage = loadClientsFromStorage();
    if (clientsFromStorage) {
      setClients(clientsFromStorage);
    }
  };

  const handleSave = (editedClient: Customer) => {
    const updatedClients = clients.map((client) => {
    if (client.id === editedClient.id) {
    return editedClient;
    } else {
    return client;
    }
    });
    setClients(updatedClients);
    saveClientsToStorage(updatedClients);
    };

  const MemoizedTable = React.memo(Table);

  return (
    <>
      <Head>
        <title>Список клиентов</title>
        <meta name="description" content="Client list web interface" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Menu
          setShowModal={setShowModal}
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
          handleResetSearch={handleResetSearch} />

        <MemoizedTable 
        clients={clients} 
        onSave={handleSave}/>
        {showModal &&
          <CreateClient
            onCreate={handleAdd}
            onClose={handleClose}
          />}
      </main>
    </>
  )
}
export default Home;