import React, { useState, } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import 'react-data-table-component-extensions/dist/index.css';

const Qrgen = () => {
  const [formData, setFormData] = useState({
    ID: '',
    NAME: '',
    DESC: '',
    BRAND: '',
    MODEL: '',
    STATUS: '',
    LOCATION: '',
    CATEGORY: '',
    SN: '',
  });

  const [fakeData, setFakeData] = useState()

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Kirim permintaan POST ke backend Flask Anda
      const response = await axios.post('https://sipanda.online:8443/api/qrgenerator', formData);
  
      // Tangani respons sesuai kebutuhan
      console.log(response.data);
  
      // Perbarui array data dengan data formulir baru
      setFakeData((prevData) => [
        ...prevData,
        {
     // Tambahkan bidang lain berdasarkan struktur data Anda
          no: String(prevData.length + 1),
          id: formData.ID,
          name: formData.AssetName,
          description: formData.AssetDesc,
          brand: formData.AssetBrand,
          model: formData.Assetmodel,
          status: formData.AssetStatus,
          location: formData.AssetLocation,
          category: formData.AssetCategory,
          sn: formData.AssetSN,
        },
      ]);
  
      // Reset data formulir setelah pengiriman
      setFormData({
        ID: '',
        NAME: '',
        DESC: '',
        BRAND: '',
        MODEL: '',
        STATUS: '',
        LOCATION: '',
        CATEGORY: '',
        SN: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
    <div className='p-2'>
        <div className='bg-white mb-5 rounded-2xl p-4 shadow'>
            <h2 className=''>Welcome, QRgenerate page :)</h2>
        </div>
    </div>

    <div className="p-2">
        <div className="mx-auto my-4 p-6 bg-white rounded-md shadow-md">
          <form className="p-2">
            <div className="mb-2">
              <label htmlFor="AssetID" className="block text-gray-600 font-semibold mb-2">
                ID
              </label>
              <input
                type="text"
                id="ID"
                name="ID"
                value={formData.AssetID}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="AssetName" className="block text-gray-600 font-semibold mb-2">
                Name
              </label>
              <input
                type="text"
                id="NAME"
                name="NAME"
                value={formData.AssetName}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="AssetDesc" className="block text-gray-600 font-semibold mb-2">
                Desc
              </label>
              <input
                type="text"
                id="DESC"
                name="DESC"
                value={formData.AssetDesc}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="AssetBrand" className="block text-gray-600 font-semibold mb-2">
                Brand
              </label>
              <input
                type="text"
                id="BRAND"
                name="BRAND"
                value={formData.AssetBrand}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="MODEL" className="block text-gray-600 font-semibold mb-2">
                Model
              </label>
              <input
                type="text"
                id="MODEL"
                name="MODEL"
                value={formData.MODEL}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="STATUS" className="block text-gray-600 font-semibold mb-2">
                Status
              </label>
              <input
                type="text"
                id="STATUS"
                name="STATUS"
                value={formData.STATUS}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="LOCATION" className="block text-gray-600 font-semibold mb-2">
                Location
              </label>
              <input
                type="text"
                id="LOCATION"
                name="LOCATION"
                value={formData.LOCATION}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="CATEGORY" className="block text-gray-600 font-semibold mb-2">
                Category
              </label>
              <input
                type="text"
                id="CATEGORY"
                name="CATEGORY"
                value={formData.CATEGORY}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="SN" className="block text-gray-600 font-semibold mb-2">
                SN
              </label>
              <input
                type="text"
                id="SN"
                name="SN"
                value={formData.SN}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="main-btn flex justify-end"
            >
              Submit
            </button>
          </form>
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
        </div>
      </div>
    </>
  );
};

export default Qrgen;