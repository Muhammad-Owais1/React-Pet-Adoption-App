import React, { useState, useEffect } from 'react'
import Pet from '../components/Pet'

export default function SearchParams() {
    const [location, updateLocation] = useState("")
    const [animal, updateAnimal] = useState("")
    const [breed, updateBreed] = useState("")
    const [pets, setPets] = useState([])

    const breeds = []

    useEffect(() => {
        requestPets();
    }, [])

    const requestPets = async () => {
        const res = await fetch(
            `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
        )
        const json = await res.json()

        setPets(json.pets)
    }

    return (
        <div className='h-screen w-full bg-gray-100 flex flex-col items-center gap-[20px] py-8 overflow-scroll'>
            <div className='bg-slate-800 w-1/2 rounded-md py-4 px-6 shadow-black shadow-sm'>
                <form action="" className='h-full flex flex-col justify-center items-center gap-4 text-white'>

                    <label htmlFor="animal" className='w-full flex justify-between'>
                        Animal
                        <select
                            className='w-[60%] text-slate-300 capitalize bg-transparent border-b-white border-b-[1px] outline-none px-[4px] py-[2px] ml-3'
                            onChange={(e) => {
                                updateAnimal(e.target.value)
                                updateBreed("")
                            }}
                            onBlur={(e) => {
                                updateAnimal(e.target.value)
                                updateBreed("")
                            }}
                        >
                            {
                                ["bird", "cat", "dog", "rabbit", "reptile"].map((animal, index) => (
                                    <option key={index} className='text-black capitalize'>{animal}</option>
                                ))
                            }
                        </select>
                    </label>

                    <label htmlFor='breed' className='w-full flex justify-between'>
                        Breed
                        <select
                            disabled={!breeds.length}
                            className='w-[60%] text-slate-300 bg-transparent border-b-white border-b-[1px] outline-none px-[4px] py-[2px] ml-3'
                            id='breed'
                            value={breed}
                            onChange={(e) => updateBreed(e.target.value)}
                            onBlur={(e) => updateBreed(e.target.value)}
                        >
                            {
                                breeds.map((breed, index) => (
                                    <option className='text-black' key={index} value={breed}>
                                        {breed}
                                    </option>
                                ))
                            }
                        </select>
                    </label>

                    <label htmlFor="location" className='w-full flex justify-between' >
                        Location
                        <input
                            className='w-[60%] text-slate-300 bg-transparent border-b-white border-b-[1px] outline-none px-[4px] py-[2px] ml-3'
                            id="location"
                            placeholder="Location"
                            onChange={(e) => updateLocation(e.target.value)}
                        />
                    </label>

                    <button className='bg-slate-300 rounded-md w-1/2 py-[2px] text-black'>Submit</button>
                </form>
            </div>

            {
                pets.map((pet) => (
                    <Pet name={pet.name} animal={pet.animal} breed={pet.breed} key={pet.id} />
                ))
            }
        </div>
    )
}
