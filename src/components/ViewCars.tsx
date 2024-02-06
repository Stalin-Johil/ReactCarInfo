import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { storedJsonData } from '../redux/jsonSlice';
import locations from '../json/cities.json';
import bodyTypes from '../json/bodyTypes.json';
import brands from '../json/brands.json';
import owners from '../json/owners.json';
import fuelTypes from '../json/fuelType.json';
import transmissions from '../json/transmission.json';

const ViewCars: React.FC = () => {

    interface CarFilter {
        location: string | null;
        bodyType: string | null;
        brand: string | null;
        owners: number | null;
        price: number | null;
        fuelType: string | null;
        transmission: string | null;
    }

    const [filters, setFilters] = useState<CarFilter>({
        location: null,
        bodyType: null,
        brand: null,
        owners:null,
        price: null,
        fuelType: null,
        transmission: null,
      });

    const [carResult, setCarResult] = useState([]);

    const carDetails = useSelector(storedJsonData);

    const resetFilters = (e: any) => {
        e.preventDefault();
        setFilters({
            location: null,
            bodyType: null,
            brand: null,
            owners:null,
            price: null,
            fuelType: null,
            transmission: null,
        });
    };

    // Function to handle form submission
    const handleSubmit = (e: any) => {
        e.preventDefault();
        try {
            // const parsedData = JSON.parse(formData);
            const filteredCars = carDetails.filter((car: any) => {
                return (
                  (filters.brand === null || car.brand === filters.brand) &&
                  (filters.location === null || car.location === filters.location) &&
                  (filters.bodyType === null || car.bodyType === filters.bodyType) &&
                  (filters.owners === null || car.noOfOwners === filters.owners) &&
                  (filters.fuelType === null || car.fuelType === filters.fuelType) &&
                  (filters.transmission === null || car.transmission === filters.transmission)
                );
              });
              setCarResult(filteredCars);
            // Close the modal or perform other actions as needed
        } catch (error) {
            console.error('Invalid JSON format', error);
            // Handle invalid JSON format error
        }
    };
    
    return (
    <div style={{flexDirection: 'row', maxHeight: '1000px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
        <div>
            <h3>Filters</h3>
            <form onSubmit={handleSubmit}>
                <label>
                    Location:
                    <select value={filters.location || ''} onChange={(e) => setFilters({ ...filters, location: e.target.value })}>
                    <option value="">Select...</option>
                    {locations.cities.map((item, index) => (
                        <option key={index} value={item}>{item}</option>
                    ))}
                    </select>
                </label>
                <div style={{marginBottom: '10px'}} />
                <label>
                    Body Type:
                    <select value={filters.bodyType || ''} onChange={(e) => setFilters({ ...filters, bodyType: e.target.value })}>
                    <option value="">Select...</option>
                    {bodyTypes.body_types.map((item, index) => (
                        <option key={index} value={item.type}>{item.type}</option>
                    ))}
                    </select>
                </label>
                <div style={{marginBottom: '10px'}} />
                <label>
                    Brand:
                    {brands.car_brands.map((item, index) => (
                       <label key={index}>
                       <input
                         type="checkbox"
                         checked={filters.brand?.includes(item.name)}
                         onChange={(e) => setFilters({ ...filters, brand: item.name })}
                       />
                       {item.name}
                       <div style={{marginBottom: '2px'}} />
                     </label>
                    ))}
                </label>
                <div style={{marginBottom: '10px'}} />
                <label>
                    Owners:
                    {owners.owner_types.map((item, index) => (
                       <label key={index}>
                       <input
                         type="radio"
                         name="owners"
                         checked={filters.owners === item.value}
                         onChange={(e) => setFilters({ ...filters, owners: item.value })}
                       />
                       {item.type}
                     </label>
                    ))}
                </label>
                <div style={{marginBottom: '10px'}} />
                <label>
                    Fuel Types:
                    {fuelTypes.fuel_types.map((item, index) => (
                       <label key={index}>
                       <input
                         type="radio"
                         name="fuel_types"
                         checked={filters.fuelType === item.type}
                         onChange={(e) => setFilters({ ...filters, fuelType: item.type })}
                       />
                       {item.type}
                     </label>
                    ))}
                </label>
                <div style={{marginBottom: '10px'}} />
                <label>
                    Transmission:
                    {transmissions.types.map((item, index) => (
                       <label key={index}>
                       <input
                         type="radio"
                         name="transmission"
                         checked={filters.transmission === item.type}
                         onChange={(e) => setFilters({ ...filters, transmission: item.type })}
                       />
                       {item.type}
                     </label>
                    ))}
                </label>
                <div style={{marginBottom: '10px'}} />
                <button type="submit">Submit</button>
                <button onClick={(e) => {resetFilters(e)}}>Reset filters</button>
            </form>
        </div>
        <div>
            <h3>Result Details</h3>
            {carResult && carResult.length > 0 ? <ul>
            {carResult.map((car: any, index) => (
                <li key={index}>
                {car.brand} {car.model} ({car.yom}, {car.color}, {car.bodyType}, {car.noOfOwners}, {car.fuelType}, {car.transmission})
                </li>
            ))}
            </ul>: <p>No data found!</p>}
            
      </div>
    </div>
    );
};

export default ViewCars;
