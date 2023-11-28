import mongoose from 'mongoose'
import { Student } from './models/Student.js'
import { Course } from './models/Course.js'

await mongoose.connect('mongodb://localhost/coderhouse')

console.log(await Student.deleteMany({}))
console.log(await Course.deleteMany({}))

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
//     'df0f79aa-52b2-4012-8441-5d8c7ef04270',
//     { $push: { courses: { _id: '1ee6e1b2-1faa-4fde-855e-664f2c9eac11' } } },
//     { new: true })
// )

// // sin poblar
// console.log(JSON.stringify(await Student.find().lean(), null, 2))

// // con poblar
// console.log(JSON.stringify(await Student.find().populate('courses').lean(), null, 2))

mongoose.connection.close()