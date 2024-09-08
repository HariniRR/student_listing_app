const express = require("express");
const router = express.Router();
const Student = require("../../database/schemas/studentSchema.js");

// to list students with filters in names and department
router .get("/", async(req,res) =>{  
    const queryParams = req.query;
    const filters = {};
    if(queryParams.name){
        filters.name = {
            $regex: `^${queryParams.name}`,
            $options: "i",
        };
    }
if(queryParams.department){
    filters.department = {
        $gte: parseFloat(queryParams.department),
    };
}
const students = await Student.find(filters);
res.json(students);
});


//to add student
router.post("/", async (req, res) => {
    try {
        const stuData = req.body;
        const existingStu = await Student.findOne({ name: stuData.name });
        if (existingStu) {
            return res.status(400).json({ message: "The student already exsist." });
        }

        const newStudent = new Student(stuData);
        await newStudent.save();
        res.status(201).json({ message: "Student added successfully", student: newStudent });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});


//To delete  students
router.delete("/:id", async (req, res) => {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "student not found" });
        }
        res.status(200).json({ message: "Student deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;
