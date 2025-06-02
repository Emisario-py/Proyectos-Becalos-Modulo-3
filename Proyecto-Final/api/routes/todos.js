const express = require('express');

/* Conexión a la base de datos */
const db = require("../db");

/* Router del servidor */
const router = express.Router();

/* Crear un todo (POST /api/todos) */
router.post('/', (req, res) => {
    const { task, dueDate } = req.body
    if (!task || !dueDate) return res.status(400).json({ error: 'Faltan datos obligatorios' });
    db.run(
        `INSERT INTO todos (task, dueDate) VALUES (?, ?)`,
        [task, dueDate],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ id: this.lastID, task, dueDate, done: 0 });
        }
    )
})

router.get('/', (req, res) => {
    db.all(
        `SELECT * FROM todos`, (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(rows);
        }
    )
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: 'Falta el ID de la tarea a eliminar' });

    db.run(`DELETE FROM todos WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ message: 'Tarea eliminada correctamente' });
    });
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const { done } = req.body;

    if (![0, 1].includes(done)) {
        return res.status(400).json({ error: "'done' debe ser 0 o 1" });
    }

    db.run(`UPDATE todos SET done = ? WHERE id = ?`, [done, id], function (err) {
        if (err) return res.status(500).json({ error: err.message });

        if (this.changes === 0) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }

        res.json({ message: 'Tarea actualizada correctamente', id, done });
    });
});


module.exports = router;