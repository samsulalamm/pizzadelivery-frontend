import React from 'react';
import usePlacesAutocomplete from 'use-places-autocomplete';

const PlacesAutocomplete = () => {
    const { value, setValue } = usePlacesAutocomplete();

    const handleInput = (e) => {
        // Place a "string" to update the value of the input element
        setValue(e.target.value);
    };

    return (
        <div>
            <input value={value} onChange={handleInput} />
            {/* Render dropdown */}
        </div>
    );
};

export default PlacesAutocomplete;