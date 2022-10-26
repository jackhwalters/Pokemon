const express = require('express');
const axios = require('axios');
const router = express();


// Endpoint for Endpoint 1
router.get("/:pokemonName", async (req, res) => {
    axios.get(`https://pokeapi.co/api/v2/pokemon-species/${req.params.pokemonName}`)
        .then(response => {
            const name = ('name' in response.data) ? response.data.name : "undefined";
            const description = ('flavor_text_entries' in response.data) ? response.data.flavor_text_entries[0].flavor_text : "undefined";
            const habitat = ('habitat.name' in response.data) ? response.data.habitat.name : "undefined";
            const isLegendary = ('is_legendary' in response.data) ? response.data.is_legendary : "undefined";

            res.status(200).json({
                name: name,
                description: description,
                habitat: habitat,
                isLegendary: isLegendary
            });
        })
        .catch(error => {
            if (error.response || error.request) {
                // Simplistic error returning - verbosity depends on where this API will be used
                res.status(error.response.status).json({
                    message: `Error: ${error.response.statusText}`
                });
            }
            else {
                res.status(500).json({
                    message: "An unknown error has occured"
                });
            }
        });
});

// Endpoint for Endpoint 2
router.get("/translated/:pokemonName", async (req, res) => {
    console.log("pokemon name for translated:", req.params.pokemonName);

    res.status(200).json({
        name: "mewtwo",
        description: "Created by a scientist after years of horrific gene" +
        "splicing and dna engineering experiments, it was.",
        habitat: "rare",
        isLegendary: true
    });
});

module.exports = router; // Enable exporting of routes