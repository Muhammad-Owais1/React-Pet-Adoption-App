import { useState, useEffect } from "react";

const localCache = {}

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([])
    const [status, setStatus] = useState('unloaded')

    useEffect(() => {
        if (!animal) {
            setBreedList([])
        }
        else if (localCache[animal]) {
            setBreedList(localCache[animal])
        }
        else {
            requestBreedList()
        }

        const requestBreedList = async () => {
            setBreedList([])
            setStatus('loading')

            const res = await fetch(
                `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
            )

            const json = await res.json()
            localCache[animal] = json.breeds || []
        }

    })
}
