import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import Table from '@/components/Table/Table';
import Header from '@/components/Header/Header';

function Home(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [clients, setClients] = useState<Customer[]>([]);
  const [filteredClients, setFilteredClients] = useState<Customer[]>([]);


  useEffect(() => {
    const getClients = async () => {
      try {
        const response = await fetch('/api/customers');
        if (!response.ok) {
          throw new Error('Failed to fetch customers');
        }
        const data = await response.json();
        setClients(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error('Failed to fetch customers', error);
      }
    };
    getClients();
  }, []);

  useEffect(() => {
    const filteredClients = searchText ? clients.filter((client) =>
      client.name.toLowerCase().includes(searchText.toLowerCase())
      ) : JSON.parse(JSON.stringify(clients));
      setFilteredClients(filteredClients);
    }, [searchText, clients]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
  };

  const handleResetSearch = (): void => {
    setSearchText('');
  };

  const handleAddClient = (client: Customer) => {
    const newClients = Array.isArray(clients) ? [...clients, client] : [client];
    setClients(newClients);
  };

  const handleSave = (editedClient: Customer): void => {
    const updatedClients = clients.map((client) => {
      if (client.id === editedClient.id) {
        return editedClient;
      } else {
        return client;
      }
    });

    setClients([...updatedClients]);
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
        <Header
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
          handleResetSearch={handleResetSearch}
          handleAddClient={handleAddClient}
        />
        <MemoizedTable
          clients={filteredClients}
          onSave={handleSave} />
      </main>
    </>
  )
}
export default Home;