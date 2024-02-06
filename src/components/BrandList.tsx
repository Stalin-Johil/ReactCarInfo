import React, { useState } from 'react';
import carBrandsData from '../json/brands.json';
import { useDispatch, useSelector } from 'react-redux';
import { updateJsonData, storedJsonData } from '../redux/jsonSlice';

const BrandList: React.FC = () => {
    const [isFormVisible, SetIsFormVisible] = useState(false);
    const [currentBrand, SetCurrentBrand] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        brand: currentBrand,
        model: '',
        location: '',
        color: '',
        bodyType: '',
        noOfOwners: '',
        yom: '',
        transmission: '',
        fuelType: '',
        price: '',
        insurance: '',
        fitments: '',
        kilometers: '',
        photo: '',
      });

    const dispatch = useDispatch();
    const jsonData = useSelector(storedJsonData);
    
    const onItemClick = (itemName
    : string) => {
        // Handle item click (you can navigate to a detail page or perform other actions)
        console.log(`Item clicked: ${itemName}`);
        console.log(isFormVisible);
        if (!isFormVisible) {
            SetIsFormVisible(true);
        }
        setFormData((prevData) => ({
            ...prevData,
            brand: itemName,
        }));
        SetCurrentBrand(itemName);
        console.log(jsonData);
    };

    // Function to handle input changes
    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
        ...prevData,
        [name]: value,
        }));
    };

    // Function to handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        // Access the values in formData
        console.log('Form data submitted:', formData);
        // Perform other submission logic if needed
        
        try {
            // const parsedData = JSON.parse(formData);
            dispatch(updateJsonData(formData));
            setSuccessMessage('Form submitted successfully!');
            setTimeout(() => {
                setFormData({
                    brand: currentBrand,
                    model: '',
                    location: '',
                    color: '',
                    bodyType: '',
                    noOfOwners: '',
                    yom: '',
                    transmission: '',
                    fuelType: '',
                    price: '',
                    insurance: '',
                    fitments: '',
                    kilometers: '',
                    photo: '',
                });
                setSuccessMessage('');
            }, 1000);
            // Close the modal or perform other actions as needed
        } catch (error) {
            console.error('Invalid JSON format', error);
            // Handle invalid JSON format error
        }
    };
    
    return (
    <div>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {carBrandsData.car_brands.map((item) => (
            <div
            key={item.name}
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                margin: '10px',
                padding: '10px',
                textAlign: 'center',
                cursor: 'pointer',
            }}
            onClick={() => onItemClick(item.name)}
            >
            <img src={item.logo_link} alt={`${item.name} logo`} style={{ width: '50px', height: '50px' }} />
            <p>{item.name}</p>
            </div>
        ))}
        </div>
        <div style={{margin: '50px'}}></div>
        {isFormVisible ? 
        <div style={{maxHeight: '400px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            <form onSubmit={handleSubmit}>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Brand:
                    </label>
                    <input type="text" disabled={true} name="brand" value={formData.brand} onChange={handleInputChange} />
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Model:
                    </label>
                    <input type="text" name="model" value={formData.model} onChange={handleInputChange} placeholder='Innova/Indica/Wagon R'/>
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Location:
                    </label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder='Chennai/Bangalore'/>
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Color:
                    </label>
                    <input type="text" name="color" value={formData.color} onChange={handleInputChange} placeholder='Red/Black/White'/>
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Body Type:
                    </label>
                    <input type="text" name="bodyType" value={formData.bodyType} onChange={handleInputChange} placeholder='Hatchpack/Sedan/Suv'/>
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        No of owners:
                    </label>
                    <input type="number"  min={1} max={4} name="noOfOwners" value={formData.noOfOwners} onChange={handleInputChange} />
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Year of manufacture:
                    </label>
                    <input type="text" name="yom" value={formData.yom} onChange={handleInputChange} />
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Transmission:
                    </label>
                    <input type="text" name="transmission" value={formData.transmission} onChange={handleInputChange} placeholder='Automatic/Manual'/>
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Fuel Type:
                    </label>
                    <input type="text" name="fuelType" value={formData.fuelType} onChange={handleInputChange} placeholder='Petrol/Diesel/CNG'/>
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Price(In Lakhs):
                    </label>
                    <input type="number" name="price" value={formData.price} onChange={handleInputChange} min={0}/>
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Insurance Valid upto:
                    </label>
                    <input type="text" name="insurance" value={formData.insurance} onChange={handleInputChange} placeholder='18 Dec 2024'/>
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        External Fitments:
                    </label>
                    <input type="text" name="fitments" value={formData.fitments} onChange={handleInputChange} placeholder='Alloy/Bumper'/>
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Kms:
                    </label>
                    <input type="number" name="kilometers" value={formData.kilometers} onChange={handleInputChange} min={0} />
                </div>
                <div style={{marginBottom: '30px'}}>
                    <label style={{border: '1px solid #ccc',  padding: '10px', marginRight: '5px'}}>
                        Photo:
                    </label>
                    <input type="file" accept="image/*" name="photo" value={formData.photo} onChange={handleInputChange} />
                </div>
                <br />
                <button type="submit">Submit</button>
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            </form>
        </div> : null}
    </div>
    );
};

export default BrandList;
