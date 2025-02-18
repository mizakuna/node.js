const express = require('express')
const app = express()
const port = 3003

app.use(express.json())

const equipment = [
    { "id": 1, "name": "football", "brand": "nike" },
    { "id": 2, "name": "tennis racket", "brand": "wilson" }
]

app.get('/', (req, res) => {
    res.json({ nameF: 'jirapat', nameL: 'kotcharat' })
})

app.get('/equipment', (req, res) => {
    res.json(equipment)
})

app.get('/equipment/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const equipmentById = equipment.find(e => e.id === id)

    if (!equipmentById) {
        return res.status(404).json({ error: "Equipment not found" })
    }

    res.json(equipmentById)
})

app.post('/equipment', (req, res) => {
    const newEquipment = {
        id: equipment.length ? equipment[equipment.length - 1].id + 1 : 1,
        name: req.body.name,
        brand: req.body.brand
    }

    equipment.push(newEquipment)
    res.status(201).json(newEquipment)
})

app.put('/equipment/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const equipmentById = equipment.find(e => e.id === id)

    if (!equipmentById) {
        return res.status(404).json({ error: "Equipment not found" })
    }

    equipmentById.name = req.body.name || equipmentById.name
    equipmentById.brand = req.body.brand || equipmentById.brand

    res.json(equipmentById)
})

app.delete('/equipment/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = equipment.findIndex(e => e.id === id)

    if (index === -1) {
        return res.status(404).json({ error: "Equipment not found" })
    }

    equipment.splice(index, 1)
    res.json({ message: "Equipment deleted successfully" })
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
