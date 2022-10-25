const express = require('express')
const router = express();


router.get("/:pokemonName", async (req, res) => {
    console.log("pokemon name: ", req.params.pokemonName);
    
    res.status(200).json({
        name: "mewtwo",
        description: "It was created by a scientist after years of horrific gene splicing " +
        "and DNA engineering experiments.",
        habitat: "rare",
        isLegendary: true
    });
});

router.get("/translated/:pokemonName", async (req, res) => {
    console.log("pokemon name for translated:", req.params.pokemonName);

    res.status(200).json({
        name: "mewtwo",
        description: "Created by a scientist after years of horrific gene" +
        "splicing and dna engineering experiments, it was.",
        habitat: "rare",
        isLegendary: true
    });
})

module.exports = router; // enable exporting of routes