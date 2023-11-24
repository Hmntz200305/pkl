import React, { useState, useEffect } from 'react';
import { QrReader } from 'react-qr-reader';
import 'webrtc-adapter';
import DataTable from 'react-data-table-component';
import 'react-data-table-component-extensions/dist/index.css';
import { useAuth } from '../AuthContext';

const Test = () => {
  const [result, setResult] = useState('');
  const [scannedData, setScannedData] = useState([]);
  const [scanning, setScanning] = useState(false);

  useEffect(() => {
    console.log('MediaDevices didukung:', !!navigator.mediaDevices);
  }, []);

  const handleScan = (data) => {
    if (data) {
      setResult(data);
      // Kirim data ke API
      sendDataToApi(data);

      // Update scanned data
      setScannedData((prevData) => [...prevData, parseScannedData(data)]);
    } else {
      console.log('Tidak ada data terdeteksi.');
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const sendDataToApi = (data) => {
    // Implementasi pengiriman data ke API
    console.log('Data terbaca:', data);
  };

  const parseScannedData = (data) => {
    // Implement parsing logic based on your data structure
    // For simplicity, assuming data is a comma-separated string
    const [no, id, name, description, brand, model, status, location, category, sn] = data.split(',');
    return { no, id, name, description, brand, model, status, location, category, sn };
  };

  const startScan = () => {
    setScanning(true);
  };

  const stopScan = () => {
    setScanning(false);
  };

  const columns = [
    {
        name: 'No',
        selector: 'no',
        sortable: true,
        export: true
        },
        {
        name: 'ID Asset',
        selector: 'id',
        export: true
        },
        {
        name: 'Name',
        selector: 'name',
        export: true
        },
        {
        name: 'Description',
        selector: 'description',
        export: true
        },
        {
        name: 'Brand',
        selector: 'brand',
        export: true
        },
        {
        name: 'Model',
        selector: 'model',
        export: true
        },
        {
        name: 'Status',
        selector: 'status',
        export: true
        },
        {
        name: 'Location',
        selector: 'location',
        export: true
        },
        {
        name: 'Category',
        selector: 'category',
        export: true
        },
        {
        name: 'SN',
        selector: 'sn',
        export: true
        },
    ]

    const fakedata = useState([
      { no: '1', id: 'Laptop', lease: '2023-10-11', return: '2023-10-20', time: '10' },
    ]);  

  return (
    <>
      <div className='p-2'>
        <div className='bg-white mb-5 rounded-2xl p-4 shadow'>
            <h2 className=''>Welcome, QRgenerate page :)</h2>
        </div>
      </div>

          <div className="p-2">
              {scanning ? (
                <div>
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '40%' }}
                  />
                  <button type="button" onClick={stopScan} style={{ position: 'absolute', top: 0, right: 0 }}>
                    Close
                  </button>
                </div>
              ) : null}
              <div className='flex'>
                <button className='main-btn' type="button" onClick={startScan}>Start</button>
                <button className='main-btn' type="submit" onClick={stopScan}>Stop</button>
                <div className='flex ml-auto'>
                  <button className='main-btn' onClick={stopScan}>Close</button>
                </div>
              </div>
          </div>

          <div className='p-2'>
            <div className='bg-white p-2'>
                <DataTable
                    columns={columns}
                    data={fakedata}
                    noHeader
                    defaultSortField='no'
                    defaultSortAsc={false}
                    pagination
                    highlightOnHover
                />
            </div>
            <div className='flex justify-end mt-2'>
              <button className='main-btn'>Submit</button>
            </div>
          </div>
    </>
  );
};

export default Test;