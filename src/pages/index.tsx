import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import React, { useState, useEffect } from 'react';
import Table from '@/components/Table/Table';
import Header from '@/components/Header/Header';
import { saveClientsToStorage, loadClientsFromStorage } from '@/pages/api/localStorage';
interface Customer {
  id: string;
  name: string;
  email: string;
  deferral_days: number;
  credit_limit?: number;
  org?: {
      id: string;
      name: string;
      inn: string;
      kpp: string;
      ogrn: string;
      addr: string;
      bank_accounts?: Array<{
          id: string;
          name: string;
          bik: string;
          account_number: string;
          corr_account_number: string;
          is_default: boolean;
          created_at: string;
          updated_at: string;
      }>;    
  }
}

function Home(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [clients, setClients] = useState<Customer[]>([]);

  useEffect(() => {
    const getClients = async () => {
      const response = await fetch('/api/customers');
      const data = await response.json();
      setClients(data || []);
      saveClientsToStorage(data);
    };

    getClients();
    const clientsFromStorage = loadClientsFromStorage() as Customer[];
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
    saveClientsToStorage(newClients);
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
        <Header
          searchText={searchText}
          setSearchText={setSearchText}
          handleSearch={handleSearch}
          handleResetSearch={handleResetSearch} 
          onCreate={handleAdd}
          />
        <MemoizedTable
          clients={clients}
          onSave={handleSave} />
      </main>
    </>
  )
}
export default Home;