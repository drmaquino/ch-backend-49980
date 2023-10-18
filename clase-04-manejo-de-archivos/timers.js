let i = 0
const timer = setInterval(() => {
  console.log(i++)
  if (i === 3) {
    clearInterval(timer)
  }
}, 1000)