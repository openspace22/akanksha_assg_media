const planets = [
    {
        valueId: "name",
        label: "Name" 
    },
    {
        valueId: "rotation_period",
        label: "Rotation Period" 
    },
    {
        valueId: "orbital_period",
        label: "Orbital Period" 
    },
    {
        valueId: "diameter",
        label: "Diameter"
    },
    {
        valueId: "climate",
        label: "Climate"
    },
    {
        valueId: "gravity",
        label: "Gravity"
    },
    {
        valueId: "terrain",
        label: "Terrain"
    },
    {
        valueId: "surface_water",
        label: "Surface Water"
    },
    {
        valueId: "population",
        label: "Population"
    }
];
const people = [
    {
        valueId: "name",
        label: "Name" 
    },
    {
        valueId: "height",
        label: "Height" 
    },
    {
        valueId: "mass",
        label: "Mass" 
    },
    {
        valueId: "hair_color",
        label: "Hair Color"
    },
    {
        valueId: "skin_color",
        label: "Skin Color"
    },
    {
        valueId: "eye_color",
        label: "Eye Colo"
    },
    {
        valueId: "birth_year",
        label: "Birth Year"
    },
    {
        valueId: "gender",
        label: "Gender"
    }
];
    
const films = [
    {
        valueId: "title",
        label: "Title"
    },
    {
        valueId: "episode_id",
        label: "Episode Id"
    },
    {
        valueId: "director",
        label: "Director"
    },
    {
        valueId: "producer",
        label: "Producer"
    },
    {
        valueId: "release_date",
        label: "Release Date"
    }
];
const species = [
    {
        valueId: "name",
        label: "Name"
    },
    {
        valueId: "classification",
        label: "Classification"
    },
    {
        valueId: "designation",
        label: "Designation"
    },
    {
        valueId: "average_height",
        label: "Average Height"
    },
    {
        valueId: "skin_colors",
        label: "Skin Colors"
    },
    {
        valueId: "hair_colors",
        label: "Hair Colors"
    },
    {
        valueId: "eye_colors",
        label: "Eye Colors"
    },
    {
        valueId: "average_lifespan",
        label: "Average Lifespan"
    },
    {
        valueId: "language",
        label: "Language"
    }
];
const vehicles = [
    {
        label: "Name", 
        valueId: "name"
    },
    {
        label: "Model", 
        valueId: "model"
    },
    {
        label: "Manufacturer", 
        valueId: "manufacturer"
    },
    {
        label: "Cost In Credits", 
        valueId: "cost_in_credits"
    },
    {
        label: "Length", 
        valueId: "length"
    },
    {
        label: "Max Atmosphering Speed", 
        valueId: "max_atmosphering_speed"
    },
    {
        label: "Crew", 
        valueId: "crew"
    },
    {
        label: "Passengers", 
        valueId: "passengers"
    },
    {
        label: "Cargo Capacity", 
        valueId: "cargo_cavalueIdpacity"
    },
    {
        label: "Consumables", 
        valueId: "consumables"
    },
    {
        label: "Vehicle Class", 
        valueId: "vehicle_class"
    }
];
const starships = [
    {label: "Name", valueId: "name"},
    {label: "Model", valueId: "model"},
    {label: "Manufacturer", valueId: "manufacturer"},
    {label: "Cost In Credits", valueId: "cost_in_credits"},
    {label: "Length", valueId: "length"},
    {label: "Max Atmosphering Speed", valueId: "max_atmosphering_speed"},
    {label: "Crew", valueId: "crew"},
    {label: "Cargo Capacity", valueId: "cargo_capacity"},
    {label: "Consumables", valueId: "consumables"},
    {label: "Hyperdrive Rating", valueId: "hyperdrive_rating"},
    {label: "MGLT", valueId: "MGLT"},
    {label: "Starship Class", valueId: "starship_class"}
]
export default {
    planets,
    people,
    films,
    species,
    vehicles,
    starships
}