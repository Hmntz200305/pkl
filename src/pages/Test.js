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
  //New
  const { setNotification, setNotificationInfo, setNotificationStatus } = useAuth();
  const [AssetID, setAssetID] = useState();
  const [AssetName, setAssetName] = useState();
  const [AssetDesc, setAssetDesc] = useState();
  const [AssetBrand, setAssetBrand] = useState();
  const [AssetModel, setAssetModel] = useState();
  const [AssetStatus, setAssetStatus] = useState();
  const [AssetLocation, setAssetLocation] = useState();
  const [AssetCategory, setAssetCategory] = useState();
  const [AssetSN, setAssetSN] = useState();
  const [isLoading, setIsLoading] = useState();
  const [tableData, setTableData] = useState([]);

  const DataQrscan = async () => {
    try {
      setIsLoading(true); 
      const formData = new FormData();

      formData.append('AssetID', AssetID);
      formData.append('AssetName', AssetName);
      formData.append('AssetDesc', AssetDesc);
      formData.append('AssetBrand', AssetBrand);
      formData.append('AssetModel', AssetModel);
      formData.append('AssetStatus', AssetStatus);
      formData.append('AssetLocation', AssetLocation);
      formData.append('AssetCategory', AssetCategory);
      formData.append('AssetSN', AssetSN);

      const response = await fetch("https://sipanda.online:8443/api/qrscanner", {
        method: "PUT ",
        body: formData,
      });

      if (response.status === 200) {
        const data = await response.json();
        setQRCode(data.qr);
        setNotification(data.message);
        setNotificationStatus(true);
      } else {
        const data = await response.json();
        setNotification(data.message);
        setNotificationStatus(true);
        setNotificationInfo('Error');
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check if any of the form fields is not empty
    const hasData = AssetID || AssetName || AssetDesc || AssetBrand || AssetModel || AssetStatus || AssetLocation || AssetCategory || AssetSN ;
  
    // If at least one field is not empty, update the tableData and clear the form fields
    if (hasData) {
      setTableData([
        ...tableData,
        {
          AssetID,
          AssetName,
          AssetDesc,
          AssetBrand,
          AssetModel,
          AssetStatus,
          AssetLocation,
          AssetCategory,
          AssetSN,
        },
      ]);
      setAssetID('');
      setAssetName('');
      setAssetDesc('');
      setAssetBrand('');
      setAssetModel('');
      setAssetStatus('');
      setAssetLocation('');
      setAssetCategory('');
      setAssetSN('');
    }
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

  const toggleScanner = () => {
    setIsScanning((prevIsScanning) => !prevIsScanning);
  };
  
  const columns = [
    {
        name: 'ID Asset',
        selector: row => row['AssetID'],
        export: true
        },
        {
        name: 'Name',
        selector: row => row['AssetName'],
        export: true
        },
        {
        name: 'Description',
        selector: row => row['AssetDesc'],
        export: true
        },
        {
        name: 'Brand',
        selector: row => row['AssetBrand'],
        export: true
        },
        {
        name: 'Model',
        selector: row => row['AssetModel'],
        export: true
        },
        {
        name: 'Status',
        selector: row => row['AssetStatus'],
        export: true
        },
        {
        name: 'Location',
        selector: row => row['AssetLocation'],
        export: true
        },
        {
        name: 'Category',
        selector: row => row['AssetCategory'],
        export: true
        },
        {
        name: 'SN',
        selector: row => row['AssetSN'],
        export: true
        },
    ]


  return (
    <>
          <div className="p-2">
              {scanning ? (
                <div>
                  <QrReader
                    delay={300}
                    onError={handleError}
                    onScan={handleScan}
                    style={{ width: '40%' }}
                  />
                
                </div>
              ) : null}
              <div className='flex'>
                <button className='main-btn' type="button" onClick={startScan}>Start</button>
                <button className='main-btn' type="submit" onClick={stopScan}>Stop</button>

              </div>  
          </div>

          <div className='p-2'>
            <div className='bg-white p-2'>
                <DataTable
                    columns={columns}
                    data={tableData}
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