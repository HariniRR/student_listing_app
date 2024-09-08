const express = require("express");
const router = express.Router();
const Department = require("../../database/schemas/deptSchema");

// to list departments
router.get("/", async (req, res) => {
    try {
        const department = await Department.find();
        res.status(200).json(department);
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//To add departments
router.post("/", async (req, res) => {
    try {
        const departmentData = req.body;
        const existingDepartment = await Department.findOne({ name: departmentData.name });
        if (existingDepartment) {
            return res.status(400).json({ message: "Department name must be unique." });
        }

        const newDepartment = new Department(departmentData);
        await newDepartment.save();
        res.status(201).json({ message: "Department added successfully", department: newDepartment });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

//To delete  departments
router.delete("/:id", async (req, res) => {
    try {
        const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
        if (!deletedDepartment) {
            return res.status(404).json({ message: "Department not found" });
        }
        res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});
module.exports = router;
