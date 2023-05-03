import { NextApiRequest, NextApiResponse } from 'next';
import customersData from '../../../data.json';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        // Проверяем, что данные успешно получены из файла data.json
        console.log('Customers data:', customersData);

        // Возвращаем только массив клиентов, без обертки customers
        res.status(200).json(customersData.customers);
    } catch (error) {
        
        // В случае ошибки отправляем ошибку клиенту
        console.error('Failed to fetch customers', error);
        res.status(500).json({ message: 'Failed to fetch customers' });
    }
}