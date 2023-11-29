import mongoose from 'mongoose'
import { Student } from './models/Student.js'
import { Course } from './models/Course.js'

await mongoose.connect('mongodb://localhost/coderhouse')

// console.log(await Student.deleteMany({}))
// console.log(await Course.deleteMany({}))

// console.log(await Student.create({
//   first_name: 'Celia',
//   last_name: 'Coruño',
//   email: 'fasdf@fasdfads',
//   gender: 'Female'
// }))

// console.log(await Course.create({
//   title: 'Backend',
//   description: 'fasdfadgd',
//   difficulty: 10,
//   topics: ['js', 'backend'],
//   professor: 'Marian'
// }))

// console.log(await Student.find().lean())
// console.log(await Course.find().lean())

// console.log(
//   await Student.findByIdAndUpdate(
//     'e17f0c47-b5ad-4f51-85d8-59ee61c2e413',
//     { $push: { courses: { _id: 'd37a3a6c-802a-4d78-9036-6feaa7ccfce9' } } },
//     { new: true })
// )

// // sin poblar
console.log(JSON.stringify(await Student.find().lean(), null, 2))

// // con poblar
// console.log(JSON.stringify(await Student.find().populate('courses').lean(), null, 2))

mongoose.connection.close()